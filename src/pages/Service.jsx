/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {Container} from 'react-bootstrap';
import ServiceList from '../components/Service/ServiceList';
import TopBar from '../components/Bars/TopBar';
import SideBar from '../components/Bars/SideBar';

const Service = () => {
  return (
    <div className='service-page'>
      <TopBar />
      <SideBar />
      <div className='content'>
        <Container>
          <ServiceList />
        </Container>
      </div>
    </div>
  );
};

export default Service;
