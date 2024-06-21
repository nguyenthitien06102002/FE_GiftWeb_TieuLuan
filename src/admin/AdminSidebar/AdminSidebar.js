import React from 'react';
import './AdminSidebar.css';
import { FaHome } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
import { FaPeopleArrows } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaUserAstronaut } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaBook } from "react-icons/fa";
import { useLocation } from 'react-router-dom';

const AdminSidebar = () => {
    const location = useLocation();
    return (
        <div className="sidebar" id="sidebar">
            <div className="sidebar-inner slimscroll">
                <div id="sidebar-menu" className="sidebar-menu">
                    <ul>
                        <li className="menu-title">
                            <span>Main</span>
                        </li>
                        <li className={location.pathname === '/admin/dashboard' ? 'active' : ''}>
                            <Link to={'/admin/dashboard'}>
                                <FaHome /> <span>Trang chủ</span>
                            </Link>
                        </li>
                        <li className={location.pathname === '/admin/listOrder'  ? 'active' : ''}>
                            <Link to={'/admin/listOrder'}>
                                <FaListUl /> <span>Đơn hàng</span>
                            </Link>


                        </li>
                        <li className={location.pathname === '/admin/appointments' ? 'active' : ''}>
                            <Link to={'/admin/appointments'}>
                                <FaPeopleArrows /> <span>Sản phẩm</span>
                            </Link>
                        </li>
                        <li className={location.pathname === '/admin/listUsers' ? 'active' : ''}>
                            <Link to={'/admin/listUsers'}>
                                <FaUserAstronaut /> <span>Người dùng</span>
                            </Link>

                        </li>
                        <li className={location.pathname === '/admin/listReview' ? 'active' : ''}>
                            <Link to={'/admin/listReview'}>
                                <FaRegUser /> <span>Đánh giá</span>
                            </Link>

                        </li>
                        <li className={location.pathname === '/admin/list-discount' ? 'active' : ''}>
                            <Link to={'/admin/list-discount'}>
                                <FaRegStar /> <span>Mã giảm giá</span>
                            </Link>

                        </li>
                        <li className={location.pathname === '/admin/list-category' ? 'active' : ''}>
                            <Link to={'/admin/list-category'}>
                                <FaBriefcase /><span>Danh mục</span>
                            </Link>

                        </li>
                        <li className={location.pathname === '/admin/log' ? 'active' : ''} >
                            <Link to={'/admin/log'}>
                                <FaBook /><span>Nhật ký</span>
                            </Link>

                        </li>

                        {/* <li className="submenu">
                            <a href="#"><i className="fe fe-document"></i> <span> Reports</span> <span className="menu-arrow"></span></a>
                            <ul style={{ display: "none" }}>
                                <li><a >Invoice Reports</a></li>
                            </ul>
                        </li> */}
                        <li className="menu-title">
                            <span>Pages</span>
                        </li>
                        <li className='text-white'>
                            <Link to={'/admin/profile'}>
                                <FaRegUser /> <span>Hồ sơ</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AdminSidebar