import { jsonb, pgSchema, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { profile } from "./candidate";
import { user as facilitatorUser } from "./facilitator";

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

/**
 * Meeting status enum based on PDR 005
 */
export const meetingStatus = schema.enum("meeting_status", [
  "scheduling",
  "scheduled",
  "pending_feedback",
  "completed",
  "cancelled",
]);

/**
 * Meeting table for tracking physical meetings between candidates
 * Facilitator sets it up, candidates must give feedback on completion
 */
export const meeting = schema.table("meeting", {
  id: uuid("id").primaryKey().defaultRandom(),

  // Candidates involved in the meeting
  candidate1Id: uuid("candidate1_id")
    .notNull()
    .references((): any => profile.id, { onDelete: "cascade" }),
  candidate2Id: uuid("candidate2_id")
    .notNull()
    .references((): any => profile.id, { onDelete: "cascade" }),

  // The facilitator that is managing this meeting
  facilitatorId: text("facilitator_id")
    .notNull()
    .references((): any => facilitatorUser.id, { onDelete: "cascade" }),

  status: meetingStatus("status").notNull().default("scheduling"),

  // Scheduled meeting details
  scheduledAt: timestamp("scheduled_at"),
  location: text("location"),

  // Feedback points
  candidate1Feedback: text("candidate1_feedback"),
  candidate2Feedback: text("candidate2_feedback"),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
