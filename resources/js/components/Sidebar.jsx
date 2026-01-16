import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';

export default function Sidebar() {
    return (
        <div className="sidebar">
            <ul>
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/transactions">Transactions</Link></li>
                <li><Link to="/reports">Reports</Link></li>
                <li><Link to="/users">Users</Link></li>
            </ul>
        </div>
    );
}
