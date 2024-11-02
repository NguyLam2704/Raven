import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from '../pages/Login'
import Home from '../pages/HomeAdmin'
import AccountManage from '../pages/AccountManage'
import ChangePassword from '../pages/ChangePassword'

const Index = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Login/>}> </Route>
                <Route path="/home_admin" element={<Home/>}></Route>
                <Route path="/account_manage" element={<AccountManage/>}></Route>
                <Route path="/change_password" element={<ChangePassword/>}></Route>
            </Routes>
        </div>
    )
}

export default Index;