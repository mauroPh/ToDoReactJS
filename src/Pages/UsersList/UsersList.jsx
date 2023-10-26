import React, { useEffect, useState } from "react";
import Header from "../../components/Header/header";
import UserCardComponent from "../../components/UserCardComponent/UserCardComponent";
import RegisterPage from "../Register/RegisterPage";
import { deleteUser, getAllUsers, updateUser } from "./UsersRepository";

function UsersListPage() {
  const [users, setUsers] = useState([]);
  const [reloadAdd,setReloadAdd] = useState([]);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  
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

  async function handleUpdate(id, updatedUser) {
    try {
      await updateUser(id, updatedUser);
      setReloadAdd([...users]);
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

  function RegisterPopup({ onClose }) {
    function handleClose() {
      onClose();
    }
  
    return (
      <div className="popup">
        <header className="popup-header">
          <h2 className="popup-title">Adicionar usuário</h2>
          <button className="button-close" onClick={handleClose}>
            X
          </button>
        </header>
        <div className="register-container">
          <RegisterPage />
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
          {users.map((user) => (
            <UserCardComponent
              key={user.id}
              user={user}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              fetchUsers={fetchUsers}
            />
          ))}
        </ul>
        <button className="add-user-button" onClick={() => setShowRegisterPopup(true)}>
          Adicionar usuário
        </button>
        {showRegisterPopup && <RegisterPopup onClose={handleCloseRegisterPopup} />}
      </div>
    </div>
  );
}

export default UsersListPage;