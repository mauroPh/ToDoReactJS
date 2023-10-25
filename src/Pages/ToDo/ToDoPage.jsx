import React, { useEffect, useState } from "react";
import AddTodoFormComponent from "../../components/AddToDoFormComponent/AddToDoFormComponent";
import Header from "../../components/Header/header";
import ToDoItemComponent from "../../components/ToDoItemComponent/ToDoItemComponent";
import "./ToDo.css";
import { addTodo, deleteTodo, getAllTodos, updateTodo } from "./ToDoRepository";
import { useNavigate } from "react-router-dom";


function ToDoPage() {
  const [todos, setTodos,] = useState([]);
  const [reloadAdd, setReloadAdd] = useState([]);
  const navigate = useNavigate();
  

  
  async function fetchTodos() {
    try {
      const res = await getAllTodos();
      console.log("fetchTodos result:", res);
      const todos = res.result.content;
      console.log("fetchTodos todos:", todos);
      setTodos(todos);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchTodos();
    setTodos(reloadAdd);
  }, [reloadAdd]);


  async function handleAddTodo(todo) {
    try {
      const newTodo = await addTodo(todo);
      setReloadAdd([...todos, newTodo]); 
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCheckboxChange(todoId) {
    const todo = todos.find((t) => t.todoId === todoId);
    todo.completed = !todo.completed;
    await updateTodo(todoId, todo);
    fetchTodos();
  }

  async function handleUpdate(id, updatedTodo) {
    try {
      await updateTodo(id, updatedTodo);
      setReloadAdd([...todos]);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTodo(id);
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  }
  const handleCreateUser = () => {
    navigate("/register");
  };

  
  return (  
    <div>
    <Header/>
    
    <div className="App">
    <div className="button-container">
    <button onClick={handleCreateUser} className="create-user-button">
          Criar Novo Usuário
        </button>
        </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <ToDoItemComponent
            key={todo.id}
            todo={todo}
            handleCheckboxChange={handleCheckboxChange}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            fetchTodos={fetchTodos}
          />
        ))}
      </ul>
      <AddTodoFormComponent saveTodo={handleAddTodo} />
     
    </div>
    </div>
  );
}

export default ToDoPage;