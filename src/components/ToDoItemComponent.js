import React from "react";

function ToDoItemComponent(props) {
  return (
    <div className="todo-item">
        <input
        type="checkbox"
        checked={props.completed}
        onChange={() => props.handleCheckboxChange(props.id)}
        />
      
        <p>{props.text ? props.text : "Texto indisponível"}</p>


        <button className = "delete-button" onClick={() => props.handleDelete(props.id)}>Delete</button>
    </div>
  );
}

export default ToDoItemComponent;