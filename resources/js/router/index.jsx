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
                <Route path="/" element={<Login/>}/>
                <Route path="/home_admin" element={<Home/>}/>
                <Route path="/account_manage" element={<AccountManage/>}/>
                <Route path="/change_password" element={<ChangePassword/>}/>
            </Routes>
        </div>
    )
}

export default Index;