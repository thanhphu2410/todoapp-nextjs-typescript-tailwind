import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface Todo {
  id: string;
  title: string;
  status: boolean;
}

export default function Home() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const createTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const newTodo: Todo = { id: uuidv4(), title, status: false };
      setTodos([...todos, newTodo]);
      setTitle("");
    }
  };
  const changeStatus = (id: string) => {
    setTodos(
      todos.map((todo: Todo) => {
        if (id === todo.id) {
          return { ...todo, status: !todo.status };
        }
        return { ...todo };
      })
    );
  };
  const removeTodo = (id: string) => {
    setTodos(
      todos.filter((todo: Todo) => {
        return todo.id !== id;
      })
    );
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div
        className={`relative ${
          todos.length > 0
            ? "after:w-[98%] after:absolute after:bg-white after:border-x-[1px] after:border-b-[1px] after:border-[#b1b1b1] after:bottom-[-5px] after:z-[-1] after:h-2 after:left-[50%]  after:translate-x-[-50%] before:w-[96%] before:absolute before:bg-white before:border-x-[1px] before:border-b-[1px] before:border-[#b1b1b1] before:bottom-[-10px] before:z-[-2] before:h-2 before:left-[50%] before:translate-x-[-50%]"
            : ""
        }`}
      >
        <h1 className="text-center text-5xl font-light text-[#af0000]">
          todos
        </h1>
        <div className="w-[500px] mt-5 bg-white">
          <div className="p-3 border-[1px] border-[#af0000]">
            <input
              type="text"
              placeholder="Nhập gì đó..."
              className="outline-0 w-full placeholder-italic"
              value={title}
              onKeyDown={createTodo}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            {todos.length > 0 &&
              todos.map((todo: Todo) => (
                <div
                  key={todo.id}
                  className="flex items-center justify-between py-3 px-2 border-x-[1px] border-b-[1px] border-[#b1b1b1]"
                >
                  <div className="flex items-center">
                    <div
                      className={`border-[1px] border-[#b1b1b1] w-6 h-6 rounded-[50%] mr-4 ${
                        todo.status ? "bg-[#2eb925] border-[#2eb925]" : ""
                      }`}
                      onClick={() => changeStatus(todo.id)}
                    ></div>
                    <span
                      className={`text-xl font-light ${
                        todo.status ? "line-through" : ""
                      }`}
                    >
                      {todo.title}
                    </span>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 hover:cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    onClick={() => removeTodo(todo.id)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
