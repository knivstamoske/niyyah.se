CREATE TYPE "marketing"."gender" AS ENUM('male', 'female');
--> statement-breakpoint
CREATE TABLE "marketing"."waitlist" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"gender" "marketing"."gender",
	"nearest_city" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	CONSTRAINT "waitlist_email_unique" UNIQUE("email")
);
