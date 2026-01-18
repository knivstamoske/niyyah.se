CREATE TYPE "candidate"."marital_status" AS ENUM('single', 'married', 'divorced', 'widowed');--> statement-breakpoint
CREATE TABLE "candidate"."profile" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"birth_year" integer NOT NULL,
	"kommun" text NOT NULL,
	"marital_status" "candidate"."marital_status" NOT NULL,
	"open_to_widowed" boolean DEFAULT false NOT NULL,
	"open_to_older" boolean DEFAULT true NOT NULL,
	"open_to_younger" boolean DEFAULT true NOT NULL,
	"open_to_same_age" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "profile_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "candidate"."profile" ADD CONSTRAINT "profile_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "candidate"."user"("id") ON DELETE cascade ON UPDATE no action;