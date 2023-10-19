import React, { useEffect, useState } from "react";
import AddTodoFormComponent from "../../components/AddToDoFormComponent";
import ToDoItemComponent from "../../components/ToDoItemComponent";
import "./ToDo.css";
import { addTodo, deleteTodo, getAllTodos,updateTodo } from "./ToDoRepository";
import Header from "../../components/Header/header";



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
    <Header/>
    
    <div className="App">
      <ul className="todo-list">
        {todos.map((todo) => (
          <ToDoItemComponent
            key={todo.id}
            todo={todo}
            handleCheckboxChange={updateTodoStatus}
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