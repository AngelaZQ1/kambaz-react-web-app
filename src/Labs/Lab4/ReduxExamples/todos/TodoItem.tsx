import { Button, ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
interface Todo {
  id: number;
  title?: string;
}

export default function TodoItem({ todo }: { todo: Todo }) {
  const dispatch = useDispatch();
  return (
    <ListGroup.Item
      key={todo.id}
      className="d-flex gap-2 justify-content-between"
    >
      <p className="w-25 mb-0">{todo.title}</p>
      <div className="d-flex gap-2">
        <Button onClick={() => dispatch(setTodo(todo))} id="wd-set-todo-click">
          Edit
        </Button>
        <Button
          variant="danger"
          onClick={() => dispatch(deleteTodo(todo.id))}
          id="wd-delete-todo-click"
        >
          Delete
        </Button>
      </div>
    </ListGroup.Item>
  );
}
