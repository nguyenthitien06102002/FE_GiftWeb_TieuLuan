import React from 'react'
import "./style.css";
import { Link } from 'react-router-dom'; 


const NotFount = () => {
  return (
    <div className="not-found-container">
    <div className="not-found-content">
      <h1>404 - Không tìm thấy trang</h1>
      <p>Rất tiếc, trang bạn đang tìm kiếm không tồn tại.</p>
      <Link to="/">Trở về trang chủ</Link>
    </div>
    <img
      className="not-found-image"
      src="https://i.pinimg.com/originals/cc/2c/0b/cc2c0bae7ddc00fe9164fe1ef968f99e.gif"
      alt="Not Found"
    />
  </div>
  )
}

export default NotFount