import React, { useState, useEffect } from 'react'
import AdminLayout from '../AdminLayout/AdminLayout';

import { useNavigate, useParams } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import DataTable from 'react-data-table-component';
import AdminFooter from '../Footer/AdminFooter';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import './ListO.css';
import OrderTracking from '../OrderTracking/OrderTracking';
import axios from 'axios';
import numeral from 'numeral';
// import ReactStars from "react-rating-stars-component";
import StarRatings from 'react-star-ratings';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaEdit } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import BASE_API_URL from '../../utils/apiConfig';
import { LeftOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';

const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';
const ReviewDetail = () => {
    const { id } = useParams();
    const router = useNavigate();
    const navigate = useNavigate();
    const [content, setContent] = useState('');
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [imgProduct, setImgProduct] = useState('');
    const [idProduct, setIdProduct] = useState('');

    const handelBack = () => {
        router(`admin/listReview`);
    };

    const CustomButton = ({ onClick }) => (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>

        </div>

    );
    const [review, setReview] = useState('');
    const [reply, setReply] = useState('');

    const fetchReview = async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/api/review/get/${id}`);

            setReview(response.data);

            

        } catch (error) {
            console.error(error);
        }
    };


    const fetchImgProduct = async () => {
        try {
            const id = review?.productId?.id;
            if (!id) {
                // console.error('Product ID is not defined');
                return;
            }
            const response = await axios.get(`${BASE_API_URL}/api/imgProducts/${id}`);

            setImgProduct(response.data[0]);



        } catch (error) {
            console.error(error);
        }
    };
    const getReply = async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/api/reply/${id}`);
            setReply(response.data);

        } catch (error) {
            console.error(error);
        }
    };
    const [ratting, setRatting] = useState();
    // console.log(ratting);

    useEffect(() => {
        fetchImgProduct();
        fetchReview();
        if (review && review.productId) {
            setIdProduct(review.productId.id);

            setRatting(parseInt(review.rating));
        }
        getReply();
    }, [review]);

    const createReply = async () => {
        try {
            const response = await axios.post(`${BASE_API_URL}/api/reply`, {
                review: {
                    id: id
                },
                content: content,
                status: 1,
                users: {
                    id: userData.id
                }
            });


            window.alert('Phản hồi thành công');
            fetchReview();
            getReply();
        } catch (error) {
            console.error(error);
        }
    };

    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState('');


    const handleEditClick = () => {
        setEditContent(reply?.content);
        setIsEditing(true);
    };

    const handleContentChange = (event) => {
        setEditContent(event.target.value);
    };

    const handleSaveClick = async () => {
        try {
            const response = await axios.put(`${BASE_API_URL}/api/reply/update/${reply.id}`, {
                content: editContent
            });


            window.alert('Sửa phản hồi thanh công');
            getReply();
        } catch (error) {
            console.error(error);
        }






        setIsEditing(false);
    };





    return (
        <>
            <AdminLayout >
                <div className="mb-4 d-flex flex-wrap">
                  
                    <div style={{ cursor: 'pointer' }} onClick={() => navigate(-1)}>
                        <LeftOutlined /> TRỞ LẠI
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">


                        <div className="card">
                            <div className="card-body">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className='mb-4'>
                                    <h2>Đơn hàng</h2>
                                    <div>
                                        {/* <Button type="primary" className="tag-button" style={{marginRight: '10px'}} onClick={handelNewProduct}>
											+ Thêm sản phẩm
										</Button> */}
                                        <Button type="primary" className="tag-import">
                                            In hóa đơn
                                        </Button>
                                    </div>

                                </div>
                                <div style={{ color: 'gray' }}>
                                    <span>Ngày đánh giá: {review?.createDate?.slice(0, 10)} </span><br />
                                    <span>mã: {review.id}</span>
                                </div>
                                <hr className="hr hr-blurry" />
                                <h6>Sản phẩm</h6>
                                <Row className="align-items-center mt-3" >
                                    <Col xs={12} md={6} className="d-flex align-items-center">

                                        <div className="product product-sm mr-2">
                                            <img className="product-img" src={imgProduct.imgPath} alt="" />
                                        </div>
                                        <div>
                                            <a className='product-name pt-2 flex-grow-1'>{review?.productId?.productName}</a>
                                            {/* <p> x {order.quantity}</p>
                                        <p className='product-price'>{numeral(order?.productId.salePrice).format('0,0')}đ</p> */}
                                        </div>

                                    </Col>
                                    <Col xs={12} md={6} className="d-flex justify-content-end">
                                        <div className="d-flex flex-wrap">
                                            <Button type="primary" className="tag-button  mb-2 mr-md-2 mb-md-0" style={{ marginRight: '10px' }}
                                            // onClick={(e)=>handelDetail(order?.productId?.id)}
                                            >
                                                Chi tiết
                                            </Button>
                                            {/* <Button className="tag-import">
                                                Hủy
                                            </Button> */}
                                        </div>
                                    </Col>
                                </Row>







                                <hr className="hr hr-blurry" />

                                <Container>
                                    <Row>
                                        <h6>Đánh giá</h6>

                                        <div className="align-items-center mt-3" style={{ width: '100%' }}>
                                            <div className="d-flex" style={{ width: '100%' }}>
                                                <div className="mr-2" style={{marginRight: '10px'}}>
                                                    {/* <img className="product-img" src="https://i.pinimg.com/564x/d9/7b/bb/d97bbb08017ac2309307f0822e63d082.jpg" alt="" style={{ width: '50px', height: '50px', objectFit: 'cover' }} /> */}
                                                    <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                                                </div>
                                                <div style={{ width: '100%' }}>
                                                    <h6 className='product-name pt-2 flex-grow-1'>{review?.userId?.userName}</h6>
                                                  
                                                    <StarRatings
                                                        rating={ratting}
                                                        starRatedColor="yellow"
                                                        // changeRating={this.changeRating}
                                                        numberOfStars={5}
                                                        name='rating'
                                                        starDimension="20px"
                                                        starSpacing="5px"
                                                    />
                                                    <p style={{ fontSize: '12px', color: 'gray' }} className='mt-3'>{review?.createDate?.slice(0, 10)}</p>
                                                    <p className='product-price'>{review?.content}</p>



                                                    {review?.status === 1 ? (
                                                        <div style={{ background: 'rgba(0, 128, 0, 0.1)', width: '100%', boxSizing: 'border-box', padding: '20px' }}>
                                                            <h6>Phản hồi</h6>
                                                            <FloatingLabel controlId="floatingTextarea2" label="Comments">
                                                                <Form.Control
                                                                    as="textarea"
                                                                    placeholder="Leave a comment here"
                                                                    value={content}
                                                                    onChange={(e) => setContent(e.target.value)}
                                                                    style={{ height: '100px' }}
                                                                />
                                                            </FloatingLabel>


                                                            <Form.Group className="mt-3" controlId="formBasicPassword">

                                                                <Button type="primary" className="tag-button  mb-2 mr-md-2 mb-md-0" style={{ marginRight: '10px' }}
                                                                    // onClick={(e)=>handelDetail(order?.productId?.id)}
                                                                    onClick={createReply}
                                                                >
                                                                    Gửi
                                                                </Button>


                                                            </Form.Group>
                                                        </div>
                                                    ) : (
                                                        //     <div style={{ background: 'rgba(0, 128, 0, 0.1)', width: '100%', boxSizing: 'border-box', padding: '20px' }}>
                                                        //     <h6>Phản hồi từ người bán</h6>
                                                        //     <p>{reply?.content} <FaEdit/></p>

                                                        // </div>

                                                        <div>
                                                            {isEditing ? (
                                                                <div style={{ background: 'rgba(0, 128, 0, 0.1)', width: '100%', boxSizing: 'border-box', padding: '20px' }}>
                                                                    <h6>Phản hồi từ người bán</h6>
                                                                    <input type="text" value={editContent} onChange={handleContentChange} />
                                                                    <button onClick={handleSaveClick}>Save</button>
                                                                </div>
                                                            ) : (
                                                                <div style={{ background: 'rgba(0, 128, 0, 0.1)', width: '100%', boxSizing: 'border-box', padding: '20px' }}>
                                                                    <h6>Phản hồi từ người bán</h6>
                                                                    <p>
                                                                        {reply?.content}
                                                                        <FaEdit onClick={handleEditClick} />
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>




                                    </Row>
                                </Container>


                            </div>
                        </div>

                    </div>
                </div>
                <AdminFooter />
            </AdminLayout>
        </>
    )
}
export default ReviewDetail;