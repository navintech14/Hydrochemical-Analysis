import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Container,
  Input,
  InputGroup,
  Row,
  Table,
} from "reactstrap";
import SidebarLayout from "../../components/SidebarLayout";

import "./visualizeStyle.scss";

function Visualize() {
  return (
    <Container fluid className="h-100 p-0 ">
      <Row>
        <Col xs="3" className="visualize">
          <SidebarLayout />
        </Col>
        <Col xs="7" sm="9" lg="9" className="pe-4 pt-3 pb-3 overflow-auto">
          <Row>
            <Col lg="4">
              <Card className="my-2 mx-2">
                <CardHeader>Piper Graph</CardHeader>
                <CardBody>
                  <img
                    src="D:\Monish\Code\Personal Project\hydrochemicalanalysis\src\resources\Plot\piper.jpeg"
                    className="img-fluid"
                  ></img>
                  <CardText>
                    A diamond shaped matrix transformation of a graph of the
                    anions (sulfate + chloride/ total anions) and cations
                    (sodium + potassium/total cations).
                  </CardText>
                </CardBody>
                <CardFooter>
                  <Link to="/trianglepiper" className="button-7">
                    Click here to know more
                  </Link>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="my-2 mx-2">
                <CardHeader>Durov</CardHeader>
                <CardBody>
                  <img
                    src="D:\Monish\Code\Personal Project\hydrochemicalanalysis\src\resources\Plot\durov.png"
                    className="img-fluid"
                  ></img>
                  <CardText>
                    The Durov diagram is being used for representing the
                    dissolved constituents of natural water and showing
                    practical hydrochemical processes within hydrological
                    systems.
                  </CardText>
                </CardBody>
                <CardFooter>
                  <Link to="/durov" className="button-7">
                    Click here to know more
                  </Link>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="my-2 mx-2">
                <CardHeader>Gibbs</CardHeader>
                <CardBody>
                  <img
                    src="D:\Monish\Code\Personal Project\hydrochemicalanalysis\src\resources\Plot\Gibbs.png"
                    className="img-fluid"
                  ></img>
                  <CardText>
                    The Gibbs Diagram [8] was widely used to reveal the
                    relationship between groundwater components and aquifer
                    lithology. Plots are plotted with Cl/(Cl+HCO3) and
                    (Na+K)/(Na+K+Ca) as the abscissa and Total Dissolved Solids
                    as the ordinate.
                  </CardText>
                </CardBody>
                <CardFooter>
                  <Link to="/gibbs" className="button-7">
                    Click here to know more
                  </Link>
                </CardFooter>
              </Card>
            </Col>

            <Col lg="6">
              <Card className="my-2">
                <CardHeader>Chadha</CardHeader>
                <CardBody>
                  <img
                    src="D:\Monish\Code\Personal Project\hydrochemicalanalysis\src\resources\Plot\chadha.png"
                    className="img-fluid"
                  ></img>
                  <CardText>
                    Chadha diagram demonstrates geochemical classification and
                    hydrochemical processes of surface and groundwater samples
                  </CardText>
                </CardBody>
                <CardFooter>
                  <Link to="/chadha" className="button-7">
                    Click here to know more
                  </Link>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="6">
              <Card className="my-2">
                <CardHeader>USSL</CardHeader>
                <CardBody>
                  <img
                    src="D:\Monish\Code\Personal Project\hydrochemicalanalysis\src\resources\Plot\Ussl.png"
                    className="img-fluid"
                  ></img>
                  <CardText>
                    The USSL diagram best explains the combined effect of sodium
                    hazard and salinity hazard while classifying the irrigation
                    water. The USSL diagram is a plot between sodium hazards on
                    the y-axis versus salinity hazard on the x- axis
                  </CardText>
                </CardBody>
                <CardFooter>
                  <Link to="/trianglepiper" className="button-7">
                    Click here to know more
                  </Link>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Visualize;
