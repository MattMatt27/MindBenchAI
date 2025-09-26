-- AlterTable
ALTER TABLE "tech_profile_questions" ADD COLUMN     "filter_config" JSONB,
ADD COLUMN     "filter_type" TEXT,
ADD COLUMN     "is_filterable" BOOLEAN NOT NULL DEFAULT false;