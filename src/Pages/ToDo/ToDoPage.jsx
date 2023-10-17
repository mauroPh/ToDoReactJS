import React, { useEffect, useState } from "react";
import AddTodoFormComponent from "../../components/AddToDoFormComponent";
import ToDoListComponent from "../../components/ToDoListComponent";
import "./ToDo.css";
import { addTodo, getAllTodos, updateTodo } from "./ToDoRepository";

function ToDoPage() {
  const [todos, setTodos] = useState([]);
  const [formText, setFormText] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      const todosFromAPI = await getAllTodos();
      console.log('fetchTodos ', todosFromAPI);
      setTodos(todosFromAPI);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteTodo(id) {
    try {
      await deleteTodo(id);
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error(error);
    }
  }

  async function updateTodoStatus(id) {
    try {
      const todoToUpdate = todos.find((todo) => todo.id === id);
      const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };
      await updateTodo(id, updatedTodo);
      const updatedTodos = todos.map((todo) => (todo.id === id ? updatedTodo : todo));
      setTodos(updatedTodos);
    } catch (error) {
      console.error(error);
    }
  }

  async function addNewTodo(task) {
    try {
      const newTodo = await addTodo(task);
      setTodos((todos) => [...todos, newTodo]);
    } catch (error) {
      console.error(error);
    } finally {
      setFormText("");
    }
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