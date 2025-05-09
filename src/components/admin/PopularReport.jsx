import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './PopularReport.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faExclamationTriangle, faSyncAlt, faChartBar, faChartLine  } from '@fortawesome/free-solid-svg-icons';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const PopularReport = () => {
    const [bestsellers, setBestsellers] = useState([]);
    const [lowStockProducts, setLowStockProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReport = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/reports/popular");
            setBestsellers(res.data.bestsellers || []);
            setLowStockProducts(res.data.lowStockProducts || []);
        } catch (err) {
            console.error("Error fetching report:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReport();
    }, []);

    if (loading) return <p>Loading Popularity Report...</p>;

    // const chartData = {
    //     labels: bestsellers.map(p => p.name),
    //     datasets: [
    //         {
    //             label: 'Units Sold',
    //             data: bestsellers.map(p => p.totalSold),
    //             backgroundColor: '#4caf50',
    //         }
    //     ]
    // };
    const chartData = {
        labels: bestsellers.map(p => p.name),
        datasets: [
            {
                label: 'Units Sold',
                data: bestsellers.map(p => p.totalSold),
                backgroundColor: (context) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) return;
                    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0, '#4caf50');  // Starting color
                    gradient.addColorStop(1, '#81c784');  // Ending color
                    return gradient;
                },
                borderColor: '#388e3c',
                borderWidth: 1,
                barThickness: 30,  // Adjust bar thickness for better appearance
                hoverBackgroundColor: '#66bb6a',  // Hover effect
                hoverBorderColor: '#2c6d3d',  // Hover border color
                hoverBorderWidth: 2,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const label = tooltipItem.dataset.label || '';
                        const value = tooltipItem.raw;
                        return `${label}: ${value} units sold`;
                    }
                },
                backgroundColor: '#333',  // Tooltip background color
                titleColor: '#fff',  // Title text color
                bodyColor: '#fff',  // Body text color
                borderColor: '#fff',  // Tooltip border color
                borderWidth: 1,  // Tooltip border width
                padding: 10,  // Padding inside the tooltip
            }
        },
        scales: {
            x: {
                grid: {
                    color: '#e0e0e0',  // Light grid color
                },
                ticks: {
                    color: '#333',  // Tick color
                    font: {
                        size: 12,  // Font size for X-axis ticks
                        weight: 'bold',  // Tick font weight
                    }
                }
            },
            y: {
                grid: {
                    color: '#e0e0e0',  // Light grid color
                },
                ticks: {
                    color: '#333',  // Tick color
                    font: {
                        size: 12,  // Font size for Y-axis ticks
                        weight: 'bold',  // Tick font weight
                    },
                    beginAtZero: true,  // Ensure the Y-axis starts from 0
                }
            }
        },
        animation: {
            duration: 1000,  // Animation duration
            easing: 'easeInOutBounce',  // Animation easing type
        }
    };

    return (
        <div className="admin-report-sales-popular-report">
            <div className="admin-report-sales-report-header">
                <h2>Product Popularity Report</h2>
                <br></br>
            </div>
            <div className="breadcrumbs">
                <Link to="/admin">Admin Dashboard</Link> &gt; <span>Products Report</span>
            </div>
            <br></br>
            <br></br>
            <h3>
                <FontAwesomeIcon icon={faChartLine} /> Sales
            </h3>
            <div className="admin-report-sales-summary">
                <div className="admin-report-sales-summary-box green">
                    <h4>Total Bestsellers</h4>
                    <p>{bestsellers.length}</p>
                    <small>Products with the highest sales performance</small>
                </div>
                <div className="admin-report-sales-summary-box orange">
                    <h4>Low Stock</h4>
                    <p>{lowStockProducts.length}</p>
                    <small>Items running low, reorder soon</small>
                </div>
            </div>
            <br></br>
            <div className="admin-report-sales-chart-section">
                <div className="admin-report-sales-header">
                    <h3><FontAwesomeIcon icon={faChartBar} /> Top Selling Products</h3>
                    <button onClick={fetchReport} className="admin-report-sales-refresh-btn">
                        <FontAwesomeIcon icon={faSyncAlt} /> Refresh
                    </button>
                </div>
                <div className="admin-report-sales-chart-container">
                    {/* <Bar data={chartData} /> */}
                    <Bar data={chartData} options={options} />
                </div>
            </div>
            <br></br>
            <div className="admin-report-sales-card-grid">
                {bestsellers.map(product => (
                    <div key={product._id} className="admin-report-sales-product-card green">
                        <img src={product.image} alt={product.name} />
                        <h4>{product.name}</h4>
                        {/* <p><strong>Sold:</strong> {product.totalSold}</p>
                        <p><strong>Stock:</strong> {product.quantityInStock}</p> */}
                        <p className="product-info"><strong>Sold:</strong> {product.totalSold}</p>
                        <p className="product-info"><strong>Stock:</strong> {product.quantityInStock}</p>
                    </div>
                ))}
            </div>
            <br></br>
            <br></br>
            <div className="admin-report-sales-section">
                <h3>
                    <FontAwesomeIcon icon={faExclamationTriangle} /> Low Stock Products (less than 10)
                </h3>
                <p className="low-stock-description">
                    These products are running low on stock and need to be restocked soon to avoid potential stockouts.
                    Please check the quantities carefully and restock where necessary.
                </p>
                <ul className="admin-report-sales-report-list">
                    {lowStockProducts.length === 0 ? (
                        <li>No low stock products found.</li>
                    ) : (
                        lowStockProducts.map((product) => (
                            <li key={product._id} className="admin-report-sales-report-item">
                                <img src={product.images[0]} alt={product.name} className="admin-report-sales-report-img" />
                                <div>
                                    <strong>{product.name}</strong>
                                    <p>In Stock: {product.quantityInStock}</p>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default PopularReport;
