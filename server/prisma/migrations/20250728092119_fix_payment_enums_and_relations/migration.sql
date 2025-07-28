/*
  Warnings:

  - You are about to drop the column `transaction_id` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `dormitoryId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `roomId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `Announcement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AnnouncementRecipient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Attachment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AuditLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Confirmation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Dormitory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DormitoryAdmin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Price` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Room` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RoomStatus` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `payment_type` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_method` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('MONTHLY_RENT', 'DAILY_RENT', 'SECURITY_DEPOSIT', 'UTILITIES', 'MAINTENANCE_FEE', 'LATE_FEE', 'CLEANING_FEE', 'OTHER');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('STRIPE_CARD', 'CASH_TO_MANAGER', 'BANK_TRANSFER', 'OTHER');

-- CreateEnum
CREATE TYPE "RecurringFrequency" AS ENUM ('MONTHLY', 'WEEKLY', 'CUSTOM');

-- CreateEnum
CREATE TYPE "PaymentItemType" AS ENUM ('RENT', 'SECURITY_DEPOSIT', 'UTILITIES', 'MAINTENANCE_FEE', 'LATE_FEE', 'CLEANING_FEE', 'OTHER');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "NotificationType" ADD VALUE 'PAYMENT_FAILED';
ALTER TYPE "NotificationType" ADD VALUE 'PAYMENT_CONFIRMATION_REQUIRED';
ALTER TYPE "NotificationType" ADD VALUE 'PAYMENT_CONFIRMED';
ALTER TYPE "NotificationType" ADD VALUE 'PAYMENT_REFUNDED';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "PaymentStatus" ADD VALUE 'AWAITING_CONFIRMATION';
ALTER TYPE "PaymentStatus" ADD VALUE 'PROCESSING';
ALTER TYPE "PaymentStatus" ADD VALUE 'FAILED';
ALTER TYPE "PaymentStatus" ADD VALUE 'PARTIAL_REFUND';

-- DropForeignKey
ALTER TABLE "Announcement" DROP CONSTRAINT "Announcement_authorId_fkey";

-- DropForeignKey
ALTER TABLE "AnnouncementRecipient" DROP CONSTRAINT "AnnouncementRecipient_announcementId_fkey";

-- DropForeignKey
ALTER TABLE "AnnouncementRecipient" DROP CONSTRAINT "AnnouncementRecipient_roomId_fkey";

-- DropForeignKey
ALTER TABLE "AnnouncementRecipient" DROP CONSTRAINT "AnnouncementRecipient_userId_fkey";

-- DropForeignKey
ALTER TABLE "Attachment" DROP CONSTRAINT "Attachment_announcementId_fkey";

-- DropForeignKey
ALTER TABLE "AuditLog" DROP CONSTRAINT "AuditLog_userId_fkey";

-- DropForeignKey
ALTER TABLE "Confirmation" DROP CONSTRAINT "Confirmation_userId_fkey";

-- DropForeignKey
ALTER TABLE "Dormitory" DROP CONSTRAINT "Dormitory_managerId_fkey";

-- DropForeignKey
ALTER TABLE "DormitoryAdmin" DROP CONSTRAINT "DormitoryAdmin_dormitoryId_fkey";

-- DropForeignKey
ALTER TABLE "DormitoryAdmin" DROP CONSTRAINT "DormitoryAdmin_userId_fkey";

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_dormitoryId_fkey";

-- DropForeignKey
ALTER TABLE "RoomStatus" DROP CONSTRAINT "RoomStatus_roomId_fkey";

-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_room_id_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_room_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_dormitoryId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_roomId_fkey";

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "transaction_id",
ADD COLUMN     "confirmed_by" TEXT,
ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'PLN',
ADD COLUMN     "external_payment_id" TEXT,
ADD COLUMN     "failure_reason" TEXT,
ADD COLUMN     "manager_notes" TEXT,
ADD COLUMN     "payment_type" "PaymentType" NOT NULL,
ADD COLUMN     "price_id" TEXT,
ADD COLUMN     "recurring_payment_id" TEXT,
DROP COLUMN "payment_method",
ADD COLUMN     "payment_method" "PaymentMethod" NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "dormitoryId",
DROP COLUMN "roomId",
ADD COLUMN     "dormitory_id" TEXT,
ADD COLUMN     "room_id" TEXT,
ALTER COLUMN "updated_at" DROP DEFAULT;

-- DropTable
DROP TABLE "Announcement";

-- DropTable
DROP TABLE "AnnouncementRecipient";

-- DropTable
DROP TABLE "Attachment";

-- DropTable
DROP TABLE "AuditLog";

-- DropTable
DROP TABLE "Confirmation";

-- DropTable
DROP TABLE "Dormitory";

-- DropTable
DROP TABLE "DormitoryAdmin";

-- DropTable
DROP TABLE "Price";

-- DropTable
DROP TABLE "Room";

-- DropTable
DROP TABLE "RoomStatus";

-- CreateTable
CREATE TABLE "dormitory_admins" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "dormitory_id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dormitory_admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "confirmations" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" "ConfirmationType" NOT NULL,
    "status" "ConfirmationStatus" NOT NULL DEFAULT 'PENDING',
    "photo" TEXT,
    "front_id_url" TEXT,
    "back_id_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolved_at" TIMESTAMP(3),

    CONSTRAINT "confirmations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entity_id" TEXT NOT NULL,
    "meta" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dormitories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "ground_floor_phone_number" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Active',
    "photos" TEXT[],
    "manager_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dormitories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rooms" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "floor" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,
    "room_equipment" TEXT[],
    "photos" TEXT[],
    "dormitory_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_statuses" (
    "id" TEXT NOT NULL,
    "room_id" TEXT NOT NULL,
    "date_of_start" TIMESTAMP(3) NOT NULL,
    "date_of_end" TIMESTAMP(3),
    "description" TEXT NOT NULL,

    CONSTRAINT "room_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prices" (
    "id" TEXT NOT NULL,
    "room_id" TEXT,
    "room_capacity" INTEGER NOT NULL,
    "price_per_month" DOUBLE PRECISION NOT NULL,
    "price_per_day" DOUBLE PRECISION NOT NULL,
    "date_from" TIMESTAMP(3) NOT NULL,
    "date_to" TIMESTAMP(3),

    CONSTRAINT "prices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recurring_payments" (
    "id" TEXT NOT NULL,
    "payment_id" TEXT NOT NULL,
    "booking_id" TEXT NOT NULL,
    "frequency" "RecurringFrequency" NOT NULL DEFAULT 'MONTHLY',
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "day_of_month" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "last_processed" TIMESTAMP(3),
    "next_due_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recurring_payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_items" (
    "id" TEXT NOT NULL,
    "payment_id" TEXT NOT NULL,
    "item_type" "PaymentItemType" NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "period" TEXT,

    CONSTRAINT "payment_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_audit_logs" (
    "id" TEXT NOT NULL,
    "payment_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "old_value" JSONB,
    "new_value" JSONB,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "announcements" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "is_hidden" BOOLEAN NOT NULL DEFAULT false,
    "posted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "announcements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attachments" (
    "id" TEXT NOT NULL,
    "announcement_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "filename" TEXT NOT NULL,

    CONSTRAINT "attachments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "announcement_recipients" (
    "id" TEXT NOT NULL,
    "announcement_id" TEXT NOT NULL,
    "user_id" TEXT,
    "room_id" TEXT,
    "floor" INTEGER,
    "for_everyone" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "announcement_recipients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "dormitory_admins_user_id_dormitory_id_key" ON "dormitory_admins"("user_id", "dormitory_id");

-- CreateIndex
CREATE INDEX "audit_logs_user_id_idx" ON "audit_logs"("user_id");

-- CreateIndex
CREATE INDEX "audit_logs_entity_entity_id_idx" ON "audit_logs"("entity", "entity_id");

-- CreateIndex
CREATE INDEX "rooms_dormitory_id_idx" ON "rooms"("dormitory_id");

-- CreateIndex
CREATE INDEX "room_statuses_room_id_idx" ON "room_statuses"("room_id");

-- CreateIndex
CREATE INDEX "prices_room_id_idx" ON "prices"("room_id");

-- CreateIndex
CREATE INDEX "prices_date_from_date_to_idx" ON "prices"("date_from", "date_to");

-- CreateIndex
CREATE UNIQUE INDEX "recurring_payments_payment_id_key" ON "recurring_payments"("payment_id");

-- CreateIndex
CREATE INDEX "recurring_payments_next_due_date_idx" ON "recurring_payments"("next_due_date");

-- CreateIndex
CREATE INDEX "recurring_payments_is_active_idx" ON "recurring_payments"("is_active");

-- CreateIndex
CREATE INDEX "payment_items_payment_id_idx" ON "payment_items"("payment_id");

-- CreateIndex
CREATE INDEX "payment_audit_logs_payment_id_idx" ON "payment_audit_logs"("payment_id");

-- CreateIndex
CREATE INDEX "payment_audit_logs_user_id_idx" ON "payment_audit_logs"("user_id");

-- CreateIndex
CREATE INDEX "announcements_author_id_idx" ON "announcements"("author_id");

-- CreateIndex
CREATE INDEX "announcements_posted_at_idx" ON "announcements"("posted_at");

-- CreateIndex
CREATE INDEX "attachments_announcement_id_idx" ON "attachments"("announcement_id");

-- CreateIndex
CREATE INDEX "announcement_recipients_announcement_id_idx" ON "announcement_recipients"("announcement_id");

-- CreateIndex
CREATE INDEX "payments_payment_type_idx" ON "payments"("payment_type");

-- CreateIndex
CREATE INDEX "payments_booking_id_idx" ON "payments"("booking_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_dormitory_id_fkey" FOREIGN KEY ("dormitory_id") REFERENCES "dormitories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dormitory_admins" ADD CONSTRAINT "dormitory_admins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dormitory_admins" ADD CONSTRAINT "dormitory_admins_dormitory_id_fkey" FOREIGN KEY ("dormitory_id") REFERENCES "dormitories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "confirmations" ADD CONSTRAINT "confirmations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dormitories" ADD CONSTRAINT "dormitories_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_dormitory_id_fkey" FOREIGN KEY ("dormitory_id") REFERENCES "dormitories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_statuses" ADD CONSTRAINT "room_statuses_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prices" ADD CONSTRAINT "prices_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_price_id_fkey" FOREIGN KEY ("price_id") REFERENCES "prices"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_confirmed_by_fkey" FOREIGN KEY ("confirmed_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_recurring_payment_id_fkey" FOREIGN KEY ("recurring_payment_id") REFERENCES "recurring_payments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recurring_payments" ADD CONSTRAINT "recurring_payments_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recurring_payments" ADD CONSTRAINT "recurring_payments_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_items" ADD CONSTRAINT "payment_items_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_audit_logs" ADD CONSTRAINT "payment_audit_logs_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_audit_logs" ADD CONSTRAINT "payment_audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "announcements" ADD CONSTRAINT "announcements_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_announcement_id_fkey" FOREIGN KEY ("announcement_id") REFERENCES "announcements"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "announcement_recipients" ADD CONSTRAINT "announcement_recipients_announcement_id_fkey" FOREIGN KEY ("announcement_id") REFERENCES "announcements"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "announcement_recipients" ADD CONSTRAINT "announcement_recipients_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "announcement_recipients" ADD CONSTRAINT "announcement_recipients_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;
