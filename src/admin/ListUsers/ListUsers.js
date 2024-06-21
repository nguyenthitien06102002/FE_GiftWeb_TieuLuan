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
import { FaEye, FaEyeSlash, FaFacebook, FaGoogle } from "react-icons/fa";
import axios from 'axios';
import { BiBoltCircle, BiBadgeCheck } from "react-icons/bi";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import './ListUsers.css';
import TableUser from './TableUsers';
import { RiAdminFill } from "react-icons/ri";
import BASE_API_URL from '../../utils/apiConfig';

const ListUsers = () => {
	const router = useNavigate();
	const handelEditUser = (userId) => {
		router(`/admin/userDetail/${userId}`);
	};
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const fetchUsers = async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/api/users`);
            const reversedOrder = response.data.reverse();
            const filteredUsers = reversedOrder.filter(user => user.status !== 3);
            setUsers(filteredUsers);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            setLoading(false);
        }
    };



	useEffect(() => {

		
		fetchUsers();
	}, []);


	
	
    const deleteUser = async (userId, name) => {
		try {
		
		  const confirmDelete = window.confirm('Bạn muốn xóa sản phẩm ' + name + ' ?');
		
		  if (confirmDelete) {

              const response = await axios.put(`${BASE_API_URL}/api/users/deleteUser/${userId}`);
            fetchUsers();
		
		  }
		} catch (error) {
		  console.error(error);
		}
	  };

    const columns = [
        {
            name: 'Mã',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Họ và tên',
            selector: row => row.userName,
            sortable: true,
        },
        {
            name: 'Số điện thoại',
            selector: row => row.phoneNumber,
            sortable: true,
        },
        {
            name: 'email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'thời gian tạo',
            selector: row => row.createTime.slice(0, 10),
            sortable: true,
        },
        {
            name: 'Trạng trái',
            cell: (row) => {
                if (row.status === 1) {
                    return (

                        <FaEye style={{ fontSize: '20px', color: 'gray', cursor: 'pointer' }} />
                    );
                } else if (row.status === 2) {
                    return (

                        <FaEyeSlash style={{ fontSize: '20px', color: 'gray', cursor: 'pointer' }} />
                    );
                }
                else {
                    return <FaEye style={{ fontSize: '20px', color: 'gray', cursor: 'pointer' }} />;
                }
            },
            sortable: true,
        },

        {
            name: 'Loại tài khoản',
            cell: (row) => {
                if (row.typeID === 1) {
                    return (
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                            <CiCircleMore style={{ marginRight: '5px', color: 'orange', fontSize: '22px' }} />
                            Normal
                        </span>
                    );
                } else if (row.typeID === 2) {
                    return (
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                            <FaFacebook style={{ marginRight: '5px', color: 'blue', fontSize: '22px' }} />
                            FaceBook
                        </span>
                    );
                } else if (row.typeID === 3) {
                    return (
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                            <FaGoogle style={{ marginRight: '5px', color: 'red', fontSize: '20px' }} />
                            Google
                        </span>
                    );
                }
                else if (row.typeID === 0) {
                    return (
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                            <RiAdminFill style={{ marginRight: '5px', color: 'green', fontSize: '20px' }} />
                            Admin
                        </span>
                    );
                }
                else {
                    return;
                }
            },
            sortable: true,
        },

     
        {
            name: 'Chi tiết',
            cell: (row) =>
                <div>
                    <MdEdit style={{ fontSize: '22px', color: 'gray', cursor: 'pointer' }} onClick={() => handelEditUser(row.id)} />
                    <MdDelete style={{ fontSize: '22px', color: 'gray', cursor: 'pointer' }} onClick={() => deleteUser(row.id, row.userName)} />
                </div>,

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
									<h2>Người dùng</h2>
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
									
                                <TableUser  users={users}
                                loading={loading}
                                columns={columns}/>
	
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
export default ListUsers;