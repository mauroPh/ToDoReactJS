import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from '../Pages/Login/LoginPage';
import RegisterPage from '../Pages/Register/RegisterPage';
import ToDoPage from '../Pages/ToDo/ToDoPage';
import UsersPage from '../Pages/Users/UsersPage';
import { isAuthenticated } from "../services/auth";

const PrivateRoute = ({ children }) => (
  isAuthenticated() ? children : <Navigate to="/" />
);

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/todos" element={
        <PrivateRoute>
          <ToDoPage />
        </PrivateRoute>
      } />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;

