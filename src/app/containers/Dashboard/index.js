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

import "./dashboardStyle.scss";

function Dashboard() {
  return (
    <Container fluid className="h-100 p-0">
      <Row className="dashboard">
        <Col xs="3" sm="3" lg="3" className="scroll">
          <SidebarLayout />
        </Col>
        <Col xs="7" sm="9" lg="9" className="pe-4 overflow-auto">
          <h2 className="mt-2">Dataset</h2>
          <div className="border-bottom mb-3" />
          <InputGroup className="d-flex align-items-center mb-5 mt-5">
            <span className="mx-1 fw-semibold">Upload Dataset:</span>
            <Input type="file" id="uploadBtn" className="mx-1 me-3" />
          </InputGroup>
          <div className="mb-2">
            <span className="mx-1 fw-semibold">Enter Values:</span>
          </div>
          <div className="mx-1">
            <p>
              CA: <Input type="text" id="ca" />{" "}
            </p>
            <p>
              MG: <Input type="text" id="mg" />{" "}
            </p>
            <p>
              NA: <Input type="text" id="na" />{" "}
            </p>
            <p>
              K: <Input type="text" id="k" />{" "}
            </p>
            <p>
              HCO3: <Input type="text" id="hco3" />{" "}
            </p>
            <p>
              CO3: <Input type="text" id="co3" />{" "}
            </p>
            <p>
              Cl: <Input type="text" id="cl" />{" "}
            </p>
            <p>
              SO4: <Input type="text" id="so4" />{" "}
            </p>
            <p>
              TDS: <Input type="text" id="tds" />{" "}
            </p>
          </div>

          <br></br>
          <div className="margin mb-4">
            <Button type="button" id="add" className="mx-4">
              ADD
            </Button>
            <Button type="button" id="submit">
              SUBMIT
            </Button>
          </div>

          {/* <div className="overflow-auto">
            <Table className="table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Calcium (Ca)</th>
                  <th>Magnesium (Mg)</th>
                  <th>Sodium (Na)</th>
                  <th>Potassium (K)</th>
                  <th>Bicarbonate (HCO3)</th>
                  <th>Chloride (Cl)</th>
                  <th>Sulfate (SO4)</th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.ph}</td>
                      <td>{item.cal}</td>
                      <td>{item.mag}</td>
                      <td>{item.sod}</td>
                      <td>{item.pot}</td>
                      <td>{item.bicar}</td>
                      <td>{item.chl}</td>
                      <td>{item.sul}</td>
                      <td>{item.tds}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div> */}
          {/* <div className="position-absolute end-0 me-3">
            <Link
              to="/dataform"
              className="cssbuttons-io-button mt-3 mb-3 mx-2"
            >
              + Add Form
              <div className="icon">
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </Link>
          </div> */}
        </Col>
        <Helmet>
          <script>require('../src/app/containers/Dashboard/form.js');</script>
          <script>require("../src/app/containers/Dashboard/inject.js");</script>
        </Helmet>
      </Row>
    </Container>
  );
}

export default Dashboard;
