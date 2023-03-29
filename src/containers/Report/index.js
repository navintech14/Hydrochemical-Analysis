import React, { useState, useEffect, useRef } from "react";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import { useSelector } from "react-redux";
import { getAllDataset } from "containers/Dashboard/dashboardSlice";
import { getAllGraph } from "containers/Plots/graphSlice";
import BootstrapTable from "react-bootstrap-table-next";
import { map } from "lodash";
import ReactToPrint from "react-to-print";
import { getAllPurpose } from "containers/Purpose/purposeSlice";

import "./reportStyle.scss";

const Report = () => {
  const componentRef = useRef();
  const datasetData = useSelector(getAllDataset);
  const data = useSelector(getAllGraph);
  const purposeData = useSelector(getAllPurpose);

  const [piperUrl, setPiperUrl] = useState("");
  const [durovUrl, setDurovUrl] = useState("");
  const [gibbsUrl, setGibbsUrl] = useState("");
  const [chadhaUrl, setChadhaUrl] = useState("");

  useEffect(() => {
    map(data, (item) => {
      if (item["Piper Diagram.jpg"]) setPiperUrl(item["Piper Diagram.jpg"]);
      if (item["Durov Diagram.jpg"]) setDurovUrl(item["Durov Diagram.jpg"]);
      if (item["Gibbs Diagram.jpg"]) setGibbsUrl(item["Gibbs Diagram.jpg"]);
      if (item["Chadha Diagram.jpg"]) setChadhaUrl(item["Chadha Diagram.jpg"]);
    });
  }, [data]);

  const columns = [
    {
      dataField: "Sample",
      text: "Sample",
      formatter: (cell, row, rowIndex) => "Sample " + (rowIndex + 1),
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
  ];

  const purposeColumns = [
    {
      dataField: "Sample",
      text: "Sample",
      formatter: (cell, row, rowIndex) => "Sample " + (rowIndex + 1),
    },
    {
      dataField: "Purpose",
      text: "Purpose",
    },
  ];

  return (
    <Card className="mt-3 full-height">
      {datasetData.length !== 0 && (
        <CardBody>
          <Row className="mb-3 text-center">
            <Col>
              <span className="optionTitle">Report</span>
            </Col>
          </Row>
          <Row className="overflow-auto reportRender d-flex align-items-center px-5 py-5">
            <Row className="mb-3">
              <Col className="subTitle">Dataset:</Col>
            </Row>
            <Col>
              <BootstrapTable
                bootstrap4
                striped
                hover
                keyField="id"
                data={datasetData}
                columns={columns}
                classes="table-responsive table"
                headerClasses="table-header"
                rowClasses="table-row"
              />
            </Col>
            <Row className="mb-3 mt-3">
              <Col className="subTitle">Plot:</Col>
            </Row>
            <Row>
              <Col
                xs="6"
                className="d-flex justify-content-center align-items-center"
              >
                <img src={piperUrl} alt="Piper Plot" className="piperReport" />
              </Col>
              <Col
                xs="6"
                className="d-flex justify-content-center align-items-center"
              >
                <img src={durovUrl} alt="Durov Plot" className="durovReport" />
              </Col>
            </Row>
            <Row>
              <Col
                xs="6"
                className="d-flex justify-content-center align-items-center figure"
              >
                Piper Plot
              </Col>
              <Col
                xs="6"
                className="d-flex justify-content-center align-items-center figure"
              >
                Durov Plot
              </Col>
            </Row>
            <Row>
              <Col
                xs="6"
                className="d-flex justify-content-center align-items-center"
              >
                <img src={gibbsUrl} alt="Gibbs Plot" className="gibbsReport" />
              </Col>
              <Col
                xs="6"
                className="d-flex justify-content-center align-items-center"
              >
                <img
                  src={chadhaUrl}
                  alt="Chadha Plot"
                  className="chadhaReport"
                />
              </Col>
            </Row>
            <Row>
              <Col
                xs="6"
                className="d-flex justify-content-center align-items-center figure"
              >
                Gibbs Plot
              </Col>
              <Col
                xs="6"
                className="d-flex justify-content-center align-items-center figure"
              >
                Chadha Plot
              </Col>
            </Row>
            <Row className="mb-3 mt-3">
              <Row className="mb-3">
                <Col className="subTitle">Purpose:</Col>
              </Row>
              <Col>
                <BootstrapTable
                  bootstrap4
                  striped
                  hover
                  keyField="id"
                  data={purposeData}
                  columns={purposeColumns}
                  classes="table-responsive table"
                  headerClasses="table-header"
                  rowClasses="table-row"
                />
              </Col>
            </Row>
          </Row>
          <Row>
            <Col className="d-flex justify-content-end align-items-center mt-3">
              <ReactToPrint
                trigger={() => (
                  <Button className="printButton">Print & Save</Button>
                )}
                content={() => componentRef.current}
              />
            </Col>
          </Row>
        </CardBody>
      )}
      {datasetData.length === 0 && (
        <CardBody className="d-flex justify-content-center align-items-center">
          <Row>
            <Col>
              <h1 className="purposePage">Report</h1>
            </Col>
          </Row>
        </CardBody>
      )}
      <div className="d-none">
        <div ref={componentRef}>
          <Row className="mb-5 text-center">
            <Col>
              <span className="printTitle">Report</span>
            </Col>
          </Row>
          <Row className="overflow-auto d-flex align-items-center">
            <Row className="mb-3">
              <Col className="subTitle">Dataset:</Col>
            </Row>
            <Col>
              <BootstrapTable
                bootstrap4
                striped
                hover
                keyField="id"
                data={datasetData}
                columns={columns}
                classes="table-responsive table"
                headerClasses="table-header"
                rowClasses="table-row"
              />
            </Col>
            <Row className="mb-3 mt-3">
              <Col className="subTitle">Plot:</Col>
            </Row>
            <Row>
              <Col
                xs="6"
                className="d-flex justify-content-center align-items-center"
              >
                <img src={piperUrl} alt="Piper Plot" className="piperReport" />
              </Col>
              <Col
                xs="6"
                className="d-flex justify-content-center align-items-center"
              >
                <img src={durovUrl} alt="Durov Plot" className="durovReport" />
              </Col>
            </Row>
            <Row>
              <Col
                xs="6"
                className="d-flex justify-content-center align-items-center figure"
              >
                Piper Plot
              </Col>
              <Col
                xs="6"
                className="d-flex justify-content-center align-items-center figure"
              >
                Durov Plot
              </Col>
            </Row>
            <Row>
              <Col
                xs="6"
                className="d-flex justify-content-center align-items-center"
              >
                <img src={gibbsUrl} alt="Gibbs Plot" className="gibbsReport" />
              </Col>
              <Col
                xs="6"
                className="d-flex justify-content-center align-items-center"
              >
                <img
                  src={chadhaUrl}
                  alt="Chadha Plot"
                  className="chadhaReport"
                />
              </Col>
            </Row>
            <Row>
              <Col
                xs="6"
                className="d-flex justify-content-center align-items-center figure"
              >
                Gibbs Plot
              </Col>
              <Col
                xs="6"
                className="d-flex justify-content-center align-items-center figure"
              >
                Chadha Plot
              </Col>
            </Row>
            <Row className="mb-3 mt-3">
              <Row className="mb-3">
                <Col className="subTitle">Purpose:</Col>
              </Row>
              <Col>
                <BootstrapTable
                  bootstrap4
                  striped
                  hover
                  keyField="id"
                  data={purposeData}
                  columns={purposeColumns}
                  classes="table-responsive table"
                  headerClasses="table-header"
                  rowClasses="table-row"
                />
              </Col>
            </Row>
          </Row>
        </div>
      </div>
    </Card>
  );
};

export default Report;
