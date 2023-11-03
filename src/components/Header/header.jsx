import React, { useContext, useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../services/UserContext';
import { logout } from "../../services/auth";
import '../../styles/style.sass';
import { PopupAlert } from '../../styles/styledComponents/Popups';


const Header = ({ title, userEmail }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const userContext = useContext(UserContext); // Use UserContext
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
    if (localStorage.profileId !== 'ae576a80-ddb8-44f5-88f0-635ee39d559d') {
      setShowPopup(true);
    } else {
      history('/users');
      window.location.reload();
    }
  }

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <div className={isMenuOpen ? 'header open' : 'header'}>
      <div className="menu">
      <div className={`hamburger ${isMenuOpen ? "close" : ""}`} onClick={() => setMenuOpen(!isMenuOpen)}>
          <div className={isMenuOpen ? "line line-1" : "line"}></div>
          <div className={isMenuOpen ? "line line-2" : "line"}></div>
           <div className={isMenuOpen ? "line line-3" : "line"}></div>
    </div>
      </div>
      {isMenuOpen && (
        <div className="user-info">
          <h1 className="title">To-do App</h1>

          <Avatar name={localStorage.email} size="3vw" round={true} />
          <p>{localStorage.email}</p>
          <button className="menu-button" onClick={handleLandPage}>ToDo's</button>
          <div className='button-separator'></div>
          <button className="menu-button" onClick={handleUsersListPage}>Usuários</button>
          <div className='button-separator'></div>
          <button className="exit-button" onClick={handleLogout}>Sair</button>
        </div>
      )}
      {showPopup && (
       <PopupAlert>
         <h5>Oops! Você não tem permissão.</h5>
       </PopupAlert>
      )}
      <h1 className="title">{title}</h1>
    </div>
  );
};

export default Header;