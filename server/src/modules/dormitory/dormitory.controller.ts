import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { RolesGuard } from "@/libs/common/guards/roles.guard";
import { Roles } from "@/libs/common/decorators/roles.decorator";
import { $Enums } from "../../../__generated__";
import UserRole = $Enums.UserRole;
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CreateDormitoryDto } from "@/modules/dormitory/dto/create-dormitory.dto";
import { UpdateDormitoryDto } from "@/modules/dormitory/dto/update-dormitory.dto";
import { FilesInterceptor } from "@nestjs/platform-express";
import { DormitoryService } from "./dormitory.service";

@ApiTags("Dormitories")
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller("dormitories")
export class DormitoryController {
  constructor(private readonly dormitoryService: DormitoryService) {}


  @Post()
  @Roles(UserRole.Admin)
  @UseInterceptors(FilesInterceptor("photos"))
  @ApiConsumes("multipart/form-data")
  @ApiOperation({
    summary: "Create new dormitory",
    description: "Creates a new dormitory with optional photo uploads and auto-generated rooms.",
  })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        name: { type: "string", example: "Dorm 1" },
        address: { type: "string", example: "123 Main St" },
        groundFloorPhoneNumber: { type: "string", example: "+380123456789" },
        roomGeneration: {
          type: "string",
          example: JSON.stringify({
            numberOfFloors: 3,
            roomsPerFloor: 4,
            pricePerDay: 30,
            pricePerMonth: 600,
          }),
        },
        photos: {
          type: "array",
          items: { type: "string", format: "binary" },
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: "Dormitory successfully created." })
  create(
      @Body() dto: CreateDormitoryDto,
      @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.dormitoryService.create(dto, files);
  }

  @Get()
  @ApiOperation({ summary: "List all active dormitories" })
  @ApiResponse({
    status: 200,
    description: "Returns list of active dormitories.",
    schema: {
      example: [
        {
          id: "uuid",
          name: "Dorm 1",
          address: "123 Main St",
          groundFloorPhoneNumber: "+380123456789",
          photos: ["https://s3.example.com/photo1.jpg"],
          status: "Active",
          createdAt: "2024-07-16T10:00:00.000Z",
        },
      ],
    },
  })
  findAll() {
    return this.dormitoryService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get dormitory by ID" })
  @ApiParam({ name: "id", description: "Dormitory UUID" })
  @ApiResponse({
    status: 200,
    description: "Dormitory found",
    schema: {
      example: {
        id: "uuid",
        name: "Dorm 1",
        address: "123 Main St",
        groundFloorPhoneNumber: "+380123456789",
        status: "Active",
        createdAt: "2024-07-16T10:00:00.000Z",
      },
    },
  })
  findOne(@Param("id") id: string) {
    return this.dormitoryService.findOne(id);
  }

  @Patch(":id")
  @Roles(UserRole.Admin)
  @ApiOperation({ summary: "Update dormitory information" })
  @ApiParam({ name: "id", description: "Dormitory UUID" })
  @ApiBody({
    type: UpdateDormitoryDto,
    description: "Fields to update in dormitory",
  })
  @ApiResponse({
    status: 200,
    description: "Dormitory updated successfully",
  })
  update(@Param("id") id: string, @Body() dto: UpdateDormitoryDto) {
    return this.dormitoryService.update(id, dto);
  }

  @Patch(":id/deactivate")
  @Roles(UserRole.Admin)
  @ApiOperation({ summary: "Deactivate dormitory" })
  @ApiParam({ name: "id", description: "Dormitory UUID" })
  @ApiResponse({
    status: 200,
    description: "Dormitory deactivated if no active residents.",
  })
  @ApiResponse({
    status: 400,
    description: "Cannot deactivate dormitory with active residents.",
  })
  deactivate(@Param("id") id: string) {
    return this.dormitoryService.deactivate(id);
  }
}
