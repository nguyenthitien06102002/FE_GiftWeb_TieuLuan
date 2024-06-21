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

import './ListOrder.css';

const TableOrder = ({ orders, loading }) => {
	const router = useNavigate();
	const handelDetail = (id) => {
		router(`/admin/detail/${id}`);
	};

	const columns = [
		{
			name: 'Mã',
			selector: row => row.id,
			sortable: true,
		},
		{
			name: 'thời gian tạo',
			selector: row => row.createTime.slice(0, 10),
			sortable: true,
		},
		{
			name: 'Trạng thái',
			cell: (row) => {
				if (row.status.id === 1) {
					return (
						<span style={{ display: 'flex', alignItems: 'center' }}>
							<CiCircleMore style={{ marginRight: '5px', color: 'orange', fontSize: '22px' }} />
							{row.status.statusName}
						</span>
					);
				} else if (row.status.id === 2) {
					return (
						<span style={{ display: 'flex', alignItems: 'center' }}>
							<BiBoltCircle style={{ marginRight: '5px', color: 'blue', fontSize: '22px' }} />
							{row.status.statusName}
						</span>
					);
				} else if (row.status.id === 3) {
					return (
						<span style={{ display: 'flex', alignItems: 'center' }}>
							<FaRegCheckCircle style={{ marginRight: '5px', color: 'green', fontSize: '20px' }} />
							{row.status.statusName}
						</span>
					);
				}
				else if (row.status.id === 4) {
					return (
						<span style={{ display: 'flex', alignItems: 'center' }}>
							<BiBadgeCheck style={{ marginRight: '5px', color: 'gray', fontSize: '22px' }} />
							{row.status.statusName}
						</span>
					);
				}

				else if (row.status.id === 5) {
					return (
						<span style={{ display: 'flex', alignItems: 'center' }}>
							<IoMdCloseCircleOutline style={{ marginRight: '5px', color: 'red', fontSize: '22px' }} />
							{row.status.statusName}
						</span>
					);
				} else {
					return row.status.statusName;
				}
			},
			sortable: true,
		},
		{
			name: 'khách hàng',
			selector: row => row.userId.userName,
			sortable: true,
		},
		{
			name: 'Tổng giá',
			selector: row => row.totalPrice.toLocaleString(),
			sortable: true,
		},
		{
			name: 'Chi tiết',
			cell: (row) => <FaEye style={{ fontSize: '22px', color: 'gray', cursor: 'pointer' }} onClick={() => handelDetail(row.id)} />,
			sortable: true,
		},
	];
	return (
		<div className='mt-4'>
			{loading ? (
				<p>Đang tải...</p>
			) : (
				orders.length > 0 ? (

					<DataTable
						columns={columns}
						data={orders}
						fixedHeader
						selectableRows
						pagination
					>

					</DataTable>
				) : (
					<p>Chưa có đơn hàng</p>
				)
			)}

		</div>
	)
}

export default TableOrder