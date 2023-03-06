import React, { useState, useEffect } from "react";
import { Button, Card, CardBody, Col, Row, Spinner } from "reactstrap";
import { useSelector } from "react-redux";
import { getAllGraph } from "./graphSlice";
import { map } from "lodash";

import "./plotsStyle.scss";

const Plots = () => {
  const data = useSelector(getAllGraph);

  const [piperPlot, setPiperPlot] = useState(true);
  const [durovPlot, setDurovPlot] = useState(false);
  const [gibbsPlot, setGibbsPlot] = useState(false);
  const [chadhaPlot, setChadhaPlot] = useState(false);

  const [piperUrl, setPiperUrl] = useState("");
  const [durovUrl, setDurovUrl] = useState("");
  const [gibbsUrl, setGibbsUrl] = useState("");
  const [chadhaUrl, setChadhaUrl] = useState("");

  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    map(data, (item) => {
      if (item["Piper Diagram.jpg"]) setPiperUrl(item["Piper Diagram.jpg"]);
      if (item["Durov Diagram.jpg"]) setDurovUrl(item["Durov Diagram.jpg"]);
      if (item["Gibbs Diagram.jpg"]) setGibbsUrl(item["Gibbs Diagram.jpg"]);
      if (item["Chadha Diagram.jpg"]) setChadhaUrl(item["Chadha Diagram.jpg"]);
    });
  }, [data]);

  useEffect(() => {
    if (
      piperUrl !== "" &&
      durovUrl !== "" &&
      gibbsUrl !== "" &&
      chadhaUrl !== ""
    ) {
      setTimeout(() => {
        setSpinner(false);
      }, 1000);
    }
  }, [piperUrl, durovUrl, gibbsUrl, chadhaUrl]);

  return (
    <Card className="mt-3 full-height">
      <CardBody>
        <Row className="option text-center pb-3">
          <Col>
            <Button
              className={piperPlot ? "activeButton" : "inActiveButton"}
              onClick={() => {
                setPiperPlot(true);
                setDurovPlot(false);
                setGibbsPlot(false);
                setChadhaPlot(false);
              }}
            >
              Piper Plot
            </Button>
          </Col>
          <Col>
            <Button
              className={durovPlot ? "activeButton" : "inActiveButton"}
              onClick={() => {
                setDurovPlot(true);
                setPiperPlot(false);
                setGibbsPlot(false);
                setChadhaPlot(false);
              }}
            >
              Durov Plot
            </Button>
          </Col>
          <Col>
            <Button
              className={gibbsPlot ? "activeButton" : "inActiveButton"}
              onClick={() => {
                setGibbsPlot(true);
                setPiperPlot(false);
                setDurovPlot(false);
                setChadhaPlot(false);
              }}
            >
              Gibbs Plot
            </Button>
          </Col>
          <Col>
            <Button
              className={chadhaPlot ? "activeButton" : "inActiveButton"}
              onClick={() => {
                setChadhaPlot(true);
                setPiperPlot(false);
                setDurovPlot(false);
                setGibbsPlot(false);
              }}
            >
              Chadha Plot
            </Button>
          </Col>
        </Row>
        {spinner && (
          <Row className="mt-3 full-height-plots">
            <Col className="d-flex justify-content-center align-items-center text-center">
              <Spinner />
            </Col>
          </Row>
        )}
        {!spinner && (
          <Row className="mt-3 full-height-plots">
            <Col className="d-flex justify-content-center align-items-center text-center">
              {piperPlot && (
                <Col>
                  <img src={piperUrl} alt="Piper Plot" className="piperSize" />
                </Col>
              )}
              {durovPlot && (
                <Col>
                  <img src={durovUrl} alt="Durov Plot" className="durovSize" />
                </Col>
              )}
              {gibbsPlot && (
                <Col>
                  <img src={gibbsUrl} alt="Gibbs Plot" className="gibbsSize" />
                </Col>
              )}
              {chadhaPlot && (
                <Col>
                  <img
                    src={chadhaUrl}
                    alt="Chadha Plot"
                    className="chadhaSize"
                  />
                </Col>
              )}
            </Col>
          </Row>
        )}
      </CardBody>
    </Card>
  );
};

export default Plots;
