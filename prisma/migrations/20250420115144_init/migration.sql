/*
  Warnings:

  - You are about to drop the column `Color` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `Size` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `Colors` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `Size` on the `Product` table. All the data in the column will be lost.
  - Added the required column `color` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "Color",
DROP COLUMN "Size",
ADD COLUMN     "color" "eColors" NOT NULL,
ADD COLUMN     "size" "eSize" NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "Colors",
DROP COLUMN "Size",
ADD COLUMN     "colors" "eColors"[] DEFAULT ARRAY[]::"eColors"[],
ADD COLUMN     "size" "eSize"[] DEFAULT ARRAY[]::"eSize"[];
