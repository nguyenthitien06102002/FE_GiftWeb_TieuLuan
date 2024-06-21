import React from "react"
import "./style.css"
import { Col, Container, Row } from "react-bootstrap"
import { SiApifox } from "react-icons/si";

const Footer = () => {
  return (
    <footer>
        <Container>
          <Row className="footer-row">
            <Col md={3} sm={5} className='box'>
              <div className="logo">
              <div ><SiApifox style={{ color: '#FFEADD' }} /></div>
                  <h1>FOXBOX</h1>
              </div>
              <p>Chào mừng bạn đến với FOXBOX - nơi tìm kiếm những món quà độc đáo và ý nghĩa nhất. Chúng tôi cam kết mang lại trải nghiệm mua sắm đáng nhớ với các sản phẩm chất lượng và dịch vụ tận tình.</p>
            </Col>
            <Col md={3} sm={5} className='box'>
              <h2>VỀ CHÚNG TÔI</h2>
              <ul>
                <li>Cửa hàng của chúng tôi</li>
                <li>Sự quan tâm của chúng tôi</li>
                <li>Điều khoản và điều kiện</li>
                <li>Terms & Conditions</li>
                <li>Chính sách bảo mật</li>
              </ul>
            </Col>
            <Col md={3} sm={5} className='box'>
              <h2>DÀNH CHO KHÁCH HÀNG</h2>
              <ul>
                <li>Hình thức mua hàng và thanh toán </li>
                <li>Cước phí vận chuyển </li>
                <li>Thông tin tài khoản ngân hàng </li>
                <li>Lý do chọn chúng tôi </li>
                {/* <li>Returns & Refunds </li> */}
              </ul>
            </Col>
            <Col md={3} sm={5} className='box'>
              <h2>THÔNG TIN LIÊN HỆ</h2>
              <ul>
                <li>Đại Học Nông Lâm TP.HCM </li>
                <li>Email: Miuzyyy@gmail.com</li>
                <li>Phone: +1 1123 456 780</li>
              </ul>
            </Col>
          </Row>
        </Container>
    </footer>
  )
}

export default Footer
