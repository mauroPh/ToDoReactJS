import React, { useState } from "react";
import { mdiClose, mdiChevronRight, mdiContentSave, mdiFileEditOutline, mdiTrashCanOutline } from '@mdi/js';
import Icon from '@mdi/react';
import "./ToDoItemComponent.css";
import styled from "styled-components";
import ConfirmationPopup from "../../components/ConfirmationPopup/ConfirmationPopup";

const ToDoLabel = styled.label`
  cursor: pointer;
  text-decoration: ${props => props.completed ? "line-through" : "none"};
  display: flex;
  align-items: center;
`;

const ToDoArrow = styled(Icon)`
  cursor: pointer;
  display: ${props => props.completed ? "none" : "block"};
`;

const ToDoDetails = styled.div`
  padding: 20px;
  border-radius: 10px;
  background-color: #f2f2f2;
`;

const ToDoDetailsText = styled.p`
  margin: 0;
`;

function ToDoItemComponent(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTodoText, setUpdatedTodoText] = useState(props.todo.description);
  const [showDetails, setShowDetails] = useState(false);
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] = useState(false);
  const [isUpdateConfirmationVisible, setIsUpdateConfirmationVisible] = useState(false);

  const handleArrowClick = () => {
    setShowDetails(!showDetails);
  };

  function handleUpdate() {
    setIsUpdateConfirmationVisible(true);
  }

  function handleCancel() {
    setIsEditing(false);
    setUpdatedTodoText(props.todo.description);
    setShowDetails(false);
  }

  const handleDelete = () => {
    setIsDeleteConfirmationVisible(true);
  };

  const handleDeleteConfirmation = (confirmed) => {
    setIsDeleteConfirmationVisible(false);
    if (confirmed) {
      props.handleDelete(props.todo.todoId);
    }
  };

  const handleUpdateConfirmation = (confirmed) => {
    setIsUpdateConfirmationVisible(false);
    if (confirmed) {
      const updatedTodo = { ...props.todo, description: updatedTodoText };
      props.handleUpdate(props.todo.todoId, updatedTodo);
      setIsEditing(false);
    }
  }

  const handleDescriptionClick = () => {
    setIsEditing(true);
    setUpdatedTodoText(props.todo.description);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleUpdate();
    }
  };

  return (
    <div className={props.todo.completed ? "card-wrapper todo-item-completed" : "card-wrapper"}>
      {isEditing ? (
        <div className="popup">
          <div className="popup-content">
            <textarea
              value={updatedTodoText}
              onChange={(event) => setUpdatedTodoText(event.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="button-container">
              <button className="popup-content button" onClick={() => handleUpdate()}>
                <Icon path={mdiContentSave} size={1} />
              </button>
              <button className="popup-content button" onClick={handleCancel}>
                <Icon path={mdiClose} size={1} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <input
            type="checkbox"
            checked={props.todo.completed}
            onChange={() => props.handleCheckboxChange(props.todo.todoId, !props.todo.completed)}
          />
          <ToDoLabel completed={props.todo.completed}>
            <ToDoArrow completed={props.todo.completed} path={mdiChevronRight} size={0.8} onClick={handleArrowClick} />
            <span className="todo-item-description">{props.todo.description}</span>
          </ToDoLabel>
          {showDetails && (
            <div className="popup">
              <div className="popup-content">
                <ToDoDetails>
                  <ToDoDetailsText>Concluída: {props.todo.completed ? "Sim" : "Não"}</ToDoDetailsText>
                  <ToDoDetailsText>Data de criação: {new Date(props.todo.createdOn).toLocaleString()}</ToDoDetailsText>
                  <ToDoDetailsText>Última modificação: {new Date(props.todo.modifiedOn).toLocaleString()}</ToDoDetailsText>
                  <ToDoDetailsText>Tarefa criada por: {props.todo.createdBy}</ToDoDetailsText>
                  <ToDoDetailsText>Modificada por: {props.todo.modifiedBy}</ToDoDetailsText>
                </ToDoDetails>
                <button className="popup-content button" onClick={handleCancel}>
                  <Icon path={mdiClose} size={1} />
                </button>
              </div>
            </div>
          )}

          <div className="delete-button-container">
            {!props.todo.completed && (
              <button className="delete-button" onClick={handleDescriptionClick}>
                <Icon path={mdiFileEditOutline} size={0.8} />
              </button>
            )}
            <button className={props.todo.completed ? "delete-button delete-button-completed" : "delete-button"} onClick={handleDelete}>
              <Icon path={mdiTrashCanOutline} size={0.8} />
            </button>
          </div>
        </>
      )}

      {isDeleteConfirmationVisible && (
        <ConfirmationPopup
          question="Deseja realmente excluir esta tarefa?"
          onConfirm={(confirmed) => handleDeleteConfirmation(confirmed)}
          onCancel={() => setIsDeleteConfirmationVisible(false)}
        />
      )}

      {isUpdateConfirmationVisible && (
        <ConfirmationPopup
          question="Deseja realmente editar esta tarefa?"
          onConfirm={(confirmed) => handleUpdateConfirmation(confirmed)}
          onCancel={() => setIsUpdateConfirmationVisible(false)}
        />
      )}
    </div>
  );
}

export default ToDoItemComponent;
