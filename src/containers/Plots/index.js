import React, { useState, useEffect } from "react";
import { Button, Card, CardBody, Col, Row } from "reactstrap";

import "./plotsStyle.scss";

const Plots = () => {
  const [piperPlot, setPiperPlot] = useState(true);
  const [durovPlot, setDurovPlot] = useState(false);
  const [gibbsPlot, setGibbsPlot] = useState(false);
  const [chadhaPlot, setChadhaPlot] = useState(false);

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
        <Row className="mt-3 full-height-plots">
          <Col className="d-flex justify-content-center align-items-center text-center">
            {/* {piperPlot && (
              <Col>
                {piperData && (
                  <img
                    src={require("../../resources/plots/Piper Diagram.jpg")}
                    alt="Piper Plot"
                    className="piperSize"
                  />
                )}
              </Col>
            )} */}
            {/*{durovPlot && (
              <Col>
                <img
                  src={require("../../resources/plots/Durov Diagram.jpg")}
                  alt="Durov Plot"
                  className="durovSize"
                />
              </Col>
            )}
            {gibbsPlot && (
              <Col>
                <img
                  src={require("../../resources/plots/Gibbs Diagram.jpg")}
                  alt="Gibbs Plot"
                  className="gibbsSize"
                />
              </Col>
            )}
            {chadhaPlot && (
              <Col>
                <img
                  src={require("../../resources/plots/Chadha Diagram.jpg")}
                  alt="Chadha Plot"
                  className="chadhaSize"
                />
              </Col>
            )} */}
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default Plots;
