import React from "react";
import { Helmet } from "react-helmet";
import NavigationAdmin from "../components/NavigationAdmin";

const AddProduct = () => {
    return (
        <NavigationAdmin>
            <Helmet>
                <title>Thêm sản phẩm mới</title>
            </Helmet>
            <h1>Thêm sản phẩm mới</h1>
        </NavigationAdmin>
    );
}

export default AddProduct;