import { integer, text, boolean, pgTable } from "drizzle-orm/pg-core";
export const todo = pgTable("todo", {
  id: text("id").primaryKey(),
  text: text("text").notNull(),
  done: boolean("done").default(false).notNull(),
});


export const Users= pgTable("Users", {
  id: text("id").primaryKey(),
  username: text("username").notNull(),
  email: text("email").unique(),
  password: text("password")
})