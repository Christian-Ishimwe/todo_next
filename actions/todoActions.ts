import db from "@/db/drizzle";
import { todo, Users } from "@/db/schema";
import { asc, eq, not, or } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt"
export const addTodo = async (id: string, text: string) => {
  await db.insert(todo).values({
    id: id,
    text: text,
  });
};

export const getTodo = async () => {
  const data = await db.select().from(todo);
  revalidatePath("/")
  return data;
};

export const editTodo = async (id: string, text: string) => {
  await db.update(todo).set({ text: text }).where(eq(todo.id, id))
};

export const toggleTodo = async (id: string) => {
  await db
    .update(todo)
    .set({ done: not(todo.done) })
    .where(eq(todo.id, id));
};

export const deleteTodo = async (id: string) => {
  await db.delete(todo).where(eq(todo.id, id));
};


export const registerUser= async (id: string,username:string, email:string, password:string)=>{
  await db.insert(Users).values({
    id: id,
    username: username,
    email: email,
    password: password
  })
}


export const loginUser = async (username: string, password: string) => {
  const user = await db
    .select()
    .from(Users)
    .where(or(eq(Users.username, username), eq(Users.email, username)))
    .limit(1);

  if (!user[0]) {
    throw new Error("User not found");
  }
  const isPasswordValid = password == user[0].password
  if (!isPasswordValid) {
    throw new Error("Invalid password or username");
  }
  return user[0];
};

