import React from "react";
import { Helmet } from "react-helmet";
import NavigationAdmin from "../components/NavigationAdmin";

const Products = () => {
    return (
        <NavigationAdmin>
            <Helmet>
                <title>Sản phẩm</title>
            </Helmet>
            <h1>Sản phẩm hiện có</h1>
        </NavigationAdmin>
    );
}

export default Products;