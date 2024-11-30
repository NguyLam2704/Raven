import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import NavigationAdmin from "../components/NavigationAdmin";
import ordersData from "../data/ordersData";
import OrderList from "../components/home/ordersList";
import OrderFilter from "../components/order/OrderFilter";
import axios from 'axios';
import Modal from 'react-modal';
import loading from '../asset/loading.svg'

const fetchOrder = async () => {
    const response = await axios.get('/api/v1/order');
    return response.data;
  }

const Order = () => {
    const [OrdersData, setOrderData] = useState();
    const [dateFilter, setDateFilter] = useState();
    const [statusFilters, setStatusFilters] = useState([
        'Đã hoàn thành', 'Đã hủy', 'Đang xử lý', 'Đang giao hàng'
    ]); // Mặc định tất cả trạng thái được chọn
    const [isLoading, setIsLoading] = useState(true);


    //Lấy dữ liệu từ db
    useEffect(() => {
        const LoadData = async () => {
          const orderData = await fetchOrder();
          setOrderData(orderData.data)
          console.log(orderData.data);
          setIsLoading(false);
        }
        LoadData();
    } ,[])  

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
    }
    if (isLoading) {
        return (
            <div className="w-full h-[800px] flex justify-center items-center">
            </div>
        )
    } 
    // Hàm lọc đơn hàng
    const filteredOrders = OrdersData.filter(order => {
        // Chuyển đổi ngày của đơn hàng thành đối tượng Date nếu cần thiết
        const orderDate = new Date(order.dateCreated);

        // Kiểm tra ngày khớp
        const matchesDate = dateFilter 
        ?  orderDate.toDateString() === dateFilter.toDateString()
        : true;

        // Kiểm tra trạng thái khớp (hỗ trợ nhiều trạng thái)
        const matchesStatus = statusFilters.length > 0
            ? statusFilters.includes(getOrderStatus(order.status))
            : true;

        console.log("Date: "+ orderDate)
        console.log("datafiler: "+ dateFilter)
        console.log("Status: "+ matchesStatus)

        console.log("fillter: " + matchesDate)
        return matchesDate && matchesStatus;
    });

    // Hàm cập nhật bộ lọc (kích hoạt từ thành phần OrderFilter)
    const handleFilterChange = ({ date, statuses }) => {
        setDateFilter(date);
        setStatusFilters(statuses);
    };



    return (
        <NavigationAdmin>
            <Helmet>
                <title>Quản lý đơn hàng</title>
            </Helmet>
            <h1 className='text-[32px] font-bold mt-4'>
                Đơn hàng
            </h1>

            {/* Enhanced Filter UI */}
            <div className="mb-2">
                <OrderFilter onFilterChange={handleFilterChange} />
            </div>

            {/* Order List */}
            <div className='w-full'>
                {filteredOrders.length > 0 
                    ? <OrderList data={filteredOrders}/> 
                    : <div className="text-[#ff3333] ml-4 font-bold text-2xl mt-4">Không có dữ liệu</div>
                }

            </div>
        </NavigationAdmin>
    );
}

export default Order;
