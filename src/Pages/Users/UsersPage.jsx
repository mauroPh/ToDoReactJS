import { mdiAccountPlus } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Header from "../../components/Header/Header";
import CenterModal from '../../styles/styledComponents/CenterModal';
import UserCardComponent from "../../styles/styledComponents/UserCardComponent";
import RegisterPage from "../Register/RegisterPage";
import { deleteUser, getAllUsers, updateUser } from "./UsersRepository";


function UsersPage() {
  const [users, setUsers] = useState([]);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  
  async function fetchUsers() {
    try {
      const res = await getAllUsers();
      const users = res.result;
      setUsers(users);
      console.log("users",users);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  function pageCount() {
    return Math.ceil(users.length / itemsPerPage);
  }

  function currentItems() {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return users.slice(startIndex, endIndex);
  }

  function handlePageClick(data) {
    setCurrentPage(data.selected);
  }

  async function handleUpdate(id, updatedUser) {
    try {
      await updateUser(id, updatedUser);
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  }

  function handleEdit(user) {
    setSelectedUser(user);
    setShowRegisterPopup(true);
  }

  function handleCloseRegisterPopup() {
    setSelectedUser(null);
    setShowRegisterPopup(false);
  }

  const handleDeleteUser = (user) => {
    setUserToDelete(user);
  };

  const handleClosePopup = () => {
    setUserToDelete(null);
  };

  const handleConfirmPopup = async () => {
    try {
      await handleDelete(userToDelete.id);
      fetchUsers();
      handleClosePopup();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Header title="Gerenciar usuários" />
      <div className="App">
        <ul className="todo-list">
          {currentItems().map((user) => (
            <UserCardComponent
              key={user.userId}
              user={user}
              handleDelete={handleDeleteUser}
              handleUpdate={handleUpdate}
              fetchUsers={fetchUsers}
              handleEdit={() => handleEdit(user)}
            />
          ))}
        </ul>
        <ReactPaginate
          pageCount={pageCount()}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          previousLabel={"← Anterior"}
          nextLabel={"Próxima →"}
        />

        <button className="add-user-button" onClick={() => setShowRegisterPopup(true)}>
        <Icon path={mdiAccountPlus} size={1} />
        </button>
        {showRegisterPopup && <CenterModal><RegisterPage closePopup={handleCloseRegisterPopup} fetchUsers={fetchUsers} /></CenterModal>}
        {userToDelete && (
          <div className="popup">
            <div className="popup-content">
              <h2>Tem certeza que deseja excluir o usuário?</h2>
              <div className="button-container">
                <button className="popup-content button" onClick={handleConfirmPopup}>Sim</button>
                <button className="popup-content button" onClick={handleClosePopup}>Não</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UsersPage;