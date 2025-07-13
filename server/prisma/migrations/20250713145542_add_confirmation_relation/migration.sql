/*
  Warnings:

  - You are about to drop the `accounts` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ConfirmationType" AS ENUM ('IDENTITY_VERIFICATION', 'ACCOMMODATION', 'ROOM_CHANGE', 'ROOM_VACATION');

-- CreateEnum
CREATE TYPE "ConfirmationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_user_id_fkey";

-- DropTable
DROP TABLE "accounts";

-- CreateTable
CREATE TABLE "Confirmation" (
    "id" TEXT NOT NULL,
    "type" "ConfirmationType" NOT NULL,
    "status" "ConfirmationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "photo" TEXT,
    "frontIdUrl" TEXT,
    "backIdUrl" TEXT,

    CONSTRAINT "Confirmation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Confirmation" ADD CONSTRAINT "Confirmation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
