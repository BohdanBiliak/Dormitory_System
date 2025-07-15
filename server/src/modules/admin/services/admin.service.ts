import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UpdateAdminProfileDto } from "@/modules/admin/dto/UpdateAdminProfile.dto";
import { PrismaService } from "@/prisma/prisma.service";
import { S3Service } from "@/libs/common/s3/s3.service";
import { UploadAvatarDto } from "@/modules/admin/dto/UploadAvatarDto";

type Version = "original" | "mobile" | "tablet" | "desktop";

@Injectable()
export class AdminService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly s3Service: S3Service,
  ) {}

  async getById(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        displayName: true,
        secondName: true,
        email: true,
        picture: true,
        role: true,
      },
    });
  }

  async updateById(id: string, data: UpdateAdminProfileDto) {
    return this.prismaService.user.update({
      where: { id },
      data,
      select: {
        id: true,
        displayName: true,
        secondName: true,
        email: true,
        picture: true,
        role: true,
      },
    });
  }

  async uploadAndUpdateAvatar(
    adminId: string,
    file: Express.Multer.File,
    version: Version,
    label: string = "avatar",
    folder: string = "users",
  ): Promise<{ url: string }> {
    if (!["original", "mobile", "tablet", "desktop"].includes(version)) {
      throw new BadRequestException(`Invalid version: ${version}`);
    }

    const existingAdmin = await this.prismaService.user.findUnique({
      where: { id: adminId },
      select: { picture: true, secondName: true },
    });

    if (!existingAdmin) {
      throw new NotFoundException("Admin not found");
    }
    const { picture, secondName } = existingAdmin;
    const urls = await this.s3Service.uploadResponsiveImage(
      file,
      secondName,
      label,
      folder,
    );
    await this.prismaService.user.update({
      where: { id: adminId },
      data: { picture: urls[version] },
    });

    return { url: urls[version] };
  }
}
