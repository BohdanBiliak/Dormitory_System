import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable, UseGuards, Logger } from '@nestjs/common';
import { MessagingService } from '../services/messaging.service';
import { SendMessageDto } from '../dto/send-message.dto';
import { CreateConversationDto } from '../dto/create-conversation.dto';
import { UserService } from '../../user/user.service';
import { RedisSessionService } from '../../../libs/common/services/redis-session.service';
import { ConfigService } from '@nestjs/config';

interface AuthenticatedSocket extends Socket {
  userId?: string;
  user?: any;
  sessionId?: string;
}

interface ConnectionAttempt {
  socketId: string;
  timestamp: number;
  userId?: string;
}

@Injectable()
@WebSocketGateway({
  cors: {
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:3000',
      process.env.ALLOWED_ORIGIN || 'http://localhost:3000'
    ],
    credentials: true,
    methods: ['GET', 'POST'],
  },
  namespace: '/messaging',
  transports: ['polling', 'websocket'],
})
export class MessagingGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(MessagingGateway.name);
  private connectedUsers = new Map<string, Set<string>>(); 
  private socketUsers = new Map<string, string>();
  private connectionAttempts = new Map<string, ConnectionAttempt[]>(); // IP -> ConnectionAttempt[]
  private readonly MAX_CONNECTIONS_PER_USER = 10;
  private readonly CONNECTION_RATE_LIMIT: number; 
  private readonly RATE_LIMIT_WINDOW = 60 * 1000; 

  constructor(
    private readonly messagingService: MessagingService,
    private readonly userService: UserService,
    private readonly redisSessionService: RedisSessionService,
    private readonly configService: ConfigService,
  ) {
    this.CONNECTION_RATE_LIMIT = this.getConnectionRateLimit();
    
    setInterval(() => {
      this.cleanupOldConnectionAttempts();
    }, this.RATE_LIMIT_WINDOW);
  }

  private getConnectionRateLimit(): number {
    const nodeEnv = this.configService.get('NODE_ENV');
    if (nodeEnv === 'development' || nodeEnv === 'dev') {
      return 100;
    }
    return 30;
  }

  async handleConnection(client: AuthenticatedSocket) {
    const clientIP = client.handshake.address;
    const startTime = Date.now();
    try {
      if (!this.checkRateLimit(clientIP, client.id)) {
        this.logger.warn(`Rate limit exceeded for IP ${clientIP}`);
        client.emit('error', { 
          message: 'Too many connection attempts. Please try again later.',
          code: 'RATE_LIMIT_EXCEEDED'
        });
        client.disconnect();
        return;
      }
      const sessionId = this.extractSessionFromSocket(client);
      if (!sessionId) {
        client.emit('error', { 
          message: 'Authentication required. Please log in.',
          code: 'NO_SESSION'
        });
        client.disconnect();
        return;
      }
      const userId = await this.getUserFromSession(sessionId);
      if (!userId) {
        client.emit('error', { 
          message: 'Session expired. Please log in again.',
          code: 'INVALID_SESSION'
        });
        client.disconnect();
        return;
      }

      const user = await this.userService.findById(userId);
      if (!user) {
        this.logger.warn(`User ${userId} not found for client ${client.id}`);
        client.emit('error', { 
          message: 'User not found',
          code: 'USER_NOT_FOUND'
        });
        client.disconnect();
        return;
      }

      const userConnections = this.connectedUsers.get(userId);
      if (userConnections && userConnections.size >= this.MAX_CONNECTIONS_PER_USER) {
        this.logger.warn(`User ${userId} exceeded max connections (${this.MAX_CONNECTIONS_PER_USER})`);
        client.emit('error', { 
          message: 'Maximum connections per user exceeded',
          code: 'MAX_CONNECTIONS_EXCEEDED'
        });
        client.disconnect();
        return;
      }

      client.userId = userId;
      client.user = user;
      client.sessionId = sessionId;
      this.socketUsers.set(client.id, userId);

      if (!this.connectedUsers.has(userId)) {
        this.connectedUsers.set(userId, new Set());
      }
      this.connectedUsers.get(userId)?.add(client.id);

      await this.joinUserConversations(client, userId);

      this.broadcastUserOnlineStatus(userId, true);

      const connectionTime = Date.now() - startTime;
      const connectionCount = this.connectedUsers.get(userId)?.size || 1;
      
      this.logger.log(`User ${userId} connected successfully (socket: ${client.id}, connections: ${connectionCount}, time: ${connectionTime}ms)`);
      
      client.emit('connected', { 
        userId: userId,
        connectionCount: connectionCount,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      const connectionTime = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Connection error for ${client.id} from ${clientIP} (time: ${connectionTime}ms): ${errorMessage}`);
      
      client.emit('error', { 
        message: 'Connection failed due to server error',
        code: 'INTERNAL_ERROR'
      });
      client.disconnect();
    }
  }

  async handleDisconnect(client: AuthenticatedSocket) {
    const userId = this.socketUsers.get(client.id);
    const startTime = Date.now();
    
    try {
      if (userId) {
        this.socketUsers.delete(client.id);
        const userSockets = this.connectedUsers.get(userId);
        
        if (userSockets) {
          userSockets.delete(client.id);
          
          if (userSockets.size === 0) {
            this.connectedUsers.delete(userId);
            this.broadcastUserOnlineStatus(userId, false);
            this.logger.log(`User ${userId} went offline (socket: ${client.id})`);
          } else {
            const nodeEnv = this.configService.get('NODE_ENV');
            if (nodeEnv === 'development' || nodeEnv === 'dev') {
              this.logger.debug(`User ${userId} disconnected one socket (${client.id}), ${userSockets.size} remaining`);
            }
          }
        }
      }
    } catch (error) {
      const disconnectTime = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Disconnect error for ${client.id} (time: ${disconnectTime}ms): ${errorMessage}`);
    }
  }

  @SubscribeMessage('join_conversation')
  async handleJoinConversation(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { conversationId: string },
  ) {
    try {
      if (!client.userId) return;

      const conversations = await this.messagingService.getUserConversations(client.userId);
      const conversation = conversations.find(c => c.id === data.conversationId);
      
      if (conversation) {
        await client.join(data.conversationId);
        client.emit('joined_conversation', { conversationId: data.conversationId });
      }
    } catch (error) {
      client.emit('error', { message: 'Failed to join conversation' });
    }
  }

  @SubscribeMessage('leave_conversation')
  async handleLeaveConversation(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { conversationId: string },
  ) {
    await client.leave(data.conversationId);
    client.emit('left_conversation', { conversationId: data.conversationId });
  }

  @SubscribeMessage('send_message')
  async handleSendMessage(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: SendMessageDto,
  ) {
    try {
      if (!client.userId) return;

      const message = await this.messagingService.sendMessage(
        data.conversationId,
        client.userId,
        {
          content: data.content,
          messageType: data.messageType,
          attachmentUrl: data.attachmentUrl,
          attachmentName: data.attachmentName,
          replyToId: data.replyToId,
        },
      );

      this.server.to(data.conversationId).emit('new_message', message);

      client.emit('message_sent', { messageId: message.id });

    } catch (error) {
      client.emit('error', { message: 'Failed to send message' });
    }
  }

  @SubscribeMessage('create_conversation')
  async handleCreateConversation(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: CreateConversationDto,
  ) {
    try {
      this.logger.log(`Create conversation request from user ${client.userId} with data: ${JSON.stringify(data)}`);
      
      if (!client.userId) {
        this.logger.warn('Create conversation attempted without userId');
        client.emit('error', { message: 'Authentication required', code: 'NO_USER_ID' });
        return;
      }

      const conversation = await this.messagingService.createConversation(client.userId, data);
      this.logger.log(`Conversation created successfully: ${conversation.id}`);

      for (const participant of conversation.participants) {
        const participantSockets = this.connectedUsers.get(participant.userId);
        if (participantSockets) {
          participantSockets.forEach(socketId => {
            this.server.sockets.sockets.get(socketId)?.join(conversation.id);
          });
        }
      }

      this.server.to(conversation.id).emit('new_conversation', conversation);
      client.emit('conversation_created', conversation);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Failed to create conversation for user ${client.userId}: ${errorMessage}`, error instanceof Error ? error.stack : '');
      client.emit('error', { 
        message: 'Failed to create conversation',
        details: errorMessage,
        code: 'CONVERSATION_CREATE_FAILED'
      });
    }
  }

  @SubscribeMessage('mark_message_read')
  async handleMarkMessageRead(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { messageId: string },
  ) {
    try {
      if (!client.userId) return;

      await this.messagingService.markMessageAsRead(data.messageId, client.userId);

      client.emit('message_read', { messageId: data.messageId });

    } catch (error) {
      client.emit('error', { message: 'Failed to mark message as read' });
    }
  }

  @SubscribeMessage('mark_conversation_read')
  async handleMarkConversationRead(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { conversationId: string },
  ) {
    try {
      if (!client.userId) return;

      await this.messagingService.markConversationAsRead(data.conversationId, client.userId);

      client.emit('conversation_marked_read', { conversationId: data.conversationId });

    } catch (error) {
      client.emit('error', { message: 'Failed to mark conversation as read' });
    }
  }

  @SubscribeMessage('typing_start')
  async handleTypingStart(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { conversationId: string },
  ) {
    if (!client.userId) return;

    client.to(data.conversationId).emit('user_typing', {
      userId: client.userId,
      conversationId: data.conversationId,
      isTyping: true,
    });
  }

  @SubscribeMessage('typing_stop')
  async handleTypingStop(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { conversationId: string },
  ) {
    if (!client.userId) return;

    client.to(data.conversationId).emit('user_typing', {
      userId: client.userId,
      conversationId: data.conversationId,
      isTyping: false,
    });
  }

  private checkRateLimit(clientIP: string, socketId: string): boolean {
    const now = Date.now();
    
    if (this.isLocalOrDevelopmentIP(clientIP)) {
      this.logger.debug(`Skipping rate limit for development IP: ${clientIP}`);
      return true;
    }
    
    const attempts = this.connectionAttempts.get(clientIP) || [];

    const recentAttempts = attempts.filter(
      attempt => now - attempt.timestamp <= this.RATE_LIMIT_WINDOW
    );

    if (recentAttempts.length >= this.CONNECTION_RATE_LIMIT) {
      this.logger.warn(`Rate limit exceeded for IP ${clientIP}: ${recentAttempts.length}/${this.CONNECTION_RATE_LIMIT} connections in last minute`);
      return false;
    }

    recentAttempts.push({
      socketId,
      timestamp: now
    });
    
    this.connectionAttempts.set(clientIP, recentAttempts);
    return true;
  }

  private isLocalOrDevelopmentIP(clientIP: string): boolean {
    const developmentIPs = [
      '::1',           // IPv6 localhost
      '127.0.0.1',     // IPv4 localhost
      '::ffff:127.0.0.1', // IPv4-mapped IPv6 localhost
      '::ffff:172.20.0.1', // Docker bridge network
      '::ffff:172.17.0.1', // Docker default bridge
      '::ffff:172.18.0.1', // Docker custom bridge
      '::ffff:172.19.0.1', // Docker custom bridge
      '172.20.0.1',    // Docker bridge network
      '172.17.0.1',    // Docker default bridge
      '172.18.0.1',    // Docker custom bridge
      '172.19.0.1',    // Docker custom bridge
    ];
    
    return developmentIPs.includes(clientIP) || 
           clientIP.startsWith('192.168.') || 
           clientIP.startsWith('10.') ||
           clientIP.startsWith('172.') ||
           clientIP.includes('localhost');
  }

  private cleanupOldConnectionAttempts(): void {
    const now = Date.now();
    
    for (const [ip, attempts] of this.connectionAttempts.entries()) {
      const recentAttempts = attempts.filter(
        attempt => now - attempt.timestamp <= this.RATE_LIMIT_WINDOW
      );
      
      if (recentAttempts.length === 0) {
        this.connectionAttempts.delete(ip);
      } else {
        this.connectionAttempts.set(ip, recentAttempts);
      }
    }
  }

  private extractSessionFromSocket(client: AuthenticatedSocket): string | null {
    try {
      const cookies = client.handshake.headers.cookie;
      
      if (!cookies) {
        return null;
      }

      const sessionCookieName = this.configService.get('SESSION_NAME') || 'connect.sid';
      const parsedCookies = this.redisSessionService.parseCookies(cookies);
      const sessionCookie = parsedCookies[sessionCookieName];
      
      if (!sessionCookie) {
        return null;
      }
      
      return this.redisSessionService.extractSessionIdFromCookie(sessionCookie);
    } catch (error) {
      console.error('Error extracting session from socket:', error);
      return null;
    }
  }

  private async getUserFromSession(sessionId: string): Promise<string | null> {
    try {
      const userData = await this.redisSessionService.getUserFromSession(sessionId);
      return userData?.id || null;
    } catch (error) {
      console.error('Error getting user from session:', error);
      return null;
    }
  }

  private async joinUserConversations(client: AuthenticatedSocket, userId: string) {
    try {
      const conversations = await this.messagingService.getUserConversations(userId);
      
      for (const conversation of conversations) {
        await client.join(conversation.id);
      }
    } catch (error) {
      console.error('Error joining user conversations:', error);
    }
  }

  private broadcastUserOnlineStatus(userId: string, isOnline: boolean) {
    this.server.emit('user_online_status', {
      userId,
      isOnline,
      lastSeen: isOnline ? null : new Date(),
    });
  }

  public async sendNotificationToUser(userId: string, notification: any) {
    const userSockets = this.connectedUsers.get(userId);
    if (userSockets) {
      userSockets.forEach(socketId => {
        this.server.to(socketId).emit('notification', notification);
      });
    }
  }

  public async broadcastToConversation(conversationId: string, event: string, data: any) {
    this.server.to(conversationId).emit(event, data);
  }
}