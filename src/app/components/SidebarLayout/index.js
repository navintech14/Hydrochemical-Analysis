import React from "react";
import { Col } from "reactstrap";
import SideBar from "../SideBar";
import "./sidebarLayoutStyle.scss";

function SidebarLayout() {
  return (
    <div className="sidebarLayout overflow-auto">
      <Col className="position-relative">
        <SideBar />
      </Col>
    </div>
  );
}

SidebarLayout.propTypes = {};

export default SidebarLayout;
