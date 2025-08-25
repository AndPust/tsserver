import { db } from "../index.js";
import { NewUser, users } from "../../schema.js";
import { eq } from "drizzle-orm";
import { handlerUpdateUser } from "src/handlers/updateUser.js";
import { resourceLimits } from "worker_threads";

export async function createUser(user: NewUser) {
  const [result] = await db
    .insert(users)
    .values(user)
    .onConflictDoNothing()
    .returning();
  return result;
}

export async function getUser(email: string) {
  const [result] = await db
    .select()
    .from(users)
    .where(eq(users.email, email));
  return result;
}

export async function getUserByID(id: string) {
  const [result] = await db
    .select()
    .from(users)
    .where(eq(users.id, id));
  return result;
}

export async function updateUser(user_id: string, user: NewUser) {
  let result;
  [result] = await db
    .update(users)
    .set({...user})
    .where(eq(users.id, user_id));
  return result;
}

export async function makeUserRed(user: NewUser) {
  let result;
  [result] = await db
    .update(users)
    .set({...user, isChirpyRed: true})
    .where(eq(users.id, user.id as string));
  return result;
}