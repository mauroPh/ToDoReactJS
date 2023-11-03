import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from '../Pages/Login/LoginPage';
import RegisterPage from '../Pages/Register/RegisterPage';
import ToDoPage from '../Pages/ToDo/ToDoPage';
import UsersPage from '../Pages/UsersList/UsersList';
import { getProfileId, isAuthenticated } from "../services/auth"

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/users" element={isAuthenticated() && getProfileId() === 'ae576a80-ddb8-44f5-88f0-635ee39d559d' ? <UsersPage /> : <Navigate to="/" />} />
      <Route path="/register" element={isAuthenticated() && getProfileId() === 'ae576a80-ddb8-44f5-88f0-635ee39d559d' ? <RegisterPage /> : <Navigate to="/" />} />
      <Route path="/todos" element={isAuthenticated() ? <ToDoPage /> : <Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;

