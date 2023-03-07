import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";

import "./homeStyle.scss";

const Home = () => {
  return (
    <Card className="mt-3 full-height">
      <CardBody className="d-flex justify-content-center align-items-center">
        <Row>
          <Col>
            <h1 className="homePage">Dashboard</h1>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default Home;
