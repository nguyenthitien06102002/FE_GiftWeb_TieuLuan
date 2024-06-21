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
import { RiAdminFill } from "react-icons/ri";


import './ListUsers.css';

const TableUsers = ({ users, loading, columns }) => {
    const router = useNavigate();
    const handelDetail = (id) => {
        router(`/admin/detail/${id}`);
    };

  
    return (
        <div className='mt-4'>
            {loading ? (
                <p>Đang tải...</p>
            ) : (
                users.length > 0 ? (

                    <DataTable
                        columns={columns}
                        data={users}
                        fixedHeader
                        // selectableRows
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

export default TableUsers