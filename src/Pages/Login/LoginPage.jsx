import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "./Login.css";
import { getUserInfo } from "./LoginRepository";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameLabelPosition, setUsernameLabelPosition] = useState("top");
  const [passwordLabelPosition, setPasswordLabelPosition] = useState("top");
  const [redirectToToDoPage, setRedirectToToDoPage] = useState(false);

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
    await getUserInfo(username, password);
    setRedirectToToDoPage(true);
  };

  if (redirectToToDoPage) {
    return <Navigate to="/todos" />;
  }

  return (
    <div className="login-container">
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
          <div className='button-separator'></div>
          <button type="submit" className="login-button">Acessar</button>
      </form>
    </div>
  );
}

export default Login;