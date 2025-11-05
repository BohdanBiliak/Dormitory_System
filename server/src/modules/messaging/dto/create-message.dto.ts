import { IsString, IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({ description: 'Message content' })
  @IsString()
  content: string;

  @ApiProperty({ description: 'Message type', enum: ['text', 'image', 'file'], default: 'text' })
  @IsOptional()
  @IsIn(['text', 'image', 'file'])
  messageType?: string = 'text';

  @ApiProperty({ description: 'Attachment URL (for image/file messages)', required: false })
  @IsOptional()
  @IsString()
  attachmentUrl?: string;

  @ApiProperty({ description: 'Attachment filename (for image/file messages)', required: false })
  @IsOptional()
  @IsString()
  attachmentName?: string;

  @ApiProperty({ description: 'ID of message being replied to', required: false })
  @IsOptional()
  @IsString()
  replyToId?: string;
}