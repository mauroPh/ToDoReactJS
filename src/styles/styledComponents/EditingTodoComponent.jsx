import React, { useState } from 'react';
import styled from 'styled-components';
import { updateTodo } from "../../Pages/ToDo/ToDoRepository";

const EditingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  background-color: #007BFF;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;


function EditingTodoComponent({ closePopup, fetchUsers, todo }) {
  const [editedTodo, setEditedTodo] = useState(todo.description);

  const handleSave = () => {
    updateTodo({
      ...todo,
      description: editedTodo,
    });
    fetchUsers();
    closePopup();
  };

  return (
    <EditingContainer>
      <Input
        type="text"
        value={editedTodo}
        onChange={(e) => setEditedTodo(e.target.value)}
      />
      <Button onClick={closePopup}>Fechar</Button>
      <Button onClick={handleSave}>Salvar</Button>
    </EditingContainer>
  );
}

export default EditingTodoComponent;