"use client";
import { TextArea } from "@radix-ui/themes";
import { ChangeEvent, FC, useState } from "react";

interface Props {
  createTodo: (value: string) => void;
}

const AddTodo: FC<Props> = ({ createTodo }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading]= useState(false)
  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleAdd = async () => {
    createTodo(input);  
    setInput("");
  };

  return (
    <div className="w-full flex gap-2 mt-4">
      <TextArea
        className="w-full px-3 py-2 border-none rounded outline-none bg-slate-800 text-white shadow-sm shadow-slate-400 font-medium"
        placeholder="Enter new task"
        onChange={handleInput}
        value={input}
      />
      <button
        className="flex items-center justify-center bg-gray-200 ml-4 rounded px-4 h-10 py-1 w-50"
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  );
};

export default AddTodo;
