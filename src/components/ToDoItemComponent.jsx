import React from "react";

function ToDoItemComponent(props) {
  return (
<div className={props.completed ? "todo-item todo-item-completed" : "todo-item"}>
        <input
        type="checkbox"
        checked={props.completed}
        onChange={() => props.handleCheckboxChange(props.id)}
        />
      
      <label className={props.completed ? "todo-label-completed" : "todo-label"}>{props.description}</label>

        <button className={props.completed ? "delete-button-completed" : "delete-button"} onClick={() => props.handleDelete(props.id)}>Remover</button>
    </div>
  );
}

export default ToDoItemComponent;