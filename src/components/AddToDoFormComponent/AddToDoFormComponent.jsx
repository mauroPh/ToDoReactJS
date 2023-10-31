import React, { useState } from 'react';
import '../../styles/style.sass';

function AddTodoFormComponent(props) {
  const { saveTodo, fetchTodos } = props;
  const [todoText, setTodoText] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (todoText.trim() === '') {
        setShowErrorPopup(true);
        return;
      }
      console.log('Enter key pressed', todoText.trim());
      const newTodo = {
        description: todoText.trim(),
        completed: false,
      };
      await saveTodo(newTodo);
      setTodoText('');
      await fetchTodos();
      setShowPopup(true);
    }
  };

  const handleInputChange = (event) => {
    setTodoText(event.target.value);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleCloseErrorPopup = () => {
    setShowErrorPopup(false);
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
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Nota salva com sucesso!</h2>
            <button onClick={handleClosePopup}>Fechar</button>
          </div>
        </div>
      )}
      {showErrorPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>A descrição da nota não pode estar vazia.</h2>
            <button onClick={handleCloseErrorPopup}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddTodoFormComponent;