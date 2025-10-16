/*
  Warnings:

  - You are about to drop the column `model_version_id` on the `tool_configurations` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tool_id,model_id]` on the table `tool_configurations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `model_id` to the `tool_configurations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."tool_configurations" DROP CONSTRAINT "tool_configurations_model_version_id_fkey";

-- DropIndex
DROP INDEX "public"."tool_configurations_model_version_id_idx";

-- DropIndex
DROP INDEX "public"."tool_configurations_tool_id_model_version_id_key";

-- AlterTable
ALTER TABLE "tool_configurations" DROP COLUMN "model_version_id",
ADD COLUMN     "model_id" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "tool_configurations_model_id_idx" ON "tool_configurations"("model_id");

-- CreateIndex
CREATE UNIQUE INDEX "tool_configurations_tool_id_model_id_key" ON "tool_configurations"("tool_id", "model_id");

-- AddForeignKey
ALTER TABLE "tool_configurations" ADD CONSTRAINT "tool_configurations_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "models"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
