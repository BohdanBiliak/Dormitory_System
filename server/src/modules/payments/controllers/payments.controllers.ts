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
  UseGuards,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes } from '@nestjs/swagger';
import { PaymentsService } from '../sevices/payments.service';
import { CreatePaymentDto, PaymentFilterDto, ConfirmPaymentDto, RejectPaymentDto } from '../dto';
import { Authorization } from '../../../libs/common/decorators/auth.decorator';
@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // For Residents
    @Authorization()
  @Get('my')
  @ApiOperation({ summary: 'Get user payments' })
  async getMyPayments(
    @Req() req: any,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.paymentsService.getPaymentsByUserId(req.user.id, limit ?? 10, offset ?? 0);
  }
    @Authorization()
  @Get('my/stats')
  @ApiOperation({ summary: 'Get user payment statistics' })
  async getMyStats(@Req() req: any) {
    return this.paymentsService.getPaymentStats(req.user.id);
  }
    @Authorization()
  @Post(':id/upload-proof')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload payment proof' })
  async uploadPaymentProof(
    @Param('id') paymentId: string,
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
  @Authorization()
  @Post()
  @ApiOperation({ summary: 'Create payment (Admin only)' })
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.createPayment(createPaymentDto);
  }

      @Authorization()
  @Get('pending')
  @ApiOperation({ summary: 'Get pending payments (Admin only)' })
  async getPendingPayments(@Query('dormitoryId') dormitoryId?: string) {
    return this.paymentsService.getPendingPayments(dormitoryId);
  }
    @Authorization()
  @Get('awaiting-confirmation')
  @ApiOperation({ summary: 'Get payments awaiting confirmation (Admin only)' })
  async getAwaitingConfirmation(@Query('dormitoryId') dormitoryId?: string) {
    return this.paymentsService.getAwaitingConfirmation(dormitoryId);
  }   
  
  @Authorization()

  @Put(':id/confirm')
  @ApiOperation({ summary: 'Confirm payment (Admin only)' })
  async confirmPayment(
    @Param('id') paymentId: string,
    @Body() confirmDto: ConfirmPaymentDto,
    @Req() req: any,
  ) {
    return this.paymentsService.confirmPayment({
      ...confirmDto,
      paymentId,
      confirmedBy: req.user.id,
    });
  }

      @Authorization()
  @Put(':id/reject')
  @ApiOperation({ summary: 'Reject payment (Admin only)' })
  async rejectPayment(
    @Param('id') paymentId: string,
    @Body() rejectDto: RejectPaymentDto,
    @Req() req: any,
  ) {
    return this.paymentsService.rejectPayment({
      ...rejectDto,
      paymentId,
      rejectedBy: req.user.id,
    });
  }

      @Authorization()
  @Get('overdue')
  @ApiOperation({ summary: 'Get overdue payments (Admin only)' })
  async getOverduePayments() {
    return this.paymentsService.getOverduePayments();
  }

      @Authorization()
  @Get('stats')
  @ApiOperation({ summary: 'Get payment statistics (Admin only)' })
  async getStats(@Query('dormitoryId') dormitoryId?: string) {
    return this.paymentsService.getPaymentStats(undefined, dormitoryId);
  }

      @Authorization()
  @Get(':id')
  @ApiOperation({ summary: 'Get payment by ID' })
  async getPaymentById(@Param('id') id: string) {
    return this.paymentsService.getPaymentById(id);
  }

      @Authorization()
  @Get()
  @ApiOperation({ summary: 'Get payments with filters' })
  async getPayments(@Query() filters: PaymentFilterDto) {
    return this.paymentsService.getPaymentsWithFilters(filters);
  }
}