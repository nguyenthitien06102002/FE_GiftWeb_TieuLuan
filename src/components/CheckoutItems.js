import React, { useState, useContext, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Bs1CircleFill, Bs2CircleFill, Bs3CircleFill } from "react-icons/bs";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import numeral from 'numeral';
import { MDBTable, MDBTableBody } from 'mdb-react-ui-kit';
import axios from 'axios';
import PaypalPayment from './PaypalPayment';
import { logEvent } from '../utils/LogPage';
import BASE_API_URL from '../utils/apiConfig';

const CheckoutItems = ({ cartData }) => {
    const [loading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [phone, setPhone] = useState(userData.phoneNumber);
    const [phoneError, setPhoneError] = useState('');
    const [canSubmit, setCanSubmit] = useState(true);
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState(userData.email);
    const [emailError, setEmailError] = useState('');
    const [orderName, setOrderName] = useState(userData.userName);
    const [note, setNote] = useState('');
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [shippingFee, setShippingFee] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState(1);
    const [discountCode, setDiscountCode] = useState('');
    const [discountPercentage, setDiscountPercentage] = useState('');
    const [discountError, setDiscountError] = useState('');
    const [discountID, setDiscountID] = useState('');
    const totalPrice = cartItems.reduce((total, item) => total + (item.product.salePrice * item.quantity), 0);
    // Số tiền giảm giá
    const discountAmount = (discountPercentage / 100) * totalPrice;
    const total = (totalPrice - discountAmount) + shippingFee;



    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(parseInt(event.target.id.replace('flexRadioDefault', '')));
    };

    const handleOrderNameChange = (event) => {
        const { value } = event.target;
        setOrderName(value);
    };
    const handleNoteChange = (event) => {
        const { value } = event.target;
        setNote(value);
    };

    const handleAddressChange = (event) => {
        const { value } = event.target;
        setAddress(value);
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

    //quan huyen
    useEffect(() => {
        axios.get(`${BASE_API_URL}/api/province`)
            .then(response => {
                setProvinces(response.data);
                setSelectedProvince(response.data);
                // console.log(response.data.provinceID)
            })
            .catch(error => {
                console.error('Error fetching provinces:', error);
            });
    }, []);

    const handleProvinceChange = (e) => {
        const selectedProvince = e.target.value;
        setSelectedProvince(selectedProvince);
        console.log(selectedProvince);
        axios.get(`${BASE_API_URL}/api/districts/${selectedProvince}`)
            .then(response => {
                setDistricts(response.data);
                // setSelectedDistrict(response.data)
                // console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching districts:', error);
            });
    };

    //phí vạn chuyên
    const handleDistrictChange = (e) => {
        const selectedDistrict = e.target.value;
        setSelectedDistrict(selectedDistrict);
        console.log(selectedDistrict);
        // console.log(e);
        axios.post(`${BASE_API_URL}/api/shippingFee`, {
            provinceID: selectedProvince,
            districtID: selectedDistrict
        })
            .then(response => {
                setShippingFee(response.data);
                console.log(response.data);


            })
            .catch(error => {
                console.error('Error fetching shipping fee:', error);
            });
    };

    const redirectToHome = (id) => {
        window.location.href = `account/purchase/order-details/${id}`;
    };

    const redirectToOrders = (id) => {

        window.location.href = `/`;
    };


    //tao don hang
    const handleSubmit = async (event) => {
        // event.preventDefault();
        if (canSubmit && orderName && phone && email && address && selectedProvince && selectedDistrict) {
            try {
                const orderResponse = await fetch(`${BASE_API_URL}/api/orders`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: {
                            id: userData.id
                        },

                        paymentId: {
                            id: paymentMethod

                        },
                        orderName,
                        phone,
                        email,
                        address,
                        provinceId: {
                            provinceID: selectedProvince
                        },
                        districtId: {
                            districtID: selectedDistrict
                        },
                        note,
                        totalPrice: total,
                        transport: shippingFee,

                        discountId: {
                            id: discountID
                        },
                        status: {
                            id: 1
                        },

                    }),
                });

                if (orderResponse.ok) {
                    const orderData = await orderResponse.json();
                    const orderId = orderData.id;
                    console.log('orderId của đơn hàng mới:', orderId);
                    const promises = [];
                    cartItems.forEach(async (item) => {

                        const orderDetailResponse = await fetch(`${BASE_API_URL}/api/orderDetail`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                orderId: {
                                    id: orderId
                                },
                                productId: {
                                    id: item.product.id
                                },
                                price: item.product.salePrice,
                                quantity: item.quantity,
                                total: item.product.salePrice * item.quantity
                            }),
                        });
                        promises.push(orderDetailResponse);
                        // Xóa sản phẩm khỏi giỏ hàng
                        const removeFromCartPromise = axios.delete(`api/cart/clear/user/${userData.id}`);
                        promises.push(removeFromCartPromise);

                    });
                    // Chờ tất cả các promise hoàn thành
                    try {
                        await Promise.all(promises);
                        console.log('Tất cả hoạt động đã được thực hiện đồng thời');
                    } catch (error) {
                        console.error('Error:', error);
                    }

                    await logEvent('CHECKOUT', `${paymentMethod} + ${orderName} + ${phone} + ${email} + ${address} (${selectedProvince}, ${selectedDistrict}) + ${note} + ${total} + ${discountID} + ${shippingFee}`, '1');

                    const result = window.confirm('Cảm ơn bạn đã đặt hàng! Đến xem đơn hàng?');
                    if (result) {

                        redirectToHome(orderId);
                    } else {

                        redirectToOrders();
                    }

                } else {
                    window.alert('Đặt hàng thấy bại');
                    console.error('Đặt hàng thất bại!');
                }
            } catch (error) {
                window.alert('Sản phẩm không đủ trong khi !!');
                // console.error('Đã xảy ra lỗi:', error);
            }
        } else {

            window.alert('Vui lòng nhập đúng thông tin');
            console.log('Vui lòng nhập đúng thông tin');
        }
    };

    const handleSubmit1 = async (event) => {
        // event.preventDefault();
        if (canSubmit && orderName && phone && email && address && selectedProvince && selectedDistrict) {
            try {
                const orderResponse = await axios.post(`${BASE_API_URL}/api/orders`, {
                    userId: { id: userData.id},
                    paymentId: {id: paymentMethod},
                    orderName,
                    phone,
                    email,
                    address,
                    provinceId: { provinceID: selectedProvince },
                    districtId: {districtID: selectedDistrict},
                    note,
                    totalPrice: total,
                    transport: shippingFee,
                    discountId: { id: discountID },
                    status: {
                        id: 1
                    },

                });

                console.log('orderResponse:', orderResponse.status);

                if (orderResponse.status === 201) {
                    const orderData = orderResponse.data;
                    const orderId = orderData.id;
                    console.log('orderId của đơn hàng mới:', orderId);

                    const promises = cartItems.map(async (item) => {
                        const orderDetailResponse = await axios.post(`${BASE_API_URL}/api/orderDetail`, {
                            orderId: { id: orderId },
                            productId: { id: item.product.id },
                            price: item.product.salePrice,
                            quantity: item.quantity,
                            total: item.product.salePrice * item.quantity
                        });       
                        return axios.delete(`${BASE_API_URL}/api/cart/clear/user/${userData.id}`);
                    });

                    try {
                        await Promise.all(promises);
                        console.log('Tất cả hoạt động đã được thực hiện đồng thời');
                    } catch (error) {
                        console.error('Error:', error);
                        window.alert('Sản phẩm không đủ số lượng !!');
                        await axios.delete(`${BASE_API_URL}/api/orders/delete/${orderId}`)
                        return;
                    }


                    const result = window.confirm('Cảm ơn bạn đã đặt hàng! Đến xem đơn hàng?');
                    if (result) {
                        redirectToHome(orderId);
                    } else {
                        redirectToOrders();
                    }
                } else {
                    window.alert('Đặt hàng thất bại');
                    console.error('Đặt hàng thất bại!');
                }
            } catch (error) {
                window.alert('Sản phẩm không đủ trong kho !!');
                console.error('Đã xảy ra lỗi:', error);
            }

        } else {

            window.alert('Vui lòng nhập đúng thông tin');
            console.log('Vui lòng nhập đúng thông tin');
        }
    };









    // Hàm áp dụng mã giảm giá
    const handleApplyDiscount = async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/api/discount/${userData.id}/${discountCode}`);

            if (response.data.discountPercentage !== undefined) {

                setDiscountError("");
                setDiscountPercentage(response.data.discountPercentage);
                setDiscountID(response.data.id);
            } else {

                setDiscountError("Mã giảm giá không hợp lệ!!");
                setDiscountPercentage("");
                setDiscountID("");
            }
        } catch (error) {

            setDiscountError("Mã giảm giá không hợp lệ!!");

            setDiscountPercentage("");
            setDiscountID("");
        }
    };

    useEffect(() => {
        if (userData && userData.id) {
            fetchCartItems();
        } else {
            console.log("user chưa đăng nhập")
        }
    }, [userData]);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/api/cart/items/${userData.id}`);
            const productsWithImages = await Promise.all(response.data.map(async (item) => {
                const imageResponse = await axios.get(`${BASE_API_URL}/api/imgProducts/first/${item.product.id}`);
                return { ...item, imageUrl: imageResponse.data.imgPath };

            }));
            setCartItems(productsWithImages);
            setLoading(false);

        } catch (error) {
            console.error('Error fetching cart items:', error);
            setLoading(false);
        }
    };

    const handlePaymentSubmit = () => {
        console.log("Payment was successful!");
        handleSubmit1();
       
    };


    return (
        <Container fluid className="px-5 py-4">
            {/* <Form onSubmit={handleSubmit1}> */}
            <Row className='justify-content-center mt-4 mb-4'>
                <Col md={3} sm={5} xs={10} >

                    <h5><Bs1CircleFill /> Thông tin người nhận</h5>

                    <div>

                        <Form.Group className="mb-3" >
                            <Form.Control type="text" placeholder="Họ Tên" className="border"
                                value={orderName}
                                onChange={handleOrderNameChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Control type="text" placeholder="Số điện thoại" className="border"
                                onChange={handlePhoneChange}
                                value={phone} />
                            {phoneError &&
                                <small className=" text-danger">
                                    {phoneError}
                                </small>
                            }
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Control type="email" placeholder="Nhâp email"
                                value={email}
                                onChange={handleEmailChange} />
                            {emailError && <small className="text-danger">{emailError}</small>}
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Control placeholder="Địa chỉ chi tiết" type="text" className="border"
                                value={address}
                                onChange={handleAddressChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Select aria-label="Default select example" onChange={handleProvinceChange}>
                                <option>Tỉnh/ Thành phố</option>
                                {provinces.map(province => (
                                    <option key={province.provinceID} value={province.provinceID}>{province.provinceName}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Select aria-label="Default select example" onChange={handleDistrictChange}>
                                <option>Quận/ Huyện</option>
                                {districts.map((district, index) => (
                                    <option key={index} value={district.districtID}>{district.districtName}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Ghi chú</Form.Label>
                            <Form.Control as="textarea" rows={3} onChange={(e) => setNote(e.target.value)}/>
                        </Form.Group>
                        <p>
                            Đơn hàng trên website được xử lý trong giờ hành chính
                            Vui lòng liên hệ fanpage ngoài khung giờ trên để được hỗ trợ</p>

                    </div>
                </Col>

                <Col md={3} sm={5} xs={10} >

                    <h5><Bs2CircleFill /> Phương thức thanh toán</h5>
                    <div>
                        <div className="form-check ">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault1"

                                checked={paymentMethod === 1}
                                onChange={handlePaymentMethodChange}
                            />
                            <label className="form-check-label"
                            >
                                Thanh toán khi nhận quà
                            </label>
                            <div style={{ background: '#fff9e6', borderRadius: '10px' }} className='mt-2'>
                                <div className='p-2'>


                                    <span>
                                        Quý khách thanh toán trực tiếp khi nhận quà
                                        Lưu ý thanh toán khi nhận quà không áp dụng cho:
                                        Hình thức chuyển quà cho người khác.
                                        Quà kèm dịch vụ khắc
                                    </span>
                                </div>

                            </div>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault2"
                                checked={paymentMethod === 2}
                                onChange={handlePaymentMethodChange}

                            />
                            <label className="form-check-label"
                            >
                                Thanh toán online
                            </label>


                        </div>

                    </div>


                </Col>
                <Col md={3} sm={5} xs={10} >

                    <h5><Bs3CircleFill /> Thông tin giỏ hàng</h5>

                    <Table striped bordered hover >
                        <thead>

                            <tr>
                                <th >Tên sản phẩm</th>
                                <th>Số lượng</th>
                                <th>Thành tiền</th>

                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item.product.id}>
                                    <td>{item.product.productName}</td>
                                    <td>{item.quantity}</td>
                                    <td> {numeral(item.product.salePrice * item.quantity).format('0,0')}đ</td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>

                    <div>
                        <MDBTable striped>
                            {/* <MDBTableHead>
                                    <tr>
                                        <th scope='col'>Tam</th>
                                        <th scope='col'>First</th>
                                       
                                    </tr>
                                </MDBTableHead> */}
                            <MDBTableBody>
                                <tr>

                                    <td>Tạm tính</td>
                                    <td className='text-end'>{numeral(totalPrice).format('0,0')}đ</td>
                                </tr>
                                <tr>

                                    <td>Phí vận chuyển</td>
                                    <td className='text-end'>{numeral(shippingFee).format('0,0')} đ</td>
                                </tr>
                                <tr>
                                    <td>Mã giảm giá</td>
                                    <td className='text-end'>{numeral(discountAmount).format('0,0')} đ</td>
                                </tr>
                                <tr>
                                    <th>Tổng cộng</th>
                                    <th className='text-end'>{numeral(total).format('0,0')} đ</th>
                                </tr>
                            </MDBTableBody>
                        </MDBTable>
                    </div>
                    <div>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group className="mb-3" controlId="discountCode">
                                    <Form.Control
                                        type="text"
                                        placeholder="Mã giảm giá"
                                        className="border"
                                        value={discountCode}
                                        onChange={(e) => setDiscountCode(e.target.value)}
                                    />
                                    {discountPercentage && <small className="text-danger">Bạn đã áp dụng mã giảm giá {discountPercentage}%</small>}
                                    {discountError && <small className="text-danger"> {discountError}</small>}
                                </Form.Group>
                            </Col>
                            <Col>
                                <Button
                                    type="button"
                                    style={{ background: 'white', color: '#FF6666', border: '1px solid #FF6666' }}
                                    onClick={handleApplyDiscount}
                                >
                                    Áp dụng
                                </Button>
                            </Col>
                        </Row>



                    </div>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Tôi đồng ý với các điều khoản chính sách giao hàng" />
                    </Form.Group>
                    <Col className="d-flex justify-content-end">
                        {paymentMethod === 1 &&
                            <Button type="submit" className="ml-auto btn-lg" style={{ fontWeight: 'bold', background: '#FF6666', border: '1px solid #FF6666' }}
                                onClick={handleSubmit1}>
                                Thanh Toán
                            </Button>
                        }

                    </Col>
                    {paymentMethod === 2 && <div>

                        <PaypalPayment total={total} onSubmit={handlePaymentSubmit} />
                    </div>}



                </Col>
            </Row>
            {/* </Form> */}
        </Container>
    )
}

export default CheckoutItems