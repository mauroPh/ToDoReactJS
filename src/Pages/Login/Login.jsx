import React, { useState } from "react";
import mario from '../../assets/lista-de-afazeres.png';
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameLabelPosition, setUsernameLabelPosition] = useState("top");
  const [passwordLabelPosition, setPasswordLabelPosition] = useState("top");

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
    setUsernameLabelPosition(value ? "floating" : "top");
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    setPasswordLabelPosition(value ? "floating" : "top");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    // Adicione aqui a lógica para autenticar o usuário
  };

  return (
    <div className="login-container">
      <p>To-Do App</p>
      <h1 className="login-title">Fazer login</h1>
      <form onSubmit={handleSubmit}>
        <label className={`label-${usernameLabelPosition}`}>
          E-mail:
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
        <label className={`label-${passwordLabelPosition}`}>
          Senha:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <p className="text-display-medium">
          Esqueceu seu email ou sua senha?
          <a href="cadastro.html">Clique aqui</a>
        </p>

        <div className='button-containner'>
          <div className='button-separator'></div>

          <button type="submit" className="register-button">Criar conta</button>
          <button type="submit" className="login-button">Acessar</button>
        </div>

        <img src={mario} alt="Minha Imagem" className='imagem-fixa'/>
      </form>
    </div>
  );
}

export default Login;
