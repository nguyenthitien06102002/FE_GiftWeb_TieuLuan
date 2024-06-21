import React, { useEffect, useState } from 'react'
import AdminLayout from '../AdminLayout/AdminLayout';
import { Button, Modal } from 'antd';
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
import Form from 'react-bootstrap/Form';
import 'react-tabs/style/react-tabs.css';
import Table from 'react-bootstrap/Table';

import './Log.css';
import TableLogs from './TableLogs';
import BASE_API_URL from '../../utils/apiConfig';


const Log = () => {

	const [logs, setLogs] = useState([]);
	const [loading, setLoading] = useState(true);



	const fetchLogs = async () => {
		try {
			const response = await axios.get(`${BASE_API_URL}/api/logs`);
			const reversedLogs = response.data.reverse();
			setLogs(reversedLogs);
			console.log(reversedLogs);
			setLoading(false);

		} catch (error) {
			console.error('Error fetching orders:', error);
			setLoading(false);

		}
	};

	useEffect(() => {
		fetchLogs();
	}, []);


	const columns = [
		{
			name: 'Mã',
			selector: row => row.id,
			sortable: true,
		},
		{
			name: 'Người dùng',
			selector: row => row.userId?.id,
			sortable: true,
		},
		{
			name: 'Hành động',
			selector: row => row.eventType,
			sortable: true,
		},
		{
			name: 'Mô tả',
			selector: row => row.description,
			sortable: true,
		},
		{
			name: 'Mức độ',
			selector: row =>
				<div>
					{row.level === 1 ? (
						<p className='text-success' style={{ fontWeight: 'bold' }}>bình thường</p>
					) : (
						row.level === 2 ? (
							<p style={{ fontWeight: 'bold', color: 'yellow' }}>nguy hiểm</p>
						) : (
							<p style={{ fontWeight: 'bold', color: 'red' }}>cảnh báo</p>
						)


					)}
				</div>

			,
			sortable: true,
		},
		{
			name: 'Nguồn',
			selector: row => <p className="ellipsis">{row.path}</p>,
			sortable: true,
		},
		{
			name: 'IP',
			selector: row => row.ip,
			sortable: true,
		},
		{
			name: 'thời gian',
			selector: row => row.time?.slice(0, 10),
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
									<h2>Nhật ký truy cập</h2>
									{/* <div>
										<Button type="primary" className="tag-button" style={{ marginRight: '10px' }} onClick={showModal}
										>
											+ Thêm mã giảm giá
										</Button>
										<Button type="primary" className="tag-import">
											Import
										</Button>
									</div> */}

								</div>
								<div>

									<TableLogs
										logs={logs}
										loading={loading}
										columns={columns} />

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
export default Log;