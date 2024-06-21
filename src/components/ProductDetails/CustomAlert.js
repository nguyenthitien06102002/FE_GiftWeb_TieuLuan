import React from 'react';

const CustomAlert = ({ message, onClose }) => {
  return (
    <div className="custom-alert">
      <div className="message">{message}</div>
      <button onClick={onClose}>Đóng</button>
    </div>
  );
};

export default CustomAlert;
