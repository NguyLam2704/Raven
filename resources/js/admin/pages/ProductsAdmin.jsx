import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import NavigationAdmin from "../components/NavigationAdmin";
import axios from "axios";
import ProductsList from "../components/products/ProductsList";
import loading from '../asset/loading.svg'

const fetchProducts = async () => {
    const response = await axios.get('/api/v1/product?includeProColorSize=true');
    return response.data;
} 

const Products = () => {
    const [ProductsData, setProductsData] = useState();
    const [isLoading, setIsLoading] = useState(true)

    //Lấy dữ liệu từ db
    useEffect(() => {
        const LoadData = async () => {
          const productsData = await fetchProducts();
          setProductsData(productsData.data)
          console.log(productsData.data);
          setIsLoading(false);
        }
        LoadData();
    } ,[]) 

    if (isLoading) {
        return (
            <div className="w-full h-[700px] flex justify-center items-center">
                <img src={loading}/>
            </div>

            // <h1 className='w-full text-2xl font-semibold text-center mt-16'>Loading...</h1>
        )
    } 
    return (
        <NavigationAdmin>
            <Helmet>
                <title>Sản phẩm</title>
            </Helmet>
            <h1 className='text-[32px] font-bold mt-4'>Sản phẩm hiện có</h1>

            <div className='w-full'>
                <ProductsList data={ProductsData} />
            </div>
        </NavigationAdmin>
    );
}

export default Products;