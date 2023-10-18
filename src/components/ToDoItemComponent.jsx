import React, { useState } from "react";
import { deleteTodo } from "../Pages/ToDo/ToDoRepository";

function ToDoItemComponent(props) {
  console.log("ToDoItemComponent props:", props);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTodoText, setUpdatedTodoText] = useState(props.todo.description);

  function handleUpdate() {
    const updatedTodo = { ...props.todo, description: updatedTodoText };
    props.handleUpdate(props.todo.todoId, updatedTodo); // MODIFICADO PARA RECEBER A CHAMADA DA FUNÇÃO DE ATUALIZAÇÃO TODO.TODOID DO BACKEND
    setIsEditing(false);
  }
  

  function handleCancel() {
    setIsEditing(false);
    setUpdatedTodoText(props.todo.description);
  }

  const handleDelete = async () => {
    try {
      await deleteTodo(props.todo.todoId);
      props.fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={props.completed ? "todo-item todo-item-completed" : "todo-item"}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={updatedTodoText}
            onChange={(event) => setUpdatedTodoText(event.target.value)}
          />
          <button onClick={handleUpdate}>Salvar</button>
          <button onClick={handleCancel}>Cancelar</button>
        </>
      ) : (
        <>
      <input
        type="checkbox"
        checked={props.completed}
        onChange={() => props.handleCheckboxChange(props.id)}
      />

      <label className={props.completed ? "todo-label todo-label-completed" : "todo-label"}>
        {props.todo.description}
      </label>
      <button onClick={() => setIsEditing(true)}>Editar</button>
      <button className={ props.completed ? "delete-button delete-button-completed" : "delete-button"}
        onClick={handleDelete}>
        Remover
      </button>
      </>
      )}
    </div>
  );
}
export default ToDoItemComponent;