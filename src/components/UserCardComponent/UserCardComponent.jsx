import { mdiClose, mdiContentSave } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useState } from "react";
import Avatar from 'react-avatar';
import { deleteUser } from "../../Pages/UsersList/UsersRepository";
import "../ToDoItemComponent/ToDoItemComponent.css";

function UserCardComponent(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedEmail, setUpdatedEmail] = useState(props.user.email);
  const [updatedPassword, setUpdatedPassword] = useState(props.user.password);

  function handleUpdate() {
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

  const handleDelete = async () => {
    try {
      await deleteUser(props.user.userId);
      props.fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

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
        <>
          <Avatar name={props.user.email} size="50" round={true} />
          <label className="todo-label" onClick={handleDescriptionClick}>
            {props.user.email}
          </label>
          <button className="delete-button" onClick={handleDelete}>
            <Icon path={mdiClose} size={0.8} />
          </button>
        </>
      )}
    </div>
  );
}

export default UserCardComponent;
