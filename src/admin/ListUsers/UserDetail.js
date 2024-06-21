import React, { useState, useEffect, Component } from 'react'
import AdminLayout from '../AdminLayout/AdminLayout';
import numeral from 'numeral';
import "./ListUsers.css";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import { CardHeader } from "reactstrap";
import { Form, Button } from "react-bootstrap";
import AdminFooter from '../Footer/AdminFooter';
import { FaEdit } from "react-icons/fa";
import axios from 'axios';
import { FaEye, FaEyeSlash, FaFacebook, FaGoogle } from "react-icons/fa";
import Switch from "react-switch";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import BASE_API_URL from '../../utils/apiConfig';





const UserDetail = () => {
    const { id } = useParams();
    const [checked, setChecked] = useState(true);
    const [user, setUser] = useState('');
    const [userName, setUserName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    const handleChange = (status, title) => {
        // setChecked(checked);
        // setStatus(checked ? 1 : 2);

        axios.put(`${BASE_API_URL}/api/users/updateStatus/${id}`, {
            status: status

        })
            .then(response => {
                window.alert('Cập nhật trạng thái' + title + 'người dùng thành công!');
                fetchUsers();


            })
            .catch(error => {

                console.error("Đã xảy ra lỗi khi cập nhật thông tin người dùng:", error);
            });

    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/api/users/${id}`);
            setUser(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {


        fetchUsers();
        setUserName(user.userName);
        setEmail(user.email);
        setPhone(user.phoneNumber);
        setStatus(user.status);

    }, [id, user.userName, user.email, user.phoneNumber, user.status]);


    const updateUser = () => {
        axios.put(`${BASE_API_URL}/api/users/update/${id}`, {
            userName: userName,
            email: email,
            phoneNumber: phone,

        })
            .then(response => {
                window.alert('Cập nhật thông tin người dùng thành công!');
                fetchUsers();

            })
            .catch(error => {

                console.error("Đã xảy ra lỗi khi cập nhật thông tin người dùng:", error);
            });
    };










    return (
        <>
            <AdminLayout >
                <div className="mb-4 d-flex flex-wrap">
                    <div style={{ cursor: 'pointer' }} onClick={() => navigate(-1)}>
                        <LeftOutlined /> TRỞ LẠI
                    </div>


                </div>
                <h5 className='mb-4'><FaEdit /> Chỉnh sửa người dùng</h5>
                <div className="row">
                    <div className="col-md-12">
                        <Row className='mb-4'>
                            <Col xl="4">
                                <Card className="shadow">
                                    <CardHeader className="bg-transparent">
                                        <Row className="align-items-center">
                                            <h4></h4>
                                        </Row>
                                    </CardHeader>
                                    <CardBody>
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                            <img
                                                alt="..."
                                                src="https://i.pinimg.com/564x/e0/45/ab/e045ab274723fc8391cbe10a15fa4b21.jpg"
                                                style={{ height: '100px', width: '100px', borderRadius: '50%', objectFit: 'cover' }}
                                            />

                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }} className='mt-4'>
                                            <h4>{user.userName}</h4>
                                        </div>
                                        <div>

                                            <Container>
                                                <Row>
                                                    <Row className='mt-2'>
                                                        <Col sm={4}>Mã:</Col>
                                                        <Col sm={8}>{user.id}</Col>
                                                    </Row>


                                                    <Row className='mt-3'>
                                                        <Col sm={4}>Họ và Tên:</Col>
                                                        <Col sm={8}>{user.userName}</Col>
                                                    </Row>

                                                    <Row className='mt-3'>
                                                        <Col sm={4}>Email:</Col>
                                                        <Col sm={8}>{user.email}</Col>
                                                    </Row>

                                                    <Row className='mt-3'>
                                                        <Col sm={4}>SĐT:</Col>
                                                        <Col sm={8}>{user.phoneNumber}</Col>
                                                    </Row>

                                                    <Row className='mt-3'>
                                                        <Col sm={4}>Ngày tạo:</Col>
                                                        <Col sm={8}>{user?.createTime?.slice(0, 10)}</Col>
                                                    </Row>
                                                    <Row className='mt-3'>
                                                        <Col >Loại tài khoản:
                                                            {user.typeID === 0 ?
                                                                (<span> Admin</span>) : (user.typeID === 1) ? (<span>Tài khoản thường</span>) : ((user.typeID === 2) ? (<span> FaceBook</span>) : (<span> Google</span>))
                                                            }

                                                        </Col>


                                                    </Row>



                                                </Row>

                                            </Container>

                                        </div>




                                    </CardBody>
                                </Card>
                            </Col>
                            <Col className="mb-5 mb-xl-0" xl="8">
                                <Card className="bg-gradient-default shadow"  >
                                    <CardHeader className="bg-transparent">
                                        <Row className="align-items-center">
                                            <h4>Chỉnh sửa thông tin</h4>
                                        </Row>
                                    </CardHeader>
                                    <CardBody>

                                        <Form onSubmit={updateUser}>
                                            <Form.Group className="mb-3 d-flex align-items-center" controlId="formBasicPassword" style={{ cursor: 'pointer' }}>
                                                {/* <Switch onChange={handleChange} checked={checked}  /> */}
                                                {user.status === 1 ? (
                                                    <>
                                                        <FaEye
                                                            onClick={() => handleChange(2, 'khóa')}
                                                            style={{ fontSize: '30px', color: 'red', }} /> <Form.Label className="mb-0" style={{ fontWeight: 'bold', marginLeft: '10px' }}>Khóa tài khoản</Form.Label>

                                                    </>
                                                ) : (
                                                    (user.status == 2) ? (
                                                        <>
                                                            <FaEyeSlash onClick={() => handleChange(1, 'mở')}
                                                                style={{ fontSize: '30px', color: 'red', }} /> <Form.Label className="mb-0" style={{ fontWeight: 'bold', marginLeft: '10px' }}>Khóa tài khoản</Form.Label>

                                                        </>) : (
                                                        null
                                                    )
                                                )}

                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Họ và Tên</Form.Label>
                                                <Form.Control type="text" value={userName} className='border'

                                                    onChange={(e) => setUserName(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="email" value={email} className='border'
                                                    onChange={(e) => setEmail(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Số điện thoại</Form.Label>
                                                <Form.Control type="text" value={phone} className='border'
                                                    onChange={(e) => setPhone(e.target.value)} />
                                            </Form.Group>

                                            <Button variant="primary" type="submit">
                                                Cập nhật
                                            </Button>
                                        </Form>



                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
                <AdminFooter />
            </AdminLayout >
        </>
    )
}

export default UserDetail;
