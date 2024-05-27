import React from "react";
import "./Modal.css";

const Modal = ({ isOpen, onClose, seller }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Seller Details</h2>
        {seller && (
          <div>
            <p>First Name: {seller.FirstName}</p>
            <p>Last Name: {seller.LastName}</p>
            <p>Email: {seller.Email}</p>
            <p>Phone: {seller.Phone}</p>
          </div>
        )}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
