import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../styles/layout.css';

export default function MainLayout({ children }) {
    return (
        <div className="layout">
            <Navbar />

            <div className="layout-body">
                <Sidebar />

                <main className="layout-content">
                    {children}
                </main>
            </div>
        </div>
    );
}
