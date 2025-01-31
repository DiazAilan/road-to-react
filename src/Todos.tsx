import { ChangeEvent, FormEvent } from "react";
import { Todo } from "./models/todos";
import { Button } from "./Button";

interface TodosListProps {
  todos: Todo[];
  task: string;
  handleSubmit: (task: string) => void;
  handleChangeInput: (event: ChangeEvent<HTMLInputElement>) => void;
  toggleComplete: (todo: Todo) => void;
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
    handleSubmit(task);
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
                  onChange={() => toggleComplete(todo)}
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