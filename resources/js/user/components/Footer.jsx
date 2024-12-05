import React from 'react';
import Logo from "../assets/Logo.svg"
import tiktok from "../assets/tiktok.svg"
import fb from "../assets/facebook.svg"
import ins from "../assets/instagram.svg"
import { Link } from 'react-router-dom';

const Footer = () => {
    return(
        <div className=" mt-16 flex flex-row justify-items-center justify-between bg-[#151515] w-full h-[380px]  ">
            <div className=" basis-1/12"></div>
            <div className=" basis-5/12 pl-4 mt-9">
                <ul className=" ">
                    <li className=" text-white text-3xl font-bold font-['Public Sans'] my-2">RAVEN</li>
                    <li className=" text-white text-base font-light font-['Public Sans'] my-1">Công ty TNHH bốn thành viên UIT</li>
                    <li className=" text-white text-base font-light font-['Public Sans'] my-1">Đại diện: Đoàn Nguyễn Lâm</li>
                    <li className=" text-white text-base font-light font-['Public Sans'] my-1">Địa chỉ: P B3.14, Tòa B, Đường Hàn Thuyên, khu phố 6 P, Thủ Đức, Hồ Chí Minh</li>
                    <li className=" text-white text-base font-light font-['Public Sans'] my-1">Điện thoại: 0384666498</li>
                    <li className=" text-white text-base font-light font-['Public Sans'] my-1">Email: 22520736@gm.uit.edu.vn</li>
                </ul>            
            </div>
            <div  className=" basis-3/12 justify-items-center mt-9 ">
                <div className="">
                    <ul className="w-[300]">
                        <li className=" w-[300] text-white text-3xl font-bold font-['Public Sans'] my-2">HỖ TRỢ</li>
                        <li className=" w-[300] text-white text-base font-extralight font-['Public Sans'] my-1"><Link to="/check_order">Kiểm tra đơn hàng</Link></li>
                        <li className=" w-[300] text-white text-base font-extralight font-['Public Sans'] my-1"><Link to="/banking_info">Hướng dẫn thanh toán</Link></li>
                        <li className=" w-[300] text-white text-base font-extralight font-['Public Sans'] my-1"><Link to="/size_info">Hướng dẫn chọn size</Link></li>
                    </ul>  
                    <ul className="w-[300] ">
                        <li className=" w-[300] text-white text-3xl font-bold font-['Public Sans'] mb-2 mt-6">CHÍNH SÁCH</li>
                        <li className=" w-[300] text-white text-base font-extralight font-['Public Sans'] my-1"><Link to="/buy_info">Chính sách mua hàng</Link></li>
                        <li className=" w-[300] text-white text-base font-extralight font-['Public Sans'] my-1"><Link to="/security_info">Chính sách bảo mật</Link></li>
                        <li className=" w-[300] text-white text-base font-extralight font-['Public Sans'] my-1"><Link to="/return_info">Chính sách đổi trả</Link></li>
                    </ul>
                </div>       
            </div>
            <div className=" basis-2/12 justify-items-center ml-6 mt-9">
                <div className="mb-3">
                    <img src={Logo} alt="Logo"/>
                </div>
                <div className="text-center text-white text-3xl font-bold font-['Public Sans'] mt-6 mb-2">KẾT NỐI</div>
                <div className="flex flex-row ">                
                    <img className="mx-2" src={fb} alt="Logo"/>
                    <img className="mx-2" src={ins} alt="Logo"/>
                    <img className="mx-2" src={tiktok} alt="Logo"/>
                </div>
            </div>
            <div className=" basis-1/12"></div>
        </div>
    )
}

export default Footer