import { createContext, Dispatch, ReactNode } from "react";
import { TodoActionType } from "../todoReducers";

export const TodoContext = createContext<Dispatch<TodoActionType> | null>(null);

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