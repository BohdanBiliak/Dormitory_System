import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  UseInterceptors,
  UploadedFile,
  Req,
  Res,
  StreamableFile,
} from "@nestjs/common";
import { Response } from 'express';
import { FileInterceptor } from "@nestjs/platform-express";
import { PaymentsService } from "./payments.service";
import {
  CreatePaymentDto,
  CreateBulkPaymentDto,
  PaymentFilterDto,
  ConfirmPaymentDto,
  RejectPaymentDto,
} from "./dto";
import { Authorization } from "../../libs/common/decorators/auth.decorator";
import { PaymentsDocs } from "./payments.docs";

@PaymentsDocs.controller()
@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // For Residents
  @Get("my")
  @Authorization()
  @PaymentsDocs.getMyPayments()
  async getMyPayments(
    @Req() req: any,
    @Query("limit") limit?: number,
    @Query("offset") offset?: number,
  ) {
    return this.paymentsService.getPaymentsByUserId(
      req.user.id,
      limit ?? 10,
      offset ?? 0,
    );
  }

  @Get("my/stats")
  @Authorization()
  @PaymentsDocs.getMyStats()
  async getMyStats(@Req() req: any) {
    return this.paymentsService.getPaymentStats(req.user.id);
  }

  @Post(":id/upload-proof")
  @Authorization()
  @UseInterceptors(FileInterceptor("file"))
  @PaymentsDocs.uploadPaymentProof()
  async uploadPaymentProof(
    @Param("id") paymentId: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ) {
    return this.paymentsService.uploadPaymentProof({
      paymentId,
      userId: req.user.id,
      file,
    });
  }

  @Get(":id/download-proof")
  @Authorization()
  async downloadPaymentProof(
    @Param("id") paymentId: string,
    @Req() req: any,
    @Res() res: Response,
  ) {
    const fileData = await this.paymentsService.downloadPaymentProof(
      paymentId,
      req.user.id,
      req.user.role,
    );
    
    res.setHeader('Content-Type', fileData.contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${fileData.filename}"`);
    res.send(fileData.buffer);
  }

  // For Admins
  @Post()
  @Authorization()
  @PaymentsDocs.createPayment()
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.createPayment(createPaymentDto);
  }

  @Post("bulk")
  @Authorization()
  @PaymentsDocs.createBulkPayments()
  async createBulkPayments(@Body() createBulkPaymentDto: CreateBulkPaymentDto) {
    return this.paymentsService.createBulkPayments(createBulkPaymentDto);
  }

  @Get("occupied-rooms")
  @Authorization()
  async getOccupiedRooms(@Query("dormitoryId") dormitoryId?: string) {
    return this.paymentsService.getOccupiedRooms(dormitoryId);
  }

  @Get("pending")
  @Authorization()
  @PaymentsDocs.getPendingPayments()
  async getPendingPayments(@Query("dormitoryId") dormitoryId?: string) {
    return this.paymentsService.getPendingPayments(dormitoryId);
  }

  @Get("awaiting-confirmation")
  @Authorization()
  @PaymentsDocs.getAwaitingConfirmation()
  async getAwaitingConfirmation(@Query("dormitoryId") dormitoryId?: string) {
    return this.paymentsService.getAwaitingConfirmation(dormitoryId);
  }

  @Put(":id/confirm")
  @Authorization()
  @PaymentsDocs.confirmPayment()
  async confirmPayment(
    @Param("id") paymentId: string,
    @Body() confirmDto: ConfirmPaymentDto,
    @Req() req: any,
  ) {
    return this.paymentsService.confirmPayment({
      ...confirmDto,
      paymentId,
      confirmedBy: req.user.id,
    });
  }

  @Put(":id/reject")
  @Authorization()
  @PaymentsDocs.rejectPayment()
  async rejectPayment(
    @Param("id") paymentId: string,
    @Body() rejectDto: RejectPaymentDto,
    @Req() req: any,
  ) {
    return this.paymentsService.rejectPayment({
      ...rejectDto,
      paymentId,
      rejectedBy: req.user.id,
    });
  }

  @Put(":id/status")
  @Authorization()
  async updatePaymentStatus(
    @Param("id") paymentId: string,
    @Body() body: { status: string; notes?: string },
    @Req() req: any,
  ) {
    return this.paymentsService.updatePaymentStatus(
      paymentId,
      body.status,
      req.user.id,
      body.notes,
    );
  }

  @Get("overdue")
  @Authorization()
  @PaymentsDocs.getOverduePayments()
  async getOverduePayments() {
    return this.paymentsService.getOverduePayments();
  }

  @Get("stats")
  @Authorization()
  @PaymentsDocs.getStats()
  async getStats(@Query("dormitoryId") dormitoryId?: string) {
    return this.paymentsService.getPaymentStats(undefined, dormitoryId);
  }

  @Get(":id")
  @Authorization()
  @PaymentsDocs.getPaymentById()
  async getPaymentById(@Param("id") id: string) {
    return this.paymentsService.getPaymentById(id);
  }

  @Get()
  @Authorization()
  @PaymentsDocs.getPayments()
  async getPayments(@Query() filters: PaymentFilterDto) {
    return this.paymentsService.getPaymentsWithFilters(filters);
  }
}
