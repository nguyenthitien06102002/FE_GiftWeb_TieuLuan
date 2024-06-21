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
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Tabs } from 'antd';
import './ListOrder.css';
import TableOrder from './TableOrder';
import BASE_API_URL from '../../utils/apiConfig';

const ListOrder = () => {
	const router = useNavigate();
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);


	useEffect(() => {

		const fetchOrders = async () => {
			try {
				const response = await axios.get(`${BASE_API_URL}/api/orders`);
				const reversedOrder = response.data.reverse();
				setOrders(reversedOrder);
				setLoading(false);

			} catch (error) {
				console.error('Error fetching orders:', error);
				setLoading(false);

			}
		};

		fetchOrders();
	}, []);


	const getFilteredOrders = (statusId) => {
		if (statusId === null) return orders;
		return orders.filter(order => order.status.id === statusId);
	};

	const onChange = (key) => {
		console.log(key);
	};
	const items = [
		{
			key: '1',
			label: 'Tất cả',
			children: <TableOrder orders={orders}
				loading={loading} />
		},
		{
			key: '2',
			label: 'Chờ xác nhận',
			children: <TableOrder orders={getFilteredOrders(1)}
				loading={loading} />
		},
		{
			key: '3',
			label: 'Đang vận chuyển',
			children: <TableOrder orders={getFilteredOrders(2)}
				loading={loading} />
		},
		{
			key: '4',
			label: 'Giao hàng thanh công',
			children: <TableOrder orders={getFilteredOrders(3)}
				loading={loading} />
		},
		{
			key: '5',
			label: 'Đã đánh giá',
			children: <TableOrder orders={getFilteredOrders(4)}
				loading={loading} />
		},
		{
			key: '6',
			label: 'Đã hủy',
			children: <TableOrder orders={getFilteredOrders(5)}
				loading={loading} />
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
									<h2>Đơn hàng</h2>
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
								
									<Tabs defaultActiveKey="1" items={items} onChange={onChange} />
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
export default ListOrder;