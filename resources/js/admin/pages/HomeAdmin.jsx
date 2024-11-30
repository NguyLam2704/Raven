import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import NavigationAdmin from "../components/NavigationAdmin";
import StatsCard from "../components/home/statscart";
import MonthlyRevenueChart from "../components/home/revenueChart";
import ProductsList from "../components/home/productsList";
import OrderList from "../components/home/ordersList";
import revenueData from "../data/revenueData";
// import { productslistData } from '../data/productsData';
// import ordersData from '../data/ordersData';
import userIcon from "../asset/home/user.svg";
import orderIcon from "../asset/home/order.svg";
import revenueIcon from "../asset/home/revenue.svg";
import shipIcon from "../asset/home/ship.svg";
import trendupIcon from "../asset/home/trending_up.svg";
import trenddownIcon from "../asset/home/trending_down.svg";
import loadingVideo from "../asset/Loading_Video.mp4";
import axios from "axios";

// lấy dữ liệu từ api
const fetchThongke = async () => {
    const response = await axios.get("/api/dashboard/thongke");
    return response.data;
};

const fetchOrder = async () => {
    const response = await axios.get("/api/v1/order");
    return response.data;
};

const fetchTop5Product = async () => {
    const response = await axios.get("/api/v1/product?includeImage=true");
    return response.data;
};

const Home = () => {
    //Khai báo các biến trạng thái
    const [ThongKeData, setThongKeData] = useState();
    const [OrdersData, setOrderData] = useState();
    const [ProductsListData, setProductListData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    //Tiến hành lấy dữ liệu
    useEffect(() => {
        const LoadData = async () => {
            const thongkeData = await fetchThongke();
            const orderData = await fetchOrder();
            const productsListData = await fetchTop5Product();
            setThongKeData(thongkeData);
            setOrderData(orderData.data);
            setProductListData(productsListData.data);
            console.log(thongkeData);
            console.log(orderData.data);
            console.log(productsListData.data);
            setIsLoading(false);
        };
        LoadData();
    }, []);

    //loading khi chưa lấy dữ liệu xong
    if (isLoading) {
        return (
            <div className="w-full h-[700px] flex justify-center items-center">
                <video autoPlay muted loop>
                    <source src={loadingVideo} type="video/mp4" />
                </video>
            </div>
        );
    }

    //Tạo 4 mục thống kê
    const stats = [
        {
            title: "Tổng số lượt truy cập",
            value: ThongKeData.view.today.toLocaleString(),
            icon: userIcon,
            icontrend:
                ThongKeData.view.today > ThongKeData.view.yesterday
                    ? trendupIcon
                    : trenddownIcon,
            trend:
                ThongKeData.view.yesterday === 0
                    ? "0%"
                    : ((ThongKeData.view.today - ThongKeData.view.yesterday) /
                          ThongKeData.view.yesterday) *
                          100 +
                      "%",
            trendColor:
                ThongKeData.view.today > ThongKeData.view.yesterday
                    ? "text-green-500"
                    : "text-red-500",
        },
        {
            title: "Tổng số đơn hàng",
            value: ThongKeData.donhang.all,
            icon: orderIcon,
            icontrend:
                ThongKeData.donhang.today >= ThongKeData.donhang.yesterday
                    ? trendupIcon
                    : trenddownIcon,
            trend:
                ThongKeData.donhang.yesterday === 0
                    ? "0%"
                    : (ThongKeData.donhang.today /
                          ThongKeData.donhang.yesterday) *
                          100 +
                      "%",
            trendColor:
                ThongKeData.donhang.today >= ThongKeData.donhang.yesterday
                    ? "text-green-500"
                    : "text-red-500",
        },
        {
            title: "Tổng số doanh thu",
            value: ThongKeData.doanhthu.all.toLocaleString() + "đ",
            icon: revenueIcon,
            icontrend:
                ThongKeData.doanhthu.today >= ThongKeData.doanhthu.yesterday
                    ? trendupIcon
                    : trenddownIcon,
            trend:
                ThongKeData.doanhthu.yesterday === 0
                    ? "0%"
                    : (ThongKeData.doanhthu.today /
                          ThongKeData.doanhthu.yesterday) *
                          100 +
                      "%",
            trendColor:
                ThongKeData.doanhthu.today >= ThongKeData.doanhthu.yesterday
                    ? "text-green-500"
                    : "text-red-500",
        },
        {
            title: "Đang giao hàng",
            value: ThongKeData.onProgress,
            icon: shipIcon,
            icontrend: trenddownIcon,
            trend: "",
            trendColor: "",
        },
    ];

    return (
        <NavigationAdmin>
            <Helmet>
                <title>Tổng quan</title>
            </Helmet>
            <h1 className="text-[32px] font-bold">Thống kê</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {stats.map((stat, index) => (
                    <StatsCard key={index} {...stat} />
                ))}
            </div>

            <div className="flex w-full h-auto mt-4">
                <div className="mr-auto pr-4 w-[65%]">
                    <MonthlyRevenueChart />
                </div>

                <div className="mr-auto py-4 pr-4 w-[35%] h-[460px] p-4 bg-white rounded-[14px] shadow-md">
                    <h2 className="text-2xl font-bold mb-2">
                        Top 5 sản phẩm bán chạy
                    </h2>
                    <ProductsList data={ProductsListData} />
                </div>
            </div>

            <h1 className="text-[32px] font-bold mt-4">Đơn hàng</h1>

            <div className="w-full">
                <OrderList data={OrdersData} />
            </div>
        </NavigationAdmin>
    );
};

export default Home;
