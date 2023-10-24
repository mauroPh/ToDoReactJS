import { api } from "../Login/LoginRepository";

async function createUser(email, password, profile, token) {
    try {
      const response = await api.post("/users/create", {
        email: email,
        password: password,
        profile: profile,
      }, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      
      
      if (response.status === 201) {
        console.log("createUser ", response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", response.data.username);
        return response.data; 
      } else {
        
        console.error("Erro ao criar usuário: ", response);
        throw new Error("Erro ao criar usuário");
      }
    } catch (error) {
      console.error("Erro na solicitação createUser:", error);
      
      throw error;
    }
  }
  
  export { createUser };




