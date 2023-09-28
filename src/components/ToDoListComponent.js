import React from 'react';
import TodoItem from './ToDoItemComponent';

function TodoList(props) {
  return (
    <div className="todo-list">
      {props.todos.map(todo => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          completed={todo.completed}
          handleCheckboxChange={props.handleCheckboxChange}
          handleDelete={props.handleDelete}
        />
      ))}
    </div>
  );
}

export default TodoList;
