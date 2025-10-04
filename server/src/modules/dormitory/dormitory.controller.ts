import {
  Body,
  Controller,
  Get,
  Param,
  Query,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { $Enums } from "../../../__generated__";
import UserRole = $Enums.UserRole;
import { CreateDormitoryDto } from "@/modules/dormitory/dto/create-dormitory.dto";
import { UpdateDormitoryDto } from "@/modules/dormitory/dto/update-dormitory.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { DormitoryService } from "./dormitory.service";
import { Authorization } from "@libs/common/decorators/auth.decorator";
import { DormitoryDocs } from "./dormitory.docs";

@DormitoryDocs.controller()
@Controller("dormitories")
export class DormitoryController {
  constructor(private readonly dormitoryService: DormitoryService) { }

  @Post()
  @Authorization(UserRole.Admin, UserRole.SuperAdmin)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "photos", maxCount: 10 },
      { name: "roomPhotos", maxCount: 50 },
    ])
  )
  @DormitoryDocs.create()
  create(
    @Body() dto: CreateDormitoryDto,
    @UploadedFiles() files: { photos?: Express.Multer.File[], roomPhotos?: Express.Multer.File[] },
  ) {
    return this.dormitoryService.create(dto, files);
  }

  @Get()
  @DormitoryDocs.findAll()
  findAll() {
    return this.dormitoryService.findAll();
  }

  @Get("deactivated")
  @Authorization(UserRole.Admin, UserRole.SuperAdmin)
  @DormitoryDocs.findDeactivated()
  findDeactivated() {
    return this.dormitoryService.findDeactivated();
  }

  @Get(":id")
  @DormitoryDocs.findOne()
  findOne(@Param("id") id: string) {
    return this.dormitoryService.findOne(id);
  }

  @Patch(":id")
  @Authorization(UserRole.Admin)
  @DormitoryDocs.update()
  update(@Param("id") id: string, @Body() dto: UpdateDormitoryDto) {
    return this.dormitoryService.update(id, dto);
  }

  @Patch(":id/activate")
  @Authorization(UserRole.Admin, UserRole.SuperAdmin)
  @DormitoryDocs.activate()
  activate(@Param("id") id: string) {
    return this.dormitoryService.activate(id);
  }

  @Patch(":id/deactivate")
  @Authorization(UserRole.Admin)
  @DormitoryDocs.deactivate()
  deactivate(@Param("id") id: string) {
    return this.dormitoryService.deactivate(id);
  }
}
