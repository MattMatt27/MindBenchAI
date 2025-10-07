/*
  Warnings:

  - You are about to drop the column `boolean_value` on the `tech_profile_answers` table. All the data in the column will be lost.
  - You are about to drop the column `list_value` on the `tech_profile_answers` table. All the data in the column will be lost.
  - You are about to drop the column `numeric_value` on the `tech_profile_answers` table. All the data in the column will be lost.
  - You are about to drop the column `text_value` on the `tech_profile_answers` table. All the data in the column will be lost.
  - Added the required column `answer` to the `tech_profile_answers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."tech_profile_answers" DROP CONSTRAINT "tech_profile_answers_reviewer_id_fkey";

-- AlterTable
ALTER TABLE "tech_profile_answers" DROP COLUMN "boolean_value",
DROP COLUMN "list_value",
DROP COLUMN "numeric_value",
DROP COLUMN "text_value",
ADD COLUMN     "answer" JSONB NOT NULL,
ALTER COLUMN "reviewer_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "tech_profile_answers" ADD CONSTRAINT "tech_profile_answers_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
