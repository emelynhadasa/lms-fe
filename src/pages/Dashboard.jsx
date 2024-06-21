/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import TopBar from '../components/Bars/TopBar';
import SideBar from '../components/Bars/SideBar';
import QuickActions from '../components/Dashboard/QuickActions';
import QuickInfo from '../components/Dashboard/QuickInfo';
import Axios from 'axios'; 

const Dashboard = () => {
  const [username, setUsername] = useState([]);
  const [token, setToken] = useState([]);

  useEffect(() => {
    fetchUsername();
  }, []); 
  
  const fetchUsername = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("KONTIGO. Token:", token);
      if (!token) {
        throw new Error("Your session has expired. Please log in again.");
      }
      const response = await Axios.get("http://localhost:8081/api/users/current", {
        headers: {
          "X-API-Token": token,
        },
      });
      setUsername(response.data.data.name);
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };

  return (
    <div className="dashboard-page">
      <TopBar />
      <SideBar setToken={setToken} />
      <div className="content">
        <h2 className='welcome-text'>Welcome, {username}!</h2>
        <p>There are still <u>13 laundries</u> to work on.</p>
        <QuickActions/>
        <QuickInfo/>
      </div>
    </div>
  );
};

export default Dashboard;