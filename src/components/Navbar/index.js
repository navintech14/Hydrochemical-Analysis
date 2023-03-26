import React from "react";
import { NavLink } from "react-router-dom";
import { Card, CardBody, Col, Nav, NavItem, Row } from "reactstrap";

import "./navbarStyle.scss";

function Navbar() {
  const navStyle = ({ isActive }) => {
    return {
      textDecoration: "none",
      color: isActive ? "#fff" : "#000",
      backgroundColor: isActive ? "#044553" : "#fff",
      border: "1px solid #044553",
      boxShadow: "0 1px 10px 0 rgba(0, 0, 0, 0.14)",
      padding: "10px 20px",
      borderRadius: "5px",
      margin: "0 5px",
      transition: "all 0.3s ease-in-out",
    };
  };

  return (
    <>
      <Card className="card mx-3 py-2 mt-5">
        <CardBody>
          <Row className="mx-2">
            <Col>
              <Nav fill pills>
                {/* <NavItem>
                  <NavLink style={navStyle} to="/">
                    Dashboard
                  </NavLink>
                </NavItem> */}
                <NavItem>
                  <NavLink style={navStyle} to="/">
                    Dataset
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink style={navStyle} to="/plots">
                    Plots
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink style={navStyle} to="/purpose">
                    Purpose of Water
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink style={navStyle} to="/report">
                    Report
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
}

export default Navbar;
