import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const AlertModal = ({ show, handleClose , title, image }) => {
  return (
    <Modal
    show={show}
    onHide={handleClose}
    centered  // Hiển thị modal ở giữa màn hình
    backdrop="static" // Tắt chức năng đóng modal khi nhấp bên ngoài modal
    keyboard={false} // Tắt chức năng đóng modal khi nhấn phím Esc
  >
    <Modal.Header closeButton={false}> {/* Loại bỏ nút close */}
      <Modal.Title>Thông báo</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      Sản phẩm đã được thêm vào giỏ hàng thành công.
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Đóng
      </Button>
    </Modal.Footer>
  </Modal>
  );
};

export default AlertModal;
