import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Input,
  InputGroup,
  Row,
  Table,
} from "reactstrap";
import SidebarLayout from "../../components/SidebarLayout";

function InputDataset() {
  return (
    <Container fluid className="h-100 p-0 overflow-hidden">
      <Row>
        <Col xs="3">
          <SidebarLayout />
        </Col>
        <Col xs="7" sm="9" lg="9" className="pe-4">
          Data
        </Col>
      </Row>
    </Container>
  );
}

export default InputDataset;
