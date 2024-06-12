/* eslint-disable no-unused-vars */
import React from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsBoxArrowUpRight, BsClock, BsExclamationCircle } from 'react-icons/bs';

const QuickInfo = () => {
  return (
    <div className='quick-info'>
        <Card>
        <Card.Body>
            <h5 className="card-title">Quick Information</h5>
            <Row className="d-flex justify-content-start">
            <Col xs={6} className="mb-2">
                <Link to="/transaction" className="btn btn-info w-100 d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex align-items-center justify-content-between w-100">
                    <span>In progress laundry</span> <BsBoxArrowUpRight />
                </div>
                <p className="mb-0">13</p>
                </Link>
            </Col>
            <Col xs={6} className="mb-2">
                <Link to="/transactions" className="btn btn-warning w-100 d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex align-items-center justify-content-between w-100">
                    <span>Pending pick-up</span> <BsBoxArrowUpRight />
                </div>
                <p className="mb-0">8</p>
                </Link>
            </Col>
            <Col xs={6} className="mb-2">
                <Button variant="secondary" className="w-100 d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex align-items-center justify-content-between w-100">
                    <span>Near deadline laundry</span> <BsClock />
                </div>
                <p className="mb-0">5</p>
                </Button>
            </Col>
            <Col xs={6} className="mb-2">
                <Button variant="danger" className="w-100 d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex align-items-center justify-content-between w-100">
                    <span>Overdue laundry</span> <BsExclamationCircle />
                </div>
                <p className="mb-0">2</p>
                </Button>
            </Col>
            </Row>
        </Card.Body>
        </Card>
    </div>
  );
};

export default QuickInfo;
