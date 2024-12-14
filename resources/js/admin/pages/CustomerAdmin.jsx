import React, { useState, useEffect } from "react";
import NavigationAdmin from "../components/NavigationAdmin";
import { Helmet } from "react-helmet";
import axios from "axios";
import UserList from "../components/customer/UserList";
import { Skeleton, Pagination } from "@mui/material";
// import Box from '@mui/material/Box';

const Customer = () => {
    const [UsersData, setUsersData] = useState([]); // Dữ liệu user
    const [isLoading, setIsLoading] = useState(true); // Trạng thái loading
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [totalItems, setTotalItems] = useState(0); // Tổng số item

    // Hàm lấy dữ liệu từ API
    const fetchUser = async () => {
        const response = await axios.get(`/api/v1/user?page=${currentPage}`);
        return response.data;
    };

    // Chỉ tải lại UserList khi `currentPage` thay đổi
    useEffect(() => {
        const LoadData = async () => {
            setIsLoading(true); // Hiển thị Skeleton
            const userData = await fetchUser();
            setTimeout(() => {
                setUsersData(userData.data);
                setTotalItems(userData.meta.total);
                setIsLoading(false); 
            }, 1000); // Độ trễ 500ms để Skeleton hiển thị
        };
        LoadData();
    }, [currentPage]);

    // Tổng số trang
    const totalPages = Math.ceil(totalItems / 10); // Giả định mỗi trang 2 user

    // Hàm thay đổi trang
    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    return (
        <NavigationAdmin>
            <Helmet>
                <title>Quản lý khách hàng</title>
            </Helmet>
            {/* Phần tĩnh - không bị render lại */}
            <h1 className="text-[32px] font-bold mt-4">Khách hàng</h1>
            {/* Phần danh sách động */}
            <div className="overflow-x-auto">
                {isLoading ? (
                    <div className="space-y-0.5 ipad:w-[700px] desktop:w-[1200px] mobile:w-[400px] shadow-md">
                        {<Skeleton
                                // key={index}
                                variant="rectangular"
                                height={40}
                                animation="wave"
                                className="ipad:w-[700px] desktop:w-[1200px] mobile:w-[400px] shadow-md" style={{
                                    backgroundColor: "#f0f0f0",}}
                                />}
                        {Array.from({ length: 6 }).map((_, index) => (
                                <Skeleton
                                key={index}
                                variant="rectangular"
                                height={60}
                                animation="wave"
                                className="ipad:w-[700px] desktop:w-[1200px] mobile:w-[400px] shadow-md" style={{
                                    backgroundColor: "#f0f0f0",}}
                                />
                            ))}
                    </div>
                ) : (
                    <UserList data={UsersData} />
                )}
                {/* Phân trang */}
                <div className="flex justify-center mt-4">
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
};

export default Customer;
