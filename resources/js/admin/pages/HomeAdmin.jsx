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
import loading from "../asset/loading.svg"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";
import {Skeleton} from "@mui/material";

// lấy dữ liệu từ api
const fetchThongke = async () => {
    const response = await axios.get("/api/dashboard/thongke");
    return response.data;
};

const fetchOrder = async () => {
    const response = await axios.get("/api/v1/order");
    return response.data;
};

const Home = () => {
    //Khai báo các biến trạng thái
    const [ThongKeData, setThongKeData] = useState();
    const [OrdersData, setOrderData] = useState();
    const [ProductsListData, setProductListData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    let calPercent = (today, yesterday) => {
        let x = ((today - yesterday) / yesterday) * 100;
        if (x < 0) {
            x *= -1;
        }
        return x.toFixed(2);
    }

    //Tiến hành lấy dữ liệu
    useEffect(() => {
        const LoadData = async () => {
            const thongkeData = await fetchThongke();
            const orderData = await fetchOrder();

            setThongKeData(thongkeData);
            setOrderData(orderData.data);

            console.log(thongkeData);
            console.log(orderData.data);
            
            setIsLoading(false);
        };
        LoadData();
    }, []);

    // //loading khi chưa lấy dữ liệu xong
    // if (isLoading) {
    //     return (
    //         <div className="w-full h-[700px] flex justify-center items-center">
    //                 <img src={loading} />
    //         </div>
    //     );
    // }
    if (isLoading)  {
        return (
            <NavigationAdmin>
                <h1 className="mobile:text-[20px] ipad:text-[25px] desktop:text-[32px] font-bold">
                    Thống kê
                </h1>
                {/* Tổng quan thống kê */}
                <div className="grid grid-cols-1 gap-4 ipad:grid-cols-2 desktop:grid-cols-4 mobile:w-[400px] ipad:w-[700px] desktop:w-[1200px] shadow-md">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            variant="rectangular"
                            height={100}
                            animation="wave"
                            style={{ backgroundColor: "#f0f0f0" }}
                        />
                    ))}
                </div>

                <div className="flex gap-4">
                    {/* Doanh thu bán hàng theo tháng */}
                    <div className="mt-4 shadow-md ipad:w-[700px] desktop:w-[1200px] mobile:w-[400px]">
                        <Skeleton
                            variant="rectangular"
                            height={420}
                            animation="wave"
                            style={{ backgroundColor: "#f0f0f0" }}
                        />
                    </div>
                    {/* Top 5 sản phẩm bán chạy */}
                    <div className="mt-4 grid gap-2 shadow-md ipad:w-[700px] desktop:w-[400px] mobile:w-[400px]">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Skeleton
                                key={index}
                                variant="rectangular"
                                height={78}
                                animation="wave"
                                style={{ backgroundColor: "#f0f0f0" }}
                            />
                        ))}
                    </div>
                </div>

                <h1 className="mobile:text-[20px] ipad:text-[25px]  desktop:text-[32px]  font-bold mt-4">Đơn hàng</h1>
                {/* Bảng đơn hàng */}
                <div className="mt-4 grid gap-2 shadow-md ipad:w-[700px] desktop:w-[1200px] mobile:w-[400px]">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            variant="rectangular"
                            height={100}
                            animation="wave"
                            style={{ backgroundColor: "#f0f0f0" }}
                        />
                    ))}
                </div>
            </NavigationAdmin>

        )
     }
    
    //Tạo 4 mục thống kê
    const stats = [
        {
            title: "Lượt truy cập trong ngày",
            value: ThongKeData.view.today.toLocaleString(),
            icon: userIcon,
            icontrend:
                ThongKeData.view.today > ThongKeData.view.yesterday
                    ? trendupIcon
                    : trenddownIcon,
            trend:
                ThongKeData.view.yesterday === 0
                    ? "0%"
                    : calPercent(ThongKeData.view.today , ThongKeData.view.yesterday) +
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
                    : calPercent(ThongKeData.donhang.today , ThongKeData.donhang.yesterday) +
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
                    : calPercent(ThongKeData.doanhthu.today , ThongKeData.doanhthu.yesterday) +
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
            <h1 className="mobile:text-[20px] ipad:text-[25px]  desktop:text-[32px] font-bold">Thống kê</h1>

            <div className="grid grid-cols-1 mobile:grid-cols-2 ipad:grid-cols-2 desktop:grid-cols-4 gap-3">
                {stats.map((stat, index) => (
                    <StatsCard key={index} {...stat} />
                ))}
            </div>

                {/*Biểu đồ trên Desktop  */}
            <div className="mobile:hidden ipad:hidden gap-1 desktop:flex w-full mt-4">
                <div className="mr-auto rounded-[14px] shadow-md bg-white desktop:pr-4  desktop:w-[65%]">
                    <MonthlyRevenueChart/>
                </div>

                <div className="mr-auto h-[470px] mobile:mt-2 ipad:mt-2 desktop:mt-0 py-4 pr-4 desktop:w-[35%] p-4 bg-white rounded-[14px] shadow-md">
                    <h2 className="desktop:text-2xl ipad:text-xl font-bold mb-2">
                        Top 5 sản phẩm bán chạy
                    </h2>
                    <ProductsList data={ThongKeData.top5prod} />
                </div>
            </div>

            <div className="desktop:hidden mt-2 mobile:h-[230px] ipad:h-[420px] mr-auto rounded-[14px] shadow-md bg-white ">
                    <MonthlyRevenueChart/>
            </div>

            <div className="desktop:hidden mr-auto h-[430px] mobile:mt-2 ipad:mt-2 py-4 pr-4 desktop:w-[35%] p-4 bg-white rounded-[14px] shadow-md">
                    <h2 className="desktop:text-2xl ipad:text-xl font-bold mb-2">
                        Top 5 sản phẩm bán chạy
                    </h2>
                    <ProductsList data={ThongKeData.top5prod} />
            </div>


            <h1 className="mobile:text-[20px] ipad:text-[25px]  desktop:text-[32px]  font-bold mt-4">Đơn hàng</h1>

            <div className="overflow-x-auto">
                <OrderList data={OrdersData.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)).slice(0,10)} />
            </div>

            <Link to="/order_admin" className="w-full cursor-pointer mt-2">
                <p className="text-center text-xl underline text-blue-700 font-bold">Xem thêm</p>
            </Link>


        </NavigationAdmin>
    );
};

export default Home;
