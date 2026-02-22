CREATE TYPE "niyyah"."proposal_status" AS ENUM('pending', 'accepted', 'declined', 'withdrawn');--> statement-breakpoint
CREATE TABLE "niyyah"."proposal" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"candidate1_id" uuid NOT NULL,
	"candidate2_id" uuid NOT NULL,
	"facilitator_id" text NOT NULL,
	"status" "niyyah"."proposal_status" DEFAULT 'pending' NOT NULL,
	"candidate1_response" text,
	"candidate2_response" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "niyyah"."meeting" DROP CONSTRAINT "meeting_candidate1_id_profile_id_fk";
--> statement-breakpoint
ALTER TABLE "niyyah"."meeting" DROP CONSTRAINT "meeting_candidate2_id_profile_id_fk";
--> statement-breakpoint
ALTER TABLE "niyyah"."meeting" DROP CONSTRAINT "meeting_facilitator_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "niyyah"."meeting" ADD COLUMN "proposal_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "niyyah"."proposal" ADD CONSTRAINT "proposal_candidate1_id_profile_id_fk" FOREIGN KEY ("candidate1_id") REFERENCES "candidate"."profile"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "niyyah"."proposal" ADD CONSTRAINT "proposal_candidate2_id_profile_id_fk" FOREIGN KEY ("candidate2_id") REFERENCES "candidate"."profile"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "niyyah"."proposal" ADD CONSTRAINT "proposal_facilitator_id_user_id_fk" FOREIGN KEY ("facilitator_id") REFERENCES "facilitator"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "niyyah"."meeting" ADD CONSTRAINT "meeting_proposal_id_proposal_id_fk" FOREIGN KEY ("proposal_id") REFERENCES "niyyah"."proposal"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "niyyah"."meeting" DROP COLUMN "candidate1_id";--> statement-breakpoint
ALTER TABLE "niyyah"."meeting" DROP COLUMN "candidate2_id";--> statement-breakpoint
ALTER TABLE "niyyah"."meeting" DROP COLUMN "facilitator_id";