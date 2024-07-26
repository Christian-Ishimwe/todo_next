import db from "@/db/drizzle";
import { todo } from "@/db/schema";
import { asc, eq, not } from "drizzle-orm";

export const addTodo = async (id: string, text: string) => {
  await db.insert(todo).values({
    id: id,
    text: text,
  });
};

export const getTodo = async () => {
  const data = await db.select().from(todo).orderBy(asc(todo.id));
  return data;
};

export const editTodo = async (id: string, text: string) => {
  await db.update(todo).set({ text: text }).where(eq(todo.id, id));
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
