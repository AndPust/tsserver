import { db } from "../index.js";
import { NewUser, users, NewChirp, chirps, NewRefreshToken, refresh_tokens } from "../../schema.js";
import { eq, lt, gte, ne } from 'drizzle-orm';

export async function addRefreshToken (token: NewRefreshToken) {
  const [result] = await db
    .insert(refresh_tokens)
    .values(token)
    // .onConflictDoNothing()
    .returning();
  return result;
}

export async function getRefreshToken (token: string) {
  var result;
  [result] = await db
      .select()
      .from(refresh_tokens)
      .orderBy(refresh_tokens.createdAt)
      .where(eq(refresh_tokens.token, token));

  return result;
}

export async function getUserFromRefreshToken (token: NewRefreshToken) {
  var result;
  [result] = await db
    .select()
    .from(users)
    .orderBy(users.updatedAt)
    .where(eq(users.id, token.user_id));
  
    return result;
}

export async function revokeToken (token: NewRefreshToken) {
  var result;
  let now = new Date();
  [result] = await db
      .update(refresh_tokens)
      .set(
        {updatedAt: now,
         revokedAt: now})
      .where(eq(refresh_tokens.token, token.token));
}