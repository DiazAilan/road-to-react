import { ChangeEvent, FormEvent } from "react";
import { Todo } from "./models/todos";
import { Button } from "./Button";

interface TodosListProps {
  todos: Todo[];
  task: string;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleChangeInput: (event: ChangeEvent<HTMLInputElement>) => void;
  toggleComplete: (id: string) => void;
}

const TodosList = ({ todos = [], task, handleSubmit, handleChangeInput, toggleComplete }: TodosListProps) => {

  function submitWithoutEventDefault(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    handleSubmit(event);
  }

  return (
    <div>
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