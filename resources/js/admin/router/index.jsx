import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Login from '../pages/Login'
import Home from '../pages/HomeAdmin'
import AccountManage from '../pages/AccountManage'
import ChangePassword from '../pages/ChangePassword'
import Order from "../pages/OrderAdmin";
import Customer from "../pages/CustomerAdmin";
import ForgotPass from "../pages/ForgotPass";
import Products from "../pages/ProductsAdmin";
import AddProduct from "../pages/AddProduct";
import ResetPassword from "../pages/ResetPassword";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const ScrollToTopOnRouteChange = () => { const { pathname } = useLocation(); useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]); return null; };
const ProtectedRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem("token"); // Kiểm tra token trong localStorage
  
    if (!isAuthenticated) {
      return <Navigate to="/login_admin" replace />;
    }
  
    return children;
  };

// const Index = () => {
//     return (
//         <div>
//             <Routes>
//                 <Route path="/login_admin" element={<Login/>}/>
//                 <Route path="/forgotpass" element={<ForgotPass/>}/>
//                 <Route path="/home_admin" element={<Home/>}/>
//                 <Route path="/order_admin" element={<Order/>}/>
//                 <Route path="/customer_admin" element={<Customer/>}/>
//                 <Route path="/account_manage" element={<AccountManage/>}/>
//                 <Route path="/change_password" element={<ChangePassword/>}/>
//                 <Route path="/products_admin" element={<Products/>}/>
//                 <Route path="/addproduct_admin" element={<AddProduct/>}/>

//                 <Route path="/reset_password/*" element={<ResetPassword/>}/>
//             </Routes>
//         </div>
//     )
// }

const Index = () => {
    return (
      <div>
        <ScrollToTopOnRouteChange/>
        <Routes>
          {/* Đường dẫn không yêu cầu đăng nhập */}
          <Route path="/login_admin" element={<Login />} />
          <Route path="/forgotpass" element={<ForgotPass />} />
          <Route path="/reset_password/*" element={<ResetPassword />} />
  
          {/* Đường dẫn yêu cầu đăng nhập */}
          <Route
            path="/home_admin"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order_admin"
            element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer_admin"
            element={
              <ProtectedRoute>
                <Customer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account_manage"
            element={
              <ProtectedRoute>
                <AccountManage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/change_password"
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products_admin"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addproduct_admin"
            element={
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    );
  };


export default Index;