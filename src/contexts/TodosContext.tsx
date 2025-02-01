import { createContext, Dispatch, ReactNode, useContext } from "react";
import { TodoActionType } from "../todoReducers";

const TodoContext = createContext<Dispatch<TodoActionType> | null>(null);

interface TodoProviderProps {
  dispatchTodos: Dispatch<TodoActionType>;
  children: ReactNode;
}

export const TodoProvider = ({ dispatchTodos, children }: TodoProviderProps) => {
  return (
    <TodoContext.Provider value={dispatchTodos}>
      {children}
    </TodoContext.Provider>
  );
};

export function useTodos(): Dispatch<TodoActionType> | null {
  return useContext(TodoContext);
}