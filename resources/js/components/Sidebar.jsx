import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    FaTachometerAlt,
    FaBox,
    FaShoppingCart,
    FaChartBar,
    FaUsers
} from 'react-icons/fa';

import '../styles/sidebar.css';

export default function Sidebar() {
    return (
        <div className="sidebar">
            <ul className="sidebar-menu">
                <li>
                    <NavLink to="/" end className="sidebar-link">
                        <FaTachometerAlt />
                        <span>Dashboard</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/products" className="sidebar-link">
                        <FaBox />
                        <span>Products</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/transactions" className="sidebar-link">
                        <FaShoppingCart />
                        <span>Transactions</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/reports" className="sidebar-link">
                        <FaChartBar />
                        <span>Reports</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/users" className="sidebar-link">
                        <FaUsers />
                        <span>Users</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}
