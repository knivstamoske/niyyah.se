import { jsonb, pgSchema, text, timestamp, uuid } from "drizzle-orm/pg-core";

/**
 * Niyyah schema used by the niyyah website
 */
export const schema = pgSchema("niyyah");

/**
 * Guardian table storing guardian information for candidates
 * Linked to candidate profiles in the candidate schema
 */
export const guardian = schema.table("guardian", {
  id: uuid("id").primaryKey().defaultRandom(),
  candidateProfileId: uuid("candidate_profile_id").notNull(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

/**
 * User event type enum for tracking lifecycle events
 */
export const userEventType = schema.enum("user_event_type", [
  "register",
  "onboard",
  "verify",
  "match",
  "meet",
  "blacklist",
  "pause",
  "resume",
  "archive",
  "ban",
]);

/**
 * User event table for logging user lifecycle events
 */
export const userEvent = schema.table("user_event", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull(),
  type: userEventType("type").notNull(),
  payload: jsonb("payload"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
