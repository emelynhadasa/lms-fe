/* eslint-disable no-unused-vars */
// src/components/TopBar.jsx
import React, { useEffect, useState } from "react";
import Axios from 'axios'; 

const TopBar = () => {
  const [username, setUsername] = useState([]);

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
      const response = await Axios.get(
        "http://localhost:8081/api/users/current",
        {
          headers: {
            "X-API-Token": token,
          },
        }
      );
      setUsername(response.data.data.name);
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  };

  return (
    <div className="top-bar">
      <div className="system-title">
        <img src="./laundry-icon.png" className="laundry-icon" />
        <span>Fresh</span>Fold
      </div>
      <div className="staff-name">{username}</div>
    </div>
  );
};

export default TopBar;
