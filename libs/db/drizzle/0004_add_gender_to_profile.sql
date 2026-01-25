ALTER TABLE "candidate"."profile" ALTER COLUMN "marital_status" SET DATA TYPE text;
--> statement-breakpoint
DROP TYPE "candidate"."marital_status";
--> statement-breakpoint
CREATE TYPE "candidate"."marital_status" AS ENUM('single', 'divorced', 'widowed');
--> statement-breakpoint
ALTER TABLE "candidate"."profile" ALTER COLUMN "marital_status" SET DATA TYPE "candidate"."marital_status" USING "marital_status"::"candidate"."marital_status";
--> statement-breakpoint
CREATE TYPE "candidate"."gender" AS ENUM('male', 'female');
--> statement-breakpoint
ALTER TABLE "candidate"."profile" ADD COLUMN "gender" "candidate"."gender" NOT NULL;
