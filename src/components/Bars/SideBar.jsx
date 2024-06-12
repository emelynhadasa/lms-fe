/* eslint-disable no-unused-vars */
// src/components/SideBar.jsx
import React, { useState } from 'react';
import { FaHome, FaUsers, FaTshirt, FaSignOutAlt, FaListAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SideBar = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`sidebar ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to="/dashboard" className="sidebar-icon" title="Dashboard">
        <FaHome />
        {isHovered && <span>Dashboard</span>}
      </Link>
      <Link to="/customer" className="sidebar-icon" title="Customer">
        <FaUsers />
        {isHovered && <span>Customer</span>}
      </Link>
      <Link to="/transaction" className="sidebar-icon" title="Transaction">
        <FaTshirt />
        {isHovered && <span>Transaction</span>}
      </Link>
      <Link to="/service" className="sidebar-icon" title="Service">
        <FaListAlt />
        {isHovered && <span>Service</span>}
      </Link>
      <hr style={{ width: '100%', margin: '10px auto', borderTop: '1.5px solid black' }} />
      <Link to="/" className="sidebar-icon" title="Logout">
        <FaSignOutAlt />
        {isHovered && <span>Logout</span>}
      </Link>
    </div>
  );
};

export default SideBar;
