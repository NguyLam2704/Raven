import React, { useEffect, useState } from 'react';
import axios from 'axios';



const fetchOrder = async () => {
    const response = await axios.get('/api/v1/order')
    return response.data;
  }

  


const ordersData = [
    {
        ord_id: 1,
        cus_name: "Thạch Minh Luân",
        address: "KTX B, Dĩ An, Bình Dương",
        ord_date: new Date("2024-08-04"),
        paymethod: "COD",
        status: "Đã hoàn thành"
    },
    {
        ord_id: 2,
        cus_name: "Thạch Minh Luân",
        address: "KTX B, Dĩ An, Bình Dương",
        ord_date: new Date("2024-09-04"),
        paymethod: "Chuyển khoản",
        status: "Đang xử lý"
    },
    {
        ord_id: 3,
        cus_name: "Thạch Minh Luân",
        address: "KTX B, Dĩ An, Bình Dương",
        ord_date: new Date("2024-08-24"),
        paymethod: "COD",
        status: "Đã hủy"
    },
    {
        ord_id: 4,
        cus_name: "Thạch Minh Luân",
        address: "KTX B, Dĩ An, Bình Dương",
        ord_date: new Date("2024-08-04"),
        paymethod: "COD",
        status: "Đã hoàn thành"
    },
    {
        ord_id: 5,
        cus_name: "Thạch Minh Luân",
        address: "KTX B, Dĩ An, Bình Dương",
        ord_date: new Date("2024-08-04"),
        paymethod: "COD",
        status: "Đang xử lý"
    },
    {
        ord_id: 6,
        cus_name: "Thạch Minh Luân",
        address: "KTX B, Dĩ An, Bình Dương",
        ord_date: new Date("2024-10-04"),
        paymethod: "COD",
        status: "Đang giao hàng"
    },
]

export default ordersData;