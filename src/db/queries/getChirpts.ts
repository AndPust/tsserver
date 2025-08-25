import { db } from "../index.js";
import { NewUser, users, NewChirp, chirps } from "../../schema.js";
import { eq, lt, gte, ne, desc, asc } from 'drizzle-orm';


export async function getChirps(sort: boolean = true, id?: string) {
  let sortment = sort ? asc : desc;
  var result;
  if (typeof id === "undefined"){
    result = await db
      .select()
      .from(chirps)
      .orderBy(sortment(chirps.createdAt));
  } else {
    [result] = await db
      .select()
      .from(chirps)
      .orderBy(sortment(chirps.createdAt))
      .where(eq(chirps.id, id));
  }
  return result;
}

export async function getChirpsAuthor(id: string, sort: boolean = true) {
  let sortment = sort ? asc : desc;
  console.log(sort)
  console.log(typeof sortment)
  console.log(sortment)
  
  var result;
  if (typeof id === "undefined"){
    result = await db
      .select()
      .from(chirps)
      .orderBy(sortment(chirps.createdAt));
  } else {
    result = await db
      .select()
      .from(chirps)
      .orderBy(sortment(chirps.createdAt))
      .where(eq(chirps.user_id, id));
  }
  return result;
}