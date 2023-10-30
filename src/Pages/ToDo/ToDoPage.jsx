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
  const [itemsPerPage, setItemsPerPage] = useState(6);

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
  }, []);

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
      <Header title="My ToDo App" />
      <div className="App">
        <ul className="todo-list">
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
        </ul>
        <ReactPaginate
          pageCount={pageCount()}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          previousLabel={"← Anterior"}
          nextLabel={"Próxima →"}
        />
        <AddTodoFormComponent saveTodo={handleAddTodo} fetchTodos={fetchTodos} />
      </div>
    </div>
  );
}

export default ToDoPage;