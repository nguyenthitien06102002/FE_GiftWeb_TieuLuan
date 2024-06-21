import React, { useEffect, useState } from 'react'

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
import axios from 'axios';
import { FaArrowUp } from "react-icons/fa6";
import BASE_API_URL from '../../utils/apiConfig';
const PageLogs = () => {
    const [access, setAccess] = useState([]);
    const [comparison, setComparison] = useState([]);
    useEffect(() => {
        const fetchAccess = async () => {
            try {
                const response = await axios.get(`${BASE_API_URL}/api/logs/visit-counts`);
                const data = response.data.map(item => ({
                    path: item[0],
                    nullUserCount: item[1],
                    nonNullUserCount: item[2]
                }));
                setAccess(data);

            } catch (error) {
                console.error('Error fetching:', error);
            }
        };

        fetchAccess();

        const fetchVisitCountComparison = async () => {
            try {
                const response = await axios.get(`${BASE_API_URL}/api/logs/visit-count-comparison`);
                setComparison(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching:', error);
            }
        };
        fetchVisitCountComparison();
    }, []);

    return (
        <Row className="mb-4 pb-4">
            <Col className="mb-5 mb-xl-0" >
                <Card className="shadow">
                    <CardHeader className="border-0">
                        <Row className="align-items-center">

                            <div className="col" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <h3 className="mb-0" style={{ fontSize: '20px', marginRight: 'auto' }}>Lượt truy cập hôm nay</h3>
                                <Button color="primary" size="sm" onClick={() => { window.location.href = '/admin/log' }}>Xem chi tiết</Button>
                            </div>
                            <div className="col text-right">

                            </div>
                        </Row>
                    </CardHeader>



                    <Row className='m-3 '>

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
                                {comparison.map((item, index) => (
                                    <tr key={index}>
                                        <th scope="row" style={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            maxWidth: '100px' 
                                        }}>
                                            {item.path}
                                        </th>
                                        <td>{item.todayNullUserCount}</td>
                                        <td>{item.todayNonNullUserCount}</td>
                                        {/* <td>
                                            <i className="fas fa-arrow-up text-success mr-3" /> 
                                              {item.changeRatio < 0 ? `Giảm ${Math.abs(Math.round(item.changeRatio))}%` : `tăng ${Math.round(item.changeRatio)}%`}
                                        </td> */}
                                        {item.changeRatio < 0 ? (
                                            <td>
                                                <i className="fas fa-arrow-down text-danger mr-3" />
                                                {Math.abs(Math.round(item.changeRatio))} %
                                            </td>
                                        ) : (
                                            <td>
                                                <i className="fas fa-arrow-up text-success mr-3" />
                                                {Math.abs(Math.round(item.changeRatio))} %
                                            </td>

                                        )}
                                    </tr>

                                ))}


                            </tbody>
                        </Table>




                    </Row>





                </Card>
            </Col>
            {/* <Col xl="4">
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
					


					  </tbody>
				  </Table>
			  </Card>
		  </Col> */}
        </Row>
    )
}

export default PageLogs