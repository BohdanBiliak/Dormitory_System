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
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { PaymentsService } from "./payments.service";
import {
  CreatePaymentDto,
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

  // For Admins
  @Post()
  @Authorization()
  @PaymentsDocs.createPayment()
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.createPayment(createPaymentDto);
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
