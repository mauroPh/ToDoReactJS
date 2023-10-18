import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import iconToDo from '../../assets/lista-de-afazeres.png';
import "./Register.css";


function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameLabelPosition, setUsernameLabelPosition] = useState("top");
    const [passwordLabelPosition, setPasswordLabelPosition] = useState("top");
    // const [redirectToToDoPage, setRedirectToToDoPage] = useState(false);
  
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

    //   await getToken(username, password);
    //   setRedirectToToDoPage(true);

   
    };

    const handleBackLogin = () => {
        history('/');
    }

    
  
    // if (redirectToToDoPage) {
    //   return <Navigate to="/todo" />;
    // }
  
    return (
      <div className="login-container">
        <p>To-Do App</p>
        <h1 className="login-title">Faça seu cadastro</h1>
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
       
          <div className='button-containner'>
            <div className='button-separator'></div>
  
            <button type="submit" className="register-button">Criar conta</button>
            <button type="submit" className="login-button" onClick={handleBackLogin}>Acessar</button>
          </div>
        
          <img src={iconToDo} alt="Minha Imagem" className='imagem-fixa'/>
        </form>
      </div>
    );
  }
  
  export default Register;