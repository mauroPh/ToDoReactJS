import { mdiClose, mdiContentSave, mdiCheck } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useState } from "react";
import Avatar from 'react-avatar';
import { deleteUser } from "../../Pages/UsersList/UsersRepository";
import "../ToDoItemComponent/ToDoItemComponent.css";
import "./UserCardComponent.css";

function UserCardComponent(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedEmail, setUpdatedEmail] = useState(props.user.email);
  const [updatedPassword, setUpdatedPassword] = useState(props.user.password);
  const [showConfirmation, setShowConfirmation] = useState(false);

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function handleUpdate() {
    if (!isValidEmail(updatedEmail)) {
      console.log('O email informado não tem o formato de um email válido.');
      return;
    }

    const updatedUser = {
      ...props.user,
      email: updatedEmail,
      password: updatedPassword
    };
    props.handleUpdate(props.user.userId, updatedUser);
    setIsEditing(false);
  }

  function handleCancel() {
    setIsEditing(false);
    setUpdatedEmail(props.user.email);
    setUpdatedPassword(props.user.password);
  }

  function handleDelete() {
    setShowConfirmation(true);
  }

  function handleDeleteConfirmation() {
    deleteUser(props.user.userId)
      .then(() => {
        props.fetchUsers();

        setShowConfirmation(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleDeleteCancel() {
    setShowConfirmation(false);
  }

  const handleDescriptionClick = () => {
    setIsEditing(true);
    setUpdatedEmail(props.user.email);
    setUpdatedPassword(props.user.password);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleUpdate();
    }
  };

  return (
    <div className="todo-item">
      {showConfirmation ? (
        <div className="popup">
          <div className="popup-content">
            <h5>Tem certeza que deseja excluir este usuário?</h5>
            <div className="button-container">
              <button className="popup-content button button-success" onClick={handleDeleteConfirmation}>
              <Icon path={mdiCheck} size={1} />
              </button>
              <button className="popup-content button button-danger" onClick={handleDeleteCancel}>
                <Icon path={mdiClose} size={1} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <Avatar name={props.user.email} size="50" round={false} />
          <label className="todo-label" onClick={handleDescriptionClick}>
            {props.user.email}
          </label>
          {isEditing ? (
            <div className="popup">
              <div className="popup-content">
                <h5>E-mail</h5>
                <input
                  type="text"
                  value={updatedEmail}
                  onChange={(event) => setUpdatedEmail(event.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <h5>Senha</h5>
                <input
                  type="password"
                  value={updatedPassword}
                  onChange={(event) => setUpdatedPassword(event.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <div className="button-container">
                  <button className="popup-content button" onClick={handleUpdate}>
                    <Icon path={mdiContentSave} size={1} />
                  </button>
                  <button className="popup-content button" onClick={handleCancel}>
                    <Icon path={mdiClose} size={1} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button className="delete-button" onClick={handleDelete}>
              <Icon path={mdiClose} size={0.8} />
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default UserCardComponent;
