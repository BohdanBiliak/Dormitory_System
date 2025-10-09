import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class GetRoomTypesUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id?: string) {
    if (id) {
      return this.prisma.roomType.findUnique({
        where: { id },
        include: {
          floorRoomAssignments: {
            include: {
              floor: {
                include: {
                  dormitory: { select: { id: true, name: true } }
                }
              }
            }
          }
        }
      });
    }

    return this.prisma.roomType.findMany({
      orderBy: { typeCode: 'asc' },
      include: {
        _count: {
          select: {
            floorRoomAssignments: true
          }
        }
      }
    });
  }
}