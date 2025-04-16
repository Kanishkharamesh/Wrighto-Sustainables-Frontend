import React from 'react';
import './DashboardPage.css';

function DashboardPage() {
    return (
        <div className="dashboard">
            <header>
                <h2>User Dashboard</h2>
                <div className="profile">
                    <p>Welcome, [User Name]</p>
                    <img src="https://via.placeholder.com/50" alt="Profile" />
                </div>
            </header>
            <nav className="tabs">
                <button>Home</button>
                <button>Products</button>
                <button>About Us</button>
                <button>Blog</button>
                <button>Contact Us</button>
            </nav>
            <div className="content">
                <h3>Dashboard Content Goes Here</h3>
            </div>
        </div>
    );
}

export default DashboardPage;
