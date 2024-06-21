import React, { useState, useEffect } from 'react'
import AdminLayout from '../AdminLayout/AdminLayout'
import userImg from '../../Images/avatar.jpg';
import './Dashboard.css';
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import numeral from 'numeral';
import {
    Button,

    CardHeader,

    NavItem,
    NavLink,
    Nav,
    Progress,
    Table,



} from "reactstrap";
import { FcApproval } from "react-icons/fc";
import { FcList } from "react-icons/fc";
import { FaChartPie, FaUsers, FaChartBar, FaPercentage } from "react-icons/fa";
import { Line, Bar } from "react-chartjs-2";
import Chart from '../Chart/ChartLine';
import ChartBar from '../Chart/ChartBar';
import PageTable from '../PageVisits/PageTable';
import AdminFooter from '../Footer/AdminFooter';
import axios from 'axios';
import PageLogs from '../PageVisits/PageLogs';
import BASE_API_URL from '../../utils/apiConfig';


const AdminDashboard = () => {
    const [year, setYear] = useState(2024);
    const [annual, setAnnual] = useState({});
    const [userCount, setUserCount] = useState(0);
    const [userNormal, setUserNormal] = useState(0);
    const [userFacebook, setUserFacebook] = useState(0);
    const [userGoogle, setUserGoogle] = useState(0);


    useEffect(() => {


        const getAnnualRevenue = async () => {
            try {
                const response = await axios.get(`${BASE_API_URL}/api/orders/annualRevenue`);
                console.log(response.data);
                setAnnual(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        const getUserCount = async () => {
            try {
                const response = await axios.get(`${BASE_API_URL}/api/users`);
                const users = response.data;
                setUserCount(users.length);
                const filteredUserNormal = users.filter(user => user.typeID === 1);
                setUserNormal(filteredUserNormal.length);
                const filteredUserFacebook = users.filter(user => user.typeID === 2);
                setUserFacebook(filteredUserFacebook.length);
                const filteredUserGoogle = users.filter(user => user.typeID === 3);
                setUserGoogle(filteredUserGoogle.length);

            } catch (error) {
                console.error(error);
            }
        };
        getUserCount();
        getAnnualRevenue();
    }, []);
    const years = Object.keys(annual);


    const [revenues, setRevenues] = useState({ currentMonthRevenue: 0, previousMonthRevenue: 0 });
    const [percentageChange, setPercentageChange] = useState(0);
    const [changeType, setChangeType] = useState('');
    const [revenuesOrder, setRevenuesOrder] = useState({ currentMonthOrder: 0, previousMonthOrder: 0 });
    const [percentageChangeOrder, setPercentageChangeOder] = useState(0);
    const [changeTypeOrder, setChangeTypeOrder] = useState('');
    useEffect(() => {
        axios.get(`${BASE_API_URL}/api/orders/revenue/current-and-previous-month`)
            .then(response => {
                const { currentMonthRevenue, previousMonthRevenue } = response.data;
                setRevenues({ currentMonthRevenue, previousMonthRevenue });
                const percentage = calculatePercentageChange(currentMonthRevenue, previousMonthRevenue);
                setPercentageChange(percentage);
                setChangeType(percentage > 0 ? 'tăng' : (percentage < 0 ? 'giảm' : 'không thay đổi'));
            })
            .catch(error => {
                console.error('Có lỗi xảy ra khi lấy dữ liệu doanh thu!', error);
            });

    }, []);
    useEffect(() => {
        axios.get(`${BASE_API_URL}/api/orders/order-count/current-and-previous-month`)
            .then(response => {
                const { currentMonthOrder, previousMonthOrder } = response.data;
                setRevenuesOrder({ currentMonthOrder, previousMonthOrder });
                const percentage = calculatePercentageChangeOrder(currentMonthOrder, previousMonthOrder);
                setPercentageChangeOder(percentage);
                setChangeTypeOrder(percentage > 0 ? 'tăng' : (percentage < 0 ? 'giảm' : 'không thay đổi'));
            })
            .catch(error => {
                console.error('Có lỗi xảy ra khi lấy dữ liệu doanh thu!', error);
            });

    }, []);

    const [revenuesUser, setRevenuesUser] = useState({ currentMonthUser: 0, previousMonthUser: 0 });
    const [percentageChangeUser, setPercentageChangeUser] = useState(0);
    const [changeTypeUser, setChangeTypeUser] = useState('');
    useEffect(() => {
        axios.get(`${BASE_API_URL}/api/users/user-count/current-and-previous-month`)
            .then(response => {
                const { currentMonthUser, previousMonthUser } = response.data;
                setRevenuesUser({ currentMonthUser, previousMonthUser });
                const percentage = calculatePercentageChange(currentMonthUser, previousMonthUser);
                setPercentageChangeUser(percentage);
                setChangeTypeUser(percentage > 0 ? 'tăng' : (percentage < 0 ? 'giảm' : 'không thay đổi'));
            })
            .catch(error => {
                console.error('Có lỗi xảy ra khi lấy dữ liệu doanh thu!', error);
            });

    }, []);



    const calculatePercentageChange = (current, previous) => {
        if (previous === 0) {
            return current === 0 ? 0 : 100; // Tránh chia cho 0
        }
        return ((current - previous) / previous) * 100;
    };

    const calculatePercentageChangeOrder = (current, previous) => {
        if (previous === 0) {
            return current === 0 ? 0 : 100; // Tránh chia cho 0
        }
        return ((current - previous) / previous) * 100;
    };
    const calculatePercentageChangeUser = (current, previous) => {
        if (previous === 0) {
            return current === 0 ? 0 : 100; // Tránh chia cho 0
        }
        return ((current - previous) / previous) * 100;
    };




    return (
        <>
            <AdminLayout >
                <div className="row mb-4"  >

                    <Row>
                        <Col lg="6" xl="3">
                            <Card className="card-stats mb-4 mb-xl-0">
                                <CardBody>
                                    <Row>
                                        <div className="col">
                                            <CardTitle
                                                tag="h5"
                                                className="text-uppercase text-muted mb-0"
                                            >
                                                Doanh thu
                                            </CardTitle>
                                            <span className="h2 font-weight-bold mb-0">

                                                {numeral(revenues.currentMonthRevenue).format('0,0')}
                                            </span>
                                        </div>
                                        <Col className="col-auto">

                                            <span className="dash-widget-icon text-primary border-primary" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <i className="fe fe-users" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50px', height: '50px' }}>
                                                    <FaChartBar style={{ margin: 'auto' }} />
                                                </i>
                                            </span>
                                        </Col>
                                    </Row>
                                    <p className="mt-3 mb-0 text-muted text-sm">

                                        {changeType === 'giảm' ? (
                                            <>
                                                <span className="text-danger mr-2">
                                                    <i className="fas fa-arrow-down" />  {Math.abs(percentageChange).toFixed(2)}%
                                                </span>{" "}
                                            </>

                                        ) : (
                                            <>
                                                <span className="text-success mr-2">
                                                    <i className="fa fa-arrow-up" />  {Math.abs(percentageChange).toFixed(2)}%
                                                </span>{" "}
                                            </>
                                        )}




                                        <span className="text-nowrap">So với tháng trước</span>
                                    </p>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="6" xl="3">
                            <Card className="card-stats mb-4 mb-xl-0">
                                <CardBody>
                                    <Row>
                                        <div className="col">
                                            <CardTitle
                                                tag="h5"
                                                className="text-uppercase text-muted mb-0"
                                            >
                                                Người dùng
                                            </CardTitle>
                                            <span className="h2 font-weight-bold mb-0">{revenuesUser.currentMonthUser}</span>
                                        </div>
                                        <Col className="col-auto">
                                            <span className="dash-widget-icon text-success" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <i className="fe fe-users" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50px', height: '50px' }}>
                                                    <FaChartPie style={{ margin: 'auto' }} />
                                                </i>
                                            </span>
                                        </Col>
                                    </Row>
                                    <p className="mt-3 mb-0 text-muted text-sm">
                                        {changeTypeUser === 'giảm' ? (
                                            <>
                                                <span className="text-danger mr-2">
                                                    <i className="fas fa-arrow-down" />  {Math.abs(percentageChangeUser).toFixed(2)}%
                                                </span>{" "}
                                            </>

                                        ) : (
                                            <>
                                                <span className="text-success mr-2">
                                                    <i className="fa fa-arrow-up" />  {Math.abs(percentageChangeUser).toFixed(2)}%
                                                </span>{" "}
                                            </>
                                        )}
                                        <span className="text-nowrap">So với tháng trước</span>
                                    </p>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="6" xl="3">
                            <Card className="card-stats mb-4 mb-xl-0">
                                <CardBody>
                                    <Row>
                                        <div className="col">
                                            <CardTitle
                                                tag="h5"
                                                className="text-uppercase text-muted mb-0"
                                            >
                                                Bán hàng
                                            </CardTitle>
                                            <span className="h2 font-weight-bold mb-0">{revenuesOrder.currentMonthOrder}</span>
                                        </div>
                                        <Col className="col-auto">
                                            <span className="dash-widget-icon text-danger border-danger" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <i className="fe fe-users" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50px', height: '50px' }}>
                                                    <FaUsers style={{ margin: 'auto' }} />
                                                </i>
                                            </span>
                                        </Col>
                                    </Row>
                                    <p className="mt-3 mb-0 text-muted text-sm">
                                        {/* <span className="text-warning mr-2">
                                            <i className="fas fa-arrow-down" /> 1.10%
                                        </span>{" "} */}


                                        {changeTypeOrder === 'giảm' ? (
                                            <>
                                                <span className="text-danger mr-2">
                                                    <i className="fas fa-arrow-down" />  {Math.abs(percentageChangeOrder).toFixed(2)}%
                                                </span>{" "}
                                            </>

                                        ) : (
                                            <>
                                                <span className="text-success mr-2">
                                                    <i className="fa fa-arrow-up" />  {Math.abs(percentageChangeOrder).toFixed(2)}%
                                                </span>{" "}
                                            </>
                                        )}
                                        <span className="text-nowrap">So với thàng trước</span>
                                    </p>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="6" xl="3">
                            <Card className="card-stats mb-4 mb-xl-0">
                                <CardBody>
                                    <Row>
                                        <div className="col">
                                            <CardTitle
                                                tag="h5"
                                                className="text-uppercase text-muted mb-0"
                                            >
                                                Truy cập
                                            </CardTitle>
                                            <span className="h2 font-weight-bold mb-0">49,65%</span>
                                        </div>
                                        <Col className="col-auto">
                                            {/* <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                                                <i className="fas fa-percent" />
                                            </div> */}
                                            <span className="dash-widget-icon text-warning border-warning" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <i className="fe fe-users" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50px', height: '50px' }}>
                                                    <FaPercentage style={{ margin: 'auto' }} />
                                                </i>
                                            </span>
                                        </Col>
                                    </Row>
                                    <p className="mt-3 mb-0 text-muted text-sm">
                                        <span className="text-success mr-2">
                                            <i className="fas fa-arrow-up" /> 12%
                                        </span>{" "}
                                        <span className="text-nowrap">So với tháng trước</span>
                                    </p>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>


                </div>

                <Row className='mb-4'>
                    <Col className="mb-5 mb-xl-0" xl="8">
                        <Card className="bg-gradient-default shadow"  >
                            <CardHeader className="bg-transparent">
                                <Row className="align-items-center">
                                    {/* <div className="col">
                                        <h6 className="text-uppercase text-light ls-1 mb-1">
                                            Overview
                                        </h6>
                                        <h2 className="text-white mb-0">Sales value</h2>
                                    </div> */}
                                    <div className="col" >
                                        <h6 className="text-uppercase text-muted ls-1 mb-1">
                                            Tổng quan
                                        </h6>
                                        <h2 className="mb-0" >Doanh số</h2>
                                    </div>
                                    <div className="col">
                                        <Nav className="justify-content-end" pills>


                                            {years.map(year => (
                                                <NavItem key={year}>
                                                    <NavLink
                                                        href="#"
                                                        onClick={() => setYear(year)}
                                                    >
                                                        <span className="d-none d-md-block">{year}</span>
                                                        <span className="d-md-none">{year}</span>
                                                    </NavLink>
                                                </NavItem>
                                            ))}
                                            {/* <NavItem>
                                                <NavLink

                                                    data-toggle="tab"
                                                    href="#pablo"

                                                >
                                                    <span className="d-none d-md-block"
                                                        onClick={() => setYear(2024)}>2024</span>
                                                    <span className="d-md-none">W</span>
                                                </NavLink>
                                            </NavItem> */}
                                        </Nav>
                                    </div>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                {/* Chart */}
                                <div className="chart">

                                    <Chart year={year} />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl="4">
                        <Card className="shadow">
                            <CardHeader className="bg-transparent">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h6 className="text-uppercase text-muted ls-1 mb-1">
                                            Đơn hàng
                                        </h6>
                                        <h2 className="mb-0">Tổng đơn hàng</h2>
                                    </div>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                {/* Chart */}
                                <div className="chart">
                                    <ChartBar year={year} />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>


                <PageTable userCount={userCount}
                    userNormal={userNormal} userFacebook={userFacebook} userGoogle={userGoogle} />

                    <PageLogs/>



        
                <AdminFooter />
            </AdminLayout>

        </>
    )
}
export default AdminDashboard;