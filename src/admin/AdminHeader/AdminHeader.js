import React from 'react'
import logo from '../../Images/LogoFoxBox.png';
import userImg from '../../Images/avatar.jpg';
import './AdminHeader.css';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
    return (
        <div className="header">
            <div className="header-left">
                {/* <a href="index.html" className="logo">
                    <img src={logo} alt="Logo" />
                </a> */}
                <Link to="/">
                    <img src={logo} style={{ width: '150px', height: '80px' }}></img>
                </Link>

            </div>

            <a id="toggle_btn">
                <i className="fe fe-text-align-left"></i>
            </a>

        </div>
    )
}

export default AdminHeader