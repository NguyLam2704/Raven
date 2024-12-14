import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import NavigationAdmin from "../components/NavigationAdmin";
import ordersData from "../data/ordersData";
import OrderList from "../components/home/ordersList";
import OrderFilter from "../components/order/OrderFilter";
import axios from 'axios';
import Modal from 'react-modal';
import loading from '../asset/loading.svg'
// import Pagination from "../components/Pagination";
import { Pagination } from "@mui/material";

const Order = () => {
    const [OrdersData, setOrderData] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);  // State cho danh sách đã lọc
    const [dateFilter, setDateFilter] = useState();
    const [statusFilters, setStatusFilters] = useState([
        'Đã hoàn thành', 'Đã hủy', 'Đang xử lý', 'Đang giao hàng'
    ]); // Mặc định tất cả trạng thái được chọn
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Số đơn hàng mỗi trang

    // Lấy dữ liệu từ db
    useEffect(() => {
        const LoadData = async () => {
            try {
                setIsLoading(true); // Đặt loading trước khi gọi API
                const response = await axios.get(`/api/v1/order`);
                console.log('Response Data:', response.data);
                setOrderData(response.data.data);
                setFilteredOrders(response.data.data);  // Cập nhật danh sách đã lọc ban đầu là tất cả
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setIsLoading(false); // Đặt loading = false sau khi hoàn thành
            }
        };
        LoadData();
    }, []);  

    const getOrderStatus = (status) => {
        switch (status) {
          case 3:
            return "Đã hoàn thành";
          case 1:
            return "Đang xử lý";
          case 0:
            return "Đã hủy";
          case 2:
            return "Đang giao hàng";
          default:
            return "Trạng thái không xác định";
        }
    };

    // Áp dụng filter khi dữ liệu hoặc bộ lọc thay đổi
    useEffect(() => {
        const applyFilters = () => {
            const filtered = OrdersData.filter(order => {
                const orderDate = new Date(order.dateCreated);

                const matchesDate = dateFilter
                    ? orderDate.toDateString() === dateFilter.toDateString()
                    : true;

                // Lọc theo trạng thái
                const matchesStatus = statusFilters.length > 0
                    ? statusFilters.includes(getOrderStatus(order.status))
                    : true;

                return matchesDate && matchesStatus;
            });
            setFilteredOrders(filtered);  // Cập nhật danh sách lọc
        };
        applyFilters();
    }, [OrdersData, dateFilter, statusFilters]);

    // Phân trang
    const paginatedOrders = filteredOrders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

    // Hàm cập nhật bộ lọc (kích hoạt từ thành phần OrderFilter)
    const handleFilterChange = ({ date, statuses }) => {
        setDateFilter(date);
        setStatusFilters(statuses);
    };

    // const handlePrevPage = () => {
    //     if (currentPage > 1) setCurrentPage(currentPage - 1);
    // };
    // const handleNextPage = () => {
    //     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    // };

    // const handlePageClick = (page) => {
    //     setCurrentPage(page);
    // };

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    if (isLoading) {
        return (
            <div className="w-full h-[800px] flex justify-center items-center">
                <img src={loading} alt="Loading" />
            </div>
        );
    }

    return (
        <NavigationAdmin>
            <Helmet>
                <title>Quản lý đơn hàng</title>
            </Helmet>
            <h1 className='mobile:text-[20px] ipad:text-[25px]  desktop:text-[32px] font-bold mt-4'>
                Đơn hàng
            </h1>

            {/* Enhanced Filter UI */}
            <div className="mb-2">
                <OrderFilter onFilterChange={handleFilterChange} />
            </div>

            {/* Order List */}
            <div className='overflow-x-auto'>
                {paginatedOrders.length > 0 
                    ? <OrderList data={paginatedOrders}/> 
                    : <div className="text-black ml-4 font-bold text-2xl mt-4">Không có dữ liệu</div>
                }
                {/* <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePrevPage={handlePrevPage}
                    handleNextPage={handleNextPage}
                    handlePageClick={handlePageClick}
                /> */}
                <div className="flex justify-center mt-4">
                    <Pagination
                        count={totalPages} // Tổng số trang
                        page={currentPage} // Trang hiện tại
                        onChange={handlePageChange} // Hàm xử lý khi thay đổi trang
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

export default Order;
