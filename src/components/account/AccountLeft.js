import React from 'react'
import { Container, Row } from 'react-bootstrap'
import "./account.css";
import { FaUser, FaUserEdit, FaUserCog } from "react-icons/fa";
import { MdLibraryBooks } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import logo from "../../Images/FoxBoxLogo.png";
import { Link, useNavigate } from "react-router-dom";
import {
  LogoutOutlined,
  ContainerOutlined,
  UnorderedListOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Space } from 'antd';
import { useState } from 'react'


const AccountLeft = () => {
 

  const handleLogout = () => {

    localStorage.removeItem('userData');

    window.location.href = '/';
  };

  const items = [
    {
      key: '1',
      icon: <PieChartOutlined />,
      label: (
        <Link to="info" style={{ textDecoration: 'none' }}>Thông tin tài khoản</Link>)
    },
    {
      key: '2',
      icon: <UnorderedListOutlined />,
      label: (
        <Link to="Changepassword" style={{ textDecoration: 'none' }}>Đổi mật khẩu</Link>)
    },
    {
      key: '3',
      icon: <ContainerOutlined />,
      label: (
        <Link to="purchase" style={{ textDecoration: 'none' }}>Đơn hàng</Link>)
    },
    {
      key: '4',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      onClick: handleLogout,
    },
  ];
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };


  return (

    <Container className='p-4'>
      <Row className='border'>
        <div className="d-flex justify-content-center align-items-center">
          <img className='img-logo m-2' src={logo} alt='logo'></img>
        </div>
        <h4 className='text-center mt-3'>Tiên nguyễn</h4>
        {/* <ul >
        
          <Link to="info" className="nav-link">Thông tin tài khoản</Link>
          <Link to="Changepassword" className="nav-link">Đổi mật khẩu</Link>
          <Link to="purchase" className="nav-link">Lịch sử đơn hàng</Link>
          <Link onClick={handleLogout} className="nav-link">Đăng xuất</Link>

        </ul> */}

        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="light"
          inlineCollapsed={collapsed}
          items={items}
        />
      </Row>

    </Container>

  )
}

export default AccountLeft