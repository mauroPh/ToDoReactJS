import React, { useEffect, useState } from 'react';
import AppRoutes from './routes/routes';
import { UserContext } from './services/UserContext';
const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userFromLocalStorage = {
      email: localStorage.getItem('email'),
      profileId: localStorage.getItem('profileId'),
    };
    setUser(userFromLocalStorage);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <AppRoutes />
    </UserContext.Provider>
  );
};

export default App;