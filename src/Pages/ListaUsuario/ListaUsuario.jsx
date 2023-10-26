import React, { useEffect ,useState } from "react";
import "./ListaUsuario.css";
import Header from "../../components/Header/header";
import ToDoItemComponent from "../../components/ToDoItemComponent/ToDoItemComponent";
import { getAllUsers, deleteUser } from "../ListaUsuario/ListaUsuarioRepository";





function ListaUsuario() {
  const [users, setUsers,] = useState([]);
  const [reloadAdd, setReloadAdd] = useState([]); //adicionei um novo estado para armazenar a lista atualizada 
  

  
  async function fetchUsers() {
    try {
      const res = await getAllUsers();
      console.log("fetchUsers response:", res);
      const users = res.result;
      console.log("fetchUsers users:", users);
      setUsers(users);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchUsers();
    setUsers(reloadAdd); // passo a atualizar  o estado da lista de tarefas
  }, [reloadAdd]);





//   async function handleUpdate(id, updatedTodo) {
//     try {
//       await updateTodo(id, updatedTodo);
//       setReloadAdd([...todos]); // atualiza a lista de tarefas
//     } catch (error) {
//       console.error(error);
//     }
//   }

  async function handleDelete(id) {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  }

  
  return (  
    <div>
    <Header/>
    
    <div className="App">
      <ul className="todo-list">
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>E-mail</th>
                <th>Profile ID</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            {users.map(i => (
                console.log(i),
                <tr key={i.userId}>
                    <td>{i.userId}</td>
                    <td>{i.email}</td>
                    <td>{i.profile.profileId}</td>
                    <td>{i.profile.description}</td>
                </tr>
            ))}
        </tbody>
    </table>
      </ul>
     
     
    </div>
    </div>
  );
}

export default ListaUsuario;