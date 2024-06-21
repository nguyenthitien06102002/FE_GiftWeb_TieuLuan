import React, { useEffect, useState } from 'react'
import AdminLayout from '../AdminLayout/AdminLayout';
import { Button } from 'antd';
import { useNavigate } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import DataTable from 'react-data-table-component';
import { FaRegCheckCircle } from "react-icons/fa";
import { CiCircleMore } from "react-icons/ci";
import { IoMdCloseCircleOutline } from "react-icons/io";
import AdminFooter from '../Footer/AdminFooter';
import { FaEye } from "react-icons/fa";
import axios from 'axios';
import { BiBoltCircle, BiBadgeCheck } from "react-icons/bi";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import './review.css';
import TableReview from './TableReview';
import BASE_API_URL from '../../utils/apiConfig';


const ListReview = () => {
    const router = useNavigate();
    const handelDetail = () => {
        router(`/admin/detail`);
    };
    const handelReviewDetail = (id) => {
        router(`/admin/reviewDetail/${id}`);
    };

    const CustomButton = ({ onClick }) => (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>

        </div>

    );
    const [review, setReview] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reply, setReply] = useState([]);
    const [replyOne, setReplyOne] = useState([]);
    const [delivered, setDelivered] = useState([]);
    const [cancel, setCancel] = useState([]);
    const [evaluate, setEvaluate] = useState([]);


    useEffect(() => {

        const fetchReview = async () => {
            try {
                const response = await axios.get(`${BASE_API_URL}/api/review`);
                const reversedReview = response.data.reverse();
                setReview(reversedReview);
                // Lọc các đơn hàng có trạng thái đang chờ xác nhận
                  const responded = reversedReview.filter(review => review.status === 2);
                  const notAnswered = reversedReview.filter(review => review.status === 1);
                  setReply(responded);
                  setReplyOne(notAnswered);
                
                setLoading(false);

            } catch (error) {
                console.error('Error fetching orders:', error);
                setLoading(false);

            }
        };

        fetchReview();
    }, []);


    const columns = [
        {
            name: 'Mã',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Người dùng',
            selector: row => row.userId.userName,
            sortable: true,
        },
        {
            name: 'mã sản phẩm',
            selector: row => row.productId.id,
            sortable: true,
        },
        {
            name: 'Mã đơn hàng',
            selector: row => row.ordersId.id,
            sortable: true,
        },
        {
            name: 'Sao',
            selector: row => row.rating,
            sortable: true,
        },
        {
            name: 'thời gian tạo',
            selector: row => row.createDate.slice(0, 10),
            sortable: true,
        },
        {
            name: 'Chi tiết',
            selector: row => <FaEye style={{ fontSize: '22px', color: 'gray', cursor: 'pointer' }} onClick={() =>handelReviewDetail(row.id)} />,
            sortable: true,
        },
    ];



    return (
        <>
            <AdminLayout >
                <div className="row">
                    <div className="col-md-12">


                        <div className="card">
                            <div className="card-body">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className='mb-4'>
                                    <h2>Đánh giá</h2>
                                    <div>
                                        {/* <Button type="primary" className="tag-button" style={{marginRight: '10px'}} onClick={handelNewProduct}>
											+ Thêm sản phẩm
										</Button> */}
                                        <Button type="primary" className="tag-import">
                                            Export DPF
                                        </Button>
                                    </div>

                                </div>
                                <div>
                                    <Tabs>
                                        <TabList>
                                            <Tab>Tất cả</Tab>
                                            <Tab>Chưa phản hồi</Tab>
                                            <Tab>Đã phản hồi</Tab>

                                        </TabList>



                                        <TabPanel>


                                            <TableReview review={review}
                                                loading={loading}
                                                columns={columns} />


                                        </TabPanel>
                                        <TabPanel>

                                        <TableReview review={replyOne}
                                                loading={loading}
                                                columns={columns} />
                                        </TabPanel>
                                        <TabPanel>

                                        <TableReview review={reply}
                                                loading={loading}
                                                columns={columns} />
                                        </TabPanel>

                                    </Tabs>

                                </div>




                            </div>
                        </div>

                    </div>
                </div>
                <AdminFooter />
            </AdminLayout>
        </>
    )
}
export default ListReview;