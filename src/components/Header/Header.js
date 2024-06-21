import React from 'react'
import Nav from 'react-bootstrap/Nav';
import "./header.css";
import { FaPhoneAlt } from "react-icons/fa";

const Header = () => {
    return (
        <div className="nav-container header-color  ">
        <Nav className="container justify-content-start">
            <Nav.Item>
                <Nav.Link  className="title"><FaPhoneAlt/> +001234567890</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link  className="title">Về FoxBox</Nav.Link>
            </Nav.Item>
            {/* <Nav.Item>
                <Nav.Link  className="title">Tuyển dụng</Nav.Link>
            </Nav.Item> */}
        </Nav>
    </div>
    )
}

export default Header