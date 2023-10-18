import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import './index.css';
import LoginPage from './Pages/Login/LoginPage.jsx';
import ToDoPage from './Pages/ToDo/ToDoPage.jsx';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/todo" element={<ToDoPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
