import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import iconToDo from '../../assets/todo.svg';
import "./Login.css";
import { getUserInfo } from "./LoginRepository";
import { logout } from "../../services/auth";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameLabelPosition, setUsernameLabelPosition] = useState("top");
  const [passwordLabelPosition, setPasswordLabelPosition] = useState("top");
  const [redirectToToDoPage, setRedirectToToDoPage] = useState(false);

  const history = useNavigate();

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
    let response = await getUserInfo(username, password)
    console.log("response = ", response)
    if (response !== undefined) {
      console.log('não sou undefined');
      history('/todos');
    } else {
      logout();
    }
  };

  return (
    <div className="login-container">
     <img src={iconToDo} alt="Minha Imagem" className='imagem-fixa' style={{ width: '100px', height: '100px' }}/>
      <p>To Do</p>
      <h1 className="login-title">Login</h1>
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
          <div className='button-separator'></div>
          <button type="submit" className="login-button">Entrar</button>
      </form>
    </div>
  );
}

export default Login;