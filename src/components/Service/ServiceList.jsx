/* eslint-disable no-unused-vars */
// ServiceList.jsx
import React from 'react';
import { Table } from 'react-bootstrap';

const ServiceList = () => {
  const Services = [
    { id: 1, name: 'Reguler', estimation: '2 day' },
    { id: 2, name: 'Express', estimation: '1 day' },
  ];

  return (
    <div className='service-list'>
      <h2>List of Services</h2><br/>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Service Name</th>
            <th>Estimation</th>
          </tr>
        </thead>
        <tbody>
          {Services.map((Service) => (
            <tr key={Service.id}>
              <td>{Service.name}</td>
              <td>{Service.estimation}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ServiceList;
