import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import UserHomePage from './components/UserHomePage';
import MyProfile from './components/MyProfile';
import Header from './components/Header';
import UserHeader from './components/UserHeader';
import { useAuth, AuthProvider } from './context/AuthProvider';
import AdminDashboard from './components/AdminDashboard';
import AddProduct from './components/admin/AddProduct';
import EditProducts from './components/admin/EditProducts';
import DeleteProducts from './components/admin/DeleteProducts';
import ViewAllProducts from './components/admin/ViewAllProducts';
import AdminAllOrders from './components/admin/AdminAllOrders';
import AdminOrderStatus from './components/admin/AdminOrderStatus';
import Cart from './components/Cart';
import Order from './components/Order';
import OrderSuccess from './components/OrderSuccess';
import Invoice from './components/Invoice';
import AdminCancelledOrders from './components/admin/AdminCancelledOrders';
import AllUser from './components/admin/AllUser';
import SalesReport from './components/admin/SalesReport';
import PopularReport from './components/admin/PopularReport';
import ExportReport from './components/admin/ExportReport';
import './App.css';

function MainLayout() {
  const { loading, isLoggedIn } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      {isLoggedIn ? <UserHeader /> : <Header />}
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product" element={<Products />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/userhomepage" element={<UserHomePage />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Admin Dashboard Routing */}
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/admin/products/add" element={<AddProduct />} />
          <Route path="/admin/products/edit" element={<EditProducts />} />
          <Route path="/admin/products/delete" element={<DeleteProducts />} />
          <Route path="/admin/products/view" element={<ViewAllProducts />} />
          <Route path="/admin/orders" element={<AdminAllOrders />} />
          <Route path="/invoice/:orderId" element={<Invoice />} />
          <Route path="/admin/orders/status" element={<AdminOrderStatus />} />
          <Route path="/admin/orders/cancel" element={<AdminCancelledOrders />} />
          <Route path="/admin/users" element={<AllUser />} />
          <Route path="/admin/reports/sales" element={<SalesReport />} />
          <Route path="/admin/reports/popular" element={<PopularReport />} />
          <Route path="/admin/reports/productreport" element={<ExportReport />} />
          {/* Main Layout Routes */}
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
