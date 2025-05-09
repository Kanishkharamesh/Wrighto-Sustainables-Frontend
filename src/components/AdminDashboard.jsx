import React from 'react';
import { Link, useNavigate, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus, faEdit, faTrash, faBoxOpen,
  faClipboardList, faTruck, faUndoAlt,
  faUsers, faUserShield, faUserSlash,
  faChartLine, faStar, faChartBar,
  faEnvelope, faReply,
  faBlog, faPen, faLock, faScroll, faTags
} from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = () => {
  const navigate = useNavigate(); // 💡 Also needed for redirect

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/user/logout", {}, { withCredentials: true });
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Welcome, Admin</h1>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
      <p>This is your control center for managing Wrighto Sustainables.</p>
      <br></br>
      {/* Product Management */}
      <div className="dashboard-section">
        <h2>🛒 Product Management</h2>
        <div className="dashboard-cards">
          <Link to="/admin/products/add" className="card">
            <FontAwesomeIcon icon={faPlus} className="icon" />
            <h3>Add New Product</h3>
            <p>Create new listings with complete details.</p>
          </Link>
          <Link to="/admin/products/edit" className="card">
            <FontAwesomeIcon icon={faEdit} className="icon" />
            <h3>Edit Existing Products</h3>
            <p>Modify pricing, stock, descriptions, etc.</p>
          </Link>
          <Link to="/admin/products/delete" className="card">
            <FontAwesomeIcon icon={faTrash} className="icon" />
            <h3>Delete Products</h3>
            <p>Remove outdated or incorrect products.</p>
          </Link>
          <Link to="/admin/products/view" className="card">
            <FontAwesomeIcon icon={faBoxOpen} className="icon" />
            <h3>View All Products</h3>
            <p>Browse and search all store products.</p>
          </Link>
        </div>
      </div>

      {/* Order Management */}
      <div className="dashboard-section">
        <h2>📦 Order Management</h2>
        <div className="dashboard-cards">
          <Link to="/admin/orders" className="card">
            <FontAwesomeIcon icon={faClipboardList} className="icon" />
            <h3>View All Orders</h3>
            <p>Track all customer orders and details.</p>
          </Link>
          <Link to="/admin/orders/status" className="card">
            <FontAwesomeIcon icon={faTruck} className="icon" />
            <h3>Update Order Status</h3>
            <p>Move orders through the fulfillment process.</p>
          </Link>
          <Link to="/admin/orders/cancel" className="card">
            <FontAwesomeIcon icon={faUndoAlt} className="icon" />
            <h3>Cancel/Refund Orders</h3>
            <p>Manage returns, complaints, and cancellations.</p>
          </Link>
        </div>
      </div>

      {/* User Management */}
      <div className="dashboard-section">
        <h2>👥 User Management</h2>
        <div className="dashboard-cards">
          <Link to="/admin/users" className="card">
            <FontAwesomeIcon icon={faUsers} className="icon" />
            <h3>View All Users</h3>
            <p>Get a list of all registered customers.</p>
          </Link>
          <Link to="/admin/users/roles" className="card">
            <FontAwesomeIcon icon={faUserShield} className="icon" />
            <h3>Edit User Roles</h3>
            <p>Promote users to admin or limit access.</p>
          </Link>
          <Link to="/admin/users/ban" className="card">
            <FontAwesomeIcon icon={faUserSlash} className="icon" />
            <h3>Ban/Deactivate Users</h3>
            <p>Block abusive or inactive accounts.</p>
          </Link>
        </div>
      </div>

      {/* Analytics */}
      <div className="dashboard-section">
        <h2>🧾 Analytics & Reports</h2>
        <div className="dashboard-cards">
          <Link to="/admin/reports/sales" className="card">
            <FontAwesomeIcon icon={faChartLine} className="icon" />
            <h3>Sales Reports</h3>
            <p>Track daily, monthly, and yearly revenue.</p>
          </Link>
          <Link to="/admin/reports/popular" className="card">
            <FontAwesomeIcon icon={faStar} className="icon" />
            <h3>Product Popularity</h3>
            <p>Analyze bestsellers and low-stock items.</p>
          </Link>
          <Link to="/admin/reports/orders" className="card">
            <FontAwesomeIcon icon={faChartBar} className="icon" />
            <h3>Order Volume</h3>
            <p>View peak times and high-volume periods.</p>
          </Link>
        </div>
      </div>

      {/* Feedback */}
      <div className="dashboard-section">
        <h2>📬 Contact & Feedback</h2>
        <div className="dashboard-cards">
          <Link to="/admin/messages" className="card">
            <FontAwesomeIcon icon={faEnvelope} className="icon" />
            <h3>Customer Messages</h3>
            <p>View feedback or support requests.</p>
          </Link>
          <Link to="/admin/messages/respond" className="card">
            <FontAwesomeIcon icon={faReply} className="icon" />
            <h3>Respond to Feedback</h3>
            <p>Reply via email or internal messaging.</p>
          </Link>
        </div>
      </div>

      {/* Blog */}
      <div className="dashboard-section">
        <h2>📖 Blog/Content Management</h2>
        <div className="dashboard-cards">
          <Link to="/admin/blogs/create" className="card">
            <FontAwesomeIcon icon={faBlog} className="icon" />
            <h3>Publish Blog Posts</h3>
            <p>Share sustainability tips and product info.</p>
          </Link>
          <Link to="/admin/blogs/manage" className="card">
            <FontAwesomeIcon icon={faPen} className="icon" />
            <h3>Edit/Delete Blogs</h3>
            <p>Manage previously published blog content.</p>
          </Link>
        </div>
      </div>

      {/* Admin Settings */}
      <div className="dashboard-section">
        <h2>🔐 Admin Settings</h2>
        <div className="dashboard-cards">
          <Link to="/admin/settings/password" className="card">
            <FontAwesomeIcon icon={faLock} className="icon" />
            <h3>Change Admin Password</h3>
            <p>Update your login credentials securely.</p>
          </Link>
          <Link to="/admin/settings/logs" className="card">
            <FontAwesomeIcon icon={faScroll} className="icon" />
            <h3>View Activity Logs</h3>
            <p>Monitor all admin actions (optional).</p>
          </Link>
          <Link to="/admin/settings/offers" className="card">
            <FontAwesomeIcon icon={faTags} className="icon" />
            <h3>Manage Homepage Offers</h3>
            <p>Control banner deals and carousel content.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
