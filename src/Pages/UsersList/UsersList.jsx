import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Header from "../../components/Header/header";
import UserCardComponent from "../../components/UserCardComponent/UserCardComponent";
import RegisterPage from "../Register/RegisterPage";
import { deleteUser, getAllUsers, updateUser } from "./UsersRepository";
import ConfirmationPopup from "../../components/ConfirmationPopup/ConfirmationPopup";

function UsersListPage() {
  const [users, setUsers] = useState([]);
  const [reloadAdd,setReloadAdd] = useState([]);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;
  
  const [isConfirmationPopupVisible, setIsConfirmationPopupVisible] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  async function fetchUsers() {
    try {
      const res = await getAllUsers();
      const users = res.result;
      setUsers(users);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchUsers();
    setUsers(reloadAdd);
  }, [reloadAdd]);

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
      setReloadAdd([...users]);
      // Mostra o popup de confirmação com a mensagem desejada
      showConfirmationPopup("Email e senha atualizados com sucesso");
    } catch (error) {
      console.error(error);
    }
  }
  // Função para mostrar o popup de confirmação
  const showConfirmationPopup = (message) => {
    setConfirmationMessage(message);
    setIsConfirmationPopupVisible(true);
  };

  async function handleDelete(id) {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  }

  function RegisterPopup({ onClose }) {
    return (
      <div className="popup">
        <div className="popup-container">
          <RegisterPage onClose={onClose} />
        </div>
      </div>
    );
  }
  
  function handleCloseRegisterPopup() {
    setShowRegisterPopup(false);
  }

  

   return (
    <div>
      <Header title="Gerenciar usuários" />
      <div className="App">
        <ul className="todo-list">
          {currentItems().map((user) => (
            <UserCardComponent
              key={user.id}
              user={user}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              fetchUsers={fetchUsers}
            />
          ))}
        </ul>
        {pageCount() > 1 && ( 
          <ReactPaginate
            pageCount={pageCount()}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
            previousLabel={"← Anterior"}
            nextLabel={"Próxima →"}
          />
        )}
        <button className="add-user-button" onClick={() => setShowRegisterPopup(true)}>
          Adicionar usuário
        </button>
        {showRegisterPopup && <RegisterPopup onClose={handleCloseRegisterPopup} />}
      </div>

      {/* Exibe o popup de confirmação se isConfirmationPopupVisible for true */}
      {isConfirmationPopupVisible && (
        <ConfirmationPopup
          question={confirmationMessage}
          onConfirm={() => {
            setIsConfirmationPopupVisible(false);
          }}
          onCancel={() => {
            setIsConfirmationPopupVisible(false);
          }}
        />
      )}
    </div>
  );
}

export default UsersListPage;