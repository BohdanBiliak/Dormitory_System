import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

interface AuthenticatedSocket extends Socket {
  userId?: string;
  sessionId?: string;
}

@Injectable()
@WebSocketGateway({
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  },
  namespace: "/notifications",
})
export class NotificationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;

  private readonly logger = new Logger(NotificationGateway.name);
  private connectedUsers = new Map<string, string>(); // userId -> socketId
  private connectedSessions = new Map<string, string>(); // sessionId -> socketId

  constructor(private configService: ConfigService) {}

  afterInit() {
    this.logger.log("NotificationGateway initialized");
  }

  async handleConnection(client: AuthenticatedSocket) {
    try {
      const cookies = this.parseCookies(client.handshake.headers.cookie || "");
      const sessionName = this.configService.get("SESSION_NAME") || "connect.sid";
      const sessionCookie = cookies[sessionName];
      if (!sessionCookie) {
        this.logger.warn(
          `Client ${client.id} connected without session cookie`,
        );
        client.disconnect();
        return;
      }
      const sessionId = this.extractSessionId(sessionCookie);
      if (!sessionId) {
        this.logger.warn(`Client ${client.id} has invalid session cookie`);
        client.disconnect();
        return;
      }
      const userData = await this.getSessionUserData(sessionId);
      if (!userData || !userData.id) {
        this.logger.warn(
          `Client ${client.id} has invalid session or not authenticated`,
        );
        client.disconnect();
        return;
      }
      client.userId = userData.id;
      client.sessionId = sessionId;
      this.connectedUsers.set(userData.id, client.id);
      this.connectedSessions.set(sessionId, client.id);
      await client.join(`user_${userData.id}`);
      client.emit("connection_confirmed", {
        message: "Connected to notifications",
        userId: userData.id,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      this.logger.error(`Connection error for ${client.id}:`, error);
      client.disconnect();
    }
  }

  handleDisconnect(client: AuthenticatedSocket) {
    if (client.userId) {
      this.connectedUsers.delete(client.userId);
      this.logger.log(`User ${client.userId} disconnected`);
    }
    if (client.sessionId) {
      this.connectedSessions.delete(client.sessionId);
    }
  }
  private parseCookies(cookieHeader: string): Record<string, string> {
    const cookies: Record<string, string> = {};

    cookieHeader.split(";").forEach((cookie) => {
      const [name, ...rest] = cookie.trim().split("=");
      if (name && rest.length) {
        cookies[name] = rest.join("=");
      }
    });

    return cookies;
  }

  private extractSessionId(cookieValue: string): string | null {
    try {

      const decoded = decodeURIComponent(cookieValue);

      if (decoded.startsWith("s:")) {
        const sessionPart = decoded.slice(2);
        const dotIndex = sessionPart.lastIndexOf(".");
        return dotIndex > 0 ? sessionPart.slice(0, dotIndex) : sessionPart;
      }

      return decoded;
    } catch (error) {
      this.logger.error("Error extracting session ID:", error);
      return null;
    }
  }

  private async getSessionUserData(sessionId: string): Promise<any> {
    try {
      return null;
    } catch (error) {
      this.logger.error("Error getting session data:", error);
      return null;
    }
  }

  async sendNotificationToUser(userId: string | number, notification: any) {
    const userIdString = String(userId);
    const socketId = this.connectedUsers.get(userIdString);

    if (socketId) {
      this.server.to(`user_${userIdString}`).emit("new_notification", {
        id: notification.id,
        type: notification.type,
        title: notification.title,
        message: notification.message,
        priority: notification.priority,
        metadata: notification.metadata,
        fromUser: notification.fromUser,
        room: notification.room,
        booking: notification.booking,
        payment: notification.payment,
        createdAt: notification.createdAt,
        isRead: notification.isRead,
      });
      return true;
    } else {
      return false;
    }
  }

  async sendNotificationToUsers(
    userIds: (string | number)[],
    notification: any,
  ) {
    const results = await Promise.all(
      userIds.map((userId) =>
        this.sendNotificationToUser(userId, notification),
      ),
    );

    const onlineCount = results.filter(Boolean).length;
    this.logger.log(
      `Sent notification to ${onlineCount}/${userIds.length} online users`,
    );

    return { onlineCount, totalCount: userIds.length };
  }

  async broadcastToAll(event: string, data: any) {
    this.server.emit(event, data);
    this.logger.log(`Broadcasted ${event} to all connected users`);
  }

  async sendToDormitoryUsers(dormitoryId: string, notification: any) {
    this.server
      .to(`dormitory_${dormitoryId}`)
      .emit("new_notification", notification);
    this.logger.log(`Sent notification to dormitory ${dormitoryId}`);
  }

  @SubscribeMessage("join_dormitory")
  async handleJoinDormitory(
    @MessageBody() data: { dormitoryId: string },
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    if (client.userId && data.dormitoryId) {
      await client.join(`dormitory_${data.dormitoryId}`);
      this.logger.log(
        `User ${client.userId} joined dormitory ${data.dormitoryId}`,
      );

      client.emit("dormitory_joined", {
        dormitoryId: data.dormitoryId,
        message: "Successfully joined dormitory notifications",
      });
    }
  }

  @SubscribeMessage("leave_dormitory")
  async handleLeaveDormitory(
    @MessageBody() data: { dormitoryId: string },
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    if (client.userId && data.dormitoryId) {
      await client.leave(`dormitory_${data.dormitoryId}`);
      this.logger.log(
        `User ${client.userId} left dormitory ${data.dormitoryId}`,
      );

      client.emit("dormitory_left", {
        dormitoryId: data.dormitoryId,
        message: "Left dormitory notifications",
      });
    }
  }

  @SubscribeMessage("mark_notification_read")
  async handleMarkAsRead(
    @MessageBody() data: { notificationId: string },
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    if (client.userId && data.notificationId) {
      client.emit("notification_marked_read", {
        notificationId: data.notificationId,
        timestamp: new Date().toISOString(),
      });
    }
  }
  getOnlineUsersCount(): number {
    return this.connectedUsers.size;
  }

  isUserOnline(userId: string): boolean {
    return this.connectedUsers.has(userId);
  }

  getOnlineUserIds(): string[] {
    return Array.from(this.connectedUsers.keys());
  }
}
