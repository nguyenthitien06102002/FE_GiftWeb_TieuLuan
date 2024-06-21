import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap'
import numeral from 'numeral';
import { Divider, Space, Table, Tag } from 'antd';
import { MdOutlineLocalShipping } from "react-icons/md";

export const OrderList = ({ orders, loading }) => {
 
    const { id } = useParams();
    const router = useNavigate();
    const handelClickOrderDetail = (orderId) => {
      
        router(`/orderDetail/${orderId}`);
    };
  

    const columns = [
        {
            title: 'Mã',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
            render: (_, record) => <a>{record.districtId.districtName}, {record.provinceId.provinceName}</a>,
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'createTime',
            key: 'createTime',
            render: (createTime) => <a>{createTime.slice(0, 10)}</a>
        },
        {
            title: 'Trạng thái',
            key: 'status',
            dataIndex: 'status',
            render: (status) =>
                status.id === 1 ? (
                    <Tag color='gray'>Chờ xác nhận</Tag>
                ) : (status.id === 2 ? (
                    <Tag color='blue'>Đang giao hàng</Tag>
                ) : (status.id === 3 ? (
                    <Tag color='green'>Đang hàng thành công</Tag>
                ) : (status.id === 4 ? (
                    <Tag color='yellow'>Đã đánh giá</Tag>
                ) : (
                    <Tag color='red'>Đã hủy</Tag>
                ))))
        },
        {
            title: ' ',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`order-details/${record.id}`} style={{ color: 'green' }}>Chi tiết</Link>
                </Space>
            ),
        },
    ];



    return (
        <div>
            {/* {loading ? (
                <p>Đang tải...</p>
            ) : (
                filteredOrders.length > 0 ? ( */}
                
                        <div style={{ overflowX: 'auto' }}>

                            <Table
                                columns={columns}
                                dataSource={orders}
                                style={{ minWidth: '600px' }}
                            />
                        </div>
                {/* ) : (
                    <p>Chưa có đơn hàng</p>
                )
            )} */}

           
        </div>
    )
}
