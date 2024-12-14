import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import NavigationAdmin from "../components/NavigationAdmin";
import axios from "axios";
import ProductsList from "../components/products/ProductsList";
import loading from '../asset/loading.gif'
import { Pagination } from "@mui/material";
import {Skeleton} from "@mui/material";

const Products = () => {
    const [ProductsData, setProductsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Số đơn hàng mỗi trang

    const fetchProducts = async () => {
        // fetch api get product include procolorsize
        const response = await axios.get(`/api/v1/product?includeProColorSize=true`);
        return response.data;
    } 

    //Lấy dữ liệu từ db
    useEffect(() => {
        const LoadData = async () => {
          setIsLoading(true);
          const productsData = await fetchProducts();
          setTimeout(()=>{
            setProductsData(productsData.data)
            // console.log(productsData.data);
            setIsLoading(false);
          },1000);
        }
        LoadData();
    } ,[currentPage]) 

    const paginatedProducts = ProductsData.length > 0 ? ProductsData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    ) : [];

    const totalPages = Math.ceil(ProductsData.length / itemsPerPage);
    // Hàm thay đổi trang
    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };
    // if (isLoading) {
    //     return (
    //         <div className="w-full h-[700px] flex justify-center items-center">
    //             <img src={loading}/>
    //         </div>

    //         // <h1 className='w-full text-2xl font-semibold text-center mt-16'>Loading...</h1>
    //     )
    // } 
    return (
        <NavigationAdmin>
            <Helmet>
                <title>Sản phẩm</title>
            </Helmet>
            <h1 className='text-[32px] font-bold mt-4'>Sản phẩm hiện có</h1>

            <div className='overflow-x-auto'>
            {isLoading ? (
                    <div className="space-y-0.5 ipad:w-[700px] desktop:w-[1200px] mobile:w-[400px] shadow-md">
                        {<Skeleton
                                // key={index}
                                variant="rectangular"
                                height={50}
                                animation="wave"
                                style={{backgroundColor: "#f0f0f0",}}
                                />}
                        {Array.from({ length: 5 }).map((_, index) => (
                                <Skeleton
                                key={index}
                                variant="rectangular"
                                height={78}
                                animation="wave"
                                    style={{backgroundColor: "#f0f0f0",}}
                                />
                            ))}
                    </div>
                ) : (
                    <ProductsList data={paginatedProducts} />
                )}
                <div className="flex justify-center mt-4 z-0">
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        variant="outlined"
                        shape="rounded"
                        siblingCount={1}
                        boundaryCount={1}
                    />
                </div>
            </div>

        </NavigationAdmin>
    );
}

export default Products;