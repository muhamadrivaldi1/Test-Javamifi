import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Transactions from "./pages/Transactions";
import Reports from "./pages/Reports";
import Users from "./pages/Users";
import "./styles/layout.css";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Sidebar />

            <div className="content">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/users" element={<Users />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

createRoot(document.getElementById("app")).render(<App />);
