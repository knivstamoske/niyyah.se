import {
  boolean,
  integer,
  pgSchema,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

/**
 * Candidate schema used by the candidate website
 */
export const schema = pgSchema("candidate");

/**
 * Better-Auth tables for the candidate schema
 * These tables are used by Better-Auth for authentication and session management
 */

export const user = schema.table("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const session = schema.table("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = schema.table("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const verification = schema.table("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

/**
 * Gender enum for candidate profiles
 */
export const gender = schema.enum("gender", [
  "male",
  "female",
]);

/**
 * Marital status enum for candidate profiles
 */
export const maritalStatus = schema.enum("marital_status", [
  "single",
  "divorced",
  "widowed",
]);

/**
 * Candidate status enum tracking user journey stages
 */
export const candidateStatus = schema.enum("candidate_status", [
  "onboarding",
  "verifying",
  "active",
  "paused",
  "matching",
  "matched",
  "archived",
  "banned",
]);

/**
 * Candidate profile table storing personal information and preferences
 */
export const profile = schema.table("profile", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  birthYear: integer("birth_year").notNull(),
  kommun: text("kommun").notNull(),
  gender: gender("gender").notNull(),
  maritalStatus: maritalStatus("marital_status").notNull(),
  languages: text("languages").notNull(),
  phone: text("phone"),
  nationality: text("nationality").notNull(),
  bio: text("bio").notNull(),
  seeking: text("seeking").notNull(),
  status: candidateStatus("status").notNull().default("onboarding"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

/**
 * Message table for candidate notifications and communications
 * Candidates cannot delete messages
 */
export const message = schema.table("message", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  fromId: text("from_id"), // Facilitator user ID, null means system-generated
  parentId: uuid("parent_id").references((): any => message.id, {
    onDelete: "set null",
  }),
  title: text("title").notNull(),
  body: text("body").notNull(),
  readAt: timestamp("read_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
