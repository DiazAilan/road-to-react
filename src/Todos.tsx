import { ChangeEvent, FormEvent } from "react";
import { Todo } from "./models/todos";
import { Button } from "./Button";

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

interface TodosListProps {
  todos: Todo[];
  task: string;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleChangeInput: (event: ChangeEvent<HTMLInputElement>) => void;
  toggleComplete: (id: string) => void;
  onShowAllTodos: () => void;
  onShowCompleteTodos: () => void;
  onShowIncompleteTodos: () => void;
}

const TodosList = ({
  todos = [],
  task,
  handleSubmit,
  handleChangeInput,
  toggleComplete,
  onShowAllTodos,
  onShowCompleteTodos,
  onShowIncompleteTodos
}: TodosListProps) => {

  function submitWithoutEventDefault(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    handleSubmit(event);
  }

  return (
    <div>

      <div>
        <Button onClick={onShowAllTodos}>
          Show All
        </Button>
        <Button onClick={onShowCompleteTodos}>
          Show Complete
        </Button>
        <Button onClick={onShowIncompleteTodos}>
          Show Incomplete
        </Button>
      </div>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <label>
              <input
                  type="checkbox"
                  checked={todo.complete}
                  onChange={() => toggleComplete(todo.id)}
              />
              {todo.task}
            </label>
          </li>
        ))}
      </ul>

      <form onSubmit={submitWithoutEventDefault}>
        <input
          type="text"
          value={task}
          onChange={handleChangeInput}
        />
        <Button type="submit" disabled={!task}>Add Todo</Button>
      </form>
    </div>
  );
}

export default TodosList;