-- AlterTable
ALTER TABLE "product" ALTER COLUMN "image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "restaurant" ALTER COLUMN "icon" DROP NOT NULL,
ALTER COLUMN "background" DROP NOT NULL;
