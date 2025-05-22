// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';
// import './SalesReport.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faRupeeSign, faCalendarDay, faCalendarAlt, faCalendar } from '@fortawesome/free-solid-svg-icons';

// const SalesReport = () => {
//     const [report, setReport] = useState({});
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchReport = async () => {
//             try {
//                 const { data } = await axios.get('http://localhost:5000/api/reports/sales', {
//                     withCredentials: true
//                 });
//                 setReport(data);
//                 setLoading(false);
//             } catch (err) {
//                 setError('Failed to load sales report.');
//                 setLoading(false);
//             }
//         };

//         fetchReport();
//     }, []);

//     return (
//         <div className="sales-report-container">
//             <h2 className="sales-report-heading">Sales Report</h2>
//             <div className="breadcrumbs">
//                 <Link to="/admin">Admin Dashboard</Link> &gt; <span>Sales Report</span>
//             </div>
//             <br></br>
//             {loading ? (
//                 <p className="sales-report-loading">Loading...</p>
//             ) : error ? (
//                 <p className="sales-report-error">{error}</p>
//             ) : (
//                 <div className="sales-report-cards">
//                     <div className="sales-report-card">
//                         <FontAwesomeIcon icon={faCalendarDay} className="sales-icon" />
//                         <h3>Daily Revenue</h3>
//                         <p><FontAwesomeIcon icon={faRupeeSign} /> {report.dailyRevenue}</p>
//                     </div>
//                     <div className="sales-report-card">
//                         <FontAwesomeIcon icon={faCalendarAlt} className="sales-icon" />
//                         <h3>Monthly Revenue</h3>
//                         <p><FontAwesomeIcon icon={faRupeeSign} /> {report.monthlyRevenue}</p>
//                     </div>
//                     <div className="sales-report-card">
//                         <FontAwesomeIcon icon={faCalendar} className="sales-icon" />
//                         <h3>Yearly Revenue</h3>
//                         <p><FontAwesomeIcon icon={faRupeeSign} /> {report.yearlyRevenue}</p>
//                     </div>
//                 </div>
//             )}
//             <div className="admin-user-order-report-cards">
//                 <div className="admin-user-order-card">
//                     <h3>Orders Today</h3>
//                     <p>{report.dailyOrders}</p>
//                 </div>
//                 <div className="admin-user-order-card">
//                     <h3>Orders This Month</h3>
//                     <p>{report.monthlyOrders}</p>
//                 </div>
//                 <div className="admin-user-order-card">
//                     <h3>Orders This Year</h3>
//                     <p>{report.yearlyOrders}</p>
//                 </div>
//                 <div className="admin-user-order-card">
//                     <h3>New Users Today</h3>
//                     <p>{report.dailyUsers}</p>
//                 </div>
//                 <div className="admin-user-order-card">
//                     <h3>New Users This Month</h3>
//                     <p>{report.monthlyUsers}</p>
//                 </div>
//                 <div className="admin-user-order-card">
//                     <h3>New Users This Year</h3>
//                     <p>{report.yearlyUsers}</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SalesReport;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './SalesReport.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRupeeSign, faCalendarDay, faCalendarAlt, faCalendar } from '@fortawesome/free-solid-svg-icons';

const SalesReport = () => {
    const [report, setReport] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const { data } = await axios.get('https://wrighto-sustainables-backend.onrender.com/api/reports/sales', {
                    withCredentials: true,
                });
                setReport(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load sales report.');
                setLoading(false);
            }
        };

        fetchReport();
    }, []);

    return (
        <div className="sales-report-container">
            <br></br>
            <h2 className="sales-report-heading">Sales Report</h2>
            <div className="breadcrumbs">
                <Link to="/admin">Admin Dashboard</Link> &gt; <span>Sales Report</span>
            </div>
            <br />
            {loading ? (
                <p className="sales-report-loading">Loading...</p>
            ) : error ? (
                <p className="sales-report-error">{error}</p>
            ) : (
                <div className="sales-report-summary">
                    <div className="sales-summary-item">
                        <h3>Revenue</h3>
                        <div className="summary-stats">
                            <div className="stat-card">
                                <FontAwesomeIcon icon={faCalendarDay} className="sales-icon" />
                                <h4>Daily Revenue</h4>
                                <p><FontAwesomeIcon icon={faRupeeSign} /> {report.dailyRevenue}</p>
                            </div>
                            <div className="stat-card">
                                <FontAwesomeIcon icon={faCalendarAlt} className="sales-icon" />
                                <h4>Monthly Revenue</h4>
                                <p><FontAwesomeIcon icon={faRupeeSign} /> {report.monthlyRevenue}</p>
                            </div>
                            <div className="stat-card">
                                <FontAwesomeIcon icon={faCalendar} className="sales-icon" />
                                <h4>Yearly Revenue</h4>
                                <p><FontAwesomeIcon icon={faRupeeSign} /> {report.yearlyRevenue}</p>
                            </div>
                        </div>
                    </div>

                    <div className="sales-summary-item">
                        <h3>Orders</h3>
                        <div className="summary-stats">
                            <div className="stat-card">
                                <h4>Orders Today</h4>
                                <p>{report.dailyOrders}</p>
                            </div>
                            <div className="stat-card">
                                <h4>Orders This Month</h4>
                                <p>{report.monthlyOrders}</p>
                            </div>
                            <div className="stat-card">
                                <h4>Orders This Year</h4>
                                <p>{report.yearlyOrders}</p>
                            </div>
                        </div>
                    </div>

                    <div className="sales-summary-item">
                        <h3>Users</h3>
                        <div className="summary-stats">
                            <div className="stat-card">
                                <h4>New Users Today</h4>
                                <p>{report.dailyUsers}</p>
                            </div>
                            <div className="stat-card">
                                <h4>New Users This Month</h4>
                                <p>{report.monthlyUsers}</p>
                            </div>
                            <div className="stat-card">
                                <h4>New Users This Year</h4>
                                <p>{report.yearlyUsers}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SalesReport;
