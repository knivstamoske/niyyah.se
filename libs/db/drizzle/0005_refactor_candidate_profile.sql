-- Add new columns with default values to handle existing data
ALTER TABLE "candidate"."profile" ADD COLUMN "full_name" text NOT NULL DEFAULT '';-->statement-breakpoint
ALTER TABLE "candidate"."profile" ADD COLUMN "fluent_languages" text NOT NULL DEFAULT '';-->statement-breakpoint
ALTER TABLE "candidate"."profile" ADD COLUMN "mobile_number" text;-->statement-breakpoint
ALTER TABLE "candidate"."profile" ADD COLUMN "nationality" text NOT NULL DEFAULT '';-->statement-breakpoint
ALTER TABLE "candidate"."profile" ADD COLUMN "self_description" text NOT NULL DEFAULT '';-->statement-breakpoint
ALTER TABLE "candidate"."profile" ADD COLUMN "partner_expectations" text NOT NULL DEFAULT '';-->statement-breakpoint

-- Remove defaults so future inserts must provide values
ALTER TABLE "candidate"."profile" ALTER COLUMN "full_name" DROP DEFAULT;-->statement-breakpoint
ALTER TABLE "candidate"."profile" ALTER COLUMN "fluent_languages" DROP DEFAULT;-->statement-breakpoint
ALTER TABLE "candidate"."profile" ALTER COLUMN "nationality" DROP DEFAULT;-->statement-breakpoint
ALTER TABLE "candidate"."profile" ALTER COLUMN "self_description" DROP DEFAULT;-->statement-breakpoint
ALTER TABLE "candidate"."profile" ALTER COLUMN "partner_expectations" DROP DEFAULT;-->statement-breakpoint

-- Drop old boolean preference columns
ALTER TABLE "candidate"."profile" DROP COLUMN "open_to_widowed";-->statement-breakpoint
ALTER TABLE "candidate"."profile" DROP COLUMN "open_to_older";-->statement-breakpoint
ALTER TABLE "candidate"."profile" DROP COLUMN "open_to_younger";-->statement-breakpoint
ALTER TABLE "candidate"."profile" DROP COLUMN "open_to_same_age";
