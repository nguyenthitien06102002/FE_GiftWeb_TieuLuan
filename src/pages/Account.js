import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AccountLeft from '../components/account/AccountLeft';
import AccountRight from '../components/account/AccountRight';
import { Router, useParams , Navigate, Outlet } from 'react-router-dom';
import Changepassword from '../components/account/Changepassword';
import Purchase from '../components/account/Purchase/Purchase';
import OrderDetail from '../components/account/OrderDetail';
import NavBar from '../components/Navbar/Navbar';

const Account = () => {
    const { name } = useParams();
    // const userData = JSON.parse(localStorage.getItem('userData'));

    //    // Nếu userData.id không tồn tại, chuyển hướng qua trang NotFound
    //    if (!userData || !userData.id) {
    //     return <Router to="/notFound" />;
    // }
     // Kiểm tra trạng thái đăng nhập
  const isLoggedIn = !!localStorage.getItem('userData');

  if (!isLoggedIn) {
   
    return <Navigate to="*" />;
  }

  
    return (
        <div>
            <NavBar />
            <Container className='mt-4 mb-4'>
                <Row>
                    <Col sm={4}>
                        <AccountLeft />
                    </Col>
                    <Col sm={8}>
                     
                        {/* {name === 'profile' ? (
                            <AccountRight />
                        ) : name === 'changepassword' ? (
                            <Changepassword />
                        ) : name === 'purchase' ? (
                            <Purchase />
                        ) 
                       
                         : <Purchase/>} */}
                        <Outlet /> 
                    </Col>
                </Row>

            </Container>
        </div>
    )
}

export default Account