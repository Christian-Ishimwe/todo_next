import { getTodo } from "@/actions/todoActions";
import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";
import Todos from "./components/Todos";
export default async function Home() {
  const data = await getTodo();
  return <Todos todos={data} />;
}
