import { mdiAccount, mdiCheckOutline, mdiExitToApp } from '@mdi/js';
import Icon from '@mdi/react';
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
        <div className="menu-opened">
          <h1 className="menu-title">To-do App</h1>
          <div className='button-separator'></div>
          <div className='menu-user-logged'>
          <Avatar name={localStorage.email} size="2vw" round={true} />
          <p className='menu-email-user'>{localStorage.email}</p>
          </div>
          
          <div className='menu-item' onClick={handleLandPage}>
            <Icon path={mdiCheckOutline} size={1} />
            <button className="menu-button">ToDo's</button>
          </div>
          <div className='menu-item' onClick={handleUsersListPage}>
            <Icon path={mdiAccount} size={1} />
            <button className="menu-button">Usuários</button>
          </div>
          <div className='menu-item' onClick={handleLogout}>
            <Icon path={mdiExitToApp} size={1} />
            <button className="exit-button">Sair</button>
          </div>
          
        </div>
      )}
      {showPopup && (
       <PopupAlert>
         <h3>Oops! Você não tem permissão.</h3>
       </PopupAlert>
      )}
      <h1 className="title">{title}</h1>
    </div>
  );
};

export default Header;