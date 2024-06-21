import { useState } from "react";
import { Button, Form, InputGroup, Container, Row, Col } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
// import { Link } from "react-router-dom";
import CreateOrderForm from "../components/Transaction/CreateOrderForm";
import StatusConfirmation from "../components/Transaction/StatusConfirmation";
import TransactionList from "../components/Transaction/TransactionList";
import TopBar from '../components/Bars/TopBar';
import SideBar from '../components/Bars/SideBar';

const Transaction = () => {
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useState(localStorage.getItem('token'));

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showStatusConfirmation, setShowStatusConfirmation] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleCreateShow = () => setShowCreateForm(true);

  const handleStatusShow = (status, checked) => {
    setCurrentStatus(status);
    setIsChecked(checked);
    setShowStatusConfirmation(true);
  };

  return (
    <div className="transaction-page">
      <TopBar />
      <SideBar setToken={setToken} />
      <div className="content">
        <Container>
          <Row className="mb-3">
            <Col xs={12} md={3}>
              <Button variant="primary" onClick={handleCreateShow} className="createOrderBtn">
                Create New Order
              </Button>
            </Col>
            <Col xs={12} md={{ span: 6, offset: 3 }}>
              <InputGroup>
                <Form.Control placeholder="Search" />
                <Button variant="outline-secondary" className="searchBtn">
                  <BsSearch />
                </Button>
              </InputGroup>
            </Col>
          </Row>
          <TransactionList
            // onEdit={handleEditShow}
            onStatusChange={handleStatusShow}
          />
          <CreateOrderForm show={showCreateForm} handleClose={() => setShowCreateForm(false)} />
          <StatusConfirmation
            show={showStatusConfirmation}
            handleClose={() => setShowStatusConfirmation(false)}
            status={currentStatus}
            isChecked={isChecked}
          />
        </Container>
      </div>
    </div>
  );
};

export default Transaction;
