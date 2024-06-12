/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import LoginForm from '../components/Auth/LoginForm';

const Login = () => {
  const [token, setToken] = useState('');

  return (
    <div className="login-page">
      <LoginForm setToken={setToken} />
    </div>
  );
};

export default Login;
