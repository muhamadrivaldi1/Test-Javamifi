import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import '../styles/navbar.css';

export default function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar-left">
                <h3>ERP System</h3>
            </div>

            <div className="navbar-right">
                <FaUserCircle className="navbar-icon" />
                <span className="navbar-user">Admin</span>
            </div>
        </div>
    );
}
