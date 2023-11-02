import { mdiCloseCircle, mdiContentSaveEdit } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useState } from 'react';
import styled from 'styled-components';
import { updateTodo } from "../../Pages/ToDo/ToDoRepository";

const EditingContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-evenly;
height: 80%;
background-color: rgba(255, 255, 255, 0.9);
max-width: 500px;
width: 450px;
padding: 50px 25px;
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
border-radius: 30px;
border: none;
`;

const CloseButton = styled.button`
position: fixed;
top: 20px;
right: 20px;
border: none;

&:hover  
  background-color: #8a0c0c;
`;

const SaveButton = styled.button`
position: fixed;
top: 20px;
left: 20px;
border: none;

&:hover  
  background-color: #8a0c0c;
`;

const Textarea = styled.textarea`
  white-space: pre-wrap;
  outline: none;
  box-shadow: none;
  background-color: rgba(255, 255, 255, 0.6);
  width: 100%;
  height: 80%;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;

  &:focus {
    outline: none;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  }
`;

function EditingTodoComponent({  todo, closePopup, fetchTodos }) {
  const [editedTodo, setEditedTodo] = useState(todo.description);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(todo.todoId);
      console.log(editedTodo);
      const updatedTodo = await updateTodo(todo.todoId, { description: editedTodo });
      if (updatedTodo) {
        closePopup();
        fetchTodos();
      }
    } catch (error) {
      console.error("Erro ao atualizar o todo: ", error);
    }
  };

  return (
    <EditingContainer onSubmit={handleSubmit}>
      <Textarea
        value={editedTodo}
        onChange={(e) => setEditedTodo(e.target.value)}
      />
      <CloseButton onClick={closePopup}>
        <Icon path={mdiCloseCircle} size={1.2} color='rgba(230, 0, 10, 1)' />
      </CloseButton>
      <SaveButton type="submit" onClick={handleSubmit}>
      <Icon path={mdiContentSaveEdit} size={1.2} color='rgba(230, 0, 10, 1)' />
      </SaveButton>
    </EditingContainer>
  );
}

export default EditingTodoComponent;