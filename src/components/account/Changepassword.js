import React, { useState } from 'react'
import "./account.css";
import { Container, Row, Col, Button, Alert } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import { FaFacebookSquare } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import BASE_API_URL from '../../utils/apiConfig';




const Changepassword = () => {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')) || {});
    const [newPassword, setNewPassword] = useState('');
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isStrongPassword, setIsStrongPassword] = useState(true);
    const [currentPassword, setCurrentPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setIsStrongPassword(validatePassword(e.target.value));
        setIsPasswordMatch(confirmPassword === e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setIsPasswordMatch(password === e.target.value);
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[!@#$%^&*])(?=.*[a-zA-Z0-9]).{8,}$/;
        return regex.test(password);
    };


    const handleChangePassword = () => {
        // Check if newPassword matches confirmPassword
        if (password !== confirmPassword) {
            setError('Mật khẩu mới và xác nhận mật khẩu không khớp.');
            return;
        }

        axios.put(`${BASE_API_URL}/api/users/password/${userData.id}`, {
            currentPassword: currentPassword,
            newPassword: password

        })
            .then(response => {
               
                console.log(response.data);
                setError(''); 
                setSuccess('Tài khoản đã đổi mật khẩu thành công.')
            })
            .catch(error => {
                
                console.error(error);
                if (error.response) {
                 
                    setError(error.response.data.message || 'Mật Khẩu bị sai.');
                } else if (error.request) {
                    // The request was made but no response was received
                    setError('Không nhận được phản hồi từ máy chủ.');
                } else {
                    // Something happened in setting up the request that triggered an Error
                    setError('Có lỗi xảy ra khi gửi yêu cầu.');
                }
            });
    };





    return (
        <Container className='p-4'>
            <Row className='border'>
                <h5 className=' mt-3'>Thay đổi mật khẩu</h5>
                <p>Bạn nên cập nhập mật khẩu thường xuyên vì lý do bảo mật</p>
                <hr class="hr" />
                <Form>
                    <Row>
                        <Form.Label column lg={2}>
                            Mật khẩu cũ
                        </Form.Label>
                        <Col>
                            <Form.Control type="password" className='border' placeholder="Mật khẩu cũ" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Form.Label column lg={2}>
                            Mật Khẩu mới
                        </Form.Label>
                        <Col>
                            {/* <Form.Control type="password" className='border' placeholder="Normal text" /> */}
                            <Form.Control type="password" placeholder="Mật khẩu" value={password} onChange={handlePasswordChange} isInvalid={!isStrongPassword} />
                            <Form.Control.Feedback type="invalid">Mật khẩu phải có ít nhất 8 ký tự và chứa ít nhất một ký tự đặc biệt</Form.Control.Feedback>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Form.Label column lg={2}>
                            Xác nhận mật khẩu
                        </Form.Label>
                        <Col>
                            {/* <Form.Control type="password" className='border' placeholder="Normal text" /> */}
                            <Form.Control type="password" placeholder="Nhập lại mật khẩu" value={confirmPassword} onChange={handleConfirmPasswordChange} isInvalid={!isPasswordMatch} />
                            <Form.Control.Feedback type="invalid">Mật khẩu nhập lại không trùng khớp</Form.Control.Feedback>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            {error && <Alert variant="danger">{error}</Alert>} 
                            {success && <Alert variant="success">{success}</Alert>}
                        </Col>
                    </Row>
                    <Row>
                        <Form.Label column lg={2}>
                            {/* Xác nhận mật khẩu */}
                        </Form.Label>
                        <Col>
                            <Button className='style-button' onClick={handleChangePassword}>
                                Xác nhận
                            </Button>
                        </Col>
                    </Row>


                </Form>
                {/* <p>Liên kết mạng xã hội</p>
                <div>
                    <h5>
                        <FaFacebookSquare style={{ color: '#0866ff', fontSize: '30px' }} /> FaceBook
                    </h5></div>

                <div>
                    <h5>
                        <FcGoogle style={{ fontSize: '30px' }} /> Google
                    </h5></div> */}

            </Row>

        </Container>
    )
}

export default Changepassword