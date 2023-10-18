import React from "react";
import { deleteTodo } from "../Pages/ToDo/ToDoRepository";

function ToDoItemComponent(props) {
  console.log("ToDoItemComponent props:", props);

  const handleDelete = async () => {
    try {
      await deleteTodo(props.todo.todoId);
      props.fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={
        props.completed ? "todo-item todo-item-completed" : "todo-item"
      }
    >
      <input
        type="checkbox"
        checked={props.completed}
        onChange={() => props.handleCheckboxChange(props.id)}
      />

      <label
        className={
          props.completed ? "todo-label todo-label-completed" : "todo-label"
        }
      >
        {props.todo.description}
      </label>

      <button
        className={
          props.completed ? "delete-button delete-button-completed" : "delete-button"
        }
        onClick={handleDelete}
      >
        Remover
      </button>
    </div>
  );
}
export default ToDoItemComponent;