import React from "react";
import {
  Button,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupText,
  Row,
} from "reactstrap";
import { post } from "utils/requests";

import "./dashboardStyle.scss";

const Dashboard = () => {
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

  return (
    <Container fluid>
      <Row className="mt-5">
        <Col>
          <InputGroup>
            <InputGroupText>Dataset</InputGroupText>
            <Input
              type="file"
              className="uploadDataset"
              onChange={(e) => {
                postFile(e.target.files[0]);
              }}
            />
            <Button type="submit">Submit</Button>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
