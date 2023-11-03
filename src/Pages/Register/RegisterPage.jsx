import React, { useState } from "react";
import { addUser } from "../UsersList/UsersRepository";
import { logout } from "../../services/auth";

function RegisterPage({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState("user");
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

    if (!email) {
      setEmailError(<span style={{ color: "red" }}>Preencha o campo de email</span>);
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError(<span style={{ color: "red" }}>Preencha o campo de senha</span>);
    } else {
      setPasswordError("");
    }

    if (email && password) {
      console.log(profile)
      try {
        let profileId = profile === "admin" ? "ae576a80-ddb8-44f5-88f0-635ee39d559d" : "684fd078-c7ba-4204-a133-1546f61ebda9";
        const user = await addUser({ email, password, profile: {
          profileId: profileId,
          
        } });
        if (user) {
          if (profile === "admin") {
            localStorage.setItem("admin", true);
          }
          logout();
          setRegistrationSuccess(true);
        } 
      } catch (error) {
        console.error("Erro no registro: ", error);
      }
    }
  };

  const handleOK = () => {
    window.location.replace("/login");
  };

  return (
    <div>
      {registrationSuccess ? (
        <div>
          <p>Usuário criado com sucesso!</p>
          <button className="reg-user-button" onClick={handleOK}>
            OK
          </button>
        </div>
      ) : (
        <div className="popup-container">
          <h1 className="login-title">Criar Conta</h1>
          <button className="button-close" onClick={onClose}>
            X
          </button>
          <form onSubmit={handleSubmit}>
            <label>
              E-mail:
              <input type="text" value={email} onChange={handleEmailChange} />
              <div className="error-message">{emailError}</div>
            </label>
            <label>
              Senha:
              <input type="password" value={password} onChange={handlePasswordChange} />
              <div className="error-message">{passwordError}</div>
            </label>
            <label className="profile-label">
              Perfil:
              <select value={profile} onChange={handleProfileChange}>
                <option value="user">Usuário</option>
                <option value="admin">Admin</option>
              </select>
            </label>
            <button type="submit" className="login-button">
              Criar Conta
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default RegisterPage;