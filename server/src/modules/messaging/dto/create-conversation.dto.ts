import { IsString, IsOptional, IsArray, IsBoolean, ArrayMinSize, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateConversationDto {
  @ApiProperty({ description: 'Conversation title (optional for group chats)', required: false })
  @IsOptional()
  @ValidateIf((o) => o.title !== undefined && o.title !== null)
  @IsString()
  @Transform(({ value }) => value === '' ? undefined : value)
  title?: string;

  @ApiProperty({ description: 'Whether this is a group conversation', default: false })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === undefined || value === null ? false : value)
  isGroup?: boolean = false;

  @ApiProperty({ description: 'Array of user IDs to include in the conversation' })
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one participant is required' })
  @IsString({ each: true })
  participantIds: string[];
}