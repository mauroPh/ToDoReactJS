import React, { useEffect, useState } from "react";
import AddTodoFormComponent from "../../components/AddToDoFormComponent";
import ToDoItemComponent from "../../components/ToDoItemComponent";
import "./ToDo.css";
import { addTodo, deleteTodo, getAllTodos } from "./ToDoRepository";

function ToDoPage() {
  const [todos, setTodos,] = useState([]);
  const [reloadAdd, setReloadAdd] = useState([]); //adicionei um novo estado para armazenar a lista atualizada de tarefas
  
  
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
    setTodos(reloadAdd); // passo a atualizar  o estado da lista de tarefas
  }, [reloadAdd]);


  async function handleAddTodo(todo) {
    try {
      const newTodo = await addTodo(todo);
      setReloadAdd([...todos, newTodo]); // atualizo o estado com a lista atualizada de tarefas
    } catch (error) {
      console.error(error);
    }
  }

  function updateTodoStatus(id, completed) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  async function handleDelete(id) {
    try {
      await deleteTodo(id);
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  }
  

  return (  
    <div className="App">
      <h1 className="title">To-Do App</h1>
    
      <ul>
        {todos.map((todo) => (
          <ToDoItemComponent
            key={todo.id}
            todo={todo}
            handleCheckboxChange={updateTodoStatus}
            handleDelete={handleDelete}
            fetchTodos={fetchTodos}
          />
        ))}
      </ul>
      <AddTodoFormComponent saveTodo={handleAddTodo} />
    </div>
  );
}

export default ToDoPage;