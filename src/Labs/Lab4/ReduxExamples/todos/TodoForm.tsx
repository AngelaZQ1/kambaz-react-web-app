import { ListGroup, Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm() {
  const { todo } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();
  return (
    <ListGroup.Item className="d-flex gap-2">
      <FormControl
        value={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
        className="w-25"
      />
      <Button
        onClick={() => dispatch(updateTodo(todo))}
        id="wd-update-todo-click"
        className="bg-warning text-dark border-0"
      >
        Update
      </Button>
      <Button
        onClick={() => dispatch(addTodo(todo))}
        id="wd-add-todo-click"
        className="bg-success border-0"
      >
        Add
      </Button>
    </ListGroup.Item>
  );
}
