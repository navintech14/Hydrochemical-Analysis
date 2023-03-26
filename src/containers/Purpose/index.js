import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { getAllPurpose } from "./purposeSlice";
import BootstrapTable from "react-bootstrap-table-next";
import { useSelector } from "react-redux";

import "./purposeStyle.scss";

const Purpose = () => {
  const purposeData = useSelector(getAllPurpose);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const columns = [
    {
      dataField: "Sample",
      text: "Sample",
    },
    {
      dataField: "pH",
      text: "pH",
    },
    {
      dataField: "Ca",
      text: "Ca",
    },
    {
      dataField: "Mg",
      text: "Mg",
    },
    {
      dataField: "Na",
      text: "Na",
    },
    {
      dataField: "K",
      text: "K",
    },
    {
      dataField: "HCO3",
      text: "HCO3",
    },
    {
      dataField: "CO3",
      text: "CO3",
    },
    {
      dataField: "Cl",
      text: "Cl",
    },
    {
      dataField: "SO4",
      text: "SO4",
    },
    {
      dataField: "TDS",
      text: "TDS",
    },
    {
      dataField: "Purpose",
      text: "Purpose",
    },
  ];

  const columnsDrinking = [
    {
      dataField: "condition",
      text: "Condition",
    },
    {
      dataField: "operator",
      text: "Constraints",
    },
    {
      dataField: "value",
      text: "Value (mg/L)",
    },
  ];

  const drinkingData = [
    {
      condition: "Ca + Mg",
      operator: ">=",
      value: "60",
    },
    {
      condition: "Ca/(Ca+Mg)",
      operator: ">=",
      value: "0.2",
    },
    {
      condition: "HCO3",
      operator: ">=",
      value: "50",
    },
  ];

  const columnsIrrigation = [
    {
      dataField: "condition",
      text: "Condition",
    },
    {
      dataField: "operator",
      text: "Constraints",
    },
    {
      dataField: "value",
      text: "Value (mg/L)",
    },
  ];

  const irrigationData = [
    {
      condition: "Na + Cl",
      operator: ">=",
      value: "200",
    },
  ];

  const columnsIndustrial = [
    {
      dataField: "condition",
      text: "Condition",
    },
    {
      dataField: "operator",
      text: "Constraints",
    },
    {
      dataField: "value",
      text: "Value (mg/L)",
    },
  ];

  const industrialData = [
    {
      condition: "TDS",
      operator: ">=",
      value: "1000",
    },
  ];

  return (
    <Card className="mt-3 full-height">
      {purposeData.length !== 0 && (
        <CardBody>
          <Row className="mb-3 text-center">
            <Col>
              <span className="optionTitle">Purpose of Water</span>
            </Col>
          </Row>

          <Row className="overflow-auto my-custom-scrollbar-purpose d-flex align-items-center">
            <Col>
              <BootstrapTable
                bootstrap4
                striped
                hover
                keyField="id"
                data={purposeData}
                columns={columns}
                classes="table-responsive table"
                headerClasses="table-header"
                rowClasses="table-row"
              />
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-end align-items-center mt-3">
              <ButtonGroup>
                <Button className="infoIconButton" onClick={toggle}>
                  <i
                    className="fa-solid fa-circle-info fa-beat"
                    style={{ color: "#044553" }}
                  ></i>
                </Button>
                <Button className="infoButton" onClick={toggle}>
                  Standards
                </Button>
              </ButtonGroup>
              <Modal scrollable isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Standards</ModalHeader>
                <ModalBody className="overflow-auto">
                  <span className="sub">Drinking:</span>
                  <BootstrapTable
                    bootstrap4
                    striped
                    hover
                    keyField="id"
                    data={drinkingData}
                    columns={columnsDrinking}
                    classes="table-responsive table mt-3"
                    headerClasses="table-header"
                    rowClasses="table-row"
                  />
                  <span className="sub">Irrigation:</span>
                  <BootstrapTable
                    bootstrap4
                    striped
                    hover
                    keyField="id"
                    data={irrigationData}
                    columns={columnsIrrigation}
                    classes="table-responsive table mt-3"
                    headerClasses="table-header"
                    rowClasses="table-row"
                  />
                  <span className="sub">Industrial:</span>
                  <BootstrapTable
                    bootstrap4
                    striped
                    hover
                    keyField="id"
                    data={industrialData}
                    columns={columnsIndustrial}
                    classes="table-responsive table mt-3"
                    headerClasses="table-header"
                    rowClasses="table-row"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button className="cancelButton" onClick={toggle}>
                    Close
                  </Button>
                </ModalFooter>
              </Modal>
            </Col>
          </Row>
        </CardBody>
      )}
      {purposeData.length === 0 && (
        <CardBody className="d-flex justify-content-center align-items-center">
          <Row>
            <Col>
              <h1 className="purposePage">Purpose of Water</h1>
            </Col>
          </Row>
        </CardBody>
      )}
    </Card>
  );
};

export default Purpose;
