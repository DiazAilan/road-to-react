import { Todo } from "./models/todos";

export const todoFilterReducer = (_, action: {type: string}) => {
  switch (action.type) {
    case 'SHOW_ALL':
      return 'ALL';
    case 'SHOW_COMPLETE':
      return 'COMPLETE';
    case 'SHOW_INCOMPLETE':
      return 'INCOMPLETE';
    default:
      throw new Error();
  }
};

type DoTodoAction = {
  type: 'DO_TODO';
  id: string;
};

type UndoTodoAction = {
  type: 'UNDO_TODO';
  id: string;
};

type AddTodoAction = {
  type: 'ADD_TODO';
  task: string;
  id: string;
};

type TodoActionType = DoTodoAction | UndoTodoAction | AddTodoAction;

export const todoReducer = (state: Todo[], action: TodoActionType) => {
  switch (action.type) {
    case 'DO_TODO':
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: true };
        } else {
          return todo;
        }
      });
    case 'UNDO_TODO':
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: false };
        } else {
          return todo;
        }
      });
    case 'ADD_TODO':
      return state.concat({
        task: action.task,
        id: action.id,
        complete: false,
      });
    default:
      throw new Error();
  }
};