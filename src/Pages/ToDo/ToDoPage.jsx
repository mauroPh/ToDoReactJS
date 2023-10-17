import React, { useEffect, useState } from "react";
import AddTodoFormComponent from "../../components/AddToDoFormComponent";
import ToDoListComponent from "../../components/ToDoListComponent";
import "./ToDo.css";
import { getAllTodos } from "./ToDoRepository";

function ToDoPage() {
  const [todos, setTodos] = useState([]);
  const [formText, setFormText] = useState("");
  
  
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
  }, []);

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
    <AddTodoFormComponent  setFormText={setFormText} />
    </div>
  );
}

export default ToDoPage;