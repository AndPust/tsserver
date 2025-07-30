import { db } from "../index.js";
import { NewUser, users, NewChirp, chirps } from "../../schema.js";
import { eq, lt, gte, ne } from 'drizzle-orm';

export async function getChirps(id?: string) {
  var result;
  if (typeof id === "undefined"){
    result = await db
      .select()
      .from(chirps)
      .orderBy(chirps.createdAt);
  } else {
    [result] = await db
      .select()
      .from(chirps)
      .orderBy(chirps.createdAt)
      .where(eq(chirps.id, id));
  }
  return result;
}