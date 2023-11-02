import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const api = axios.create({
      baseURL: 'http://localhost:8080/api',
    });

    api.interceptors.response.use(
      (response) => {
        if (response.data && response.data.result) {
          const { username, profileId } = response.data.result;
          setUser({ email: username, profileId });
        }
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};