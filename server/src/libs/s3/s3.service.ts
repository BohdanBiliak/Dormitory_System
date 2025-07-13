import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { resizeImage } from '@/libs/image/resizeImage';

@Injectable()
export class S3Service {
    private readonly s3 = new S3({
        region: process.env.S3_REGION,
        accessKeyId: process.env.S3_KEY,
        secretAccessKey: process.env.S3_SECRET,
    });

    async uploadResponsiveImage(
        file: Express.Multer.File,
        userLastName: string,
        label: string,
        folder = 'users',
    ): Promise<{
        original: string;
        mobile: string;
        tablet: string;
        desktop: string;
    }> {
        const uuid = uuidv4();
        const ext = path.extname(file.originalname); // .jpg / .png
        const baseName = `${label}-${userLastName}-${uuid}${ext}`;

        const sizes = {
            mobile: 320,
            tablet: 768,
            desktop: 1280,
        };

        const uploads = await Promise.all([
            this.uploadToS3(file.buffer, `${folder}/original/${baseName}`, file.mimetype),
            this.uploadToS3(await resizeImage(file.buffer, sizes.mobile), `${folder}/mobile/${baseName}`, file.mimetype),
            this.uploadToS3(await resizeImage(file.buffer, sizes.tablet), `${folder}/tablet/${baseName}`, file.mimetype),
            this.uploadToS3(await resizeImage(file.buffer, sizes.desktop), `${folder}/desktop/${baseName}`, file.mimetype),
        ]);

        return {
            original: uploads[0],
            mobile: uploads[1],
            tablet: uploads[2],
            desktop: uploads[3],
        };
    }

    async uploadFile(file: Express.Multer.File, folder = 'users'): Promise<string> {
        const key = `${folder}/${uuidv4()}-${file.originalname}`;
        await this.s3
            .upload({
                Bucket: process.env.S3_BUCKET as string,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,
            })
            .promise();

        return `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${key}`;
    }


    private async uploadToS3(buffer: Buffer, key: string, contentType: string): Promise<string> {
        await this.s3
            .upload({
                Bucket: process.env.S3_BUCKET as string,
                Key: key,
                Body: buffer,
                ContentType: contentType,
            })
            .promise();

        return `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${key}`;
    }
}
