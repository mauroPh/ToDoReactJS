import React, { useState } from "react";
import { logout } from "../../services/auth";
import { addUser } from "../UsersList/UsersRepository";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState("684fd078-c7ba-4204-a133-1546f61ebda9");
  

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
      const user = await addUser({ email, password, profile });
      if (user) {
        // localStorage.setItem("token", user.token);
        // localStorage.setItem("email", user.username);
        logout();
        window.location.replace("/login");
      }
    } catch (error) {
      console.error("Erro no registro: ", error);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Criar Conta</h1>
      <form onSubmit={handleSubmit}>
        <label>
          E-mail:
          <input type="text" value={email} onChange={handleEmailChange} />
        </label>
        <label>
          Senha:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <label className="profile-label">
          Perfil:
          <select value={profile} onChange={handleProfileChange}>
            <option value="user">Usuário</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <button type="submit" className="reg-user-button">Criar Conta</button>
      </form>
    </div>
  );
}

export default RegisterPage;
