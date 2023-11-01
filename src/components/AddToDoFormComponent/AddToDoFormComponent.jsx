import React, { useState } from 'react';
import './AddToDoFormComponent.css';

function AddTodoFormComponent(props) {
  const { saveTodo } = props;
  const [todoText, setTodoText] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const trimmedText = todoText.trim();

      if (trimmedText === '') {
        setShowErrorPopup(true);

        setTimeout(() => {
          setShowErrorPopup(false);
        }, 2400);
      } else {
        saveTodo({
          description: trimmedText,
          completed: false,
        });
        setTodoText('');
        setShowSuccessPopup(true);

        setTimeout(() => {
          setShowSuccessPopup(false);
        }, 2400);
      }
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

      {showSuccessPopup && (
        <div className="success-popup">
          Tarefa criada com sucesso!
        </div>
      )}

      {showErrorPopup && (
        <div className="error-popup">
          Você precisa adicionar uma descrição para a tarefa.
        </div>
      )}
    </div>
  );
}

export default AddTodoFormComponent;
