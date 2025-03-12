import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import { ListGroup, Button } from "react-bootstrap";
export default function TodoItem({ todo }) {
  const dispatch = useDispatch();
  return (
    <ListGroup.Item key={todo.id} className="d-flex gap-2 align-items-center">
      <p className="w-25 mb-0">{todo.title}</p>
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
    </ListGroup.Item>
  );
}
