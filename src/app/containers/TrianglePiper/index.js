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
import "./trianglePiperStyle.scss";

function TrianglePiper() {
  return (
    <Container fluid className="h-100 p-0 overflow-hidden">
      <Row>
        <Col xs="3">
          <SidebarLayout />
        </Col>
        <Col
          xs="7"
          sm="9"
          lg="9"
          className="pe-4 d-flex justify-content-center align-items-center"
        >
          <img
            id="display"
            src="D:\Monish\Code\Personal Project\hydrochemicalanalysis\src\app\containers\Dashboard\triangle Piper diagram.jpg"
            className="h-auto w-75"
          ></img>
        </Col>
        <Helmet>
          <script>require("../src/app/containers/Dashboard/inject.js");</script>
        </Helmet>
      </Row>
    </Container>
  );
}

export default TrianglePiper;
