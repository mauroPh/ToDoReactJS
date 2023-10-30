import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useState } from "react";
import Avatar from 'react-avatar';
import styled from 'styled-components';
import { deleteUser } from "../../Pages/UsersList/UsersRepository";
import ConfirmationPopup from '../ConfirmationPopup/ConfirmationPopup';


const UserCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 2px rgba(3, 73, 251, 0.641);
`;

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
`;

const UserLabel = styled.label`
display: flex;
flex-grow: 1;
align-items: center;
  cursor: pointer;
`;

const Button = styled.button`
  border: none;
  background: none;
`;

const EditButton = styled.button`
align-items:flex-start;
justify-content: flex-start;
height: 20px;
margin-left:15px;
margin-right:20px;
margin-top:5px;
color: rgba(230, 0, 10);
box-shadow: 0 2px 4px rgba(3, 73, 251, 0.641);
background-color: transparent;
border: none;
border-radius: 5px;
font-size: 14px;
font-weight: 600;
cursor: pointer;
transition: background-color 0.3s ease;
`;

const DeleteButton = styled.button`
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


const UsersLabelInput = styled.input`
  width: auto;
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
  display: flex;
flex-grow: 1;
align-items: center;
`;

function UserCardComponent(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(props.user.email);
  const [showPopup, setShowPopup] = useState(false);
  const [isDeleteConfirmation, setIsDeleteConfirmation] = useState(false);


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
    setIsDeleteConfirmation(true);
    setShowPopup(true);
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
  const handleConfirmPopup = async () => {
    if (isDeleteConfirmation) {
      try {
        await deleteUser(props.user.userId);
        props.fetchUsers();
      } catch (error) {
        console.error(error);
      }
    }
    setShowPopup(false);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <UserCard>
      {isEditing ? (
        <UserLabel>
          <UsersLabelInput
            value={updatedText}
            onChange={(event) => setUpdatedText(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          <UsersLabelInput
          value={""}/>
          <Row>
            <EditButton onClick={handleUpdate}>Salvar</EditButton>
            <EditButton onClick={handleCancel}><Icon path={mdiClose} size={0.8} /></EditButton>
          </Row>
        </UserLabel>
      ) : (
        <>
          <Avatar name={props.user.email} size="50" round={true} />
          <UserLabel onClick={handleDescriptionClick}>
            {props.user.email}
          </UserLabel>
          <DeleteButton onClick={handleDelete}>
            <Icon path={mdiClose} size={0.8} />
          </DeleteButton>
        </>
      )}
       {showPopup && (
        <ConfirmationPopup
          question={isDeleteConfirmation ? "Tem certeza que deseja excluir?" : "Tem certeza que deseja alterar o status da tarefa?"}
          onConfirm={handleConfirmPopup}
          onCancel={handleClosePopup}
        />
      )}
    </UserCard>
  );
}

export default UserCardComponent;