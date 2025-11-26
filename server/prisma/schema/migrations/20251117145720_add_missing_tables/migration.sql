/*
  Warnings:

  - The `status` column on the `suggestions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `display_order` on the `team_members` table. All the data in the column will be lost.
  - You are about to drop the column `tag` on the `updates` table. All the data in the column will be lost.
  - You are about to drop the `response_profile_answers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `response_profile_questions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `response_profile_test` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[entity_type,model_version_id,tool_configuration_id]` on the table `evaluation_entities` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `updates` will be added. If there are existing duplicate values, this will fail.
  - Made the column `model_family_id` on table `models` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `category` to the `updates` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BenchmarkType" AS ENUM ('multiple_choice', 'open_ended', 'conversation', 'mixed', 'other');

-- CreateEnum
CREATE TYPE "UpdateCategory" AS ENUM ('feature', 'bug_fix', 'improvement', 'announcement', 'research', 'community');

-- CreateEnum
CREATE TYPE "SuggestionStatus" AS ENUM ('open_vote', 'under_review', 'planned', 'in_progress', 'completed', 'declined', 'duplicate');

-- CreateEnum
CREATE TYPE "SuggestionCategory" AS ENUM ('feature', 'benchmark', 'model', 'ui_ux', 'documentation', 'bug', 'other');

-- AlterEnum
ALTER TYPE "EntityType" ADD VALUE 'both';

-- DropForeignKey
ALTER TABLE "public"."models" DROP CONSTRAINT "models_model_family_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."response_profile_answers" DROP CONSTRAINT "response_profile_answers_approved_by_fkey";

-- DropForeignKey
ALTER TABLE "public"."response_profile_answers" DROP CONSTRAINT "response_profile_answers_created_by_fkey";

-- DropForeignKey
ALTER TABLE "public"."response_profile_answers" DROP CONSTRAINT "response_profile_answers_evaluation_entity_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."response_profile_answers" DROP CONSTRAINT "response_profile_answers_question_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."response_profile_answers" DROP CONSTRAINT "response_profile_answers_review_assignment_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."response_profile_answers" DROP CONSTRAINT "response_profile_answers_reviewer_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."response_profile_questions" DROP CONSTRAINT "response_profile_questions_created_by_fkey";

-- DropForeignKey
ALTER TABLE "public"."response_profile_questions" DROP CONSTRAINT "response_profile_questions_test_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."response_profile_questions" DROP CONSTRAINT "response_profile_questions_updated_by_fkey";

-- DropIndex
DROP INDEX "public"."team_members_display_order_idx";

-- DropIndex
DROP INDEX "public"."updates_tag_idx";

-- AlterTable
ALTER TABLE "models" ALTER COLUMN "model_family_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "suggestions" ADD COLUMN     "category" "SuggestionCategory",
ADD COLUMN     "closed_at" TIMESTAMP(3),
ADD COLUMN     "closed_reason" TEXT,
ADD COLUMN     "implemented_at" TIMESTAMP(3),
ADD COLUMN     "priority" INTEGER,
ADD COLUMN     "related_issue_url" TEXT,
ADD COLUMN     "reviewed_at" TIMESTAMP(3),
ADD COLUMN     "reviewed_by" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "SuggestionStatus" NOT NULL DEFAULT 'open_vote';

-- AlterTable
ALTER TABLE "team_members" DROP COLUMN "display_order",
ADD COLUMN     "end_date" DATE,
ADD COLUMN     "expertise" JSONB,
ADD COLUMN     "image_storage_path" TEXT,
ADD COLUMN     "social_links" JSONB,
ADD COLUMN     "sort_order" INTEGER,
ADD COLUMN     "start_date" DATE;

-- AlterTable
ALTER TABLE "update_reactions" ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "updates" DROP COLUMN "tag",
ADD COLUMN     "category" "UpdateCategory" NOT NULL,
ADD COLUMN     "image_storage_path" TEXT,
ADD COLUMN     "is_featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "published_at" TIMESTAMP(3),
ADD COLUMN     "slug" TEXT;

-- DropTable
DROP TABLE "public"."response_profile_answers";

-- DropTable
DROP TABLE "public"."response_profile_questions";

-- DropTable
DROP TABLE "public"."response_profile_test";

-- CreateTable
CREATE TABLE "conversational_profile_test" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "test_type" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "is_validated" BOOLEAN NOT NULL DEFAULT false,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "scale_min" INTEGER NOT NULL DEFAULT 0,
    "scale_max" INTEGER NOT NULL DEFAULT 5,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "conversational_profile_test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversational_profile_questions" (
    "id" TEXT NOT NULL,
    "test_id" TEXT,
    "question_type" "QuestionType" NOT NULL,
    "question_key" TEXT NOT NULL,
    "question_text" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "subcategory" TEXT,
    "display_order" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_displayed" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "conversational_profile_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversational_profile_answers" (
    "id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "entity_type" "EntityType" NOT NULL,
    "entity_id" TEXT NOT NULL,
    "evaluation_entity_id" TEXT NOT NULL,
    "boolean_value" BOOLEAN,
    "numeric_value" DECIMAL(65,30),
    "text_value" TEXT,
    "list_value" TEXT,
    "notes" TEXT,
    "reviewer_id" TEXT NOT NULL,
    "review_assignment_id" TEXT,
    "is_approved" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "approved_at" TIMESTAMP(3),
    "approved_by" TEXT,

    CONSTRAINT "conversational_profile_answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resource_benchmarks" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "benchmark_type" "BenchmarkType" NOT NULL,
    "format" TEXT,
    "image_url" TEXT,
    "image_storage_path" TEXT,
    "links" JSONB,
    "first_released" DATE,
    "organization" TEXT,
    "language" TEXT DEFAULT 'en',
    "question_count" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "resource_benchmarks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resource_articles" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT,
    "publication_date" DATE,
    "publisher" TEXT,
    "url" TEXT NOT NULL,
    "summary" TEXT,
    "image_url" TEXT,
    "image_storage_path" TEXT,
    "article_type" TEXT,
    "language" TEXT DEFAULT 'en',
    "read_time_minutes" INTEGER,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "published_at" TIMESTAMP(3),
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "resource_articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resource_papers" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "authors" JSONB NOT NULL,
    "publication_date" DATE,
    "publication" TEXT,
    "venue" TEXT,
    "arxiv_id" TEXT,
    "doi" TEXT,
    "url" TEXT,
    "pdf_url" TEXT,
    "abstract" TEXT,
    "image_url" TEXT,
    "image_storage_path" TEXT,
    "citation_count" INTEGER,
    "paper_type" TEXT,
    "is_preprint" BOOLEAN NOT NULL DEFAULT false,
    "is_peer_reviewed" BOOLEAN NOT NULL DEFAULT false,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "citation" JSONB,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "resource_papers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resource_tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "color" TEXT,
    "icon" TEXT,
    "sort_order" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "resource_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resource_benchmark_tag_link" (
    "id" TEXT NOT NULL,
    "benchmark_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,

    CONSTRAINT "resource_benchmark_tag_link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resource_article_tag_link" (
    "id" TEXT NOT NULL,
    "article_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,

    CONSTRAINT "resource_article_tag_link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resource_paper_tag_link" (
    "id" TEXT NOT NULL,
    "paper_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,

    CONSTRAINT "resource_paper_tag_link_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "conversational_profile_test_name_key" ON "conversational_profile_test"("name");

-- CreateIndex
CREATE UNIQUE INDEX "conversational_profile_questions_question_text_question_key_key" ON "conversational_profile_questions"("question_text", "question_key");

-- CreateIndex
CREATE INDEX "conversational_profile_answers_question_id_is_approved_crea_idx" ON "conversational_profile_answers"("question_id", "is_approved", "created_at");

-- CreateIndex
CREATE INDEX "conversational_profile_answers_evaluation_entity_id_idx" ON "conversational_profile_answers"("evaluation_entity_id");

-- CreateIndex
CREATE INDEX "conversational_profile_answers_review_assignment_id_idx" ON "conversational_profile_answers"("review_assignment_id");

-- CreateIndex
CREATE INDEX "conversational_profile_answers_is_approved_created_at_idx" ON "conversational_profile_answers"("is_approved", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "conversational_profile_answers_question_id_evaluation_entit_key" ON "conversational_profile_answers"("question_id", "evaluation_entity_id");

-- CreateIndex
CREATE INDEX "resource_benchmarks_benchmark_type_idx" ON "resource_benchmarks"("benchmark_type");

-- CreateIndex
CREATE INDEX "resource_benchmarks_is_active_idx" ON "resource_benchmarks"("is_active");

-- CreateIndex
CREATE INDEX "resource_benchmarks_is_featured_idx" ON "resource_benchmarks"("is_featured");

-- CreateIndex
CREATE INDEX "resource_benchmarks_first_released_idx" ON "resource_benchmarks"("first_released");

-- CreateIndex
CREATE INDEX "resource_articles_publication_date_idx" ON "resource_articles"("publication_date");

-- CreateIndex
CREATE INDEX "resource_articles_publisher_idx" ON "resource_articles"("publisher");

-- CreateIndex
CREATE INDEX "resource_articles_article_type_idx" ON "resource_articles"("article_type");

-- CreateIndex
CREATE INDEX "resource_articles_is_published_idx" ON "resource_articles"("is_published");

-- CreateIndex
CREATE INDEX "resource_articles_is_featured_idx" ON "resource_articles"("is_featured");

-- CreateIndex
CREATE INDEX "resource_articles_published_at_idx" ON "resource_articles"("published_at");

-- CreateIndex
CREATE INDEX "resource_papers_arxiv_id_idx" ON "resource_papers"("arxiv_id");

-- CreateIndex
CREATE INDEX "resource_papers_doi_idx" ON "resource_papers"("doi");

-- CreateIndex
CREATE INDEX "resource_papers_publication_date_idx" ON "resource_papers"("publication_date");

-- CreateIndex
CREATE INDEX "resource_papers_paper_type_idx" ON "resource_papers"("paper_type");

-- CreateIndex
CREATE INDEX "resource_papers_is_preprint_idx" ON "resource_papers"("is_preprint");

-- CreateIndex
CREATE INDEX "resource_papers_is_peer_reviewed_idx" ON "resource_papers"("is_peer_reviewed");

-- CreateIndex
CREATE INDEX "resource_papers_is_published_idx" ON "resource_papers"("is_published");

-- CreateIndex
CREATE INDEX "resource_papers_is_featured_idx" ON "resource_papers"("is_featured");

-- CreateIndex
CREATE UNIQUE INDEX "resource_tags_name_key" ON "resource_tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "resource_tags_slug_key" ON "resource_tags"("slug");

-- CreateIndex
CREATE INDEX "resource_tags_category_idx" ON "resource_tags"("category");

-- CreateIndex
CREATE INDEX "resource_tags_is_active_idx" ON "resource_tags"("is_active");

-- CreateIndex
CREATE INDEX "resource_tags_sort_order_idx" ON "resource_tags"("sort_order");

-- CreateIndex
CREATE INDEX "resource_benchmark_tag_link_benchmark_id_idx" ON "resource_benchmark_tag_link"("benchmark_id");

-- CreateIndex
CREATE INDEX "resource_benchmark_tag_link_tag_id_idx" ON "resource_benchmark_tag_link"("tag_id");

-- CreateIndex
CREATE UNIQUE INDEX "resource_benchmark_tag_link_benchmark_id_tag_id_key" ON "resource_benchmark_tag_link"("benchmark_id", "tag_id");

-- CreateIndex
CREATE INDEX "resource_article_tag_link_article_id_idx" ON "resource_article_tag_link"("article_id");

-- CreateIndex
CREATE INDEX "resource_article_tag_link_tag_id_idx" ON "resource_article_tag_link"("tag_id");

-- CreateIndex
CREATE UNIQUE INDEX "resource_article_tag_link_article_id_tag_id_key" ON "resource_article_tag_link"("article_id", "tag_id");

-- CreateIndex
CREATE INDEX "resource_paper_tag_link_paper_id_idx" ON "resource_paper_tag_link"("paper_id");

-- CreateIndex
CREATE INDEX "resource_paper_tag_link_tag_id_idx" ON "resource_paper_tag_link"("tag_id");

-- CreateIndex
CREATE UNIQUE INDEX "resource_paper_tag_link_paper_id_tag_id_key" ON "resource_paper_tag_link"("paper_id", "tag_id");

-- CreateIndex
CREATE UNIQUE INDEX "evaluation_entities_entity_type_model_version_id_tool_confi_key" ON "evaluation_entities"("entity_type", "model_version_id", "tool_configuration_id");

-- CreateIndex
CREATE INDEX "suggestions_category_idx" ON "suggestions"("category");

-- CreateIndex
CREATE INDEX "suggestions_status_idx" ON "suggestions"("status");

-- CreateIndex
CREATE INDEX "suggestions_priority_idx" ON "suggestions"("priority");

-- CreateIndex
CREATE INDEX "suggestions_reviewed_at_idx" ON "suggestions"("reviewed_at");

-- CreateIndex
CREATE INDEX "suggestions_implemented_at_idx" ON "suggestions"("implemented_at");

-- CreateIndex
CREATE INDEX "team_members_sort_order_idx" ON "team_members"("sort_order");

-- CreateIndex
CREATE INDEX "team_members_start_date_idx" ON "team_members"("start_date");

-- CreateIndex
CREATE INDEX "team_members_end_date_idx" ON "team_members"("end_date");

-- CreateIndex
CREATE UNIQUE INDEX "updates_slug_key" ON "updates"("slug");

-- CreateIndex
CREATE INDEX "updates_category_idx" ON "updates"("category");

-- CreateIndex
CREATE INDEX "updates_is_featured_idx" ON "updates"("is_featured");

-- CreateIndex
CREATE INDEX "updates_published_at_idx" ON "updates"("published_at");

-- AddForeignKey
ALTER TABLE "suggestions" ADD CONSTRAINT "suggestions_reviewed_by_fkey" FOREIGN KEY ("reviewed_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversational_profile_questions" ADD CONSTRAINT "conversational_profile_questions_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "conversational_profile_test"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversational_profile_questions" ADD CONSTRAINT "conversational_profile_questions_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversational_profile_questions" ADD CONSTRAINT "conversational_profile_questions_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversational_profile_answers" ADD CONSTRAINT "conversational_profile_answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "conversational_profile_questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversational_profile_answers" ADD CONSTRAINT "conversational_profile_answers_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversational_profile_answers" ADD CONSTRAINT "conversational_profile_answers_approved_by_fkey" FOREIGN KEY ("approved_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversational_profile_answers" ADD CONSTRAINT "conversational_profile_answers_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversational_profile_answers" ADD CONSTRAINT "conversational_profile_answers_review_assignment_id_fkey" FOREIGN KEY ("review_assignment_id") REFERENCES "profile_review_assignments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversational_profile_answers" ADD CONSTRAINT "conversational_profile_answers_evaluation_entity_id_fkey" FOREIGN KEY ("evaluation_entity_id") REFERENCES "evaluation_entities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "models" ADD CONSTRAINT "models_model_family_id_fkey" FOREIGN KEY ("model_family_id") REFERENCES "model_families"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource_benchmarks" ADD CONSTRAINT "resource_benchmarks_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource_benchmarks" ADD CONSTRAINT "resource_benchmarks_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource_articles" ADD CONSTRAINT "resource_articles_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource_articles" ADD CONSTRAINT "resource_articles_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource_papers" ADD CONSTRAINT "resource_papers_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource_papers" ADD CONSTRAINT "resource_papers_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource_tags" ADD CONSTRAINT "resource_tags_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource_tags" ADD CONSTRAINT "resource_tags_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource_benchmark_tag_link" ADD CONSTRAINT "resource_benchmark_tag_link_benchmark_id_fkey" FOREIGN KEY ("benchmark_id") REFERENCES "resource_benchmarks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource_benchmark_tag_link" ADD CONSTRAINT "resource_benchmark_tag_link_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "resource_tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource_article_tag_link" ADD CONSTRAINT "resource_article_tag_link_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "resource_articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource_article_tag_link" ADD CONSTRAINT "resource_article_tag_link_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "resource_tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource_paper_tag_link" ADD CONSTRAINT "resource_paper_tag_link_paper_id_fkey" FOREIGN KEY ("paper_id") REFERENCES "resource_papers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource_paper_tag_link" ADD CONSTRAINT "resource_paper_tag_link_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "resource_tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
