import React, { useState } from "react";
import { addUser } from "../UsersList/UsersRepository";
import { logout } from "../../services/auth";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState("684fd078-c7ba-4204-a133-1546f61ebda9");
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // Novo estado

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
        // Realiza o logout após o registro bem-sucedido
        logout();

        // Define o estado de sucesso do registro como verdadeiro
        setRegistrationSuccess(true);
      }
    } catch (error) {
      console.error("Erro no registro: ", error);
    }
  };

  // Função para lidar com o botão "OK"
  const handleOK = () => {
    // Redireciona para a tela de login após clicar em "OK"
    window.location.replace("/login"); // Pode usar a navegação apropriada aqui
  };

  return (
    <div >
      {/* Não renderiza o título "Criar Conta" se o registro for bem-sucedido */}
      {registrationSuccess ? (
        <div>
          <p>Usuário criado com sucesso!</p>
          <button onClick={handleOK}>OK</button>
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default RegisterPage;
