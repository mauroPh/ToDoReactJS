import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "./RegisterRepository";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState("684fd078-c7ba-4204-a133-1546f61ebda9");
  const navigate = useNavigate();

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
      const user = await createUser(email, password, profile);
      if (user) {
        localStorage.setItem("token", user.token);
        localStorage.setItem("email", user.username);
        navigate("/");
      }
    } catch (error) {
      console.error("Erro no registro: ", error);
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Criar Conta</h1>
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
          <select value={profile} onChange={handleProfileChange}>
            <option value="perfil1">Perfil 1</option>
            <option value="perfil2">Perfil 2</option>
            {/* Adicione opções para outros perfis conforme necessário */}
          </select>
        </label>
        <button type="submit">Criar Conta</button>
      </form>
    </div>
  );
}

export default RegisterPage;
