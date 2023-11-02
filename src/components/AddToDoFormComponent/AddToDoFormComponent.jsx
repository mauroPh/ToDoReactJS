import { mdiCloseCircle } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useState } from 'react';
import '../../styles/style.sass';
import { ButtonClosePopup, PopupAlert, PopupSaveConfirmation } from '../../styles/styledComponents/Popups';


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
        setTimeout(() => {
          setShowErrorPopup(false);
        }, 3000);
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

        setTimeout(() => {
          setShowPopup(false);
        }, 3000);
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
       <PopupSaveConfirmation>
       <div className="popup-content">
         <ButtonClosePopup onClick={handleClosePopup}>
           <Icon path={mdiCloseCircle} size={0.8} color= 'darkgreen'></Icon> 
         </ButtonClosePopup>
         <h3>Tarefa criada com sucesso!</h3>
       </div>
     </PopupSaveConfirmation>
      )}
      {showErrorPopup && (
       <PopupAlert>
       <div className="popup-content">
         <ButtonClosePopup onClick={handleCloseErrorPopup}>
           <Icon path={mdiCloseCircle} size={0.8} color= 'darkred'></Icon> 
         </ButtonClosePopup>
         <h3>A descrição não pode estar vazia.</h3>
       </div>
     </PopupAlert>
      )}
    </div>
  );
}

export default AddTodoFormComponent;