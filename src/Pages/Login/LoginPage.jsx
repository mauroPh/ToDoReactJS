import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import iconToDo from '../../assets/lista-de-afazeres.png';
import "./Login.css";
import { getUserInfo } from "./LoginRepository";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameLabelPosition, setUsernameLabelPosition] = useState("top");
  const [passwordLabelPosition, setPasswordLabelPosition] = useState("top");
  const [redirectToToDoPage, setRedirectToToDoPage] = useState(false);

  const history = useNavigate();
  const handleRegister = () => {
    history('/register');
};

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


  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = await getUserInfo(username, password);
    if (token) {
      localStorage.setItem('token', token); 
      setRedirectToToDoPage(true);
    }
  };


  

  if (redirectToToDoPage) {
    return <Navigate to="/todo" />;
  }

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

          <button type="submit" className="register-button" onClick={handleRegister}>Criar conta</button>
          <button type="submit" className="login-button">Acessar</button>
        </div>

        <img src={iconToDo} alt="Minha Imagem" className='imagem-fixa'/>
      </form>
    </div>
  );
}

export default Login;