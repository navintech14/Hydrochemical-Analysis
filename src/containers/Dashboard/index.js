import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { post, postImage } from "utils/requests";
import Papa from "papaparse";
import BootstrapTable from "react-bootstrap-table-next";
import { useDispatch } from "react-redux";
import { fetchDataset } from "./dashboardSlice";
import { fetchData } from "../Plots/graphSlice";
import { fetchPurpose } from "containers/Purpose/purposeSlice";
import { useNavigate } from "react-router-dom";

import "./dashboardStyle.scss";
import Loader from "components/Loader";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [dataset, setDataset] = useState(null);
  const [data, setData] = useState([]);
  const [viewSpreadsheet, setViewSpreadsheet] = useState(false);
  const [uploadDataset, setUploadDataset] = useState(true);
  const [manualEntry, setManualEntry] = useState([]);
  const [entry, setEntry] = useState({
    pH: "",
    Ca: "",
    Mg: "",
    Na: "",
    K: "",
    HCO3: "",
    CO3: "",
    Cl: "",
    SO4: "",
    TDS: "",
  });
  const [modal, setModal] = useState(false);
  const [loader, setLoader] = useState(false);

  const toggle = () => setModal(!modal);

  const postFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    await post(
      formData,
      "/upload",
      (response) => {
        const diagram = async () => {
          let imageUrl = [];
          if (response) {
            setLoader(false);
            dispatch(fetchData([]));
            dispatch(fetchPurpose([]));
            dispatch(fetchPurpose(response.data));
            await Promise.all(
              response.images.map(async (filename) => {
                await postImage(
                  filename,
                  "/get_image_url",
                  (response) => {
                    const url = async () => {
                      const blob = await response.blob();
                      const imageUrls = URL.createObjectURL(blob);
                      imageUrl = [...imageUrl, { [`${filename}`]: imageUrls }];
                      dispatch(fetchData(imageUrl));
                    };
                    url();
                  },
                  (error) => console.log(error)
                );
              })
            );
          }
        };
        diagram();
        navigate("/plots");
      },
      (error) => alert(error)
    );
  };

  const postManual = async (data) => {
    await post(
      JSON.stringify(data),
      "/upload",
      (response) => {
        const diagram = async () => {
          let imageUrl = [];
          if (response) {
            setLoader(false);
            dispatch(fetchData([]));
            dispatch(fetchPurpose([]));
            dispatch(fetchPurpose(response.data));
            await Promise.all(
              response.images.map(async (filename) => {
                await postImage(
                  filename,
                  "/get_image_url",
                  (response) => {
                    const url = async () => {
                      const blob = await response.blob();
                      const imageUrls = URL.createObjectURL(blob);
                      imageUrl = [...imageUrl, { [`${filename}`]: imageUrls }];
                      dispatch(fetchData(imageUrl));
                    };
                    url();
                  },
                  (error) => console.log(error)
                );
              })
            );
          }
        };
        diagram();
        navigate("/plots");
      },
      (error) => alert(error)
    );
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
      dataField: "id",
      text: "#",
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
                      setLoader(true);
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
                                dispatch(fetchDataset(results.data));
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
              <Row>
                <Col className="d-flex justify-content-end">
                  <Button className="plotButton" onClick={toggle}>
                    +Add Data
                  </Button>
                </Col>
              </Row>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  setLoader(true);
                  dispatch(fetchDataset(manualEntry));
                  postManual(manualEntry);
                }}
              >
                <Row className="mt-3 d-flex flex-column">
                  <Col className="overflow-auto">
                    {manualEntry.length !== 0 && (
                      <Row className="my-custom-scrollbar2">
                        <BootstrapTable
                          bootstrap4
                          keyField="id"
                          data={manualEntry}
                          columns={manualEntryColumns}
                          classes="table-responsive table"
                          headerClasses="table-header"
                          rowClasses="table-row"
                        />
                      </Row>
                    )}
                  </Col>
                  <Col className="mt-3 d-flex justify-content-end">
                    <Modal scrollable isOpen={modal} toggle={toggle}>
                      <ModalHeader toggle={toggle}>Enter Data</ModalHeader>
                      <ModalBody className="overflow-auto">
                        <InputGroup className="m-1">
                          <InputGroupText className="inputGroupText">
                            pH
                          </InputGroupText>
                          <Input
                            className=""
                            onChange={(e) => {
                              setEntry({ ...entry, pH: e.target.value });
                            }}
                          />
                        </InputGroup>
                        <InputGroup className="m-1">
                          <InputGroupText className="inputGroupText">
                            Ca
                          </InputGroupText>
                          <Input
                            className=""
                            onChange={(e) => {
                              setEntry({ ...entry, Ca: e.target.value });
                            }}
                          />
                        </InputGroup>
                        <InputGroup className="m-1">
                          <InputGroupText className="inputGroupText">
                            Mg
                          </InputGroupText>
                          <Input
                            className=""
                            onChange={(e) => {
                              setEntry({ ...entry, Mg: e.target.value });
                            }}
                          />
                        </InputGroup>
                        <InputGroup className="m-1">
                          <InputGroupText className="inputGroupText">
                            Na
                          </InputGroupText>
                          <Input
                            className=""
                            onChange={(e) => {
                              setEntry({ ...entry, Na: e.target.value });
                            }}
                          />
                        </InputGroup>
                        <InputGroup className="m-1">
                          <InputGroupText className="inputGroupText">
                            K
                          </InputGroupText>
                          <Input
                            className=""
                            onChange={(e) => {
                              setEntry({ ...entry, K: e.target.value });
                            }}
                          />
                        </InputGroup>
                        <InputGroup className="m-1">
                          <InputGroupText className="inputGroupText">
                            HCO3
                          </InputGroupText>
                          <Input
                            className=""
                            onChange={(e) => {
                              setEntry({ ...entry, HCO3: e.target.value });
                            }}
                          />
                        </InputGroup>
                        <InputGroup className="m-1">
                          <InputGroupText className="inputGroupText">
                            CO3
                          </InputGroupText>
                          <Input
                            className=""
                            onChange={(e) => {
                              setEntry({ ...entry, CO3: e.target.value });
                            }}
                          />
                        </InputGroup>
                        <InputGroup className="m-1">
                          <InputGroupText className="inputGroupText">
                            Cl
                          </InputGroupText>
                          <Input
                            className=""
                            onChange={(e) => {
                              setEntry({ ...entry, Cl: e.target.value });
                            }}
                          />
                        </InputGroup>
                        <InputGroup className="m-1">
                          <InputGroupText className="inputGroupText">
                            SO4
                          </InputGroupText>
                          <Input
                            className=""
                            onChange={(e) => {
                              setEntry({ ...entry, SO4: e.target.value });
                            }}
                          />
                        </InputGroup>
                        <InputGroup className="m-1">
                          <InputGroupText className="inputGroupText">
                            TDS
                          </InputGroupText>
                          <Input
                            className=""
                            onChange={(e) => {
                              setEntry({ ...entry, TDS: e.target.value });
                            }}
                          />
                        </InputGroup>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          className="addButton"
                          onClick={() => {
                            setManualEntry([
                              ...manualEntry,
                              {
                                id: manualEntry.length + 1,
                                pH: entry.pH,
                                Ca: entry.Ca,
                                Mg: entry.Mg,
                                Na: entry.Na,
                                K: entry.K,
                                HCO3: entry.HCO3,
                                CO3: entry.CO3,
                                Cl: entry.Cl,
                                SO4: entry.SO4,
                                TDS: entry.TDS,
                              },
                            ]);
                            toggle();
                          }}
                        >
                          Add
                        </Button>
                        <Button className="cancelButton" onClick={toggle}>
                          Cancel
                        </Button>
                      </ModalFooter>
                    </Modal>
                    {manualEntry.length !== 0 && (
                      <Button type="submit" className="plotButton">
                        Plot
                      </Button>
                    )}
                  </Col>
                </Row>
              </Form>
            </>
          )}
          {loader && <Loader />}
        </>
      </CardBody>
    </Card>
  );
};

export default Dashboard;
