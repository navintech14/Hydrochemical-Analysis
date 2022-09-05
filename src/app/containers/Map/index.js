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
import "./mapStyle.scss";

function Map() {
  return (
    <Container fluid className="h-100 p-0 overflow-hidden">
      <Row>
        <Col xs="3">
          <SidebarLayout />
        </Col>
        <Col xs="7" sm="9" lg="9" className="pe-4">
          <div className="d-flex justify-content-center align-items-center h-100">
            <img
              src="D:\Monish\Code\Personal Project\hydrochemicalanalysis\src\resources\Map\India.jpg"
              className="map"
            ></img>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Map;
