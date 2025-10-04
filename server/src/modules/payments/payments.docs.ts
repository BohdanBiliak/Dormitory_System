import { applyDecorators } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiOkResponse,
  ApiTags,
  ApiQuery,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiConsumes,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiConflictResponse,
} from "@nestjs/swagger";
import { CreatePaymentDto, PaymentFilterDto, ConfirmPaymentDto, RejectPaymentDto } from "./dto";

export const PaymentsDocs = {
  controller: () =>
    applyDecorators(
      ApiTags("Payments"),
      ApiBearerAuth()
    ),

  getMyPayments: () =>
    applyDecorators(
      ApiOperation({
        summary: "Get user payments",
        description: "Retrieves paginated list of payments for the authenticated user, including payment history, current dues, and status information."
      }),
      ApiQuery({
        name: "limit",
        type: Number,
        required: false,
        description: "Number of payments to return per page",
        example: 10,
        minimum: 1,
        maximum: 100
      }),
      ApiQuery({
        name: "offset",
        type: Number,
        required: false,
        description: "Number of payments to skip for pagination",
        example: 0,
        minimum: 0
      }),
      ApiOkResponse({
        description: "User payments retrieved successfully",
        schema: {
          type: "object",
          properties: {
            data: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string", format: "uuid", example: "123e4567-e89b-12d3-a456-426614174000" },
                  amount: { type: "number", format: "decimal", example: 650.00 },
                  currency: { type: "string", example: "USD" },
                  status: { 
                    type: "string", 
                    enum: ["PENDING", "PAID", "OVERDUE", "CANCELLED", "PROCESSING"],
                    example: "PENDING"
                  },
                  type: { 
                    type: "string", 
                    enum: ["MONTHLY_RENT", "SECURITY_DEPOSIT", "UTILITIES", "DAMAGE_FEE", "OTHER"],
                    example: "MONTHLY_RENT"
                  },
                  description: { type: "string", example: "Monthly rent for October 2025" },
                  dueDate: { type: "string", format: "date-time", example: "2025-10-31T23:59:59.000Z" },
                  paidDate: { 
                    type: "string", 
                    format: "date-time", 
                    nullable: true,
                    example: null
                  },
                  proofUrl: { 
                    type: "string", 
                    nullable: true,
                    example: "https://s3.example.com/payment-proofs/proof123.pdf"
                  },
                  roomAssignment: {
                    type: "object",
                    properties: {
                      roomNumber: { type: "string", example: "301" },
                      dormitoryName: { type: "string", example: "East Wing Dormitory" }
                    }
                  },
                  createdAt: { type: "string", format: "date-time", example: "2025-10-01T00:00:00.000Z" },
                  lastModified: { type: "string", format: "date-time", example: "2025-10-03T10:30:00.000Z" }
                }
              }
            },
            pagination: {
              type: "object",
              properties: {
                total: { type: "number", example: 25 },
                limit: { type: "number", example: 10 },
                offset: { type: "number", example: 0 },
                hasMore: { type: "boolean", example: true }
              }
            },
            summary: {
              type: "object",
              properties: {
                totalDue: { type: "number", format: "decimal", example: 1300.00 },
                overdueDue: { type: "number", format: "decimal", example: 650.00 },
                nextPaymentDue: { type: "string", format: "date-time", example: "2025-10-31T23:59:59.000Z" }
              }
            }
          }
        }
      }),
      ApiForbiddenResponse({ description: "Authentication required" })
    ),

  getMyStats: () =>
    applyDecorators(
      ApiOperation({
        summary: "Get user payment statistics",
        description: "Returns comprehensive payment statistics for the authenticated user including payment history, average amounts, and trends."
      }),
      ApiOkResponse({
        description: "User payment statistics",
        schema: {
          type: "object",
          properties: {
            overview: {
              type: "object",
              properties: {
                totalPaid: { type: "number", format: "decimal", example: 7800.00 },
                totalDue: { type: "number", format: "decimal", example: 1300.00 },
                overdueAmount: { type: "number", format: "decimal", example: 650.00 },
                nextPaymentAmount: { type: "number", format: "decimal", example: 650.00 },
                nextPaymentDate: { type: "string", format: "date-time", example: "2025-10-31T23:59:59.000Z" }
              }
            },
            paymentHistory: {
              type: "object",
              properties: {
                totalPayments: { type: "number", example: 12 },
                onTimePayments: { type: "number", example: 10 },
                latePayments: { type: "number", example: 2 },
                onTimePercentage: { type: "number", format: "decimal", example: 83.33 }
              }
            },
            monthlyBreakdown: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  month: { type: "string", example: "2025-09" },
                  totalAmount: { type: "number", format: "decimal", example: 650.00 },
                  paidAmount: { type: "number", format: "decimal", example: 650.00 },
                  status: { type: "string", example: "COMPLETED" }
                }
              }
            },
            averages: {
              type: "object",
              properties: {
                monthlyPayment: { type: "number", format: "decimal", example: 650.00 },
                daysToPay: { type: "number", example: 15.5 },
                paymentFrequency: { type: "string", example: "Monthly" }
              }
            }
          }
        }
      }),
      ApiForbiddenResponse({ description: "Authentication required" })
    ),

  uploadPaymentProof: () =>
    applyDecorators(
      ApiOperation({
        summary: "Upload payment proof",
        description: "Uploads payment proof document (receipt, bank transfer confirmation, etc.) for a specific payment. Supports PDF, JPG, PNG formats up to 10MB."
      }),
      ApiConsumes("multipart/form-data"),
      ApiParam({
        name: "id",
        type: String,
        description: "Payment ID (UUID)",
        example: "123e4567-e89b-12d3-a456-426614174000"
      }),
      ApiBody({
        schema: {
          type: "object",
          properties: {
            file: {
              type: "string",
              format: "binary",
              description: "Payment proof file (PDF, JPG, PNG - max 10MB)"
            }
          },
          required: ["file"]
        }
      }),
      ApiOkResponse({
        description: "Payment proof uploaded successfully",
        schema: {
          type: "object",
          properties: {
            paymentId: { type: "string", format: "uuid", example: "123e4567-e89b-12d3-a456-426614174000" },
            proofUrl: { type: "string", example: "https://s3.example.com/payment-proofs/proof123.pdf" },
            fileName: { type: "string", example: "payment_receipt_october.pdf" },
            fileSize: { type: "number", example: 2048576 },
            uploadedAt: { type: "string", format: "date-time", example: "2025-10-03T11:30:00.000Z" },
            status: { type: "string", example: "AWAITING_CONFIRMATION" },
            message: { type: "string", example: "Payment proof uploaded successfully. Awaiting admin confirmation." }
          }
        }
      }),
      ApiNotFoundResponse({ 
        description: "Payment not found or not accessible by user",
        schema: {
          example: {
            statusCode: 404,
            message: "Payment not found",
            error: "Not Found"
          }
        }
      }),
      ApiBadRequestResponse({ 
        description: "Invalid file or payment already confirmed",
        schema: {
          example: {
            statusCode: 400,
            message: "File size exceeds 10MB limit or invalid file format",
            error: "Bad Request"
          }
        }
      }),
      ApiForbiddenResponse({ description: "Authentication required or payment not owned by user" })
    ),

  createPayment: () =>
    applyDecorators(
      ApiOperation({
        summary: "Create payment (Admin only)",
        description: "Creates a new payment record for a user. Only admins can create payments. Automatically sends notification to the user."
      }),
      ApiBody({
        type: CreatePaymentDto,
        examples: {
          monthlyRent: {
            summary: "Monthly rent payment",
            value: {
              userId: "123e4567-e89b-12d3-a456-426614174000",
              amount: 650.00,
              currency: "USD",
              type: "MONTHLY_RENT",
              description: "Monthly rent for October 2025",
              dueDate: "2025-10-31T23:59:59.000Z",
              roomAssignmentId: "456e7890-e89b-12d3-a456-426614174001"
            }
          },
          securityDeposit: {
            summary: "Security deposit",
            value: {
              userId: "123e4567-e89b-12d3-a456-426614174000",
              amount: 1300.00,
              currency: "USD",
              type: "SECURITY_DEPOSIT",
              description: "Refundable security deposit",
              dueDate: "2025-10-15T23:59:59.000Z"
            }
          }
        }
      }),
      ApiCreatedResponse({
        description: "Payment created successfully",
        schema: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid", example: "123e4567-e89b-12d3-a456-426614174000" },
            amount: { type: "number", format: "decimal", example: 650.00 },
            currency: { type: "string", example: "USD" },
            status: { type: "string", example: "PENDING" },
            type: { type: "string", example: "MONTHLY_RENT" },
            description: { type: "string", example: "Monthly rent for October 2025" },
            dueDate: { type: "string", format: "date-time", example: "2025-10-31T23:59:59.000Z" },
            user: {
              type: "object",
              properties: {
                id: { type: "string", format: "uuid" },
                displayName: { type: "string", example: "John Doe" },
                email: { type: "string", example: "john.doe@university.edu" }
              }
            },
            createdAt: { type: "string", format: "date-time", example: "2025-10-03T12:00:00.000Z" },
            notificationSent: { type: "boolean", example: true }
          }
        }
      }),
      ApiBadRequestResponse({ description: "Invalid payment data" }),
      ApiForbiddenResponse({ description: "Admin access required" })
    ),

  getPendingPayments: () =>
    applyDecorators(
      ApiOperation({
        summary: "Get pending payments (Admin only)",
        description: "Retrieves all pending payments, optionally filtered by dormitory. Shows payments that are due but not yet paid."
      }),
      ApiQuery({
        name: "dormitoryId",
        type: String,
        required: false,
        description: "Filter by dormitory ID (UUID)",
        example: "123e4567-e89b-12d3-a456-426614174000"
      }),
      ApiOkResponse({
        description: "Pending payments list",
        schema: {
          type: "object",
          properties: {
            data: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string", format: "uuid" },
                  amount: { type: "number", format: "decimal", example: 650.00 },
                  type: { type: "string", example: "MONTHLY_RENT" },
                  description: { type: "string", example: "Monthly rent for October 2025" },
                  dueDate: { type: "string", format: "date-time" },
                  daysPastDue: { type: "number", example: 0 },
                  user: {
                    type: "object",
                    properties: {
                      id: { type: "string", format: "uuid" },
                      displayName: { type: "string", example: "John Doe" },
                      email: { type: "string", example: "john.doe@university.edu" },
                      roomNumber: { type: "string", example: "301" }
                    }
                  },
                  dormitory: {
                    type: "object",
                    properties: {
                      id: { type: "string", format: "uuid" },
                      name: { type: "string", example: "East Wing Dormitory" }
                    }
                  }
                }
              }
            },
            summary: {
              type: "object",
              properties: {
                totalPending: { type: "number", example: 15 },
                totalAmount: { type: "number", format: "decimal", example: 9750.00 },
                averageAmount: { type: "number", format: "decimal", example: 650.00 }
              }
            }
          }
        }
      }),
      ApiForbiddenResponse({ description: "Admin access required" })
    ),

  getAwaitingConfirmation: () =>
    applyDecorators(
      ApiOperation({
        summary: "Get payments awaiting confirmation (Admin only)",
        description: "Retrieves payments that have proof uploaded but are awaiting admin confirmation. Helps admins review and approve payments."
      }),
      ApiQuery({
        name: "dormitoryId",
        type: String,
        required: false,
        description: "Filter by dormitory ID (UUID)"
      }),
      ApiOkResponse({
        description: "Payments awaiting confirmation",
        schema: {
          type: "object",
          properties: {
            data: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string", format: "uuid" },
                  amount: { type: "number", format: "decimal", example: 650.00 },
                  type: { type: "string", example: "MONTHLY_RENT" },
                  description: { type: "string", example: "Monthly rent for October 2025" },
                  proofUrl: { type: "string", example: "https://s3.example.com/payment-proofs/proof123.pdf" },
                  proofUploadedAt: { type: "string", format: "date-time", example: "2025-10-03T10:30:00.000Z" },
                  daysSinceProofUpload: { type: "number", example: 2 },
                  user: {
                    type: "object",
                    properties: {
                      id: { type: "string", format: "uuid" },
                      displayName: { type: "string", example: "John Doe" },
                      email: { type: "string", example: "john.doe@university.edu" },
                      roomNumber: { type: "string", example: "301" }
                    }
                  },
                  dormitory: {
                    type: "object",
                    properties: {
                      id: { type: "string", format: "uuid" },
                      name: { type: "string", example: "East Wing Dormitory" }
                    }
                  }
                }
              }
            },
            summary: {
              type: "object",
              properties: {
                totalAwaitingConfirmation: { type: "number", example: 8 },
                totalAmount: { type: "number", format: "decimal", example: 5200.00 },
                oldestSubmission: { type: "string", format: "date-time", example: "2025-09-30T14:20:00.000Z" }
              }
            }
          }
        }
      }),
      ApiForbiddenResponse({ description: "Admin access required" })
    ),

  confirmPayment: () =>
    applyDecorators(
      ApiOperation({
        summary: "Confirm payment (Admin only)",
        description: "Confirms a payment after reviewing the uploaded proof. Marks payment as paid and sends confirmation notification to user."
      }),
      ApiParam({
        name: "id",
        type: String,
        description: "Payment ID (UUID)",
        example: "123e4567-e89b-12d3-a456-426614174000"
      }),
      ApiBody({
        type: ConfirmPaymentDto,
        examples: {
          confirm: {
            summary: "Confirm payment with note",
            value: {
              adminNotes: "Payment confirmed. Bank transfer receipt verified.",
              confirmedAmount: 650.00,
              paymentMethod: "BANK_TRANSFER"
            }
          }
        }
      }),
      ApiOkResponse({
        description: "Payment confirmed successfully",
        schema: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid", example: "123e4567-e89b-12d3-a456-426614174000" },
            status: { type: "string", example: "PAID" },
            confirmedBy: { type: "string", format: "uuid", example: "admin-456e7890-e89b-12d3-a456-426614174001" },
            confirmedAt: { type: "string", format: "date-time", example: "2025-10-03T12:30:00.000Z" },
            adminNotes: { type: "string", example: "Payment confirmed. Bank transfer receipt verified." },
            confirmedAmount: { type: "number", format: "decimal", example: 650.00 },
            paymentMethod: { type: "string", example: "BANK_TRANSFER" },
            notificationSent: { type: "boolean", example: true },
            message: { type: "string", example: "Payment confirmed successfully. User has been notified." }
          }
        }
      }),
      ApiNotFoundResponse({ description: "Payment not found" }),
      ApiBadRequestResponse({ description: "Payment cannot be confirmed (already confirmed or invalid status)" }),
      ApiForbiddenResponse({ description: "Admin access required" })
    ),

  rejectPayment: () =>
    applyDecorators(
      ApiOperation({
        summary: "Reject payment (Admin only)",
        description: "Rejects a payment proof and provides feedback to user. User can resubmit proof after addressing the issues."
      }),
      ApiParam({
        name: "id",
        type: String,
        description: "Payment ID (UUID)",
        example: "123e4567-e89b-12d3-a456-426614174000"
      }),
      ApiBody({
        type: RejectPaymentDto,
        examples: {
          reject: {
            summary: "Reject payment with reason",
            value: {
              rejectionReason: "Receipt is unclear and amount doesn't match. Please provide a clearer receipt showing the full amount of $650.00.",
              allowResubmission: true
            }
          }
        }
      }),
      ApiOkResponse({
        description: "Payment rejected successfully",
        schema: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid", example: "123e4567-e89b-12d3-a456-426614174000" },
            status: { type: "string", example: "PENDING" },
            rejectedBy: { type: "string", format: "uuid", example: "admin-456e7890-e89b-12d3-a456-426614174001" },
            rejectedAt: { type: "string", format: "date-time", example: "2025-10-03T12:45:00.000Z" },
            rejectionReason: { type: "string", example: "Receipt is unclear and amount doesn't match." },
            allowResubmission: { type: "boolean", example: true },
            proofUrl: { type: "string", nullable: true, example: null },
            notificationSent: { type: "boolean", example: true },
            message: { type: "string", example: "Payment rejected. User has been notified and can resubmit proof." }
          }
        }
      }),
      ApiNotFoundResponse({ description: "Payment not found" }),
      ApiBadRequestResponse({ description: "Payment cannot be rejected (invalid status)" }),
      ApiForbiddenResponse({ description: "Admin access required" })
    ),

  getOverduePayments: () =>
    applyDecorators(
      ApiOperation({
        summary: "Get overdue payments (Admin only)",
        description: "Retrieves all payments that are past their due date. Helps admins identify users who need payment reminders or follow-up actions."
      }),
      ApiOkResponse({
        description: "Overdue payments list",
        schema: {
          type: "object",
          properties: {
            data: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string", format: "uuid" },
                  amount: { type: "number", format: "decimal", example: 650.00 },
                  type: { type: "string", example: "MONTHLY_RENT" },
                  description: { type: "string", example: "Monthly rent for September 2025" },
                  dueDate: { type: "string", format: "date-time", example: "2025-09-30T23:59:59.000Z" },
                  daysPastDue: { type: "number", example: 3 },
                  lateFees: { type: "number", format: "decimal", example: 50.00 },
                  totalOwed: { type: "number", format: "decimal", example: 700.00 },
                  user: {
                    type: "object",
                    properties: {
                      id: { type: "string", format: "uuid" },
                      displayName: { type: "string", example: "John Doe" },
                      email: { type: "string", example: "john.doe@university.edu" },
                      roomNumber: { type: "string", example: "301" },
                      phoneNumber: { type: "string", example: "+380123456789" }
                    }
                  },
                  lastReminderSent: { 
                    type: "string", 
                    format: "date-time", 
                    nullable: true,
                    example: "2025-10-01T09:00:00.000Z"
                  }
                }
              }
            },
            summary: {
              type: "object",
              properties: {
                totalOverdue: { type: "number", example: 12 },
                totalAmount: { type: "number", format: "decimal", example: 8400.00 },
                totalLateFees: { type: "number", format: "decimal", example: 600.00 },
                averageDaysPastDue: { type: "number", example: 5.2 }
              }
            }
          }
        }
      }),
      ApiForbiddenResponse({ description: "Admin access required" })
    ),

  getStats: () =>
    applyDecorators(
      ApiOperation({
        summary: "Get payment statistics (Admin only)",
        description: "Returns comprehensive payment statistics for admin dashboard. Can be filtered by dormitory for dormitory-specific insights."
      }),
      ApiQuery({
        name: "dormitoryId",
        type: String,
        required: false,
        description: "Filter statistics by dormitory ID (UUID)"
      }),
      ApiOkResponse({
        description: "Payment statistics",
        schema: {
          type: "object",
          properties: {
            overview: {
              type: "object",
              properties: {
                totalPayments: { type: "number", example: 1250 },
                totalAmount: { type: "number", format: "decimal", example: 812500.00 },
                pendingPayments: { type: "number", example: 45 },
                overduePayments: { type: "number", example: 12 },
                awaitingConfirmation: { type: "number", example: 8 }
              }
            },
            monthlyTrends: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  month: { type: "string", example: "2025-09" },
                  totalCollected: { type: "number", format: "decimal", example: 65000.00 },
                  onTimePayments: { type: "number", example: 95 },
                  latePayments: { type: "number", example: 5 },
                  collectionRate: { type: "number", format: "decimal", example: 98.5 }
                }
              }
            },
            paymentMethods: {
              type: "object",
              properties: {
                BANK_TRANSFER: { type: "number", example: 450 },
                CASH: { type: "number", example: 150 },
                ONLINE: { type: "number", example: 200 },
                OTHER: { type: "number", example: 50 }
              }
            },
            averages: {
              type: "object",
              properties: {
                paymentAmount: { type: "number", format: "decimal", example: 650.00 },
                collectionTime: { type: "number", example: 12.5 },
                confirmationTime: { type: "number", example: 2.1 }
              }
            }
          }
        }
      }),
      ApiForbiddenResponse({ description: "Admin access required" })
    ),

  getPaymentById: () =>
    applyDecorators(
      ApiOperation({
        summary: "Get payment by ID",
        description: "Retrieves detailed information about a specific payment. Users can only access their own payments, admins can access any payment."
      }),
      ApiParam({
        name: "id",
        type: String,
        description: "Payment ID (UUID)",
        example: "123e4567-e89b-12d3-a456-426614174000"
      }),
      ApiOkResponse({
        description: "Payment details",
        schema: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid", example: "123e4567-e89b-12d3-a456-426614174000" },
            amount: { type: "number", format: "decimal", example: 650.00 },
            currency: { type: "string", example: "USD" },
            status: { type: "string", example: "PENDING" },
            type: { type: "string", example: "MONTHLY_RENT" },
            description: { type: "string", example: "Monthly rent for October 2025" },
            dueDate: { type: "string", format: "date-time", example: "2025-10-31T23:59:59.000Z" },
            paidDate: { type: "string", format: "date-time", nullable: true, example: null },
            proofUrl: { type: "string", nullable: true, example: "https://s3.example.com/payment-proofs/proof123.pdf" },
            user: {
              type: "object",
              properties: {
                id: { type: "string", format: "uuid" },
                displayName: { type: "string", example: "John Doe" },
                email: { type: "string", example: "john.doe@university.edu" }
              }
            },
            roomAssignment: {
              type: "object",
              nullable: true,
              properties: {
                roomNumber: { type: "string", example: "301" },
                dormitoryName: { type: "string", example: "East Wing Dormitory" }
              }
            },
            adminActions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  action: { type: "string", example: "CONFIRMED" },
                  performedBy: { type: "string", example: "Admin User" },
                  performedAt: { type: "string", format: "date-time" },
                  notes: { type: "string", example: "Payment confirmed after receipt verification" }
                }
              }
            },
            createdAt: { type: "string", format: "date-time", example: "2025-10-01T00:00:00.000Z" },
            updatedAt: { type: "string", format: "date-time", example: "2025-10-03T12:30:00.000Z" }
          }
        }
      }),
      ApiNotFoundResponse({ description: "Payment not found or not accessible" }),
      ApiForbiddenResponse({ description: "Authentication required or insufficient permissions" })
    ),

  getPayments: () =>
    applyDecorators(
      ApiOperation({
        summary: "Get payments with filters",
        description: "Retrieves payments with advanced filtering options. Admins can filter across all users, regular users only see their own payments."
      }),
      ApiOkResponse({
        description: "Filtered payments list",
        schema: {
          type: "object",
          properties: {
            data: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string", format: "uuid" },
                  amount: { type: "number", format: "decimal", example: 650.00 },
                  status: { type: "string", example: "PENDING" },
                  type: { type: "string", example: "MONTHLY_RENT" },
                  description: { type: "string", example: "Monthly rent for October 2025" },
                  dueDate: { type: "string", format: "date-time" },
                  user: {
                    type: "object",
                    properties: {
                      displayName: { type: "string", example: "John Doe" },
                      roomNumber: { type: "string", example: "301" }
                    }
                  }
                }
              }
            },
            pagination: {
              type: "object",
              properties: {
                total: { type: "number", example: 150 },
                page: { type: "number", example: 1 },
                limit: { type: "number", example: 20 },
                totalPages: { type: "number", example: 8 }
              }
            },
            appliedFilters: {
              type: "object",
              description: "Filters that were applied to the query"
            }
          }
        }
      }),
      ApiForbiddenResponse({ description: "Authentication required" })
    ),
};