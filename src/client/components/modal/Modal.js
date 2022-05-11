import React from "react";
import "./modal.css";
function Modal({ closeModal, permited }) {
  return (
    <div>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleBtn">
            <button onClick={() => closeModal(false)}>
              <span>X</span>
            </button>
          </div>
          <div className="body">
            <p>{permited.message}</p>
          </div>
          <div className="footer">
            <button onClick={() => closeModal(false)}>close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
