import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";

import "./purposeStyle.scss";

const Purpose = () => {
  return (
    <Card className="mt-3 full-height">
      <CardBody className="d-flex justify-content-center align-items-center">
        <Row>
          <Col>
            <h1 className="purposePage">Purpose of Water</h1>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default Purpose;
