import React, { useEffect, useState } from "react";
import AddTodoFormComponent from "../../components/AddToDoFormComponent";
import ToDoListComponent from "../../components/ToDoListComponent";
import "./ToDo.css";
import { addTodo, getAllTodos } from "./ToDoRepository";

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

  function deleteTodo (id) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  

  return (  
    <div className="App">
      <h1 className="title">To-Do App</h1>
      <ToDoListComponent
        todos={todos}
        handleCheckboxChange={updateTodoStatus}
        handleDelete={deleteTodo}
      />
      <AddTodoFormComponent saveTodo={handleAddTodo} />
    </div>
  );
}

export default ToDoPage;