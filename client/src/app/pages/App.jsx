import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { LoginPage } from '../auth/Login';
import { Layout } from '../../components/shared/Layout';

export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const handleLogin = (username, password, remember) => {
    console.log('Login attempt:', { username, password, remember });
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Layout activeTab={location.pathname.slice(1)}>
      <Outlet />
    </Layout>
  );
};
