import { createContext, ReactNode, useContext } from "react";
import { Todo } from "../models/todos";

const TodoContext = createContext<Todo[] | null>(null);

interface TodoProviderProps {
  todos: Todo[];
  children: ReactNode;
}

export const TodoProvider = ({ todos, children }: TodoProviderProps) => {
  return (
    <TodoContext.Provider value={todos}>
      {children}
    </TodoContext.Provider>
  );
};

export function useTodos(): Todo[] | null {
  return useContext(TodoContext);
}
