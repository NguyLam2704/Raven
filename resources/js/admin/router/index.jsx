import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from '../pages/Login'
import Home from '../pages/HomeAdmin'
import AccountManage from '../pages/AccountManage'
import ChangePassword from '../pages/ChangePassword'
import Order from "../pages/OrderAdmin";
import Customer from "../pages/CustomerAdmin";
import ForgotPass from "../pages/ForgotPass";
import Products from "../pages/ProductsAdmin";
import AddProduct from "../pages/AddProduct";

const Index = () => {
    return (
        <div>
            <Routes>
                <Route path="/login_admin" element={<Login/>}/>
                <Route path="/forgotpass" element={<ForgotPass/>}/>
                <Route path="/home_admin" element={<Home/>}/>
                <Route path="/order_admin" element={<Order/>}/>
                <Route path="/customer_admin" element={<Customer/>}/>
                <Route path="/account_manage" element={<AccountManage/>}/>
                <Route path="/change_password" element={<ChangePassword/>}/>
                <Route path="/products_admin" element={<Products/>}/>
                <Route path="/addproduct_admin" element={<AddProduct/>}/>
            </Routes>
        </div>
    )
}

export default Index;