import React, { useState, useEffect } from 'react'
import AdminLayout from '../AdminLayout/AdminLayout';
import { useNavigate, useParams } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import DataTable from 'react-data-table-component';
import AdminFooter from '../Footer/AdminFooter';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './ListOrder.css';
import OrderTracking from '../OrderTracking/OrderTracking';
import axios from 'axios';
import numeral from 'numeral';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { TinyColor } from '@ctrl/tinycolor';
import { Button, ConfigProvider, Space } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import BASE_API_URL from '../../utils/apiConfig';
const colors1 = ['#6253E1', '#04BEFE'];
const colors2 = ['#fc6076', '#ff9a44', '#ef9d43', '#e75516'];
const colors3 = ['#40e495', '#30dd8a', '#2bb673'];


const DetailOrder = () => {
    const { id } = useParams();
    const router = useNavigate();
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/api/orderDetail/${id}`);
            const productsWithImages = await Promise.all(response.data.map(async (product) => {
                const imageResponse = await axios.get(`${BASE_API_URL}/api/imgProducts/${product.productId.id}`);
                return { ...product, imageUrl: imageResponse.data[0].imgPath };
            }));

            setOrders(productsWithImages);
            setOrder(productsWithImages[0]);

            // console.log(productsWithImages[0]);

        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        setPaymentMethod(order?.orderId?.paymentId?.id);


        fetchOrders();
    }, [order?.orderId?.paymentId?.id]);

    const handleUpdateStatus = async (status) => {
        try {
            const response = await axios.put(`${BASE_API_URL}/api/orders/updateStatus/${id}`, { id: status }); // Truyền status vào body
            console.log(response.data);
            window.alert('Đơn hàng đã được xác nhận');
            //   window.location.href = '/account/purchase'; 
            fetchOrders();


            // setShowModal(true);
            // setErrorMessage(false);
        } catch (error) {
            console.error('Error updating order status:', error);
            // setErrorMessage(true);
        }
    };

    const handleChange = (event) => {
        setPaymentMethod(parseInt(event.target.value));
        // setPaymentMethod(parseInt(order?.orderId?.paymentId?.id)); 
    };



    const navigate = useNavigate();
    const getHoverColors = (colors) =>
        colors.map((color) => new TinyColor(color).lighten(5).toString());
    const getActiveColors = (colors) =>
        colors.map((color) => new TinyColor(color).darken(5).toString());

    return (
        <>
            <AdminLayout >

                <div className="mb-4 d-flex flex-wrap">
                    <div style={{ cursor: 'pointer' }} onClick={() => navigate(-1)}>
                        <LeftOutlined /> TRỞ LẠI
                    </div>


                </div>

                {order?.orderId?.status?.id === 1 ? (
                    <div className="mb-4 d-flex flex-wrap">
                        <Space>

                            <ConfigProvider
                                theme={{
                                    components: {
                                        Button: {
                                            colorPrimary: `linear-gradient(116deg,  ${colors3.join(', ')})`,
                                            colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(colors3).join(', ')})`,
                                            colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(colors3).join(', ')})`,
                                            lineWidth: 0,
                                        },
                                    },
                                }}
                                style={{ marginRight: '10px' }}
                            >
                                <Button type="primary" size="large" onClick={() => handleUpdateStatus(2)}>
                                    Xác nhận
                                </Button>
                            </ConfigProvider>

                            <ConfigProvider
                                theme={{
                                    components: {
                                        Button: {
                                            colorPrimary: `linear-gradient(90deg,  ${colors2.join(', ')})`,
                                            colorPrimaryHover: `linear-gradient(90deg, ${getHoverColors(colors2).join(', ')})`,
                                            colorPrimaryActive: `linear-gradient(90deg, ${getActiveColors(colors2).join(', ')})`,
                                            lineWidth: 0,
                                        },
                                    },
                                }}
                            >
                                <Button type="primary" size="large" onClick={() => handleUpdateStatus(5)} >
                                    Hủy
                                </Button>
                            </ConfigProvider>
                        </Space>


                    </div>

                ) : (null)}


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
                                    <span>Ngày tạo: {order?.orderId?.createTime?.slice(0, 10)}</span><br />
                                    <span>mã hóa đơn: {id}</span>
                                </div>
                                <hr className="hr hr-blurry" />
                                {orders.map((order, index) => (
                                    <Row className="align-items-center mb-2" key={index}>
                                        <Col xs={12} md={6} className="d-flex align-items-center">
                                            <div className="product product-sm mr-2">
                                                <img className="product-img" src={order.imageUrl} alt="" />
                                            </div>
                                            <div>
                                                <a className='product-name pt-2 flex-grow-1'>{order.productId.productName} </a>
                                                <p> x {order.quantity}</p>
                                                <p className='product-price'>{numeral(order?.productId.salePrice).format('0,0')}đ</p>
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

                                ))}





                                <hr className="hr hr-blurry" />

                                <Container>
                                    <Row>
                                        <Col xs={12} md={4} lg={3}>
                                            <h5 className='mt-3 mb-3'>Theo dõi đơn hàng</h5>
                                            {order?.orderId?.status?.id === 5 ? (
                                                <h6 style={{ color: 'red' }}>Đã hủy</h6>

                                            ) : (
                                                <OrderTracking status={order?.orderId?.status?.id} />
                                            )}

                                        </Col>
                                        <Col xs={12} md={5} lg={6}>
                                            <h5 className='mt-3 mb-3'>Thông tin giao hàng</h5>
                                            <div className="info mt-4">
                                                <div className="info-container">
                                                    <p className="info-title">Họ tên:</p>
                                                    <p className="info-content">{order?.orderId?.orderName}</p>
                                                </div>
                                                <div className="info-container">
                                                    <p className="info-title">số điện thoại:</p>
                                                    <p className="info-content"> {order?.orderId?.phone}</p>
                                                </div>
                                                <div className="info-container">
                                                    <p className="info-title">Email:</p>
                                                    <p className="info-content"> {order?.orderId?.email}</p>
                                                </div>
                                                <div className="info-container">
                                                    <p className="info-title">Địa chỉ:</p>
                                                    <p className="info-content"> {order?.orderId?.address}, {order?.orderId?.provinceId?.provinceName}, {order?.orderId?.districtId?.districtName} </p>
                                                </div>


                                            </div>

                                            <h5 className='mt-3 mb-3'>Chi tiết thanh toán</h5>

                                            <div>
                                                <div className="form-check ">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="flexRadioDefault"
                                                        id="flexRadioDefault1"
                                                        // checked={order?.orderId?.paymentId?.id === 1}
                                                        checked={paymentMethod === 1}
                                                        onChange={handleChange}

                                                    />
                                                    <label className="form-check-label" >
                                                        Thanh toán trực tiếp
                                                    </label>

                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="flexRadioDefault"
                                                        // checked={order?.orderId?.paymentId?.id !== 1} 
                                                        checked={paymentMethod !== 1}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label" >
                                                        Thanh toán online
                                                    </label>


                                                </div>

                                            </div>

                                        </Col>
                                        <Col xs={12} md={4} lg={3}>
                                            <h5 className='mt-3 mb-3'>Chi tiết</h5>
                                            <div>
                                                <div className="info mt-4">
                                                    {/* <div className="info-container" style={{display:'flex', justifyContent: 'space-between'}}>
                                                        <p className="info-title">Giá sản phẩm:</p>
                                                        <p className="info-content text-right ml-auto" >12334 đ</p>
                                                    </div> */}
                                                    <div className="info-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <p className="info-title">Mã giảm giá:</p>
                                                        <p className="info-content">{order?.orderId?.discountId === null ? ('không có') : (order?.orderId?.discountId?.code)}</p>
                                                    </div>
                                                    <div className="info-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <p className="info-title">Phí vận chuyển:</p>
                                                        <p className="info-content"> {numeral(order?.orderId?.transport).format('0,0')}  đ</p>
                                                    </div>
                                                    <div className="info-container" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px' }}>
                                                        <p className="info-title" style={{ fontSize: '18px' }}>Tổng cộng:</p>
                                                        <p className="info-content"> {numeral(order?.orderId?.totalPrice).format('0,0')}  đ</p>
                                                    </div>


                                                </div>
                                            </div>
                                        </Col>
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
export default DetailOrder;