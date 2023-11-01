import React, { useState } from "react";
import { addUser } from "../UsersList/UsersRepository";
import { logout } from "../../services/auth";
import "./Register.css";

function RegisterPage({onClose}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState("684fd078-c7ba-4204-a133-1546f61ebda9");
  const [registrationSuccess, setRegistrationSuccess] = useState(false); 
  const [emailError, setEmailError] = useState("");
const [passwordError, setPasswordError] = useState("");

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
    setEmailError("");
    setPasswordError("");
    
    if (!email) {
      setEmailError("Por favor, insira um endereço de e-mail.");
    }
    if (!password) {
      setPasswordError("Por favor, insira uma senha.");
    }
  
    if (!email || !password) {
      return;
    }
  
    try {
      const user = await addUser({ email, password, profile });
      if (user) {
        logout();
        setRegistrationSuccess(true);
      }
    } catch (error) {
      console.error("Erro no registro: ", error);
    }
  };
  

  const handleOK = () => {
    window.location.replace("/login");
  };

  return (
    <div >
      {registrationSuccess ? (
        <div>
          <p>Usuário criado com sucesso!</p>
          <button className="reg-user-button" onClick={handleOK}>OK</button>
        </div>
      ) : (
        <div className="login-container">
          <h1 className="login-title">Criar Conta</h1>
          <button className="button-close" onClick={onClose}>
            X
          </button>
          <form onSubmit={handleSubmit}>
  <label>
    E-mail:
    <input type="text" value={email} onChange={handleEmailChange} />
    {emailError && <div style={{ color: "red" }}>{emailError}</div>}
  </label>
  <label>
    Senha:
    <input type="password" value={password} onChange={handlePasswordChange} />
    {passwordError && <div style={{ color: "red" }}>{passwordError}</div>}
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
      )}
    </div>
  );
}

export default RegisterPage;
