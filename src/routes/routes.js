import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from "../services/auth";
import LoginPage from '../Pages/Login/LoginPage';
import ToDoPage from '../Pages/ToDo/ToDoPage';
import RegisterPage from '../Pages/Register/RegisterPage';
import ListaUsuario from '../Pages/ListaUsuario/ListaUsuario';

const PrivateRoute = ({ children }) => (
  isAuthenticated() ? children : <Navigate to="/" />
);

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/lista-usuario" element={<ListaUsuario />} />
      <Route path="/todo" element={
        <PrivateRoute>
          <ToDoPage />
        </PrivateRoute>
      } />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;

