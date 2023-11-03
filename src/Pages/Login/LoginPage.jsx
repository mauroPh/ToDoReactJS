import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import iconToDo from '../../assets/lista-de-afazeres.png';
import { UserContext } from "../../services/UserContext";
import '../../styles/style.sass';
import { getUserInfo } from "./LoginRepository";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameLabelPosition, setUsernameLabelPosition] = useState("top");
  const [passwordLabelPosition, setPasswordLabelPosition] = useState("top");
  const [redirectToToDoPage, setRedirectToToDoPage] = useState(false);
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

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
    const userInfo = await getUserInfo(username, password);
    setUser(userInfo);
    setRedirectToToDoPage(true);
  };

  useEffect(() => {
    if (redirectToToDoPage) {
      navigate("/todos");
    }
  }, [redirectToToDoPage, navigate]);

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
          <div className='button-separator'></div>
          <button type="submit" className="login-button">Acessar</button>
       
        <img src={iconToDo} alt="Minha Imagem" className='imagem-fixa'/>
        <div className='button-separator'></div>

      </form>
    </div>
  );
}

export default Login;