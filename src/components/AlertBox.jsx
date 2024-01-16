import React from 'react';

export function AlertBox({ isOpen, onClose, title, message, onConfirm }) {
  return (
    <div className={`alert-box ${isOpen ? 'open' : ''}`}>
      <div className="alert-box-content">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="alert-box-buttons">
          <button onClick={onConfirm}>Confirm</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

