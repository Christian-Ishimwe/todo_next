import { getTodo } from "@/actions/todoActions";
import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";
import Todos from "./components/Todos";
export default async function Home() {
  const data = await getTodo();
  console.log(data)
  return (
  <div className="bg-black flex">
  <div className="bg-slate-200 h-100 w-1/2 flex-1">
    text
  </div>
  <div className="w-1/2 flex-1">
    <Todos todos={data} />
  </div>
</div>

  );
}
