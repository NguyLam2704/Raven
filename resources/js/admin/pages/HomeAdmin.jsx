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

const Home = () => {
    //Khai báo các biến trạng thái
    const [ThongKeData, setThongKeData] = useState();
    const [OrdersData, setOrderData] = useState();
    const [ProductsListData, setProductListData] = useState();
    const [isLoading, setIsLoading] = useState(true);

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

            <div className="desktop:hidden mt-2 mobile:h-[230px] ipad:h-[420px] mr-auto rounded-[14px] border-2 border-red-600 shadow-md bg-white ">
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


        </NavigationAdmin>
    );
};

export default Home;
