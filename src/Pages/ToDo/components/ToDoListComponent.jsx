import React from 'react';
import TodoItem from './ToDoItemComponent';
function TodoList(props) {
  if (!props.todos) {
    return null;
  }
  return (
    <div className="todo-list">
      {props.todos.map(todo => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          description={todo.description}
          completed={todo.completed}
          handleCheckboxChange={props.handleCheckboxChange}
          handleDelete={props.handleDelete}
        />
      ))}
    </div>
  );
}

export default TodoList;
