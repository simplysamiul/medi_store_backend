/*
  Warnings:

  - Changed the type of `shipping_address` on the `orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "shipping_address",
ADD COLUMN     "shipping_address" JSONB NOT NULL;
