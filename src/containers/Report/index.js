import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";

import "./reportStyle.scss";

const Report = () => {
  return (
    <Card className="mt-3 full-height">
      <CardBody className="d-flex justify-content-center align-items-center">
        <Row>
          <Col>
            <h1 className="reportPage">Report</h1>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default Report;
