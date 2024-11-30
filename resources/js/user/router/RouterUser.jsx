import React from "react";
import { Route, Router, Routes } from "react-router-dom";

import Category from "../pages/Category";
import HomeUser from "../pages/HomeUser";
import AboutUs from "../pages/AboutUs";
import CheckOrder from "../pages/CheckOrder";
import Cart from "../pages/Cart";
import Search from "../pages/Search";
import DetailProduct from "../pages/DetailProduct";
import CheckOut from "../pages/CheckOut";


const RouterUser = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomeUser/>}/>
                <Route path="/T_shirt" element={<Category cate={"Áo thun"}/>}/>
                <Route path="/polo" element={<Category cate={"Áo polo"}/>}/>
                <Route path="/outwear" element={<Category cate={"Áo khoác"}/>}/>
                <Route path="/sweater" element={<Category cate={"Áo sweater"}/>}/>
                <Route path="/shirt" element={<Category cate={"Áo sơ mi"}/>}/>
                <Route path="/long_pants" element={<Category cate={"Quần dài"}/>}/>
                <Route path="/short_pants" element={<Category cate={"Quần ngắn"}/>}/>
                <Route path="/balo" element={<Category cate={"Cặp"}/>}/>
                <Route path="/handbag" element={<Category cate={"Túi xách"}/>}/>
                <Route path="/hat" element={<Category cate={"Nón"}/>}/>
                <Route path="/wallet" element={<Category cate={"Ví"}/>}/>
                <Route path="/about_us" element={<AboutUs/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/check_order" element={<CheckOrder/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route path="/detail_product/:proId" element={<DetailProduct/>}/>
                <Route path="/check_out" element={<CheckOut/>}/>
            </Routes>
        </div>
    )
}

export default RouterUser;