import React, { useState } from 'react';
import './header.css';

const Header = ({ userEmail }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const user = {
    email: 'usuario@email.com'
  };

  const handleDeleteAccount = () => {
    // Adicione aqui a lógica para deletar a conta
    console.log('Conta deletada');
  };

  return (
    <div className="header">
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
          <button onClick={handleDeleteAccount} className="delete-button">Deletar Conta</button>
        </div>
      )}
    </div>
  );
};

export default Header;
