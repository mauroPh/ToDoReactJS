import { mdiClose, mdiDeleteOutline } from '@mdi/js';
import Icon from '@mdi/react';
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

  const handleDescriptionClick = () => {
    setIsEditing(true);
    setUpdatedTodoText(props.todo.description);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleUpdate();
    }
  };

  return (
    <div className={props.completed ? "todo-item todo-item-completed" : "todo-item"}>
      {isEditing ? (
        <div className="popup">
          <div className="popup-content">
            <textarea
              value={updatedTodoText}
              onChange={(event) => setUpdatedTodoText(event.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleUpdate}>Salvar</button>
            <button onClick={handleCancel}><Icon path={mdiClose} size={1} /></button>
          </div>
        </div>
      ) : (
        <>
          <input
            type="checkbox"
            checked={props.completed}
            onChange={() => props.handleCheckboxChange(props.id)}
          />
          <label
            className={props.completed ? "todo-label todo-label-completed" : "todo-label"}
            onClick={handleDescriptionClick}
          >
            {props.todo.description}
          </label>
          <button className={props.completed ? "delete-button delete-button-completed" : "delete-button"} onClick={handleDelete}>
            <Icon path={mdiDeleteOutline} size={1} />
          </button>
        </>
      )}
    </div>
  );
}

export default ToDoItemComponent;