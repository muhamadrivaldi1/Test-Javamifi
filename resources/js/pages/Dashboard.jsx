import React, { useEffect, useState } from "react";
import { FaBox, FaShoppingCart, FaMoneyBillWave } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from "chart.js";
import api from "../services/api";
import "../styles/dashboard.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
);

export default function Dashboard() {
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const productsRes = await api.get("/products");
            setTotalProducts(productsRes.data.length);

            const transactionsRes = await api.get("/transactions");
            const transactions = transactionsRes.data || [];

            setTotalSales(transactions.length);

            // Total revenue
            const revenue = transactions.reduce(
                (sum, t) => sum + (t.total || 0),
                0,
            );
            setTotalRevenue(revenue);

            // Chart data: revenue per month (Jan - Dec)
            const monthLabels = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ];
            const revenueByMonth = {};
            monthLabels.forEach((m) => (revenueByMonth[m] = 0)); // set default 0

            transactions.forEach((t) => {
                const month = new Date(t.created_at).toLocaleString("default", {
                    month: "short",
                });
                if (revenueByMonth[month] !== undefined) {
                    revenueByMonth[month] += t.total || 0;
                }
            });

            const revenueValues = monthLabels.map((m) => revenueByMonth[m]);

            setChartData({
                labels: monthLabels,
                datasets: [
                    {
                        label: "Revenue",
                        data: revenueValues,
                        borderColor: "#667eea",
                        backgroundColor: "rgba(102, 126, 234, 0.2)",
                        tension: 0.4,
                    },
                ],
            });
        } catch (err) {
            console.error("Failed to fetch dashboard data:", err);
        }
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: "top" } },
    };

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Dashboard</h1>

            <div className="dashboard-cards">
                <div className="dashboard-card">
                    <div className="card-icon blue">
                        <FaBox />
                    </div>
                    <div>
                        <h3>Total Products</h3>
                        <p>{totalProducts}</p>
                    </div>
                </div>

                <div className="dashboard-card">
                    <div className="card-icon green">
                        <FaShoppingCart />
                    </div>
                    <div>
                        <h3>Total Sales</h3>
                        <p>{totalSales}</p>
                    </div>
                </div>

                <div className="dashboard-card">
                    <div className="card-icon purple">
                        <FaMoneyBillWave />
                    </div>
                    <div>
                        <h3>Total Revenue</h3>
                        <p>Rp {totalRevenue.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            
            <div className="dashboard-chart">
                <h2>Revenue Growth</h2>
                <div style={{ height: "300px" }}>
                    <Line data={chartData} options={chartOptions} />
                </div>
            </div>
        </div>
    );
}
