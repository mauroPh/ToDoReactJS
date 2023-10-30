import { mdiChevronDown, mdiChevronRight, mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useState } from "react";
import styled from "styled-components";
import { deleteTodo, updateTodo } from "../../Pages/ToDo/ToDoRepository";
import ConfirmationPopup from "../ConfirmationPopup/ConfirmationPopup";

const ToDoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 5px;
  background-color: ${props => props.completed ? "#e6e6e6" : "#fff"};
  box-shadow: 0 2px 2px rgba(3, 73, 251, 0.641);

`;

const ToDoCheckbox = styled.input`
margin-top: 4px;
margin-right: 10px;
align-self: flex-start;
`;


const ToDoLabelWrapper = styled.div`
display: flex;
flex-grow: 1;
align-items: center;`;

const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const Column = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
`;

const ToDoArrow = styled(Icon)`
  margin-right: 2px;
  align-self: flex-start;
  cursor: pointer;
`;

const ToDoLabel = styled.label`
align-self: flex-start;
margin-right: 10px;
  cursor: pointer;
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  white-space: nowrap;
  width:auto;
`;
const ToDoLabelInput = styled.input`
  width: auto;
  align-self: flex-start;
  margin-right: 10px;
  cursor: pointer;
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  white-space: nowrap;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 2px;
  margin-bottom: 16px;
  resize: vertical;
`;



const ToDoPopup = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 10px;
`;

const ToDoPopupContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const ToDoPopupTextarea = styled.textarea`
  margin-bottom: 10px;
  resize: none;
`;

const ToDoPopupButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ToDoPopupButton = styled.button`
  background-color: #0077ff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
`;

const ToDoCancelButton = styled.button`
  background-color: #fff;
  color: #0077ff;
  border: 1px solid #0077ff;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
`;

const ToDoDetails = styled.div`
  position:relative;
  left: 50%;
  transform: translate(-50%);
  border-radius: 5px;
  background-color: #f2f2f2;
  white-space: nowrap;
  align-self: flex-start;
  margin-left: 0px;
  padding-top: 5px;
  padding-left: 10px;
  padding-right: 10px;

`;

const ToDoDetailsText = styled.p`
  padding-top: 2px;
  padding-right: 5px;
  padding-bottom: 2px;
  margin: 0;
  font-size: 0.9rem;
  box-shadow: 0 0.5px 0 rgba(3, 73, 251, 0.641);

`;

const ToDoMarker = styled.div`
  margin-right: 10px;
  font-size: 1.2rem;
`;

const ToDoDeleteButton = styled.button`
  align-self: flex-start;
  margin-left: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #ff0000;

align-self: flex-start;

&:hover {   color: #ff0000;
  background-color: #f2f2f2;
  border-radius: 2px;
  cursor: pointer;
}
`;

function ToDoItemComponent(props) {
  console.log("ToDoItemComponent props:", props);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTodoText, setUpdatedTodoText] = useState(props.todo.description);
  const [showPopup, setShowPopup] = useState(false);
  const [isDeleteConfirmation, setIsDeleteConfirmation] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  function handleUpdate() {
    const updatedTodo = { ...props.todo, description: updatedTodoText };
    props.handleUpdate(props.todo.todoId, updatedTodo);
    setIsEditing(false);
    handleClosePopup();
  }
  
  function handleCancel() {
    setIsEditing(false);
    setUpdatedTodoText(props.todo.description);
    handleClosePopup();
  }

  const handleDelete = async () => {
    setIsDeleteConfirmation(true);
    setShowPopup(true);
  };

  const handleDescriptionClick = () => {
    setIsEditing(true);
    setShowDetails(!showDetails);
  };

  const handleArrowClick = () => {
    setIsEditing(false);
    setShowDetails(!showDetails);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleUpdate();
      setIsEditing(false);
    } else if (event.key === 'Escape') {
      handleCancel();
    }
  };

  const handleCheckboxChange = () => {
    setIsDeleteConfirmation(false);
    setShowPopup(true);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleConfirmPopup = async () => {
    if (isDeleteConfirmation) {
      try {
        await deleteTodo(props.todo.todoId);
        props.fetchTodos();
        handleClosePopup();
      } catch (error) {
        console.error(error);
      }
    } else {
      const updatedTodo = { ...props.todo, completed: !props.todo.completed };
      try {
        await updateTodo(props.todo.todoId, updatedTodo);
        props.fetchTodos();
        handleClosePopup();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <ToDoItem completed={props.todo.completed}>
        <>
        <ToDoCheckbox
            type="checkbox"
            checked={props.todo.completed}
            onChange={handleCheckboxChange}
          />
       
          <ToDoLabelWrapper>
        <Column>
        <Row>
          <CenterContainer>
        <ToDoArrow
                path={showDetails ? mdiChevronDown : mdiChevronRight}
                size={0.8}
                onClick={handleArrowClick}
              />
              {isEditing ? (
                <ToDoLabel>
                <ToDoLabelInput
                  value={updatedTodoText}
                  onChange={(event) => setUpdatedTodoText(event.target.value)}
                  onKeyDown={handleKeyDown}
                />
                </ToDoLabel>
        ) :(
            <ToDoLabel
              completed={props.todo.completed}
              onClick={handleDescriptionClick}
            >
            {props.todo.description}
            </ToDoLabel>
        )}
        </CenterContainer>

        </Row>
        {showDetails && (
              <ToDoDetails>
                <Row><ToDoMarker>&#8226;</ToDoMarker> <ToDoDetailsText>Concluída ? {props.todo.completed ? "Sim." : "Não."}</ToDoDetailsText></Row>
                <Row><ToDoMarker>&#8226;</ToDoMarker> <ToDoDetailsText>Criada em: {new Date(props.todo.createdOn).toLocaleString()}</ToDoDetailsText></Row>
                <Row><ToDoMarker>&#8226;</ToDoMarker> <ToDoDetailsText>Última modificação: {new Date(props.todo.modifiedOn).toLocaleString()}</ToDoDetailsText></Row>
                <Row><ToDoMarker>&#8226;</ToDoMarker> <ToDoDetailsText>Criada por: {props.todo.createdBy}</ToDoDetailsText></Row>
                <Row><ToDoMarker>&#8226;</ToDoMarker>  <ToDoDetailsText>Modificada por: {props.todo.modifiedBy}</ToDoDetailsText></Row>
              </ToDoDetails>
            )}
        {showPopup && (
        <ToDoPopup>
          <ToDoPopupContent>
            <ToDoPopupTextarea
              value={updatedTodoText}
              onChange={(event) => setUpdatedTodoText(event.target.value)}
            />
            <ToDoPopupButtonContainer>
              <ToDoPopupButton onClick={handleUpdate}>Salvar</ToDoPopupButton>
              <ToDoCancelButton onClick={handleClosePopup}>Cancelar</ToDoCancelButton>
            </ToDoPopupButtonContainer>
          </ToDoPopupContent>
        </ToDoPopup>
      )}
        </Column>
          </ToDoLabelWrapper>
          

          
          <ToDoDeleteButton onClick={handleDelete}>
            <Icon path={mdiClose} size={0.8} />
          </ToDoDeleteButton>
        </>
      {showPopup && (
        <ConfirmationPopup
          question={isDeleteConfirmation ? "Tem certeza que deseja excluir?" : "Tem certeza que deseja alterar o status da tarefa?"}
          onConfirm={handleConfirmPopup}
          onCancel={handleClosePopup}
        />
      )}
    </ToDoItem>

  );
      }


export default ToDoItemComponent;