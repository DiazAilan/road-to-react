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
  task = '',
  handleSubmit,
  handleChangeInput,
  toggleComplete,
  onShowAllTodos,
  onShowCompleteTodos,
  onShowIncompleteTodos
}: TodosListProps) => {

  return (
    <div>

      <TodosFilters
        onShowAllTodos={onShowAllTodos}
        onShowCompleteTodos={onShowCompleteTodos}
        onShowIncompleteTodos={onShowIncompleteTodos}
      />

      <ul>
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} onToggle={toggleComplete} />
        ))}
      </ul>

      <AddTodo
        handleSubmit={handleSubmit}
        task={task}
        handleChangeInput={handleChangeInput}
      />
    </div>
  );
}

interface TodoFiltersProps {
  onShowAllTodos: () => void;
  onShowCompleteTodos: () => void;
  onShowIncompleteTodos: () => void;
}

const TodosFilters = ({
  onShowAllTodos,
  onShowCompleteTodos,
  onShowIncompleteTodos
}: TodoFiltersProps) => (
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
)

interface TodoItemProps {
  todo: Todo;
  onToggle: (todo: Todo) => void;
}

const TodoItem = ({ todo, onToggle }: TodoItemProps) => (
  <li>
    <label>
      <input type="checkbox" checked={todo.complete} onChange={() => onToggle(todo)} />
      {todo.task}
    </label>
  </li>
);

interface AddTodoProps {
  handleSubmit: (task: string) => void;
  task: string;
  handleChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddTodo = ({ handleSubmit, task, handleChangeInput }: AddTodoProps) => {
  function submitWithoutEventDefault(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    handleSubmit(task);
  }
  
  return (
    <form onSubmit={submitWithoutEventDefault}>
      <input
        type="text"
        value={task}
        onChange={handleChangeInput}
      />
      <Button type="submit" disabled={!task}>Add Todo</Button>
    </form>
  );
}

export default TodosList;