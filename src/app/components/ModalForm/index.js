import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Row,
  Col,
  Input,
} from "reactstrap";

import "./modalFormStyle.scss";

function ModalForm() {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        + Add Data
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        className="modal-dialog modal-dialog-scrollable modal-xl pt-3"
      >
        <ModalHeader toggle={toggle}>Enter Values</ModalHeader>
        <ModalBody>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Row className="formContents">
              <Col sm={3}>
                <p className="formNames">Id</p>
              </Col>
              <Col sm={8}>
                <Input placeholder="Value" type="text" className="formFirst" />
              </Col>
            </Row>
            <Row className="formContents">
              <Col sm={3}>
                <p className="formNames">pH Value</p>
              </Col>
              <Col sm={8}>
                <Input placeholder="Value" type="text" className="formFirst" />
              </Col>
            </Row>
            <Row className="formContents">
              <Col sm={3}>
                <p className="formNames">Calcium (Ca)</p>
              </Col>
              <Col sm={8}>
                <Input placeholder="Value" type="text" className="formFirst" />
              </Col>
            </Row>
            <Row className="formContents">
              <Col sm={3}>
                <p className="formNames">Magnesium (Mg)</p>
              </Col>
              <Col sm={8}>
                <Input placeholder="Value" type="text" className="formFirst" />
              </Col>
            </Row>
            <Row className="formContents">
              <Col sm={3}>
                <p className="formNames">Sodium (Na)</p>
              </Col>
              <Col sm={8}>
                <Input placeholder="Value" type="text" className="formFirst" />
              </Col>
            </Row>
            <Row className="formContents">
              <Col sm={3}>
                <p className="formNames">Potassium (K)</p>
              </Col>
              <Col sm={8}>
                <Input placeholder="Value" type="text" className="formFirst" />
              </Col>
            </Row>
            <Row className="formContents">
              <Col sm={3}>
                <p className="formNames">Bicarbonate (HCO3)</p>
              </Col>
              <Col sm={8}>
                <Input placeholder="Value" type="text" className="formFirst" />
              </Col>
            </Row>
            <Row className="formContents">
              <Col sm={3}>
                <p className="formNames">Chloride (Cl)</p>
              </Col>
              <Col sm={8}>
                <Input placeholder="Value" type="text" className="formFirst" />
              </Col>
            </Row>
            <Row className="formContents">
              <Col sm={3}>
                <p className="formNames">Sulfate (SO4)</p>
              </Col>
              <Col sm={8}>
                <Input placeholder="Value" type="text" className="formFirst" />
              </Col>
            </Row>
            <Row className="formContents">
              <Col sm={3}>
                <p className="formNames">TDS</p>
              </Col>
              <Col sm={8}>
                <Input placeholder="Value" type="text" className="formFirst" />
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Add
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalForm;
