import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/auth";
import '../../styles/style.sass';

const Header = ({ title, userEmail }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const user = {
    email: localStorage.getItem('email') || "usuario@gmail.com",
  };
  const history = useNavigate();

  function handleLandPage() {
    setMenuOpen(false);
    history('/todos');
    window.location.reload();
  }

  function handleLogout() {
    logout();
    handleLandPage();
  }

  function handleUsersListPage() {
    setMenuOpen(false);
    history('/users');
    window.location.reload();
  }

  return (
    <div className={isMenuOpen ? 'header open' : 'header'}>
      <div className="menu">
        <div className="hamburger" onClick={() => setMenuOpen(!isMenuOpen)}>
          <div className={isMenuOpen ? "line line-1" : "line"}></div>
          <div className={isMenuOpen ? "line line-2" : "line"}></div>
          <div className={isMenuOpen ? "line line-3" : "line"}></div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="user-info">
          <p>{user.email}</p>
          <button className="menu-button" onClick={handleLandPage}>ToDo's</button>
          <div className='button-separator'></div>
          <button className="menu-button" onClick={handleUsersListPage}>Usuários</button>
          <div className='button-separator'></div>
          <button className="exit-button" onClick={handleLogout}>Sair</button>
        </div>
      )}
      <h1 className="title">{title}</h1>
    </div>
  );
};

export default Header;