import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import AddTodoFormComponent from "../../components/AddToDoFormComponent/AddToDoFormComponent";
import Header from "../../components/Header/header";
import ToDoItemComponent from "../../components/ToDoItemComponent/ToDoItemComponent";
import "./ToDo.css";
import { addTodo, deleteTodo, getAllTodos, updateTodo } from "./ToDoRepository";

function ToDoPage() {
  const [todos, setTodos] = useState([]);
   const [reloadAdd, setReloadAdd] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const [showSuccessAlert, setShowSuccessAlert] = useState(false); // Estado para controlar o aviso de tarefa adicionada com sucesso
  const [showEmptyAlert, setShowEmptyAlert] = useState(false); // Estado para controlar o aviso de mensagem vazia


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
  }, [reloadAdd]);

  function pageCount() {
    return Math.ceil(todos.length / itemsPerPage);
  }

  function currentItems() {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return todos.slice(startIndex, endIndex);
  }

  function handlePageClick(data) {
    setCurrentPage(data.selected);
  }

  async function handleAddTodo(todo) {
    if (todo.description.trim() === "") {
      setShowEmptyAlert(true);
      setShowSuccessAlert(false);
    } else {
      try {
        const newTodo = await addTodo(todo);
        setReloadAdd([...todos, newTodo]);
        setShowSuccessAlert(true);
        setShowEmptyAlert(false);
      } catch (error) {
        console.error(error);
      }
    }
  }
  useEffect(() => {
    if (showSuccessAlert) {
      const successTimeout = setTimeout(() => {
        setShowSuccessAlert(false);
      }, 5000);
      return () => clearTimeout(successTimeout);
    }
    if (showEmptyAlert) {
      const emptyTimeout = setTimeout(() => {
        setShowEmptyAlert(false);
      }, 5000);
      return () => clearTimeout(emptyTimeout);
    }
  }, [showSuccessAlert, showEmptyAlert]);

  async function handleCheckboxChange(todoId) {
    const todo = todos.find((t) => t.todoId === todoId);
    todo.completed = !todo.completed;
    await updateTodo(todoId, todo);
    fetchTodos();
  }

  async function handleUpdate(id, updatedTodo) {
    try {
      await updateTodo(id, updatedTodo);
      fetchTodos();
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
      <Header title="To Do" />
      <div className="App">
        <div className="todo-list">
          <div className="list-container">
            {currentItems().map((todo) => (
              <ToDoItemComponent
                key={todo.id}
                todo={todo}
                handleCheckboxChange={handleCheckboxChange}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
                fetchTodos={fetchTodos}
              />
            ))}
          </div>
        </div>
        {pageCount() > 1 && ( 
          <ReactPaginate
            pageCount={pageCount()}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
            previousLabel={"← Anterior"}
            nextLabel={"Próxima →"}
          />
        )}
        {showSuccessAlert && <div className="success-alert">Tarefa adicionada com sucesso!</div>}
          {showEmptyAlert && <div className="alert">Por favor, insira algum texto antes de adicionar uma nova tarefa.</div>}
          <div className="list-container"></div>
        <AddTodoFormComponent saveTodo={handleAddTodo} />
      </div>
    </div>
  );
}

export default ToDoPage;