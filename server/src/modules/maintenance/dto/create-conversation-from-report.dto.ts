import { IsString, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateConversationFromReportDto {
  @ApiProperty({ 
    description: 'Initial message to send to the user',
    example: 'Hello! I received your maintenance request. I will be handling this issue. When would be a good time for me to inspect the problem?',
    required: false
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000, { message: 'Initial message cannot exceed 1000 characters' })
  initialMessage?: string;
}
