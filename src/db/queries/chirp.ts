import { db } from "../index.js";
import { NewUser, users, NewChirp, chirps } from "../../schema.js";
import { eq, lt, gte, ne } from 'drizzle-orm';

export async function addChirp(chirp: NewChirp) {
  const [result] = await db
    .insert(chirps)
    .values(chirp)
    // .onConflictDoNothing()
    .returning();
  return result;
}

export async function deleteChirp(chirp: NewChirp) {
  const [result] = await db
    .delete(chirps)
    .where(eq(chirps.id, chirp.id as string))
    .returning();
  return result;
}