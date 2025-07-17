import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsDate, IsArray, IsOptional, IsNumber, IsUUID } from 'class-validator';

export class AttachmentDto {
    @ApiProperty()
    @IsString()
    id: string;

    @ApiProperty()
    @IsString()
    url: string;

    @ApiProperty()
    @IsString()
    filename: string;
}

export class RecipientDto {
    @ApiProperty()
    @IsString()
    id: string;

    @ApiProperty({ required: false, nullable: true })
    @IsOptional()
    @IsString()
    userId?: string;

    @ApiProperty({ required: false, nullable: true })
    @IsOptional()
    @IsString()
    roomId?: string;

    @ApiProperty({ required: false, nullable: true })
    @IsOptional()
    @IsNumber()
    floor?: number;

    @ApiProperty()
    @IsBoolean()
    forEveryone: boolean;
}

export class AnnouncementResponseDto {
    @ApiProperty()
    @IsString()
    id: string;

    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    content: string;

    @ApiProperty()
    @IsDate()
    postedAt: Date;

    @ApiProperty()
    @IsDate()
    expiresAt: Date;

    @ApiProperty()
    @IsBoolean()
    isHidden: boolean;

    @ApiProperty()
    @IsString()
    authorId: string;

    @ApiProperty({ type: [AttachmentDto] })
    @IsArray()
    attachments: AttachmentDto[];

    @ApiProperty({ type: [RecipientDto] })
    @IsArray()
    recipients: RecipientDto[];
}

