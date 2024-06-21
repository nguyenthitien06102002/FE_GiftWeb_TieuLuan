import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AccountLeft from '../components/account/AccountLeft';
import AccountRight from '../components/account/AccountRight';
import { useParams } from 'react-router-dom';
import Changepassword from '../components/account/Changepassword';
import Purchase from '../components/account/Purchase/Purchase';
import OrderDetail from '../components/account/OrderDetail';
import NavBar from '../components/Navbar/Navbar';

const OderDetail = () => {
    return (
        <div>
            <NavBar />
            <Container className='mt-4 mb-4'>
                <Row>
                    <Col sm={4}>
                        <AccountLeft />
                    </Col>
                    <Col sm={8}>
                        
                           <OrderDetail />
                       
                    </Col>
                </Row>

            </Container>
        </div>
    )
}

export default OderDetail