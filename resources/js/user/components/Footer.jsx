import React from 'react';
import Logo from "../assets/qua_moi.png"
import tiktok from "../assets/tiktok.svg"
import fb from "../assets/facebook.svg"
import ins from "../assets/instagram.svg"
import { Link } from 'react-router-dom';

const Footer = () => {
    return(
        <div className=" mt-16 border border-white flex desktop:flex-row mobile:flex-col mobile:pl-4 justify-items-center justify-between bg-[#151515] w-full pb-10 font-Public ">
            <div className='w-[80%] justify-between flex mx-auto max-w-[1557px]'>
                <div className="mt-9">
                    <ul>
                        <li className=" text-white desktop:text-3xl ipad:text-2xl mobile:text-xl  font-bold font-Public my-2">RAVEN</li>
                        <li className=" text-white desktop:text-base ipad:text-sm font-light my-1">Công ty TNHH bốn thành viên UIT</li>
                        <li className=" text-white desktop:text-base ipad:text-sm font-light  my-1">Đại diện: Đoàn Nguyễn Lâm</li>
                        <li className=" text-white desktop:text-base ipad:text-sm font-light  my-1">Địa chỉ: P B3.14, Tòa B, Đường Hàn Thuyên, khu phố 6 P, Thủ Đức, Hồ Chí Minh</li>
                        <li className=" text-white desktop:text-base ipad:text-sm font-light font-Public my-1">Điện thoại: 0384666498</li>
                        <li className=" text-white desktop:text-base ipad:text-sm font-light font-Public my-1">Email: 22520736@gm.uit.edu.vn</li>
                    </ul>            
                </div>
                <div  className=" desktop:justify-items-center  mt-9 ">
                    <div className="">
                        <ul className="w-[300]">
                            <li className=" w-[300] text-white desktop:text-2xl ipad:text-xl font-bold font-Public my-2 ">HỖ TRỢ</li>
                            <li className=" w-[300] text-white desktop:text-base ipad:text-sm tex font-extralight my-1"><Link to="/check_order">Kiểm tra đơn hàng</Link></li>
                            <li className=" w-[300] text-white desktop:text-base ipad:text-sm font-extralight  my-1"><Link to="/banking_info">Hướng dẫn thanh toán</Link></li>
                            <li className=" w-[300] text-white desktop:text-base ipad:text-sm font-extralight my-1"><Link to="/size_info">Hướng dẫn chọn size</Link></li>
                        </ul>  
                        <ul className="w-[300] ">
                            <li className=" w-[300] text-white desktop:text-2xl ipad:text-xl font-bold  my-2 mt-9">CHÍNH SÁCH</li>
                            <li className=" w-[300] text-white desktop:text-base ipad:text-sm font-extralight  my-1"><Link to="/buy_info">Chính sách mua hàng</Link></li>
                            <li className=" w-[300] text-white desktop:text-base ipad:text-sm font-extralight my-1"><Link to="/security_info">Chính sách bảo mật</Link></li>
                            <li className=" w-[300] text-white desktop:text-base ipad:text-sm font-extralight my-1"><Link to="/return_info">Chính sách đổi trả</Link></li>
                        </ul>
                    </div>       
                </div>
                <div className="desktop:justify-items-center desktop:ml-6 ipad:ml-6 mt-8">
                    <div className=" desktop:flex ipad:flex mobile:hidden mb-3">
                        <img className='desktop:h-32 ipad:h-28 ' src={Logo} alt="Logo"/>
                    </div>
                    <div className="desktop:text-center  text-white desktop:text-2xl ipad:text-xl font-bold font-Public mt-6 mb-2">KẾT NỐI</div>
                    <div className="flex flex-row ">                
                        <img className="mx-2 desktop:h-14 ipad:h-12 mobile:h-9" src={fb} alt="Logo"/>
                        <img className="mx-2 desktop:h-14 ipad:h-12 mobile:h-9" src={ins} alt="Logo"/>
                        <img className="mx-2 desktop:h-14 ipad:h-12 mobile:h-9" src={tiktok} alt="Logo"/>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Footer