import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Nav,
  NavLink,
  Row,
} from "reactstrap";
import { post } from "utils/requests";
import Papa from "papaparse";

import "./dashboardStyle.scss";
import BootstrapTable from "react-bootstrap-table-next";

const Dashboard = () => {
  const [dataset, setDataset] = useState(null);
  const [data, setData] = useState([]);
  const [viewSpreadsheet, setViewSpreadsheet] = useState(false);
  const [uploadDataset, setUploadDataset] = useState(true);

  const postFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    await post(
      formData,
      "/upload",
      (response) => alert(response),
      (error) => alert(error)
    );
  };

  const initialValues = {
    manualEntryDataset: [
      {
        pH: "",
      },
    ],
  };

  const columns = [
    {
      dataField: "Sample",
      text: "Sample",
    },
    {
      dataField: "Label",
      text: "Label",
    },
    {
      dataField: "Color",
      text: "Color",
    },
    {
      dataField: "Marker",
      text: "Marker",
    },
    {
      dataField: "Size",
      text: "Size",
    },
    {
      dataField: "Alpha",
      text: "Alpha",
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

  const manualEntryColumns = [
    {
      dataField: "#",
      text: "#",
      isDummyField: true,
      formatter: (cell, row, rowIndex) => rowIndex + 1,
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

  return (
    <Card className="mt-3 full-height">
      <CardBody>
        <>
          <Row className="option text-center pb-3">
            <Col>
              <Button
                className={uploadDataset ? "activeButton" : "inActiveButton"}
                onClick={() => setUploadDataset(true)}
              >
                Upload Dataset
              </Button>
            </Col>
            <Col>
              <Button
                className={!uploadDataset ? "activeButton" : "inActiveButton"}
                onClick={() => setUploadDataset(false)}
              >
                Manual Entry
              </Button>
            </Col>
          </Row>
          {uploadDataset && (
            <>
              <Row className="mt-3 text-center">
                <Col>
                  <span className="optionTitle">Upload Dataset</span>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      postFile(dataset);
                    }}
                  >
                    <FormGroup className="d-flex justify-content-center">
                      <InputGroup className="uploadBox">
                        <InputGroupText>Dataset</InputGroupText>
                        <Input
                          type="file"
                          className="uploadDataset"
                          onChange={(e) => {
                            setDataset(e.target.files[0]);
                            Papa.parse(e.target.files[0], {
                              header: true,
                              skipEmptyLines: true,
                              complete: function (results) {
                                setData(results.data);
                              },
                            });
                          }}
                        />
                        <Button
                          className="viewButton"
                          onClick={() => {
                            setViewSpreadsheet(!viewSpreadsheet);
                          }}
                        >
                          {!viewSpreadsheet ? "View" : "Hide"}
                        </Button>
                        <Button type="submit" className="plotButton">
                          Plot
                        </Button>
                      </InputGroup>
                    </FormGroup>
                  </Form>
                </Col>
              </Row>
              {viewSpreadsheet && (
                <Row className="overflow-auto my-custom-scrollbar">
                  <Col>
                    <BootstrapTable
                      bootstrap4
                      striped
                      hover
                      keyField="id"
                      data={data}
                      columns={columns}
                      classes="table-responsive table"
                      headerClasses="table-header"
                      rowClasses="table-row"
                    />
                  </Col>
                </Row>
              )}
            </>
          )}
          {!uploadDataset && (
            <>
              <Row className="mt-3 text-center">
                <Col>
                  <span className="optionTitle">Manual Entry</span>
                </Col>
              </Row>
              <Form
                initialvalues={initialValues}
                onSubmit={(e) => {
                  e.preventDefault();
                  postFile(dataset);
                }}
              >
                {({ isValid, values, errors, setFieldValue, handleChange }) => {
                  return (
                    <Row className="mt-3 d-flex flex-column">
                      <Col className="overflow-auto">
                        {console.log(values)}
                        {/* <BootstrapTable
                          bootstrap4
                          keyField="id"
                          data={manualEntryDataset}
                          columns={manualEntryColumns}
                          classes="table-responsive table"
                          headerClasses="table-header"
                          rowClasses="table-row"
                        /> */}
                      </Col>
                      <Col>
                        <Button type="submit" className="plotButton">
                          Plot
                        </Button>
                      </Col>
                    </Row>
                  );
                }}
              </Form>
            </>
          )}
        </>
      </CardBody>
    </Card>
  );
};

export default Dashboard;
