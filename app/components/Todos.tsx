"use client";
import { FC, useState } from "react";
import { todoType } from "@/types/todoType";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from 'uuid';
import {
  addTodo,
  deleteTodo,
  editTodo,
  toggleTodo,
} from "@/actions/todoActions";
import { title } from "process";

interface Props {
  todos: todoType[];
}

const Todos: FC<Props> = ({ todos }) => {
  const {toast}= useToast()
  const [todoItems, setTodoItems] = useState<todoType[]>(todos);
  const createTodo =async (text: string) => {
    const id = uuidv4();
    await addTodo(id, text);
    toast({
          title: "Success",
          description: "Task added successful",
        })
    setTodoItems((prev) => [...prev, { id: id, text, done: false }]);
  };

  const changeTodoText =async (id: string, text: string) => {
    try{
      setTodoItems((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text } : todo)),
    );
    await editTodo(id, text);
    toast({
      title: "success",
      description: "Task updated"
    })
    }catch(err:any){
      toast({
        variant: "destructive",
        title: "error",
        description: err.message
      })
    }
    
    
  };

  const toggleIsTodoDone = (id: string) => {
    setTodoItems((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
    toggleTodo(id);
  };

  const deleteTodoItem =async (id: string) => {
    setTodoItems((prev) => prev.filter((todo) => todo.id !== id));
    try{
      await deleteTodo(id);
      toast({
        title: "success",
        description: "Task deleted Successul"
      })
    }catch(err:any){
      toast({
        variant: "destructive",
        title: "error",
        description: err.message
      })
    }
  };

  return (
    <main className="flex   w-100 min-h-screen flex-col items-center p-16 bg-slate-900">
      <div className="text-5xl font-medium text-white mb-0.5">Christian To-do app</div>
        <AddTodo createTodo={createTodo} />
      <div className="w-full flex flex-col mt-8 gap-2">
        {todoItems.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            changeTodoText={changeTodoText}
            toggleIsTodoDone={toggleIsTodoDone}
            deleteTodoItem={deleteTodoItem}
          />
        ))}
      </div>

    </main>
  );
};

export default Todos;
