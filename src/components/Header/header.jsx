import React, { useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/auth";
import './header.css';
import { UserContext } from '../../services/UserContext';

const Header = ({ title, userEmail }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const userContext = useContext(UserContext); 
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
    console.log("header : ", localStorage)
    setMenuOpen(false);
    if (localStorage.profile === '684fd078-c7ba-4204-a133-1546f61ebda9') {
   alert("Você não tem permissão para acessar essa página")
    } else {
      history('/users');
      window.location.reload();
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
          <p>{localStorage.email}</p>
          <button className="login-button" onClick={handleLandPage}>ToDo's</button>
          <button className="login-button" onClick={handleUsersListPage}>Usuários</button>
          <button className="register-button" onClick={handleLogout}>Sair</button>
        </div>
      )}
      <h1 className="title">{title}</h1>
    </div>
  );
};

export default Header;