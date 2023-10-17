import React, { useState } from 'react';
import './AddToDoFormComponent.css';


function AddTodoFormComponent({ onAddTodo }) {
  const [todoText, setTodoText] = useState('');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      console.log('Enter key pressed', todoText.trim());
      saveTodo();
    }
  };

  const saveTodo = () => {
    if (todoText.trim()) {
      onAddTodo({
        description: todoText.trim(),
        completed: false,
      });
      setTodoText('');
    }
  };

  const handleInputChange = (event) => {
    setTodoText(event.target.value);
  };

  return (
    <div className="add-todo-form">
      <input
        type="text"
        placeholder='+  Adicione uma tarefa'
        value={todoText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        style={{
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '10px center',
          paddingLeft: '20px',
        }}
        />
    </div>
  );
}

export default AddTodoFormComponent;