import { mdiChevronDown, mdiChevronLeft, mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useState } from "react";
import styled from "styled-components";
import { deleteTodo, updateTodo } from "../../Pages/ToDo/ToDoRepository";
import CenterModal from './CenterModal';
import ConfirmationPopup from "./ConfirmationPopup";
import EditingTodoComponent from "./EditingTodoComponent";


const ToDoItem = styled.div`
 position: relative;
  display: flex;
  justify-content: space-between;
  align-items: space-evenly;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 5px;
  background-color: ${props => props.completed ? "#e6e6e6" : "#fff"};
  box-shadow: 0 1px 1px rgba(3, 73, 251, 0.641);

`;

const ToDoCheckbox = styled.input`
margin-top: 4px;
margin-right: 10px;
align-self: flex-start;
cursor: pointer;
`;

const ToDoLabelWrapper = styled.div`
display: flex;
flex-grow: 1;
align-items: center;`;

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

const ToDoLabel = styled.div`
  width: min(calc(70vw - 150px), 80vw);
  align-self: center;
  margin-right: 10px;
  cursor: pointer;
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  white-space: nowrap;  
  overflow: hidden;
  `;

  const DescriptionContainer = styled.div`
  justify-content: center;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  text-align: center;
  font-size: clamp(12px, 2vw, 1rem);
  `;

const ToDoDetails = styled.div`
  position:relative;
  left: 85%;
  transform: translate(-50%);
  border-radius: 5px;
  background-color: transparent;
  white-space: nowrap;
  align-self: flex-start;
  padding-left: 10px;
  padding-right: 10px;

`;

const ToDoDetailsText = styled.p`
  padding-top: 2px;
  padding-right: 5px;
  padding-bottom: 2px;
  margin: 0;
  font-size: clamp(12px, 2vw, 1rem);
`;

const ToDoMarker = styled.div`
  margin-right: 10px;
  font-size: 1.2rem;
`;

const ToDoDeleteButton = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
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
const ToDoArrow = styled(Icon)`
position: absolute;
top: 15px;
right: 100px;
  margin-right: 2px;
  align-self: flex-start;
  cursor: pointer;
`;
const ShowMoreText = styled.span`
position: absolute;
top: 20px;
right: 50px;
font-size: 0.6em;
  color: blue;
  padding-right: 5px;
  cursor: pointer;
`;

function ToDoItemComponent(props) {
  const [showPopup, setShowPopup] = useState(false);
  const [isDeleteConfirmation, setIsDeleteConfirmation] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleDelete = async () => {
    setIsDeleteConfirmation(true);
    setShowPopup(true);
  };

  const handleDescriptionClick = () => {
    setIsModalOpen(true);
  };

  const handleArrowClick = () => {
    setShowDetails(!showDetails);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCheckboxChange = () => {
    setIsDeleteConfirmation(false);
    setShowPopup(true);
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
            <ToDoLabel completed={props.todo.completed}>
              <DescriptionContainer onClick={handleDescriptionClick}>
              {props.todo.description}
            </DescriptionContainer>
            </ToDoLabel>
            
      {isModalOpen && (
        <CenterModal onClose={handleCloseModal}>
          <EditingTodoComponent todo={props.todo} closePopup={handleCloseModal} fetchTodos={props.fetchTodos} />    
        </CenterModal>)}
        {showDetails && (
  <>
    <ToDoDetails>
      <Row><ToDoMarker>&#8226;</ToDoMarker> <ToDoDetailsText>Concluída ? {props.todo.completed ? "Sim." : "Não."}</ToDoDetailsText></Row>
      <Row><ToDoMarker>&#8226;</ToDoMarker> <ToDoDetailsText>Criada em: {new Date(props.todo.createdOn).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}</ToDoDetailsText></Row>
      <Row><ToDoMarker>&#8226;</ToDoMarker> <ToDoDetailsText>Última modificação: {new Date(props.todo.modifiedOn).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}</ToDoDetailsText></Row>      <Row><ToDoMarker>&#8226;</ToDoMarker> <ToDoDetailsText>Criada por: {props.todo.createdBy}</ToDoDetailsText></Row>
      <Row><ToDoMarker>&#8226;</ToDoMarker>  <ToDoDetailsText>Modificada por: {props.todo.modifiedBy}</ToDoDetailsText></Row>
    </ToDoDetails>
  </>
)}
        </Column>
          </ToDoLabelWrapper>
          <div style={{ display: 'flex',alignItems:'stretch'} } onClick={handleArrowClick}>
         <Row>
         <ToDoArrow
            path={showDetails ? mdiChevronDown : mdiChevronLeft}
            size={0.8}/>
          <ShowMoreText>{showDetails ? 'Ocultar' : 'Detalhes'}</ShowMoreText>
         </Row>
         
        </div>
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