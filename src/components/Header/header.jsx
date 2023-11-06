import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/auth";
import './header.css';

const Header = ({ title, userEmail }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const user = {
    email: localStorage.getItem('email'),
    profileId: localStorage.getItem('profileId'), 
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

    
    if (user.profileId === "ae576a80-ddb8-44f5-88f0-635ee39d559d") {
      history('/users');
      window.location.reload();
    } else {
      
      alert("Você não tem permissão para acessar esta página.");
    }
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
          <button className="login-button" onClick={handleLandPage}>ToDo's</button>
          <div className='button-separator'></div>
          <button className="login-button" onClick={handleUsersListPage}>Usuários</button>
          <div className='button-separator'></div>
          <button className="register-button" onClick={handleLogout}>Sair</button>
        </div>
      )}
      <h1 className="title">{title}</h1>
    </div>
  );
};

export default Header;
