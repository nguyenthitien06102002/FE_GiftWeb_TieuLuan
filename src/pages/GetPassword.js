import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import logo from "../Images/FoxBoxLogo.png";
import { FcApproval } from "react-icons/fc";
import NavBar from '../components/Navbar/Navbar';
import BASE_API_URL from '../utils/apiConfig';
const GetPassword = () => {

    const [email, setEmail] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [error, showError] = useState(false);
    const [success, showSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {

            const response = await axios.post(`${BASE_API_URL}/api/passwordReset/request/${email}`);
            console.log('Email sent successfully:', response.data);
            // Xử lý phản hồi từ server nếu cần
            // Reset trường địa chỉ email sau khi gửi thành công
            setShowModal(true);
            setEmail(email);
            showError(false);
            showSuccess(true);

        } catch (error) {
            console.error('Error sending email:', error);
            showError(true);
            showSuccess(false);
            // Xử lý lỗi nếu có
        }
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);

    };

    const handleCloseModal = () => {
        setShowModal(false);
    };


    return (
        <>
        <NavBar/>
            <Container>
                <Row className="justify-content-center m-4 pt-3">
                    <Col sm={6} className='border'>



                        <Form className='m-4' onSubmit={handleSubmit}>
                            <h2 className='text-center'>Quên mật khẩu</h2>
                            <Form.Group className="mb-3 mt-2" controlId="formBasicEmail">
                                <Form.Label>* Nhập địa chỉ email:</Form.Label>
                                <Form.Control type="email" placeholder="Enter email"
                                    value={email}
                                    onChange={handleEmailChange} />
                                {error && (
                                     <Form.Text className=" text-danger" style={{color: 'red'}}>
                                    Email không tồn tại!!
                                 </Form.Text>
                                )}
                                {success && (
                                    <Form.Text className=" text-success" style={{color: 'green'}}>
                                    Email đã được gửi thành công!!
                                 </Form.Text>
                                )}


                              
                            </Form.Group>


                            <Button style={{
                                width: '100%', backgroundColor: '#FF6666', border: '1px solid #FF6666', color: 'white',
                                fontWeight: 'bold',
                            }} type="submit">
                                xác nhận
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>

            {/* Modal */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Quên mật khẩu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="d-flex align-items-center justify-content-center">
                        <Col xs={8} className="text-center">
                            <div>
                                <FcApproval style={{ fontSize: '100px' }} />
                            </div>



                            <h6>Link lấy lại mật khẩu vừa được gửi vào mail {email}, Vui lòng kiểm tra mail </h6>
                        </Col>
                        {/* <Col xs={4} className="text-center">
                            <img className='img-logo m-2' src={logo} alt='logo'></img>
                        </Col> */}
                    </Row>

                    {/* Link gửi lại mật khẩu vừa được gửi vào mail {email} vui lòng kiểm tra mail */}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Dóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>


    )
}

export default GetPassword