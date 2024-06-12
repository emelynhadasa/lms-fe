/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS globally
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons globally
import Login from './pages/Login';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import Customer from './pages/Customer';
import Transaction from './pages/Transaction';
import Service from './pages/Service';
import './styles/main.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/service" element={<Service />} />
      </Routes>
    </Router>
  );
};

export default App;
