import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendMessageDto {
  @ApiProperty({ description: 'Conversation ID' })
  @IsString()
  conversationId: string;

  @ApiProperty({ description: 'Message content' })
  @IsString()
  content: string;

  @ApiProperty({ description: 'Message type', enum: ['text', 'image', 'file'], required: false })
  @IsString()
  messageType?: string;

  @ApiProperty({ description: 'Attachment URL', required: false })
  @IsString()
  attachmentUrl?: string;

  @ApiProperty({ description: 'Attachment filename', required: false })
  @IsString()
  attachmentName?: string;

  @ApiProperty({ description: 'Reply to message ID', required: false })
  @IsString()
  replyToId?: string;
}