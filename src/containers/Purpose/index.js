import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { getAllPurpose } from "./purposeSlice";
import BootstrapTable from "react-bootstrap-table-next";
import { useSelector } from "react-redux";

import "./purposeStyle.scss";

const Purpose = () => {
  const purposeData = useSelector(getAllPurpose);

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

  return (
    <Card className="mt-3 full-height">
      {purposeData.length !== 0 && (
        <CardBody>
          <Row className="mb-3 text-center">
            <Col>
              <span className="optionTitle">Purpose of Water</span>
            </Col>
          </Row>

          <Row className="overflow-auto my-custom-scrollbar d-flex align-items-center">
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
