import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateConversationDto } from '../dto/create-conversation.dto';
import { CreateMessageDto } from '../dto/create-message.dto';
import { ConversationData, MessageData } from '../interfaces/messaging.interface';

@Injectable()
export class MessagingService {
  constructor(private readonly prisma: PrismaService) {}

  async createConversation(userId: string, createConversationDto: CreateConversationDto): Promise<ConversationData> {
    console.log('Creating conversation with data:', { userId, createConversationDto });
    
    const { title, isGroup, participantIds } = createConversationDto;

    if (!participantIds || participantIds.length === 0) {
      throw new Error('At least one participant is required');
    }

    const allParticipantIds = participantIds.includes(userId) 
      ? participantIds 
      : [userId, ...participantIds];

    console.log('All participant IDs:', allParticipantIds);

    if (!isGroup && allParticipantIds.length === 2) {
      const existingConversation = await this.findDirectConversation(allParticipantIds[0], allParticipantIds[1]);
      if (existingConversation) {
        console.log('Found existing direct conversation:', existingConversation.id);
        return existingConversation;
      }
    }

    const conversation = await this.prisma.conversation.create({
      data: {
        title,
        isGroup: isGroup || false,
        createdById: userId,
        participants: {
          createMany: {
            data: allParticipantIds.map((participantId, index) => ({
              userId: participantId,
              isAdmin: participantId === userId || (isGroup && index === 0),
            })),
          },
        },
      },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                displayName: true,
                picture: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return this.formatConversationData(conversation);
  }

  async findDirectConversation(userId1: string, userId2: string): Promise<ConversationData | null> {
    const conversation = await this.prisma.conversation.findFirst({
      where: {
        isGroup: false,
        participants: {
          every: {
            userId: { in: [userId1, userId2] },
            leftAt: null,
          },
        },
      },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                displayName: true,
                picture: true,
                email: true,
              },
            },
          },
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          include: {
            sender: {
              select: {
                id: true,
                displayName: true,
                picture: true,
              },
            },
          },
        },
      },
    });

    return conversation ? this.formatConversationData(conversation) : null;
  }

  async getUserConversations(userId: string): Promise<ConversationData[]> {
    const conversations = await this.prisma.conversation.findMany({
      where: {
        participants: {
          some: {
            userId,
            leftAt: null,
          },
        },
      },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                displayName: true,
                picture: true,
                email: true,
              },
            },
          },
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          include: {
            sender: {
              select: {
                id: true,
                displayName: true,
                picture: true,
              },
            },
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    return conversations.map(conversation => this.formatConversationData(conversation, userId));
  }

  async getConversationMessages(
    conversationId: string,
    userId: string,
    page: number = 1,
    limit: number = 50,
  ): Promise<{ messages: MessageData[]; hasMore: boolean }> {
    await this.verifyUserInConversation(conversationId, userId);

    const skip = (page - 1) * limit;
    
    const messages = await this.prisma.message.findMany({
      where: {
        conversationId,
        isDeleted: false,
      },
      include: {
        sender: {
          select: {
            id: true,
            displayName: true,
            picture: true,
          },
        },
        replyTo: {
          include: {
            sender: {
              select: {
                id: true,
                displayName: true,
                picture: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit + 1, 
    });

    const hasMore = messages.length > limit;
    if (hasMore) {
      messages.pop();
    }

    return {
      messages: messages.reverse().map(this.formatMessageData),
      hasMore,
    };
  }

  async sendMessage(
    conversationId: string,
    senderId: string,
    createMessageDto: CreateMessageDto,
  ): Promise<MessageData> {
    await this.verifyUserInConversation(conversationId, senderId);

    const message = await this.prisma.message.create({
      data: {
        conversationId,
        senderId,
        content: createMessageDto.content,
        messageType: createMessageDto.messageType || 'text',
        attachmentUrl: createMessageDto.attachmentUrl,
        attachmentName: createMessageDto.attachmentName,
        replyToId: createMessageDto.replyToId,
      },
      include: {
        sender: {
          select: {
            id: true,
            displayName: true,
            picture: true,
          },
        },
        replyTo: {
          include: {
            sender: {
              select: {
                id: true,
                displayName: true,
                picture: true,
              },
            },
          },
        },
      },
    });

    await this.prisma.conversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    });

    return this.formatMessageData(message);
  }

  async markMessageAsRead(messageId: string, userId: string): Promise<void> {
    const message = await this.prisma.message.findUnique({
      where: { id: messageId },
      select: { conversationId: true },
    });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    await this.verifyUserInConversation(message.conversationId, userId);

    await this.prisma.messageRead.upsert({
      where: {
        messageId_userId: {
          messageId,
          userId,
        },
      },
      create: {
        messageId,
        userId,
      },
      update: {
        readAt: new Date(),
      },
    });
  }

  async markConversationAsRead(conversationId: string, userId: string): Promise<void> {
    await this.verifyUserInConversation(conversationId, userId);

    await this.prisma.conversationParticipant.updateMany({
      where: {
        conversationId,
        userId,
        leftAt: null,
      },
      data: {
        lastReadAt: new Date(),
      },
    });
  }

  async getUnreadMessageCount(conversationId: string, userId: string): Promise<number> {
    const participant = await this.prisma.conversationParticipant.findFirst({
      where: {
        conversationId,
        userId,
        leftAt: null,
      },
      select: { lastReadAt: true },
    });

    if (!participant) {
      return 0;
    }

    const lastReadAt = participant.lastReadAt || new Date(0);

    return this.prisma.message.count({
      where: {
        conversationId,
        createdAt: { gt: lastReadAt },
        senderId: { not: userId },
        isDeleted: false,
      },
    });
  }

  async deleteConversation(conversationId: string, userId: string): Promise<void> {
    const participant = await this.prisma.conversationParticipant.findFirst({
      where: {
        conversationId,
        userId,
        leftAt: null,
      },
    });

    if (!participant) {
      throw new ForbiddenException('You are not a participant in this conversation');
    }

    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
      select: { createdById: true },
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    const isCreator = conversation.createdById === userId;
    const isAdmin = participant.isAdmin;

    if (!isCreator && !isAdmin) {
      throw new ForbiddenException('Only conversation creator or admin can delete this conversation');
    }

    await this.prisma.conversationParticipant.update({
      where: { id: participant.id },
      data: { leftAt: new Date() },
    });

    if (isCreator) {
      await this.prisma.conversation.delete({
        where: { id: conversationId },
      });
    }
  }

  async searchMessages(
    conversationId: string,
    userId: string,
    searchQuery: string,
    page: number = 1,
    limit: number = 20,
  ): Promise<{ messages: MessageData[]; hasMore: boolean; total: number }> {
    await this.verifyUserInConversation(conversationId, userId);

    const skip = (page - 1) * limit;
    const total = await this.prisma.message.count({
      where: {
        conversationId,
        isDeleted: false,
        content: {
          contains: searchQuery,
          mode: 'insensitive',
        },
      },
    });

    const messages = await this.prisma.message.findMany({
      where: {
        conversationId,
        isDeleted: false,
        content: {
          contains: searchQuery,
          mode: 'insensitive',
        },
      },
      include: {
        sender: {
          select: {
            id: true,
            displayName: true,
            picture: true,
          },
        },
        replyTo: {
          include: {
            sender: {
              select: {
                id: true,
                displayName: true,
                picture: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    });

    const hasMore = skip + messages.length < total;

    return {
      messages: messages.map(this.formatMessageData),
      hasMore,
      total,
    };
  }

  private async verifyUserInConversation(conversationId: string, userId: string): Promise<void> {
    const participant = await this.prisma.conversationParticipant.findFirst({
      where: {
        conversationId,
        userId,
        leftAt: null,
      },
    });

    if (!participant) {
      throw new ForbiddenException('You are not a participant in this conversation');
    }
  }

  private formatConversationData(conversation: any, currentUserId?: string): ConversationData {
    const result: ConversationData = {
      id: conversation.id,
      title: conversation.title,
      isGroup: conversation.isGroup,
      createdById: conversation.createdById,
      createdAt: conversation.createdAt,
      updatedAt: conversation.updatedAt,
      participants: conversation.participants.map((p: any) => ({
        id: p.id,
        userId: p.userId,
        joinedAt: p.joinedAt,
        leftAt: p.leftAt,
        isAdmin: p.isAdmin,
        lastReadAt: p.lastReadAt,
        user: p.user,
      })),
    };

    if (conversation.messages && conversation.messages.length > 0) {
      result.lastMessage = this.formatMessageData(conversation.messages[0]);
    }

    if (currentUserId) {

    }

    return result;
  }

  private formatMessageData(message: any): MessageData {
    return {
      id: message.id,
      conversationId: message.conversationId,
      senderId: message.senderId,
      content: message.content,
      messageType: message.messageType,
      attachmentUrl: message.attachmentUrl,
      attachmentName: message.attachmentName,
      isEdited: message.isEdited,
      editedAt: message.editedAt,
      isDeleted: message.isDeleted,
      deletedAt: message.deletedAt,
      replyToId: message.replyToId,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt,
      sender: message.sender,
      replyTo: message.replyTo ? this.formatMessageData(message.replyTo) : undefined,
    };
  }
}