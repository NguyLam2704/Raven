import React from 'react';
import Logo from "../assets/Logo.svg"
import tiktok from "../assets/tiktok.svg"
import fb from "../assets/facebook.svg"
import ins from "../assets/instagram.svg"

const Footer = () => {
    return(
        <div class=" mt-16 flex flex-row justify-items-center justify-between bg-[#151515] w-full h-[380px]  ">
            <div class=" basis-1/12"></div>
            <div class=" basis-5/12 pl-4 mt-9">
                <ul class=" ">
                    <li class=" text-white text-3xl font-bold font-['Public Sans'] my-2">RAVEN</li>
                    <li class=" text-white text-base font-light font-['Public Sans'] my-1">Công ty TNHH bốn thành viên UIT</li>
                    <li class=" text-white text-base font-light font-['Public Sans'] my-1">Đại diện: Đoàn Nguyễn Lâm</li>
                    <li class=" text-white text-base font-light font-['Public Sans'] my-1">Địa chỉ: P B3.14, Tòa B, Đường Hàn Thuyên, khu phố 6 P, Thủ Đức, Hồ Chí Minh</li>
                    <li class=" text-white text-base font-light font-['Public Sans'] my-1">Điện thoại: 0384666498</li>
                    <li class=" text-white text-base font-light font-['Public Sans'] my-1">Email: 22520736@gm.uit.edu.vn</li>
                </ul>            
            </div>
            <div  class=" basis-3/12 justify-items-center mt-9 ">
                <div class="">
                    <ul class="w-[300]">
                        <li class=" w-[300] text-white text-3xl font-bold font-['Public Sans'] my-2">HỖ TRỢ</li>
                        <li class=" w-[300] text-white text-base font-extralight font-['Public Sans'] my-1">Kiểm tra đơn hàng</li>
                        <li class=" w-[300] text-white text-base font-extralight font-['Public Sans'] my-1">Điều khoản và dịch vụ</li>
                        <li class=" w-[300] text-white text-base font-extralight font-['Public Sans'] my-1">Điều khoản và dịch vụ</li>
                    </ul>  
                    <ul class="w-[300] ">
                        <li class=" w-[300] text-white text-3xl font-bold font-['Public Sans'] mb-2 mt-6">CHÍNH SÁCH</li>
                        <li class=" w-[300] text-white text-base font-extralight font-['Public Sans'] my-1">Chính sách mua hàng</li>
                        <li class=" w-[300] text-white text-base font-extralight font-['Public Sans'] my-1">Chính sách bảo mật</li>
                        <li class=" w-[300] text-white text-base font-extralight font-['Public Sans'] my-1">Chính sách đổi trả</li>
                    </ul>
                </div>       
            </div>
            <div class=" basis-2/12 justify-items-center ml-6 mt-9">
                <div class="mb-3">
                    <img src={Logo} alt="Logo"/>
                </div>
                <div class="text-center text-white text-3xl font-bold font-['Public Sans'] mt-6 mb-2">KẾT NỐI</div>
                <div class="flex flex-row ">                
                    <img class="mx-2" src={fb} alt="Logo"/>
                    <img class="mx-2" src={ins} alt="Logo"/>
                    <img class="mx-2" src={tiktok} alt="Logo"/>
                </div>
            </div>
            <div class=" basis-1/12"></div>
        </div>
    )
}

export default Footer