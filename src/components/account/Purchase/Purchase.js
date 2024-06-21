import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Button, Modal } from "react-bootstrap";
import { RiDeleteBin6Line } from "react-icons/ri";
import numeral from 'numeral';
import axios from "axios";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate, useParams } from "react-router-dom";
import { Divider, Tabs } from 'antd';

import { OrderList } from './OrderList';
import "./purchase.css";
import { Link } from 'react-router-dom';
import BASE_API_URL from '../../../utils/apiConfig';


const Purchase = () => {
 
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();



  const onChange = (key) => {
    console.log(key);
  };


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/api/orders/${userData.id}`);
        setOrders(response.data.reverse());
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userData.id]);


  const getFilteredOrders = (statusId) => {
    if (statusId === null) return orders;
    return orders.filter(order => order.status.id === statusId);
  };
  
  const items = [
    {
      key: '1',
      label: 'Tất cả',
      children: <OrderList orders={getFilteredOrders(null)} loading={loading} />,
    },
    {
      key: '2',
      label: 'Chờ xác nhận',
      children: <OrderList orders={getFilteredOrders(1)} loading={loading} />,
    },
    {
      key: '3',
      label: 'Đang giao',
      children: <OrderList orders={getFilteredOrders(2)} loading={loading} />,
    },
    {
      key: '4',
      label: 'Giao hàng thành công',
      children: <OrderList orders={getFilteredOrders(3)} loading={loading} />,
    },
    {
      key: '5',
      label: 'Đánh giá',
      children: <OrderList orders={getFilteredOrders(4)} loading={loading} />,
    },
    {
      key: '6',
      label: 'Đã hủy',
      children: <OrderList orders={getFilteredOrders(5)} loading={loading} />,
    },
  ];

  //     {
  //         key: '1',
  //         label: 'Tất cả',
  //         children: <OrderList/> ,
  //         className: 'tab-label',
  //     },
  //     {
  //         key: '2',
  //         label: 'Chờ xác nhận',
  //         children: <OrderList />,
  //     },
  //     {
  //         key: '3',
  //         label: 'Đang vận chuyển',
  //         children: <OrderList />,
  //     },
  //     {
  //         key: '4',
  //         label: 'Giao hàng thành công',
  //         children: <OrderList />,
  //     },
  //     {
  //       key: '5',
  //       label: 'Đã hủy',
  //       children: <OrderList />,
  //   },
  // ];
  return (
    <div>

      <Container className='p-4'>
        <Row className='border'>



          {/* <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" style={{paddingRight: '10px'}}>
              <Container style={{fontSize: '15px'}}>
                <Navbar.Brand href="#home" ></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className=" me-auto d-flex justify-content" style={{ width: '100%' }}>
                 
                    <Link to="/account/purchase/All" className='styleName'  >Tất cả</Link>
                    <Link to="/account/purchase/1" className='styleName' >Chờ xác nhận</Link>
                    <Link to="/account/purchase/2" className='styleName' >Đang vận chuyển</Link>
                    <Link to="/account/purchase/3" className='styleName' >Đã giao</Link>
                    <Link to="/account/purchase/5" className='styleName' >Đã hủy</Link>
                    <Link to="/account/purchase/4" className='styleName' >Đánh giá</Link>
                   
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar> */}
          <h5 className=' mt-3'>ĐƠN HÀNG CỦA TÔI</h5>
          <p>Quản lý đơn hàng</p>
          <hr class="hr" />
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />

          {/* <hr class="hr" /> */}
          {/* <OrderList /> */}


        </Row>

      </Container>
    </div>
  )
}

export default Purchase