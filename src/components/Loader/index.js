import React from "react";
import { Modal, ModalBody } from "reactstrap";

import "./loaderStyle.scss";

const Loader = () => {
  return (
    <Modal
      size="sm"
      centered
      isOpen={true}
      className="modal"
      contentClassName="modalContent"
    >
      <ModalBody className="modalBody d-flex align-items-center justify-content-center">
        <div className="page__loader">
          <svg viewBox="0 0 30 42">
            <path
              fill="transparent"
              d="m 13.552735,2.0426703 q 1.5,3.7999997 10,14.9999997 a 12.8,12.8 0 1 1 -20.0000007,0 Q 12.052736,5.84267 13.552735,2.0426703 Z"
              id="path2"
              style={{ stroke: "#ffffff", strokeWidth: 1.3 }}
            />
            <path
              style={{
                opacity: 1,
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.12159528,
                strokeMiterlimit: 4,
                strokeDasharray: "none",
                strokeOpacity: 1,
              }}
              d="M 0,1.3127116e-4 V 38.582162 H 27.10547 V 1.3127116e-4 Z M 13.552735,2.0431 c 1,2.5333332 4.333334,7.5333335 10,15 a 12.8,12.8 0 1 1 -20.000001,0 c 5.6666682,-7.4666665 9.000002,-12.4666668 10.000001,-15 z"
              id="rect4487"
            />
          </svg>
          <div className="loader">
            <div className="water"></div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default Loader;
