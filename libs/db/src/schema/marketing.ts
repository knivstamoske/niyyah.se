import { pgSchema, text, timestamp, uuid } from "drizzle-orm/pg-core";

/**
 * Marketing schema used by the marketing website
 */
export const schema = pgSchema("marketing");

/**
 * Gender enum used by the marketing website
 */
export const gender = schema.enum("gender", ["male", "female"]);

/**
 * Waitlist is the table for storing waitlist signups.
 */
export const waitlist = schema.table("waitlist", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  gender: gender("gender"),
  nearestCity: text("nearest_city"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at"),
  deletedAt: timestamp("deleted_at"),
});
