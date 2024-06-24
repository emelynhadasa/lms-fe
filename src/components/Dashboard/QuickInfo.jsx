/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  BsBoxArrowUpRight,
  BsClock,
  BsExclamationCircle,
} from "react-icons/bs";
import Axios from 'axios';

const QuickInfo = () => {
  const [inProgress, setInProgress] = useState([]);
  const [pickedUp, setPickedUp] = useState([]);

  useEffect(() => {
    fetchInProgress();
    fetchNotPickedUp();
  });

  const fetchInProgress = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("KONTIGO. Token:", token);
      if (!token) {
        throw new Error("Your session has expired. Please log in again.");
      }
      const response = await Axios.get("http://localhost:8081/api/get-onProgress-order", {
        headers: {
          "X-API-Token": token,
        },
      });
      setInProgress(response.data.data.total);
    } catch (error) {
      console.error('Error fetching in progress orders:', error);
    }
  };

  const fetchNotPickedUp = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("KONTIGO. Token:", token);
      if (!token) {
        throw new Error("Your session has expired. Please log in again.");
      }
      const response = await Axios.get("http://localhost:8081/api/get-pickedUp-order", {
        headers: {
          "X-API-Token": token,
        },
      });
      setPickedUp(response.data.data.total);
    } catch (error) {
      console.error('Error fetching not-picked-up orders:', error);
    }
  };

  return (
    <div className="quick-info">
      <Card>
        <Card.Body>
          <h5 className="card-title">Quick Information</h5>
          <Row className="d-flex justify-content-start">
            <Col xs={6} className="mb-2">
              <Link
                to="/transaction"
                className="btn btn-info w-100 d-flex flex-column align-items-center justify-content-center in-progress-box" 
              >
                <div className="d-flex align-items-center justify-content-between w-100">
                  <span>In-Progress Laundry</span> <BsBoxArrowUpRight />
                </div>
                <p className="mb-0">{inProgress}</p>
              </Link>
            </Col>
            <Col xs={6} className="mb-2">
              <Link
                to="/transactions"
                className="btn btn-warning w-100 d-flex flex-column align-items-center justify-content-center picked-up-box"
              >
                <div className="d-flex align-items-center justify-content-between w-100">
                  <span>Not Picked-Up Laundry</span> <BsBoxArrowUpRight />
                </div>
                <p className="mb-0">{pickedUp}</p>
              </Link>
            </Col>
            {/* <Col xs={6} className="mb-2">
              <Button
                variant="secondary"
                className="w-100 d-flex flex-column align-items-center justify-content-center"
              >
                <div className="d-flex align-items-center justify-content-between w-100">
                  <span>Near deadline laundry</span> <BsClock />
                </div>
                <p className="mb-0">5</p>
              </Button>
            </Col>
            <Col xs={6} className="mb-2">
              <Button
                variant="danger"
                className="w-100 d-flex flex-column align-items-center justify-content-center"
              >
                <div className="d-flex align-items-center justify-content-between w-100">
                  <span>Overdue laundry</span> <BsExclamationCircle />
                </div>
                <p className="mb-0">2</p>
              </Button>
            </Col> */}
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default QuickInfo;
