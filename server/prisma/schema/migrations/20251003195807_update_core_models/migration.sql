/*
  Warnings:

  - You are about to drop the column `api_model_name` on the `model_versions` table. All the data in the column will be lost.
  - You are about to drop the column `base_api_endpoint` on the `models` table. All the data in the column will be lost.
  - You are about to drop the column `model_family` on the `models` table. All the data in the column will be lost.
  - Added the required column `evaluation_entity_id` to the `profile_review_assignments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `evaluation_entity_id` to the `response_profile_answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `evaluation_entity_id` to the `tech_profile_answers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."response_profile_answers" DROP CONSTRAINT "response_profile_answers_model_version_fkey";

-- DropForeignKey
ALTER TABLE "public"."response_profile_answers" DROP CONSTRAINT "response_profile_answers_tool_configuration_fkey";

-- DropForeignKey
ALTER TABLE "public"."tech_profile_answers" DROP CONSTRAINT "tech_profile_answers_model_version_fkey";

-- DropForeignKey
ALTER TABLE "public"."tech_profile_answers" DROP CONSTRAINT "tech_profile_answers_tool_configuration_fkey";

-- DropIndex
DROP INDEX "public"."model_versions_api_model_name_idx";

-- DropIndex
DROP INDEX "public"."models_model_family_idx";

-- AlterTable
ALTER TABLE "model_versions" DROP COLUMN "api_model_name";

-- AlterTable
ALTER TABLE "models" DROP COLUMN "base_api_endpoint",
DROP COLUMN "model_family",
ADD COLUMN     "model_family_id" TEXT;

-- AlterTable
ALTER TABLE "profile_review_assignments" ADD COLUMN     "evaluation_entity_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "response_profile_answers" ADD COLUMN     "evaluation_entity_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tech_profile_answers" ADD COLUMN     "evaluation_entity_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "model_families" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "model_families_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evaluation_entities" (
    "id" TEXT NOT NULL,
    "entity_type" "EntityType" NOT NULL,
    "model_version_id" TEXT,
    "tool_configuration_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "evaluation_entities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "model_families_name_key" ON "model_families"("name");

-- CreateIndex
CREATE INDEX "evaluation_entities_entity_type_idx" ON "evaluation_entities"("entity_type");

-- CreateIndex
CREATE INDEX "evaluation_entities_model_version_id_idx" ON "evaluation_entities"("model_version_id");

-- CreateIndex
CREATE INDEX "evaluation_entities_tool_configuration_id_idx" ON "evaluation_entities"("tool_configuration_id");

-- CreateIndex
CREATE INDEX "models_model_family_id_idx" ON "models"("model_family_id");

-- CreateIndex
CREATE INDEX "profile_review_assignments_evaluation_entity_id_idx" ON "profile_review_assignments"("evaluation_entity_id");

-- CreateIndex
CREATE INDEX "response_profile_answers_evaluation_entity_id_idx" ON "response_profile_answers"("evaluation_entity_id");

-- CreateIndex
CREATE INDEX "tech_profile_answers_evaluation_entity_id_idx" ON "tech_profile_answers"("evaluation_entity_id");

-- AddForeignKey
ALTER TABLE "models" ADD CONSTRAINT "models_model_family_id_fkey" FOREIGN KEY ("model_family_id") REFERENCES "model_families"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "model_families" ADD CONSTRAINT "model_families_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "model_families" ADD CONSTRAINT "model_families_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluation_entities" ADD CONSTRAINT "evaluation_entities_model_version_id_fkey" FOREIGN KEY ("model_version_id") REFERENCES "model_versions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluation_entities" ADD CONSTRAINT "evaluation_entities_tool_configuration_id_fkey" FOREIGN KEY ("tool_configuration_id") REFERENCES "tool_configurations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluation_entities" ADD CONSTRAINT "evaluation_entities_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluation_entities" ADD CONSTRAINT "evaluation_entities_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "response_profile_answers" ADD CONSTRAINT "response_profile_answers_evaluation_entity_id_fkey" FOREIGN KEY ("evaluation_entity_id") REFERENCES "evaluation_entities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_review_assignments" ADD CONSTRAINT "profile_review_assignments_evaluation_entity_id_fkey" FOREIGN KEY ("evaluation_entity_id") REFERENCES "evaluation_entities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_profile_answers" ADD CONSTRAINT "tech_profile_answers_evaluation_entity_id_fkey" FOREIGN KEY ("evaluation_entity_id") REFERENCES "evaluation_entities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
