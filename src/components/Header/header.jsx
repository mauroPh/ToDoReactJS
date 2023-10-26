import React, { useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { logout } from "../../services/auth";
import './header.css';

const Header = ({ title }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const user = {
    email: localStorage.getItem('email')
  };
  const [redirectToUsersListPage, setRedirectToUsersListPage] = useState(false);
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
    setRedirectToUsersListPage(true);
  }

  if (redirectToUsersListPage) {
    return <Navigate to="/users" />;
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