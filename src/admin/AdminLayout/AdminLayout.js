import React from 'react'
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import AdminHeader from '../AdminHeader/AdminHeader';
import './AdminLayout.css';
const AdminLayout = ({ children }) => {
    return (
        <div className="main-wrapper"  >
            <AdminHeader />
            <AdminSidebar />
            <div className="page-wrapper" >
                <div className="content container-fluid">
                    <div className="page-header">
                        <div className="row">
                            <div className="col-sm-12">
                                <h3 className="page-title">Xin chào Admin!</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item active">Thông kê</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AdminLayout