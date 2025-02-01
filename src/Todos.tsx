import { FormEvent, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Button } from "./Button";
import { useTodos } from "./contexts/TodosContext";
import { Todo } from "./models/todos";

interface TodosListProps {
  todos: Todo[];
  toggleComplete: (todo: Todo) => void;
  onShowAllTodos: () => void;
  onShowCompleteTodos: () => void;
  onShowIncompleteTodos: () => void;
}

const TodosList = ({
  todos = [],
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

      <AddTodo/>
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

const AddTodo = () => {

  const dispatch = useTodos();
  const [task, setTask] = useState('');
  
  function submitWithoutEventDefault(event: FormEvent<HTMLFormElement>): void {
    if (task && dispatch) {
      dispatch({ type: 'ADD_TODO', task, id: uuidv4() });
    }
    setTask('');
    event.preventDefault();
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTask(event.target.value);
  }
  
  return (
    <form onSubmit={submitWithoutEventDefault}>
      <input
        type="text"
        value={task}
        onChange={handleChange}
      />
      <Button type="submit" disabled={!task}>Add Todo</Button>
    </form>
  );
}

export default TodosList;