import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useState } from "react";
import { deleteUser } from "../../Pages/UsersList/UsersRepository";
import "../ToDoItemComponent/ToDoItemComponent.css";



function UserCardComponent(props) {
  console.log("UserCardComponent props:", props);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(props.user.email);

  function handleUpdate() {
    const updatedUser = { ...props.user, email: updatedText };
    props.handleUpdate(props.user.userId, updatedUser);
    setIsEditing(false);
  }
  

  function handleCancel() {
    setIsEditing(false);
    setUpdatedText(props.user.email);
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
    setUpdatedText(props.user.email);
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
          <textarea
            value={updatedText}
            onChange={(event) => setUpdatedText(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="button-container">
            <button className="popup-content button" onClick={handleUpdate}>Salvar</button>
            <button className="popup-content button" onClick={handleCancel}><Icon path={mdiClose} size={1} /></button>
          </div>
        </div>
      </div>
      ) : (
        <>
          
          <label
            className= "todo-label"
            onClick={handleDescriptionClick}
          >
            {props.user.email}
          </label>
          <button className= "delete-button" onClick={handleDelete}>
            <Icon path={mdiClose} size={0.8} />
            
          </button>
        </>
      )}
    </div>
  );
}

export default UserCardComponent;