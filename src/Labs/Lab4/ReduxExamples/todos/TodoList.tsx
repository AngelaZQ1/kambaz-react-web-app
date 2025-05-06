/* eslint-disable @typescript-eslint/no-explicit-any */
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { todos } = useSelector((state: any) => state.todosReducer) as {
    todos: { id: number; text: string; completed: boolean }[];
  };
  return (
    <div id="wd-todo-list-redux">
      <h2>Todo List</h2>
      <ListGroup className="w-50">
        <TodoForm />
        {todos.map((todo: { id: number; text: string; completed: boolean }) => (
          <TodoItem todo={todo} />
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
