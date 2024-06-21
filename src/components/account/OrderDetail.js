import React, { startTransition, useEffect, useState } from 'react';
import axios from 'axios';
import ReactStars from "react-rating-stars-component";
import Form from 'react-bootstrap/Form';

import { render } from "react-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import numeral from 'numeral';
import { ProgressBar } from 'react-bootstrap';
import { FaCheck, FaTruck, FaBoxOpen } from 'react-icons/fa';
import "./account.css"
import logo from '../../Images/logodon.png'
import HorizontalStepper from 'react-stepper-horizontal';
// import Stepper from 'react-stepper-horizontal';
import { icon } from '@fortawesome/fontawesome-svg-core';
// import 'react-stepper-horizontal/src/Stepper.css'; 

import { MdOutlineLocalShipping } from "react-icons/md";
import { GrMap } from "react-icons/gr";
import { useParams, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import MyStepper from './MyStepper';
import Table from 'react-bootstrap/Table';
import { logEvent } from '../../utils/LogPage';
import { Divider } from 'antd';
import { LeftOutlined } from '@ant-design/icons'
import BASE_API_URL from '../../utils/apiConfig';




const steps = [
  'Chờ xác nhận',
  'Đang vận chuyển',
  'Giao hàng thành công',
  'Đánh giá',
];


const OrderDetail = () => {
  const [rating, setRating] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [productName, setProductName] = useState('');
  const handleOpenModal = (name) => {
    setProductName(name);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const { id } = useParams();
  const oderId = parseInt(id);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [orderDetail, setOrderDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [statuss, setStatus] = useState({});
  const [order, setOtder] = useState({});
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState({});

  const fetchOrderDetail = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/api/orderDetail/${userData.id}/${oderId}`);
      const orderDetailData = response.data;


      // Iterate through each item in orderDetailData and fetch product images
      const updatedOrderDetail = await Promise.all(orderDetailData.map(async (item) => {
        const productResponse = await axios.get(`${BASE_API_URL}/api/imgProducts/first/${item.productId.id}`);
        const productData = productResponse.data;
        return {
          ...item,
          productImage: productData.imgPath // Assuming the response has an image property
        };
      }));

      setOrderDetail(updatedOrderDetail);
      console.log(updatedOrderDetail);
      const firstOrder = updatedOrderDetail[0];
      setOtder(firstOrder);
      console.log(order);

      const status = firstOrder.orderId.status.id;
      console.log(firstOrder);
      setStatus(status);
      setLoading(false);
    } catch (error) {
      logEvent('ERROR', 'try to access', '5');
      window.location.href = '/notFound';
      setLoading(false);
    }
  };
  useEffect(() => {



    fetchOrderDetail();
  }, [oderId]);


  const createReview = async () => {
    try {
      const promises = orderDetail.map(async (order) => {
        await axios.post(`${BASE_API_URL}/api/review`, {
          userId: { id: userData.id },
          productId: { id: order.productId.id },
          ordersId: { id: order.orderId.id },
          rating: rating[order.productId.id] || '5',
          content: comments[order.productId.id] || '',
          status: 1
        });
      });

      await Promise.all(promises);
      console.log('Đánh giá đã được tạo');
      window.alert('Đánh giá sản phẩm thành công');
      handleCloseModal();
    } catch (error) {
      console.error('Lỗi khi tạo đánh giá:', error);
    }
  };

  const handleCommentChange = (productId, value) => {
    setComments(prevState => ({
      ...prevState,
      [productId]: value
    }));
    console.log(value);
  };

  const ratingChanged = (newRating, productId) => {
    // console.log(newRating);
    // setRating(newRating);
    setRating(prevState => ({
      ...prevState,
      [productId]: newRating
    }));
    console.log(newRating);


  };

  //cap nhat tran thai
  const handleUpdateStatus = async (status) => { // Sửa tên tham số thành status
    try {
      const response = await axios.put(`${BASE_API_URL}/api/orders/updateStatus/${oderId}`, { id: status }); // Truyền status vào body
      console.log(response.data);
      window.alert('đơn hàng đã hủy thành công');
      window.location.href = '/account/purchase';


      // setShowModal(true);
      // setErrorMessage(false);
    } catch (error) {
      console.error('Error updating order status:', error);
      // setErrorMessage(true);
    }
  };


  // Kiểm tra trạng thái đăng nhập
  const isLoggedIn = !!localStorage.getItem('userData');
  if (!isLoggedIn) {
    return <Navigate to="*" />;
  }

  




  return (
    <Container className='p-4'>
      <Row className='border'>
        {/* <h5 className=' mt-3 mb-3'>Thông tin đơn hàng</h5> */}

        <div className='pt-3'>
          <div className="navbar-order" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ cursor: 'pointer' }}>
              <LeftOutlined /> <span className="back-text">TRỞ LẠI</span>
            </div>
            <div>
              MÃ ĐƠN HÀNG {order?.orderId?.id}  |
              <span style={{ color: 'green', textTransform: 'uppercase' }}>
                {order?.orderId?.status?.statusName}
              </span>
            </div>
          </div>
          <Divider orientation="left">Chi tiết đơn hàng</Divider>
        </div>
        <div style={{ backgroundColor: '#BFEA7C' }} className='pt-3 mb-2'>
          <h6>Đơn hàng đã hoàn thành</h6>
          <p>Nếu đơn hàng có vấn đề gì bạn có thể gửi yêu cầu trả hàng/Hoàn tiền</p>
        </div>

        <hr class="hr" />
        <div className="mt-3">
          <h5><MdOutlineLocalShipping size={30} /> Thông tin vận chuyển</h5>

          {statuss === 5 ? (
            <div className='m-4'>
              <h4 style={{ color: 'red' }}>Đã hủy</h4>
            </div>


          ) : (
            <Box sx={{ width: '100%' }} className="stepper-red">

              <Stepper activeStep={statuss} alternativeLabel className="p-5" >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>


            </Box>


          )}




        </div>
        <hr class="hr" />

        <div className="mt-3">
          <h5 ><GrMap size={30} /> Địa chỉ giao hàng</h5>

          {order && order.orderId && (
            <>
              <div style={{ paddingLeft: '30px' }}>
                <p>Tên người nhận quà: {order.orderId.orderName}</p>
                <p>email: {order.orderId.email}</p>
                <p>SĐT : {order.orderId.phone}</p>
                <p>Địa chỉ nhận quà: {order.orderId.address} ,{order.orderId.provinceId && order.orderId.provinceId.provinceName}, {order.orderId.districtId && order.orderId.districtId.districtName} </p>
                <p>Ghi chú: {order.orderId.note}</p>
              </div>
            </>
          )}


        </div>
        <hr class="hr" />


        <h5 className=' mt-3'>Sản phẩm</h5>
        <div >
          <div className="cart-list">
            {loading ? (
              <p>Loading...</p>
            ) : (
              orderDetail.map((orderDetail, index) => (

                <Row className="justify-content-center align-items-center" key={index}>
                  <Col xs={4} md={2}>
                    <img src={orderDetail.productImage} alt="" style={{ width: '100%', height: '100px', objectFit: 'cover' }} />
                  </Col>
                  <Col xs={16} md={10}>
                    <Row className='p-2'>
                      <Col>
                        <p>{orderDetail.productId.productName}</p>
                        <p>  {numeral(orderDetail.productId.salePrice).format('0,0')} đ</p>
                        <span>x {orderDetail.quantity}</span>
                      </Col>
                      <Col className="d-flex align-items-center justify-content-center">
                        {statuss === 3 ? (
                          <Button style={{ backgroundColor: '#FF6666', border: '1px solid #FF6666' }}
                            onClick={() => handleOpenModal(orderDetail)}
                          >Đánh giá</Button>
                        ) : (
                          null
                        )}

                      </Col>
                    </Row>
                  </Col>
                </Row>





              ))
            )}

            {/* modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>Đánh giá sản phẩm</Modal.Title>
              </Modal.Header>
              <Modal.Body>

                {loading ? (
                  <p>Loading...</p>
                ) : (
                  orderDetail.map((orderDetail, index) => (
                    <>
                      <Row className="justify-content-center align-items-center" key={index}>
                        <Col xs={4} md={2}>
                          <img src={orderDetail.productImage} alt="" style={{ width: '100%', height: '50px', objectFit: 'cover' }} />
                        </Col>
                        <Col xs={16} md={10}>
                          <Row className='p-2'>
                            <Col>
                              <p>{orderDetail.productId.productName}</p>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row className="align-items-center">
                        <Col xs="auto">
                          <h6 className='m-3'>Chất lượng sản phẩm: </h6>
                        </Col>
                        <Col>
                          <ReactStars
                            count={5}
                            value={5}
                          
                            onChange={(newRating) => ratingChanged(newRating, orderDetail.productId.id)}
                            size={30}
                            activeColor="#ffd700"
                          />
                        </Col>
                      </Row>

                      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Hãy chia sẽ nhưng gì bạn thích ở sản phẩm này với những người mua khác</Form.Label>
                        <Form.Control as="textarea" rows={5}
                          onChange={(e) => handleCommentChange(orderDetail.productId.id, e.target.value)}
                        />
                      </Form.Group>

                    </>

                  ))
                )}

              </Modal.Body>
              <Modal.Footer>

                <Button
                  style={{ backgroundColor: '#FF5D5D', border: '1px solid #FF5D5D' }}
                  onClick={createReview}
                >
                  Hoàn thành
                </Button>

              </Modal.Footer>
            </Modal>
            {/* modal */}


            <hr class="hr" />


            <Table striped bordered hover>
              <tbody>
                {order && order.orderId && (
                  <>
                    <tr>
                      <td className="text-start">Phí vận chuyển</td>
                      <td className="text-start">{numeral(order.orderId.transport).format('0,0')} đ</td>
                    </tr>
                    <tr>
                      <td className="text-start">Mã Giảm giá</td>
                      <td className="text-start">{order.orderId.discountId ? order.orderId.discountId.discountPercentage + '%' : 'Không có'} </td>
                    </tr>
                    <tr>
                      <td className="text-start">Thành tiền</td>
                      <td className="text-start">{numeral(order.orderId.totalPrice).format('0,0')} đ</td>
                    </tr>
                    <tr>
                      <td className="text-start">Phương thức thanh toán</td>
                      <td className="text-start">{order.orderId.paymentId ? order.orderId.paymentId.paymentName : 'Không có'}</td>
                    </tr>
                  </>
                )}
              </tbody>
            </Table>
          </div>

        </div>

        {statuss === 1 ? (
          <Row className="justify-content-center align-items-center">
            <Col xs="auto">
              <div className='pb-3'>
                <Button
                  style={{ backgroundColor: '#FF6666', border: '1px solid #FF6666' }} onClick={() => handleUpdateStatus(5)}>
                  Hủy đơn hàng
                </Button>
              </div>
            </Col>
          </Row>
        ) : statuss === 2 ? (
          <Row className="justify-content-center align-items-center">
            <Col xs="auto">
              <div className='pb-3'>
                <Button
                  style={{ backgroundColor: '#FF6666', border: '1px solid #FF6666' }} onClick={() => handleUpdateStatus(3)}>
                  Đã nhận được hàng
                </Button>
              </div>
            </Col>
          </Row>
        ) : null}






      </Row>
    </Container>
  )
}

export default OrderDetail