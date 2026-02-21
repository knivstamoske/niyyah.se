CREATE TYPE "niyyah"."meeting_status" AS ENUM('scheduling', 'scheduled', 'pending_feedback', 'completed', 'cancelled');--> statement-breakpoint
CREATE TABLE "niyyah"."meeting" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"candidate1_id" uuid NOT NULL,
	"candidate2_id" uuid NOT NULL,
	"facilitator_id" text NOT NULL,
	"status" "niyyah"."meeting_status" DEFAULT 'scheduling' NOT NULL,
	"scheduled_at" timestamp,
	"location" text,
	"candidate1_feedback" text,
	"candidate2_feedback" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "niyyah"."meeting" ADD CONSTRAINT "meeting_candidate1_id_profile_id_fk" FOREIGN KEY ("candidate1_id") REFERENCES "candidate"."profile"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "niyyah"."meeting" ADD CONSTRAINT "meeting_candidate2_id_profile_id_fk" FOREIGN KEY ("candidate2_id") REFERENCES "candidate"."profile"("id") ON DELETE cascade ON UPDATE no action;