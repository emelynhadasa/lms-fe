/* eslint-disable no-unused-vars */
import React from 'react';
import TopBar from '../components/Bars/TopBar';
import SideBar from '../components/Bars/SideBar';
import QuickActions from '../components/Dashboard/QuickActions';
import QuickInfo from '../components/Dashboard/QuickInfo';

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <TopBar />
      <SideBar />
      <div className="content">
        <h2 className='welcome-text'>Welcome, Akhner Frisca!</h2>
        <p>There are still <u>13 laundries</u> to work on.</p>
        <QuickActions/>
        <QuickInfo/>
      </div>
    </div>
  );
};

export default Dashboard;