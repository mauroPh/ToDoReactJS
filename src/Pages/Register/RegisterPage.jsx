import { mdiCloseCircle } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useState } from "react";
import { addUser, updateUser } from "../Users/UsersRepository";

function RegisterPage({ closePopup, fetchUsers, user }) {
  const [email, setEmail] = useState(user ? user.email : "");
  const [password, setPassword] = useState(user ? user.password : "");
  const [profile, setProfile] = useState(user ? user.profile : "user");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleProfileChange = (event) => {
    setProfile(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const profileId = profile === "user" ? "684fd078-c7ba-4204-a133-1546f61ebda9" : "ae576a80-ddb8-44f5-88f0-635ee39d559d";
      if (user) {
        let updatedFields = {};
        if (email !== user.email) updatedFields.email = email;
        if (password !== user.password) updatedFields.password = password;
        if (profileId !== user.profile) updatedFields.profile = profileId;
  
        console.log("register: ", user.userId, updatedFields);
    
        const updatedUser = await updateUser(user.userId, updatedFields);
        if (updatedUser) {
          closePopup();
          fetchUsers();
        }
      } else {
        const newUser = await addUser({ email, password, profile: profileId });
        if (newUser) {
          closePopup();
          fetchUsers();
        }
      }
    } catch (error) {
      console.error("Erro no registro: ", error);
    }
  };

  return (
    <div className="login-container">
      <button className="button-close" onClick={closePopup}>
       <Icon path={mdiCloseCircle} size={0.8} color= 'rgba(230, 0, 10, 1)'></Icon> </button>
      <h1 className="login-title">{user ? "Editar Usuário" : "Adicionar Usuário"}</h1> 
      <form onSubmit={handleSubmit}>
        <label>
          E-mail:
          <input type="text" value={email} onChange={handleEmailChange} />
        </label>
        <label>
          Senha:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <label>
          Perfil:
          <select value={profile} onChange={handleProfileChange} className='select-profile'>
            <option value="admin">Admin</option>
            <option value="user">Usuário</option>
          </select>
        </label>
        <button type="submit" className="login-button">{user ? "Salvar" : "Adicionar"}</button>
      </form>
    </div>
  );
}

export default RegisterPage;