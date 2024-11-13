import React from 'react';
import { Helmet } from 'react-helmet';
import NavigationAdmin from '../components/NavigationAdmin';
import StatsCard from '../components/home/statscart';
import MonthlyRevenueChart from '../components/home/revenueChart';
import ProductsList from '../components/home/productsList';
import OrderList from '../components/home/ordersList';
import revenueData from '../data/revenueData';
import { productslistData } from '../data/productsData';
import ordersData from '../data/ordersData';
import userIcon from '../asset/home/user.svg'
import orderIcon from '../asset/home/order.svg'
import revenueIcon from '../asset/home/revenue.svg'
import shipIcon from '../asset/home/ship.svg'
import trendupIcon from '../asset/home/trending_up.svg'
import trenddownIcon from '../asset/home/trending_down.svg'

const Home = () => {

  const stats = [
    {
      title: "Tổng số khách hàng",
      value: "40,689",
      icon: userIcon, 
      icontrend: trendupIcon ,
      trend: "8.5%",
      trendColor: "text-green-500",
    },
    {
      title: "Tổng số đơn hàng",
      value: "10,000",
      icon: orderIcon,
      icontrend: trendupIcon,
      trend: "1.2%",
      trendColor: "text-green-500",
    },
    {
      title: "Tổng số doanh thu",
      value: "2,000,000",
      icon: revenueIcon,
      icontrend: trenddownIcon,
      trend: "4.3%",
      trendColor: "text-red-500",
    },
    {
      title: "Đang giao hàng",
      value: "10",
      icon: shipIcon,
      icontrend: trenddownIcon ,
      trend: "2%",
      trendColor: "text-red-500",
    },
  ];


  return (
    <NavigationAdmin>
        <Helmet>
          <title>Tổng quan</title>
        </Helmet>
        <h1 className='text-[32px] font-bold'>
          Thống kê
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat}/>
          ))}
        </div>

        <div className="flex w-full h-[444px] mt-4">
          
            <div className="mr-auto pr-4 w-[65%]"> 
              <MonthlyRevenueChart data={revenueData} /> 
            </div>

            
            <div className="mr-auto py-4 pr-4 w-[35%] h-[444px] p-4 bg-white rounded-[14px] shadow-md">
              <h2 className="text-2xl font-bold mb-2">Sản phẩm</h2>
              <ProductsList data={productslistData}/>
            </div>
        </div>

        <h1 className='text-[32px] font-bold mt-4'>
          Đơn hàng
        </h1>

        <div className='w-full'>
          <OrderList data={ordersData}/>
        </div>

    </NavigationAdmin>
  );
};

export default Home;
