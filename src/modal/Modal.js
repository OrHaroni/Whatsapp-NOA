import React from 'react';

const Modal = ({ isOpen, onClose }) => {
    if (!isOpen) {
      return null;
    }
  
    return (
      <div className="modal">
        <div className="modal-content">
          <h2>Modal Title</h2>
          <p>Modal Content</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };

export default Modal;
