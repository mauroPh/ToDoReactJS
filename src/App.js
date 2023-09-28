import React, { useState } from 'react';

import './App.css';
import { default as TodoList } from './components/ToDoListComponent';

import add from '../src/assets/plus-solid.svg';


function App() {
  //Lista inicial das tarefasclear
    const [todos, setTodos] = useState([
    { id: 1, text: 'Fazer compras', completed: false },
    { id: 2, text: 'Estudar React', completed: true },
    
  ]);

  // Define o estado para controlar o valor do campo de entrada de texto
  const [newTodoText, setNewTodoText] = useState('');

  // Função para adicionar uma nova tarefa
  const addTodo = (text) => {
    if (text.trim() === '') {
      return; // Evita adicionar tarefas em branco
    }
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
    setNewTodoText(''); // Limpa o campo de entrada após a adição
  };

  // Função para remover uma tarefa com base no ID
  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleCheckboxChange = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div className="App">
      <h1>Aplicativo To-Do</h1>
     
      <TodoList
        todos={todos}
        handleCheckboxChange={handleCheckboxChange}
        handleDelete={handleDelete}
      />
       <div className='todo-input'>
        <input  className='todo-input-text'
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Adicione uma nova tarefa"
        />
        <button className='todo-input-button' onClick={() => addTodo(newTodoText)}> <img src={add} alt="add-icon" className='add-icon'/>  </button>
      </div>
    </div>
  );
}

export default App;