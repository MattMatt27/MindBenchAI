-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "public"."EntityType" AS ENUM ('model_version', 'tool_configuration');

-- CreateEnum
CREATE TYPE "public"."QuestionType" AS ENUM ('boolean', 'number', 'text', 'list');

-- CreateEnum
CREATE TYPE "public"."ReviewStatus" AS ENUM ('not_started', 'in_progress', 'submitted', 'approved', 'rejected');

-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('user', 'researcher');

-- CreateEnum
CREATE TYPE "public"."ExpertiseCategory" AS ENUM ('expert', 'professional', 'trainee', 'student', 'public');

-- CreateTable
CREATE TABLE "public"."models" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "model_family" TEXT NOT NULL,
    "developer" TEXT NOT NULL,
    "base_api_endpoint" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "models_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."model_versions" (
    "id" TEXT NOT NULL,
    "model_id" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "api_model_name" TEXT NOT NULL,
    "release_date" DATE,
    "deprecation_date" DATE,
    "is_latest" BOOLEAN NOT NULL DEFAULT false,
    "is_available" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "model_versions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tools" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "version" TEXT,
    "developer" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "tools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tool_configurations" (
    "id" TEXT NOT NULL,
    "tool_id" TEXT NOT NULL,
    "model_version_id" TEXT NOT NULL,
    "configuration_name" TEXT NOT NULL,
    "configuration_settings" JSONB,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "tool_configurations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "public"."UserRole" NOT NULL DEFAULT 'user',
    "first_name" TEXT,
    "last_name" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "email_verified_at" TIMESTAMP(3),
    "last_login_at" TIMESTAMP(3),
    "failed_login_attempts" INTEGER NOT NULL DEFAULT 0,
    "locked_until" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_expertise_history" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expertise_level" "public"."ExpertiseCategory" NOT NULL,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3),
    "assigned_by" TEXT,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_expertise_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_sessions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "refresh_token_hash" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "ip_address" INET,
    "user_agent" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "user_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."email_verification_tokens" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "used_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "email_verification_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."password_reset_tokens" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "used_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "password_reset_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_permissions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "permission" TEXT NOT NULL,
    "granted_by" TEXT,
    "granted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revoked_at" TIMESTAMP(3),

    CONSTRAINT "user_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."profile_review_assignments" (
    "id" TEXT NOT NULL,
    "reviewer_id" TEXT NOT NULL,
    "entity_type" "public"."EntityType" NOT NULL,
    "entity_id" TEXT NOT NULL,
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assigned_by" TEXT,
    "due_date" TIMESTAMP(3),
    "status" "public"."ReviewStatus" NOT NULL DEFAULT 'not_started',
    "completed_at" TIMESTAMP(3),
    "notes" TEXT,

    CONSTRAINT "profile_review_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tech_profile_questions" (
    "id" TEXT NOT NULL,
    "entity_type" "public"."EntityType" NOT NULL,
    "question_key" TEXT NOT NULL,
    "question_text" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "question_type" "public"."QuestionType" NOT NULL,
    "display_order" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_displayed" BOOLEAN NOT NULL DEFAULT true,
    "is_filterable" BOOLEAN NOT NULL DEFAULT false,
    "filter_type" TEXT,
    "filter_config" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "tech_profile_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tech_profile_answers" (
    "id" TEXT NOT NULL,
    "entity_type" "public"."EntityType" NOT NULL,
    "entity_id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
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

    CONSTRAINT "tech_profile_answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."response_profile_test" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "test_type" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "is_validated" BOOLEAN NOT NULL DEFAULT false,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "response_profile_test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."response_profile_questions" (
    "id" TEXT NOT NULL,
    "test_id" TEXT,
    "question_type" "public"."QuestionType" NOT NULL,
    "question_key" TEXT NOT NULL,
    "question_text" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "display_order" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_displayed" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "response_profile_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."response_profile_answers" (
    "id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "entity_type" "public"."EntityType" NOT NULL,
    "entity_id" TEXT NOT NULL,
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

    CONSTRAINT "response_profile_answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."benchmark_scales" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "scale_type" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "is_validated" BOOLEAN NOT NULL DEFAULT false,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "benchmark_scales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."benchmark_question_submissions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "prompt_value" TEXT NOT NULL,
    "response_1_value" TEXT NOT NULL,
    "response_2_value" TEXT NOT NULL,
    "rating_1" DOUBLE PRECISION NOT NULL,
    "rating_2" DOUBLE PRECISION NOT NULL,
    "instruction_prompt" TEXT,
    "notes" TEXT,
    "metadata" JSONB,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "reviewed_by" TEXT,
    "reviewed_at" TIMESTAMP(3),
    "rejection_reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "benchmark_question_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."benchmark_questions" (
    "id" TEXT NOT NULL,
    "scale_id" TEXT,
    "position" INTEGER,
    "prompt_id" TEXT NOT NULL,
    "prompt_value" TEXT NOT NULL,
    "response_id" TEXT NOT NULL,
    "response_value" TEXT NOT NULL,
    "is_validated" BOOLEAN NOT NULL DEFAULT false,
    "is_user_submitted" BOOLEAN NOT NULL DEFAULT false,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "benchmark_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."benchmark_ratings" (
    "id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "confidence" DOUBLE PRECISION,
    "reasoning" TEXT,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "benchmark_ratings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."benchmark_tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "benchmark_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."benchmark_tag_question_link" (
    "id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,

    CONSTRAINT "benchmark_tag_question_link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."benchmark_experiments" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "scale_id" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "entity_type" "public"."EntityType" NOT NULL,
    "entity_ids" JSONB NOT NULL,
    "config" JSONB NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "task_id" TEXT,
    "estimated_cost" DOUBLE PRECISION,
    "actual_cost" DOUBLE PRECISION,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "started_at" TIMESTAMP(3),
    "completed_at" TIMESTAMP(3),
    "error_message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "benchmark_experiments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."benchmark_prompts" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "prompt_type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "benchmark_prompts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."benchmark_results" (
    "id" TEXT NOT NULL,
    "experiment_id" TEXT,
    "repeat_number" INTEGER,
    "model_version_id" TEXT,
    "tool_configuration_id" TEXT,
    "question_id" TEXT,
    "config" JSONB,
    "temperature" DOUBLE PRECISION,
    "top_p" DOUBLE PRECISION,
    "max_tokens" INTEGER,
    "system_prompt_id" TEXT,
    "message_prompt_id" TEXT,
    "score" INTEGER,
    "reasoning" TEXT,
    "raw_response" TEXT,
    "response_time_ms" INTEGER,
    "token_usage" JSONB,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "error_type" TEXT,
    "error_message" TEXT,
    "api_cost" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "benchmark_results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."updates" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "title" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "note" TEXT,
    "image_url" TEXT,
    "is_published" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "updates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."update_reactions" (
    "id" TEXT NOT NULL,
    "update_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "emoji_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "update_reactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."suggestions" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'open_vote',
    "vote_count" INTEGER NOT NULL DEFAULT 0,
    "is_visible" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "suggestions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."suggestion_votes" (
    "id" TEXT NOT NULL,
    "suggestion_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "vote_value" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "suggestion_votes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."team_members" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "bio" TEXT,
    "avatar_url" TEXT,
    "display_order" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "team_members_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "models_name_key" ON "public"."models"("name");

-- CreateIndex
CREATE INDEX "models_model_family_idx" ON "public"."models"("model_family");

-- CreateIndex
CREATE INDEX "models_developer_idx" ON "public"."models"("developer");

-- CreateIndex
CREATE INDEX "models_name_idx" ON "public"."models"("name");

-- CreateIndex
CREATE INDEX "model_versions_model_id_idx" ON "public"."model_versions"("model_id");

-- CreateIndex
CREATE INDEX "model_versions_version_idx" ON "public"."model_versions"("version");

-- CreateIndex
CREATE INDEX "model_versions_api_model_name_idx" ON "public"."model_versions"("api_model_name");

-- CreateIndex
CREATE INDEX "model_versions_is_latest_idx" ON "public"."model_versions"("is_latest");

-- CreateIndex
CREATE INDEX "model_versions_is_available_idx" ON "public"."model_versions"("is_available");

-- CreateIndex
CREATE UNIQUE INDEX "model_versions_model_id_version_key" ON "public"."model_versions"("model_id", "version");

-- CreateIndex
CREATE UNIQUE INDEX "tools_name_key" ON "public"."tools"("name");

-- CreateIndex
CREATE INDEX "tools_developer_idx" ON "public"."tools"("developer");

-- CreateIndex
CREATE INDEX "tool_configurations_model_version_id_idx" ON "public"."tool_configurations"("model_version_id");

-- CreateIndex
CREATE INDEX "tool_configurations_is_active_idx" ON "public"."tool_configurations"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "tool_configurations_tool_id_model_version_id_key" ON "public"."tool_configurations"("tool_id", "model_version_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "public"."users"("username");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "public"."users"("email");

-- CreateIndex
CREATE INDEX "users_username_idx" ON "public"."users"("username");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "public"."users"("role");

-- CreateIndex
CREATE INDEX "users_is_active_idx" ON "public"."users"("is_active");

-- CreateIndex
CREATE INDEX "user_expertise_history_user_id_effective_from_effective_to_idx" ON "public"."user_expertise_history"("user_id", "effective_from", "effective_to");

-- CreateIndex
CREATE INDEX "user_expertise_history_user_id_idx" ON "public"."user_expertise_history"("user_id");

-- CreateIndex
CREATE INDEX "user_sessions_user_id_idx" ON "public"."user_sessions"("user_id");

-- CreateIndex
CREATE INDEX "user_sessions_expires_at_idx" ON "public"."user_sessions"("expires_at");

-- CreateIndex
CREATE INDEX "user_sessions_is_active_idx" ON "public"."user_sessions"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "email_verification_tokens_token_key" ON "public"."email_verification_tokens"("token");

-- CreateIndex
CREATE INDEX "email_verification_tokens_user_id_idx" ON "public"."email_verification_tokens"("user_id");

-- CreateIndex
CREATE INDEX "email_verification_tokens_token_idx" ON "public"."email_verification_tokens"("token");

-- CreateIndex
CREATE INDEX "email_verification_tokens_expires_at_idx" ON "public"."email_verification_tokens"("expires_at");

-- CreateIndex
CREATE UNIQUE INDEX "password_reset_tokens_token_key" ON "public"."password_reset_tokens"("token");

-- CreateIndex
CREATE INDEX "password_reset_tokens_user_id_idx" ON "public"."password_reset_tokens"("user_id");

-- CreateIndex
CREATE INDEX "password_reset_tokens_token_idx" ON "public"."password_reset_tokens"("token");

-- CreateIndex
CREATE INDEX "password_reset_tokens_expires_at_idx" ON "public"."password_reset_tokens"("expires_at");

-- CreateIndex
CREATE INDEX "user_permissions_user_id_idx" ON "public"."user_permissions"("user_id");

-- CreateIndex
CREATE INDEX "user_permissions_permission_idx" ON "public"."user_permissions"("permission");

-- CreateIndex
CREATE UNIQUE INDEX "user_permissions_user_id_permission_key" ON "public"."user_permissions"("user_id", "permission");

-- CreateIndex
CREATE INDEX "profile_review_assignments_reviewer_id_status_idx" ON "public"."profile_review_assignments"("reviewer_id", "status");

-- CreateIndex
CREATE INDEX "profile_review_assignments_status_idx" ON "public"."profile_review_assignments"("status");

-- CreateIndex
CREATE UNIQUE INDEX "profile_review_assignments_reviewer_id_entity_type_entity_i_key" ON "public"."profile_review_assignments"("reviewer_id", "entity_type", "entity_id");

-- CreateIndex
CREATE INDEX "tech_profile_questions_entity_type_is_active_idx" ON "public"."tech_profile_questions"("entity_type", "is_active");

-- CreateIndex
CREATE INDEX "tech_profile_questions_is_displayed_display_order_idx" ON "public"."tech_profile_questions"("is_displayed", "display_order");

-- CreateIndex
CREATE UNIQUE INDEX "tech_profile_questions_entity_type_question_key_key" ON "public"."tech_profile_questions"("entity_type", "question_key");

-- CreateIndex
CREATE INDEX "tech_profile_answers_entity_id_question_id_is_approved_crea_idx" ON "public"."tech_profile_answers"("entity_id", "question_id", "is_approved", "created_at");

-- CreateIndex
CREATE INDEX "tech_profile_answers_review_assignment_id_idx" ON "public"."tech_profile_answers"("review_assignment_id");

-- CreateIndex
CREATE INDEX "tech_profile_answers_is_approved_created_at_idx" ON "public"."tech_profile_answers"("is_approved", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "response_profile_questions_question_text_question_key_key" ON "public"."response_profile_questions"("question_text", "question_key");

-- CreateIndex
CREATE INDEX "response_profile_answers_question_id_is_approved_created_at_idx" ON "public"."response_profile_answers"("question_id", "is_approved", "created_at");

-- CreateIndex
CREATE INDEX "response_profile_answers_review_assignment_id_idx" ON "public"."response_profile_answers"("review_assignment_id");

-- CreateIndex
CREATE INDEX "response_profile_answers_is_approved_created_at_idx" ON "public"."response_profile_answers"("is_approved", "created_at");

-- CreateIndex
CREATE INDEX "benchmark_question_submissions_user_id_idx" ON "public"."benchmark_question_submissions"("user_id");

-- CreateIndex
CREATE INDEX "benchmark_question_submissions_status_idx" ON "public"."benchmark_question_submissions"("status");

-- CreateIndex
CREATE INDEX "benchmark_question_submissions_created_at_idx" ON "public"."benchmark_question_submissions"("created_at");

-- CreateIndex
CREATE INDEX "benchmark_questions_scale_id_idx" ON "public"."benchmark_questions"("scale_id");

-- CreateIndex
CREATE INDEX "benchmark_ratings_question_id_idx" ON "public"."benchmark_ratings"("question_id");

-- CreateIndex
CREATE INDEX "benchmark_ratings_user_id_idx" ON "public"."benchmark_ratings"("user_id");

-- CreateIndex
CREATE INDEX "benchmark_experiments_user_id_idx" ON "public"."benchmark_experiments"("user_id");

-- CreateIndex
CREATE INDEX "benchmark_experiments_status_idx" ON "public"."benchmark_experiments"("status");

-- CreateIndex
CREATE INDEX "benchmark_results_experiment_id_idx" ON "public"."benchmark_results"("experiment_id");

-- CreateIndex
CREATE INDEX "benchmark_results_model_version_id_idx" ON "public"."benchmark_results"("model_version_id");

-- CreateIndex
CREATE INDEX "benchmark_results_tool_configuration_id_idx" ON "public"."benchmark_results"("tool_configuration_id");

-- CreateIndex
CREATE INDEX "benchmark_results_question_id_idx" ON "public"."benchmark_results"("question_id");

-- CreateIndex
CREATE INDEX "updates_date_idx" ON "public"."updates"("date");

-- CreateIndex
CREATE INDEX "updates_tag_idx" ON "public"."updates"("tag");

-- CreateIndex
CREATE INDEX "updates_is_published_idx" ON "public"."updates"("is_published");

-- CreateIndex
CREATE INDEX "update_reactions_update_id_idx" ON "public"."update_reactions"("update_id");

-- CreateIndex
CREATE INDEX "update_reactions_user_id_idx" ON "public"."update_reactions"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "update_reactions_update_id_user_id_emoji_type_key" ON "public"."update_reactions"("update_id", "user_id", "emoji_type");

-- CreateIndex
CREATE INDEX "suggestions_status_idx" ON "public"."suggestions"("status");

-- CreateIndex
CREATE INDEX "suggestions_vote_count_idx" ON "public"."suggestions"("vote_count");

-- CreateIndex
CREATE INDEX "suggestions_is_visible_idx" ON "public"."suggestions"("is_visible");

-- CreateIndex
CREATE INDEX "suggestions_created_at_idx" ON "public"."suggestions"("created_at");

-- CreateIndex
CREATE INDEX "suggestion_votes_suggestion_id_idx" ON "public"."suggestion_votes"("suggestion_id");

-- CreateIndex
CREATE INDEX "suggestion_votes_user_id_idx" ON "public"."suggestion_votes"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "suggestion_votes_suggestion_id_user_id_key" ON "public"."suggestion_votes"("suggestion_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "team_members_user_id_key" ON "public"."team_members"("user_id");

-- CreateIndex
CREATE INDEX "team_members_is_active_idx" ON "public"."team_members"("is_active");

-- CreateIndex
CREATE INDEX "team_members_display_order_idx" ON "public"."team_members"("display_order");

-- AddForeignKey
ALTER TABLE "public"."models" ADD CONSTRAINT "models_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."models" ADD CONSTRAINT "models_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."model_versions" ADD CONSTRAINT "model_versions_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "public"."models"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."model_versions" ADD CONSTRAINT "model_versions_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."model_versions" ADD CONSTRAINT "model_versions_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tools" ADD CONSTRAINT "tools_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tools" ADD CONSTRAINT "tools_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tool_configurations" ADD CONSTRAINT "tool_configurations_tool_id_fkey" FOREIGN KEY ("tool_id") REFERENCES "public"."tools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tool_configurations" ADD CONSTRAINT "tool_configurations_model_version_id_fkey" FOREIGN KEY ("model_version_id") REFERENCES "public"."model_versions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tool_configurations" ADD CONSTRAINT "tool_configurations_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tool_configurations" ADD CONSTRAINT "tool_configurations_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_expertise_history" ADD CONSTRAINT "user_expertise_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_expertise_history" ADD CONSTRAINT "user_expertise_history_assigned_by_fkey" FOREIGN KEY ("assigned_by") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_sessions" ADD CONSTRAINT "user_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."email_verification_tokens" ADD CONSTRAINT "email_verification_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_permissions" ADD CONSTRAINT "user_permissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_permissions" ADD CONSTRAINT "user_permissions_granted_by_fkey" FOREIGN KEY ("granted_by") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."profile_review_assignments" ADD CONSTRAINT "profile_review_assignments_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."profile_review_assignments" ADD CONSTRAINT "profile_review_assignments_assigned_by_fkey" FOREIGN KEY ("assigned_by") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tech_profile_questions" ADD CONSTRAINT "tech_profile_questions_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tech_profile_questions" ADD CONSTRAINT "tech_profile_questions_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tech_profile_answers" ADD CONSTRAINT "tech_profile_answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "public"."tech_profile_questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tech_profile_answers" ADD CONSTRAINT "tech_profile_answers_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tech_profile_answers" ADD CONSTRAINT "tech_profile_answers_approved_by_fkey" FOREIGN KEY ("approved_by") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tech_profile_answers" ADD CONSTRAINT "tech_profile_answers_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tech_profile_answers" ADD CONSTRAINT "tech_profile_answers_review_assignment_id_fkey" FOREIGN KEY ("review_assignment_id") REFERENCES "public"."profile_review_assignments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tech_profile_answers" ADD CONSTRAINT "tech_profile_answers_model_version_fkey" FOREIGN KEY ("entity_id") REFERENCES "public"."model_versions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tech_profile_answers" ADD CONSTRAINT "tech_profile_answers_tool_configuration_fkey" FOREIGN KEY ("entity_id") REFERENCES "public"."tool_configurations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."response_profile_questions" ADD CONSTRAINT "response_profile_questions_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "public"."response_profile_test"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."response_profile_questions" ADD CONSTRAINT "response_profile_questions_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."response_profile_questions" ADD CONSTRAINT "response_profile_questions_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."response_profile_answers" ADD CONSTRAINT "response_profile_answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "public"."response_profile_questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."response_profile_answers" ADD CONSTRAINT "response_profile_answers_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."response_profile_answers" ADD CONSTRAINT "response_profile_answers_approved_by_fkey" FOREIGN KEY ("approved_by") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."response_profile_answers" ADD CONSTRAINT "response_profile_answers_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."response_profile_answers" ADD CONSTRAINT "response_profile_answers_review_assignment_id_fkey" FOREIGN KEY ("review_assignment_id") REFERENCES "public"."profile_review_assignments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."response_profile_answers" ADD CONSTRAINT "response_profile_answers_model_version_fkey" FOREIGN KEY ("entity_id") REFERENCES "public"."model_versions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."response_profile_answers" ADD CONSTRAINT "response_profile_answers_tool_configuration_fkey" FOREIGN KEY ("entity_id") REFERENCES "public"."tool_configurations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."benchmark_scales" ADD CONSTRAINT "benchmark_scales_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."benchmark_scales" ADD CONSTRAINT "benchmark_scales_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."benchmark_question_submissions" ADD CONSTRAINT "benchmark_question_submissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."benchmark_question_submissions" ADD CONSTRAINT "benchmark_question_submissions_reviewed_by_fkey" FOREIGN KEY ("reviewed_by") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."benchmark_questions" ADD CONSTRAINT "benchmark_questions_scale_id_fkey" FOREIGN KEY ("scale_id") REFERENCES "public"."benchmark_scales"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."benchmark_questions" ADD CONSTRAINT "benchmark_questions_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."benchmark_questions" ADD CONSTRAINT "benchmark_questions_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."benchmark_ratings" ADD CONSTRAINT "benchmark_ratings_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "public"."benchmark_questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."benchmark_ratings" ADD CONSTRAINT "benchmark_ratings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."benchmark_tags" ADD CONSTRAINT "benchmark_tags_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."benchmark_tags" ADD CONSTRAINT "benchmark_tags_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."benchmark_tag_question_link" ADD CONSTRAINT "benchmark_tag_question_link_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "public"."benchmark_questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."benchmark_tag_question_link" ADD CONSTRAINT "benchmark_tag_question_link_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "public"."benchmark_tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."benchmark_experiments" ADD CONSTRAINT "benchmark_experiments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."benchmark_experiments" ADD CONSTRAINT "benchmark_experiments_scale_id_fkey" FOREIGN KEY ("scale_id") REFERENCES "public"."benchmark_scales"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."benchmark_experiments" ADD CONSTRAINT "benchmark_experiments_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."benchmark_prompts" ADD CONSTRAINT "benchmark_prompts_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."benchmark_prompts" ADD CONSTRAINT "benchmark_prompts_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."benchmark_results" ADD CONSTRAINT "benchmark_results_experiment_id_fkey" FOREIGN KEY ("experiment_id") REFERENCES "public"."benchmark_experiments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."benchmark_results" ADD CONSTRAINT "benchmark_results_model_version_id_fkey" FOREIGN KEY ("model_version_id") REFERENCES "public"."model_versions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."benchmark_results" ADD CONSTRAINT "benchmark_results_tool_configuration_id_fkey" FOREIGN KEY ("tool_configuration_id") REFERENCES "public"."tool_configurations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."benchmark_results" ADD CONSTRAINT "benchmark_results_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "public"."benchmark_questions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."benchmark_results" ADD CONSTRAINT "benchmark_results_system_prompt_id_fkey" FOREIGN KEY ("system_prompt_id") REFERENCES "public"."benchmark_prompts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."benchmark_results" ADD CONSTRAINT "benchmark_results_message_prompt_id_fkey" FOREIGN KEY ("message_prompt_id") REFERENCES "public"."benchmark_prompts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."updates" ADD CONSTRAINT "updates_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."updates" ADD CONSTRAINT "updates_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."update_reactions" ADD CONSTRAINT "update_reactions_update_id_fkey" FOREIGN KEY ("update_id") REFERENCES "public"."updates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."update_reactions" ADD CONSTRAINT "update_reactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."suggestions" ADD CONSTRAINT "suggestions_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."suggestions" ADD CONSTRAINT "suggestions_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."suggestion_votes" ADD CONSTRAINT "suggestion_votes_suggestion_id_fkey" FOREIGN KEY ("suggestion_id") REFERENCES "public"."suggestions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."suggestion_votes" ADD CONSTRAINT "suggestion_votes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."team_members" ADD CONSTRAINT "team_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."team_members" ADD CONSTRAINT "team_members_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."team_members" ADD CONSTRAINT "team_members_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

