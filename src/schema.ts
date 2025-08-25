import { isNotNull } from "drizzle-orm";
import { foreignKey, text } from "drizzle-orm/gel-core";
import { pgTable, timestamp, varchar, uuid, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  email: varchar("email", { length: 256 }).unique().notNull(),
  hashed_password: varchar("hashed_password").default("unset").notNull(),
  isChirpyRed: boolean("is_chirpy_red").default(false),
});

export type NewUser = typeof users.$inferInsert;

export const chirps = pgTable("chirps", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  body: varchar("body").notNull(),
  user_id: uuid("user_id").references(() => users.id, {onDelete: 'cascade'}).notNull(),
});

export type NewChirp = typeof chirps.$inferInsert;

export const refresh_tokens = pgTable("refresh_tokens", {
  token: varchar("token").notNull().primaryKey(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
  // body: varchar("body").notNull(),
  user_id: uuid("user_id").references(() => users.id, {onDelete: 'cascade'}).notNull(),
  expiresAt: timestamp("expires_at"),
  revokedAt: timestamp("revoked_at"),
});

export type NewRefreshToken = typeof refresh_tokens.$inferInsert;

// postgres://postgres:J23@localhost:5432/chirpy?sslmode=disable