import React from "react";
import NavigationAdmin from "../components/NavigationAdmin";
import { Helmet } from "react-helmet";

const Customer = () => {
    return (
        <NavigationAdmin>
            <Helmet>
                <title>Quản lý khách hàng</title>
            </Helmet>
            <h1>CustomerScreen</h1>
        </NavigationAdmin>
    );
}

export default Customer;