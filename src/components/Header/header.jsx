import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/auth";
import AlertDialog from '../ConfirmDiolog/ConfirmDiolog';
import './header.css';

const Header = ({ userEmail }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const user = {
    email: localStorage.getItem('email') || "usuario@gmail.com",
  };

  const history = useNavigate();
  const handleLandPage = () => {
    history('/');
};

  // const handleDeleteAccount = () => {
  //   console.log('Conta deletada');
  // };

  function handleLogout() {
    logout();
    handleLandPage();
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
          <button className="register-button" onClick={handleLogout}>Logout</button>
          <button onClick={() => AlertDialog()} className="login-button">Deletar Conta</button>
         
        </div>
      )}
      <h1 className="title">To-Do App</h1>

    </div>
  );
};

export default Header;
