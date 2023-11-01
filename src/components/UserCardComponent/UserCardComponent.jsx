import React, { useState } from "react";
import { mdiClose, mdiContentSave, mdiTrashCanOutline } from '@mdi/js';
import Icon from '@mdi/react';
import Avatar from 'react-avatar';
import ConfirmationPopup from "../../components/ConfirmationPopup/ConfirmationPopup"; // Importe o ConfirmationPopup

function UserCardComponent(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedEmail, setUpdatedEmail] = useState(props.user.email);
  const [updatedPassword, setUpdatedPassword] = useState(props.user.password);
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] = useState(false);
  const [isUpdateConfirmationVisible, setIsUpdateConfirmationVisible] = useState(false);

  const handleUpdate = () => {
    const updatedUser = {
      ...props.user,
      email: updatedEmail,
      password: updatedPassword
    };
    props.handleUpdate(props.user.userId, updatedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUpdatedEmail(props.user.email);
    setUpdatedPassword(props.user.password);
  }

  const handleDescriptionClick = () => {
    setIsEditing(true);
    setUpdatedEmail(props.user.email);
    setUpdatedPassword(props.user.password);
  }

  const handleDelete = () => {
    setIsDeleteConfirmationVisible(true);
  }

  const handleDeleteConfirmation = (confirmed) => {
    setIsDeleteConfirmationVisible(false);
    if (confirmed) {
      props.handleDelete(props.user.userId);
    }
  }

  const handleUpdateConfirmation = (confirmed) => {
    setIsUpdateConfirmationVisible(false);
    if (confirmed) {
      handleUpdate();
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleUpdate();
    }
  }

  return (
    <div className="card-wrapper">
      {isEditing ? (
        <div className="popup">
          <div className="popup-content">
            <div className="input-container">
              <label className="email-label">Email:</label>
              <input
                type="text"
                value={updatedEmail}
                onChange={(event) => setUpdatedEmail(event.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="input-container">
              <label className="password-label">Password:</label>
              <input
                type="password"
                value={updatedPassword}
                onChange={(event) => setUpdatedPassword(event.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="button-container">
              <button className="popup-content button" onClick={() => setIsUpdateConfirmationVisible(true)}>
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
          <Avatar name={props.user.email} size="40" round={true} />
          <label className="todo-item-description" onClick={handleDescriptionClick}>
            {props.user.email}
          </label>
          <button className="delete-button" onClick={handleDelete}>
            <Icon path={mdiTrashCanOutline} size={0.8} />
          </button>
        </>
      )}

    
      {isDeleteConfirmationVisible && (
        <ConfirmationPopup
          question="Deseja realmente excluir esse usuário?"
          onConfirm={handleDeleteConfirmation}
          onCancel={() => setIsDeleteConfirmationVisible(false)}
        />
      )}

      {isUpdateConfirmationVisible && (
        <ConfirmationPopup
          question="Tem certeza que deseja fazer o update deste usuário?"
          onConfirm={handleUpdateConfirmation}
          onCancel={() => setIsUpdateConfirmationVisible(false)}
        />
      )}
    </div>
  );
}

export default UserCardComponent;
