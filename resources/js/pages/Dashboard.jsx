import React from 'react';
import { FaBox, FaShoppingCart, FaMoneyBillWave } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
} from 'chart.js';

import '../styles/dashboard.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

export default function Dashboard() {

    // Dummy data (nanti bisa dari API)
    const revenueData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Revenue',
                data: [3000000, 5000000, 4500000, 7000000, 9000000, 15000000],
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.2)',
                tension: 0.4
            }
        ]
    };

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Dashboard</h1>

            {/* SUMMARY CARDS */}
            <div className="dashboard-cards">
                <div className="dashboard-card">
                    <div className="card-icon blue">
                        <FaBox />
                    </div>
                    <div>
                        <h3>Total Products</h3>
                        <p>120</p>
                    </div>
                </div>

                <div className="dashboard-card">
                    <div className="card-icon green">
                        <FaShoppingCart />
                    </div>
                    <div>
                        <h3>Total Sales</h3>
                        <p>75</p>
                    </div>
                </div>

                <div className="dashboard-card">
                    <div className="card-icon purple">
                        <FaMoneyBillWave />
                    </div>
                    <div>
                        <h3>Total Revenue</h3>
                        <p>Rp 15.000.000</p>
                    </div>
                </div>
            </div>

            {/* CHART */}
            <div className="dashboard-chart">
                <h2>Revenue Growth</h2>
                <Line data={revenueData} />
            </div>
        </div>
    );
}
