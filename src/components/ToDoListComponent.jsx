import React from "react";
import TodoItemComponent from "./ToDoItemComponent";

function TodoList(props) {
  const { todos, handleCheckboxChange, handleDelete } = props;


  if (!Array.isArray(todos)) {
    return <p className="not-found-label">Nenhuma tarefa pendente</p>;
  }

  return (
    <ul>
  {todos.map((todo) => {
  return (
    <TodoItemComponent
      key={todo.id}
      todo={todo}
      handleCheckboxChange={handleCheckboxChange}
      handleDelete={handleDelete}
    />
  );
})}
    </ul>
  );
}

export default TodoList;