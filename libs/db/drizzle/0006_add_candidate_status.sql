CREATE TYPE "candidate"."candidate_status" AS ENUM('onboarding', 'verifying', 'active', 'paused', 'matched', 'archived', 'banned');--> statement-breakpoint
CREATE TYPE "niyyah"."user_event_type" AS ENUM('register', 'onboard', 'verify', 'match', 'meet', 'blacklist', 'pause', 'resume', 'archive', 'ban');--> statement-breakpoint
CREATE TABLE "candidate"."message" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"from_id" text,
	"parent_id" uuid,
	"title" text NOT NULL,
	"body" text NOT NULL,
	"read_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "niyyah"."guardian" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"candidate_profile_id" uuid NOT NULL,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"email" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "niyyah"."user_event" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"type" "niyyah"."user_event_type" NOT NULL,
	"payload" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "candidate"."profile" ADD COLUMN "status" "candidate"."candidate_status" DEFAULT 'onboarding' NOT NULL;--> statement-breakpoint
ALTER TABLE "candidate"."message" ADD CONSTRAINT "message_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "candidate"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "candidate"."message" ADD CONSTRAINT "message_parent_id_message_id_fk" FOREIGN KEY ("parent_id") REFERENCES "candidate"."message"("id") ON DELETE set null ON UPDATE no action;