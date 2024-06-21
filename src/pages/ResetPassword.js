import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import logo from "../Images/FoxBoxLogo.png";
import { FcApproval } from "react-icons/fc";
import { useLocation } from 'react-router-dom';
import NavBar from '../components/Navbar/Navbar';
import BASE_API_URL from '../utils/apiConfig';



const ResetPassword = () => {
    const [newPassword, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);
    const [isStrongPassword, setIsStrongPassword] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [token, setToken] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);

    const validatePassword = (newPassword) => {
        const regex = /^(?=.*[!@#$%^&*])(?=.*[a-zA-Z0-9]).{8,}$/;
        return regex.test(newPassword);
    };

    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        setToken(token);
        console.log(token);
    }, [location]);


    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setIsStrongPassword(validatePassword(event.target.value));
        setIsPasswordMatch(confirmPassword === event.target.value);

    };
    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
        setIsPasswordMatch(newPassword === event.target.value);

    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isPasswordMatch && isStrongPassword && token) {
            try {
                const response = await axios.put(`${BASE_API_URL}/api/passwordReset/reset/${token}?newPassword=${newPassword}`);
                console.log(response.data);
                setShowModal(true);
                setErrorMessage(false);
            } catch (error) {
                console.error('Error resetting password:', error);
                setErrorMessage(true);
            }
        }
    };
    

    const handleCloseModal = () => {
        setShowModal(false);
    }
    return (
        <div> 
            <NavBar/>
            
             <Container>
            <Row className="justify-content-center m-4 pt-3">
                <Col sm={6} className='border'>



                    <Form className='m-4' onSubmit={handleSubmit}>
                        <h2 className='text-center'>Tạo mật khẩu mới</h2>
                        <Form.Group className="mb-3 mt-2" controlId="formBasicEmail">
                            <Form.Label>* Nhập mật khẩu mới:</Form.Label>
                            <Form.Control type="password" placeholder="Nhập password"
                                value={newPassword}
                                onChange={handlePasswordChange}
                                isInvalid={!isStrongPassword} />


                            <Form.Control.Feedback type="invalid">Mật khẩu phải có ít nhất 8 ký tự và chứa ít nhất một ký tự đặc biệt</Form.Control.Feedback>
                            {errorMessage && (
                                     <Form.Text className=" text-danger" style={{color: 'red'}}>
                                   Phiên làm việc hết hạn, vui lòng thử lại.
                                 </Form.Text>
                                )}

                        </Form.Group>
                        <Form.Group className="mb-3 mt-2" controlId="formBasicEmail">
                            <Form.Label>* Xác nhận lại mật khẩu:</Form.Label>
                            <Form.Control type="password" placeholder="Nhập password"
                                value={confirmPassword}
                                onChange={handleConfirmPassword} 
                                isInvalid={!isPasswordMatch}/>
                            <Form.Control.Feedback type="invalid">Mật khẩu nhập lại không trùng khớp</Form.Control.Feedback>



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

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Reset Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FcApproval size={30} /> Mật khẩu đã được thay đổi thành công.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>

        </Container>
        
        </div>
    )
}

export default ResetPassword