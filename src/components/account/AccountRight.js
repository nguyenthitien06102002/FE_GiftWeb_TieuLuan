import React, { useState, useEffect } from 'react'
import "./account.css";
import { Container, Row, Col, Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import { FaFacebookSquare } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import BASE_API_URL from '../../utils/apiConfig';


const AccountRight = () => {
    // const userData = JSON.parse(localStorage.getItem('userData'));
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')) || {});
    const [userName, setUserName] = useState(userData.userName);
    const [phone, setPhone] = useState(userData.phoneNumber);
    const [phoneError, setPhoneError] = useState('');
    const [canSubmit, setCanSubmit] = useState(true);
    const [email, setEmail] = useState(userData.email);
    const [emailError, setEmailError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        // Lấy dữ liệu từ localStorage mỗi khi nó thay đổi
        const storedUserData = JSON.parse(localStorage.getItem('userData')) || {};
        setUserData(storedUserData);
        setUserName(storedUserData.userName || '');
        setPhone(storedUserData.phoneNumber || '');
        setEmail(storedUserData.email || '');
    }, [localStorage.getItem('userData')]);



    const handleUserNameChange = (event) => {
        const { value } = event.target;
        setUserName(value);
    };

    const handlePhoneChange = (event) => {
        const { value } = event.target;
        setPhone(value);

        // Kiểm tra số điện thoại có đúng định dạng không
        const phoneRegex = /^[0-9]{10,11}$/;
        if (!phoneRegex.test(value)) {
            setPhoneError('Số điện thoại không hợp lệ');
            setCanSubmit(false);
        } else {
            setPhoneError('');
            setCanSubmit(true);
        }
    };

    const handleEmailChange = (event) => {
        const { value } = event.target;
        setEmail(value);

        // Kiểm tra email có đúng định dạng không
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) {
            setEmailError('Email không hợp lệ');
            setCanSubmit(false);
        } else {
            setEmailError('');
            setCanSubmit(true);
        }
    };

    const updateUser = () => {
        // Kiểm tra nếu không thể submit thì không gọi API
        if (!canSubmit) return;

        // Gửi yêu cầu PUT đến API cập nhật thông tin người dùng
        axios.put(`${BASE_API_URL}/api/users/update/${userData.id}`, {
            userName: userName,
            email: email,
            phoneNumber: phone,

        })
            .then(response => {
                console.log("Thông tin người dùng đã được cập nhật thành công:", response.data);
                setSuccess(true);
                const updatedUserData = { ...userData, userName: userName, phoneNumber: phone, email: email };
                localStorage.setItem('userData', JSON.stringify(updatedUserData));
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error("Đã xảy ra lỗi khi cập nhật thông tin người dùng:", error);
            });
    };

    return (
        <Container className='p-4'>
            <Row className='border'>
                <h5 className=' mt-3'>HỒ SƠ CỦA TÔI</h5>
                <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                <hr class="hr" />
                <Form>
                    {success && (
                        <div className="alert alert-success" role="alert">
                            Chúc mừng bạn đã cập nhật thông tin Hồ sơ thành công.
                        </div>
                    )}
                    <Row>
                        <Form.Label column lg={2}>
                            Họ và Tên
                        </Form.Label>
                        <Col>
                            <Form.Control type="text" className='border'
                                value={userName}
                                onChange={handleUserNameChange} />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Form.Label column lg={2}>
                            Điện thoại
                        </Form.Label>
                        <Col>
                            <Form.Control type="text" className='border' onChange={handlePhoneChange}
                                value={phone} />

                        </Col>
                        {phoneError &&
                            <small className=" text-danger">
                                {phoneError}
                            </small>}
                    </Row>
                    <br />
                    <Row>
                        <Form.Label column lg={2}>
                            Email
                        </Form.Label>
                        <Col>
                            <Form.Control
                                type="text"
                                className='border'
                                value={email}
                                onChange={handleEmailChange}
                                disabled={userData.typeID === 3 || userData.typeID === 2} // Đặt disabled nếu userData.typeID === 3
                            />
                        </Col>
                        {emailError && <small className="text-danger">{emailError}</small>}
                    </Row>
                    <br />
                    <Button className='style-button' onClick={updateUser}>
                        Cập nhật
                    </Button>

                </Form>
                <p>Liên kết mạng xã hội</p>
                {userData.typeID == 2 ? (
                    <div>
                        <h5>
                            <FaFacebookSquare style={{ color: '#0866ff', fontSize: '30px' }} /> FaceBook
                        </h5></div>
                ) : (
                    (userData.typeID) == 3 ? (
                        <div>
                            <h5>
                                <FcGoogle style={{ fontSize: '30px' }} /> Google
                            </h5></div>
                    ) : (
                        null
                    )
                )}




            </Row>

        </Container>
    )
}

export default AccountRight