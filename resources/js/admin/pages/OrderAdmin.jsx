import React from "react";
import { Helmet } from "react-helmet";
import NavigationAdmin from "../components/NavigationAdmin";

const Order = () => {
    return (
        <NavigationAdmin>
            <Helmet>
                <title>Quản lý đơn hàng</title>
            </Helmet>
            <h1>OrderScreen</h1>
        </NavigationAdmin>
    );
}

export default Order