-- Create the waitlist table in the marketing schema
CREATE TABLE "marketing"."waitlist" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"gender" text CHECK ("gender" IN ('male', 'female')),
	"nearest_city" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	CONSTRAINT "waitlist_email_unique" UNIQUE("email")
);
