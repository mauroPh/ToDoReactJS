import React, { useEffect, useState } from "react";
import AddTodoFormComponent from "../../components/AddToDoFormComponent/AddToDoFormComponent";
import Header from "../../components/Header/header";
import ToDoItemComponent from "../../components/ToDoItemComponent/ToDoItemComponent";
import "./ToDo.css";
import { addTodo, deleteTodo, getAllTodos, updateTodo } from "./ToDoRepository";



function ToDoPage() {
  const [todos, setTodos,] = useState([]);
  const [reloadAdd, setReloadAdd] = useState([]); //adicionei um novo estado para armazenar a lista atualizada de tarefas
  

  
  async function fetchTodos() {
    try {
      const res = await getAllTodos();
      const todos = res.result.content;
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

  async function handleCheckboxChange(todoId) {
    const todo = todos.find((t) => t.todoId === todoId);
    todo.completed = !todo.completed;
    await updateTodo(todoId, todo);
    fetchTodos();
  }

  async function handleUpdate(id, updatedTodo) {
    try {
      await updateTodo(id, updatedTodo);
      setReloadAdd([...todos]); // atualiza a lista de tarefas
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

  
  return (  
    <div>
     <Header title="My ToDo App" />
    
    <div className="App">
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