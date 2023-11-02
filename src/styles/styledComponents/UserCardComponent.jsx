import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useState } from "react";
import Avatar from 'react-avatar';
import styled from 'styled-components';
import RegisterPage from '../../Pages/Register/RegisterPage';
import { deleteUser } from "../../Pages/Users/UsersRepository";
import CenterModal from './CenterModal';
import ConfirmationPopup from './ConfirmationPopup';

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

const UserLabel = styled.label`
display: flex;
flex-grow: 1;
align-items: center;
justify-content: center;
cursor: pointer;
`;

const DeleteButton = styled.button`
  align-self: flex-start;
  margin-top: 12px;
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

function UserCardComponent(props,fetchUsers,user) {
  const [showPopup, setShowPopup] = useState(false);
  const [isDeleteConfirmation, setIsDeleteConfirmation] = useState(false);
  const [isCenterModalOpen, setIsCenterModalOpen] = useState(false);

    const handleDelete = async () => {
    setIsDeleteConfirmation(true);
    setShowPopup(true);
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

  const handleOpenCenterModal = () => {
    setIsCenterModalOpen(true);
  };

  const handleCloseCenterModal = () => {
    setIsCenterModalOpen(false);
  };

  return (
    <UserCard>  
          <Avatar name={props.user.email} size="50" round={true} />
          <UserLabel onClick={handleOpenCenterModal}>
            {props.user.email}
          </UserLabel>
          <DeleteButton onClick={handleDelete}>
            <Icon path={mdiClose} size={0.8} />
          </DeleteButton>
          {isCenterModalOpen && (
            <CenterModal><RegisterPage closePopup={handleCloseCenterModal} fetchUsers={props.fetchUsers}user={props.user} /></CenterModal>
          )}
      {showPopup && (
        <ConfirmationPopup
          question={"Tem certeza que deseja excluir?"}
          onConfirm={handleConfirmPopup}
          onCancel={handleClosePopup}
        />
      )}
    </UserCard>
  );
}

export default UserCardComponent;