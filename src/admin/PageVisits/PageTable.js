import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import {
    Button,

    CardHeader,

    NavItem,
    NavLink,
    Nav,
    Progress,
    Table,



} from "reactstrap";
import ProgressBar from "@ramonak/react-progress-bar";
import axios from 'axios';
import { Flex } from 'antd';
import { Link } from 'react-router-dom';
import BASE_API_URL from '../../utils/apiConfig';


const PageTable = ({ userCount, userNormal, userFacebook, userGoogle }) => {
    const percent = Math.round(userNormal / userCount * 100);
    const percentFace = Math.round(userFacebook / userCount * 100);
    const percentGG =Math.round(userGoogle / userCount * 100);

    const [products, setProducts] = useState([]);
    const [inventoryProducts, setInventoryProducts] = useState([]);
    useEffect(() => {
        const fetchTopSellingProducts = async () => {
            try {
                const response = await axios.get(`${BASE_API_URL}/api/orderDetail/top-selling-products`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching top selling products:', error);
            }
        };
        const fetchTopInventoryProducts = async () => {
            try {
                const response = await axios.get(`${BASE_API_URL}/api/orders/product/created-before-current-month`);
                setInventoryProducts(response.data);
            } catch (error) {
                console.error('Error fetching top selling products:', error);
            }
        };

        fetchTopSellingProducts();
        fetchTopInventoryProducts();
    }, []);





    return (
        <Row className="mb-4 pb-4">
            <Col className="mb-5 mb-xl-0" xl="8">
                <Card className="shadow">
                    <CardHeader className="border-0">
                        <Row className="align-items-center">
                            <div className="col">
                                <h3 className="mb-0" style={{ fontSize: '20px' }}>Sản phẩm</h3>
                            </div>
                            <div className="col text-right">

                            </div>
                        </Row>
                    </CardHeader>

                    <Row className='m-3 '>
                        <Col xs={6}  >
                            <h6 className='mb-4'>Sản phẩm bán chạy</h6>
                            {products.map(product => (
                                <div key={product.productId}>
                                    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }} >
                                        <img src={product.imgPath}
                                            style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '8px' }}>
                                        </img>
                                        <div style={{ flex: '1', marginLeft: '10px' }}>
                                            <Link to={`/admin/editProduct/${product.productId}`}
                                                style={{ textDecoration: 'none' }}> {product.productName}</Link>
                                        </div>
                                        <div className="room-percentage" style={{ fontWeight: 'bold' }}>{product.totalSold}</div>
                                    </div>
                                    <hr></hr>
                                </div>

                            ))}


                        </Col>
                        <Col xs={6}  >
                            <h6 className='mb-4'>Sản phẩm tồn kho</h6>

                            {inventoryProducts.map(product => (
                                <div key={product.productId}>
                                    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }} >
                                        <img src={product.imgPath}
                                            style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '8px' }}>
                                        </img>
                                        <div style={{ flex: '1', marginLeft: '10px' }}>
                                            <Link to={`/admin/editProduct/${product.productId}`}
                                            style={{ textDecoration: 'none' }}>{product.productName}</Link>
                                        </div>
                                        <div className="room-percentage" style={{ fontWeight: 'bold' }}>{product.totalSold}</div>
                                    </div>
                                    <hr></hr>
                                </div>
                            ))}




                        </Col>
                    </Row>

                    {/* <Row className='m-3 '>
                        <Col xs={6}  >
                            <Table className="align-items-center table-flush" responsive>
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Tên trang</th>
                                <th scope="col">Khách</th>
                                <th scope="col">Người dùng</th>
                                <th scope="col">Tỷ lể</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">/argon/</th>
                                <td>4,569</td>
                                <td>340</td>
                                <td>
                                    <i className="fas fa-arrow-up text-success mr-3" /> 46,53%
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">/argon/index.html</th>
                                <td>3,985</td>
                                <td>319</td>
                                <td>
                                    <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                                    46,53%
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">/argon/charts.html</th>
                                <td>3,513</td>
                                <td>294</td>
                                <td>
                                    <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                                    36,49%
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">/argon/tables.html</th>
                                <td>2,050</td>
                                <td>147</td>
                                <td>
                                    <i className="fas fa-arrow-up text-success mr-3" /> 50,87%
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">/argon/profile.html</th>
                                <td>1,795</td>
                                <td>190</td>
                                <td>
                                    <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                                    46,53%
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                          


                        </Col>
                        <Col xs={6}  >
                           



                        </Col>
                    </Row> */}




                    {/* <Table className="align-items-center table-flush" responsive>
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Tên trang</th>
                                <th scope="col">Khách</th>
                                <th scope="col">Người dùng</th>
                                <th scope="col">Tỷ lể</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">/argon/</th>
                                <td>4,569</td>
                                <td>340</td>
                                <td>
                                    <i className="fas fa-arrow-up text-success mr-3" /> 46,53%
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">/argon/index.html</th>
                                <td>3,985</td>
                                <td>319</td>
                                <td>
                                    <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                                    46,53%
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">/argon/charts.html</th>
                                <td>3,513</td>
                                <td>294</td>
                                <td>
                                    <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                                    36,49%
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">/argon/tables.html</th>
                                <td>2,050</td>
                                <td>147</td>
                                <td>
                                    <i className="fas fa-arrow-up text-success mr-3" /> 50,87%
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">/argon/profile.html</th>
                                <td>1,795</td>
                                <td>190</td>
                                <td>
                                    <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                                    46,53%
                                </td>
                            </tr>
                        </tbody>
                    </Table> */}
                </Card>
            </Col>
            <Col xl="4">
                <Card className="shadow">
                    <CardHeader className="border-0">
                        <Row className="align-items-center">
                            <div className="col">
                                <h3 className="mb-0" style={{ fontSize: '20px' }}>Người dùng</h3>
                            </div>
                            <div className="col text-right">

                            </div>
                        </Row>
                    </CardHeader>
                    <Table className="align-items-center table-flush" responsive>
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Loại</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Tỷ lể</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Tổng</th>
                                <td>{userCount}</td>
                                <td>
                                    {/* <div className="d-flex align-items-center">
                                                <span className="mr-2">100%</span>
                                               
                                                <div style={{marginLeft: '10px'}}>
                                                <ProgressBar completed={60}
                                                height='6px'
                                                width='80px'
                                                bgColor='green'
                                                customLabel
                                               />
                                                </div>
                                                
                                            </div> */}
                                </td>

                            </tr>
                            <tr>
                                <th scope="row">Facebook</th>
                                <td>{userFacebook}</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <span className="mr-2">{percentFace}%</span>
                                        <div>
                                            {/* <Progress
                                                max="100"
                                                value="60"
                                                barClassName="bg-gradient-danger"
                                            /> */}
                                            <div style={{ marginLeft: '10px' }}>
                                                <ProgressBar completed={percentFace}
                                                    height='6px'
                                                    width='80px'
                                                    bgColor='red'
                                                    customLabel
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Google</th>
                                <td>{userGoogle}</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <span className="mr-2">{percentGG}%</span>
                                        <div style={{ marginLeft: '10px' }}>
                                            <ProgressBar completed={percentGG}
                                                height='6px'
                                                width='80px'
                                                bgColor='red'
                                                customLabel
                                            />
                                        </div>

                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Tài khoản thường</th>
                                <td>{userNormal}</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <span className="mr-2">{percent}%</span>
                                        <div style={{ marginLeft: '10px' }}>
                                            <ProgressBar completed={percent}
                                                height='6px'
                                                width='80px'
                                                bgColor='red'
                                                customLabel
                                            />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            {/* <tr>
                                        <th scope="row">Instagram</th>
                                        <td>3,678</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <span className="mr-2">75%</span>
                                                <div>
                                                    <Progress
                                                        max="100"
                                                        value="75"
                                                        barClassName="bg-gradient-info"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr> */}
                            {/* <tr>
                                        <th scope="row">twitter</th>
                                        <td>2,645</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <span className="mr-2">30%</span>
                                                <div>
                                                    <Progress
                                                        max="100"
                                                        value="30"
                                                        barClassName="bg-gradient-warning"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr> */}
                        </tbody>
                    </Table>
                </Card>
            </Col>
        </Row>
        

    )
}

export default PageTable