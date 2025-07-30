import { db } from "../index.js";
import { NewUser, users, NewChirp, chirps } from "../../schema.js";

export async function addChirp(chirp: NewChirp) {
  const [result] = await db
    .insert(chirps)
    .values(chirp)
    // .onConflictDoNothing()
    .returning();
  return result;
}