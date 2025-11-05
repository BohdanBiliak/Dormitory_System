import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { MessagingService } from './services/messaging.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { AuthGuard } from '../../libs/common/guards/auth.guard';

@ApiTags('Messaging')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('messaging')
export class MessagingController {
  constructor(private readonly messagingService: MessagingService) {}

  @Post('conversations')
  @ApiOperation({ summary: 'Create a new conversation' })
  @ApiResponse({ status: 201, description: 'Conversation created successfully' })
  async createConversation(
    @Body() createConversationDto: CreateConversationDto,
    @Request() req: any,
  ) {
    try {
      const userId = req.user.id;
      
      console.log('HTTP: Creating conversation', { 
        userId, 
        dto: createConversationDto 
      });
      
      const result = await this.messagingService.createConversation(userId, createConversationDto);
      
      console.log('HTTP: Conversation created successfully', { 
        conversationId: result.id 
      });
      
      return result;
    } catch (error) {
      console.error('HTTP: Failed to create conversation:', error);
      throw error;
    }
  }

  @Get('conversations')
  @ApiOperation({ summary: 'Get user conversations' })
  @ApiResponse({ status: 200, description: 'Conversations retrieved successfully' })
  async getUserConversations(@Request() req: any) {
    const userId = req.user.id; 
    
    return this.messagingService.getUserConversations(userId);
  }

  @Get('conversations/:conversationId/messages')
  @ApiOperation({ summary: 'Get conversation messages' })
  @ApiResponse({ status: 200, description: 'Messages retrieved successfully' })
  async getConversationMessages(
    @Param('conversationId') conversationId: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '50',
    @Request() req: any,
  ) {
    const userId = req.user.id;
    
    return this.messagingService.getConversationMessages(
      conversationId,
      userId,
      parseInt(page),
      parseInt(limit),
    );
  }

  @Post('conversations/:conversationId/messages')
  @ApiOperation({ summary: 'Send a message to a conversation' })
  @ApiResponse({ status: 201, description: 'Message sent successfully' })
  async sendMessage(
    @Param('conversationId') conversationId: string,
    @Body() createMessageDto: CreateMessageDto,
    @Request() req: any,
  ) {
    const userId = req.user.id;

    return this.messagingService.sendMessage(conversationId, userId, createMessageDto);
  }

  @Post('messages/:messageId/read')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Mark a message as read' })
  @ApiResponse({ status: 204, description: 'Message marked as read' })
  async markMessageAsRead(
    @Param('messageId') messageId: string,
    @Request() req: any,
  ) {
    const userId = req.user.id; // Remove fallback since AuthGuard ensures user exists
    
    await this.messagingService.markMessageAsRead(messageId, userId);
  }

  @Post('conversations/:conversationId/read')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Mark all messages in conversation as read' })
  @ApiResponse({ status: 204, description: 'Conversation marked as read' })
  async markConversationAsRead(
    @Param('conversationId') conversationId: string,
    @Request() req: any,
  ) {
    const userId = req.user.id; 
    
    await this.messagingService.markConversationAsRead(conversationId, userId);
  }

  @Get('conversations/:conversationId/unread-count')
  @ApiOperation({ summary: 'Get unread message count for a conversation' })
  @ApiResponse({ status: 200, description: 'Unread count retrieved successfully' })
  async getUnreadMessageCount(
    @Param('conversationId') conversationId: string,
    @Request() req: any,
  ) {
    const userId = req.user.id; 
    
    const count = await this.messagingService.getUnreadMessageCount(conversationId, userId);
    return { unreadCount: count };
  }

  @Get('conversations/direct/:otherUserId')
  @ApiOperation({ summary: 'Find or create direct conversation with another user' })
  @ApiResponse({ status: 200, description: 'Direct conversation retrieved/created successfully' })
  async getOrCreateDirectConversation(
    @Param('otherUserId') otherUserId: string,
    @Request() req: any,
  ) {
    const userId = req.user.id; 
    
    let conversation = await this.messagingService.findDirectConversation(userId, otherUserId);
    
    if (!conversation) {
      conversation = await this.messagingService.createConversation(userId, {
        isGroup: false,
        participantIds: [otherUserId],
      });
    }
    
    return conversation;
  }

  @Delete('conversations/:conversationId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a conversation' })
  @ApiResponse({ status: 204, description: 'Conversation deleted successfully' })
  @ApiResponse({ status: 403, description: 'User not authorized to delete this conversation' })
  @ApiResponse({ status: 404, description: 'Conversation not found' })
  async deleteConversation(
    @Param('conversationId') conversationId: string,
    @Request() req: any,
  ) {
    const userId = req.user.id;
    await this.messagingService.deleteConversation(conversationId, userId);
  }

  @Get('conversations/:conversationId/search')
  @ApiOperation({ summary: 'Search messages in a conversation' })
  @ApiResponse({ status: 200, description: 'Search results retrieved successfully' })
  async searchMessages(
    @Param('conversationId') conversationId: string,
    @Query('query') query: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
    @Request() req: any,
  ) {
    const userId = req.user.id;

    if (!query || query.trim() === '') {
      return { messages: [], hasMore: false, total: 0 };
    }

    return this.messagingService.searchMessages(
      conversationId,
      userId,
      query.trim(),
      parseInt(page),
      parseInt(limit),
    );
  }
}