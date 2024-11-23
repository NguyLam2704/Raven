import React, { useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import img_product from '../assets/img_product.svg'
import ItemCheckOut from "../components/CheckOut/ItemCheckOut";

//Thanh toán
const CheckOut = () => {
    const [ListProduct, setList] = useState([
        {
          key: 1,
          name: "Cao Quốc Kiệt",
          price: 1000000,
          img: img_product,
          sale: 20,
          quality: 1,
          color: "Xanh",
          size: "L"
        },
        {
            key: 2,
            name: "Cao Quốc Kiệt",
            price: 1000000,
            img: img_product,
            sale: 0,
            quality: 2,
            color: "Xanh",
            size: "L"
          },
          {
            key: 3,
            name: "Cao Quốc Kiệt",
            price: 1000000,
            img: img_product,
            sale: 0,
            quality: 3,
            color: "Xanh",
            size: "L"
          }
    ]);
    
    return(
        <div className="w-full justify-items-center">
            <Navigation/>
                <div className="w-10/12 mt-[150px]">
                    <div className=" text-center text-[#a91d3a] text-4xl font-extrabold">THANH TOÁN</div>
                    <div className="w-full grid grid-cols-2 mt-12">
                        {/* Cột nhập Thông tin thanh toán */}
                        <div className="border-r border-black px-20">
                            <div className=" text-center text-[#151515] text-xl font-bold ">Thông tin thanh toán</div>
                            {/* Nhập họ và tên */}
                            <input className="h-10 w-full border border-black px-2 mt-6"
                                type="text"
                                placeholder="Họ và tên"
                            />                            
                            <div  className="h-10 w-full grid grid-cols-3 mt-5 gap-4">
                                {/* Nhập email */}
                                <input className="h-10 w-full col-span-2 border border-black px-2 "
                                    type="text"
                                    placeholder="Email"
                                />  
                                {/* Nhập sđt    */}
                                <input className="h-10 w-full border border-black px-2 "
                                    type="text"
                                    placeholder="Số điện thoại"
                                />                                
                            </div>
                            {/* Chọn tỉnh thành */}
                            <input className="h-10 w-full border border-black px-2 mt-6"
                                type="text"
                                placeholder="Tỉnh/Thành phố"
                            />
                            {/* Chọn quận huyện */}
                            <input className="h-10 w-full border border-black px-2 mt-6"
                                type="text"
                                placeholder="Quận/Huyện"
                            />
                            {/* Chọn xã phường */}
                            <input className="h-10 w-full border border-black px-2 mt-6"
                                type="text"
                                placeholder="Xã/Phường"
                            />
                            {/* Nhập tên đường, số nhà */}
                            <input className="h-10 w-full border border-black px-2 mt-6"
                                type="text"
                                placeholder="Số nhà, Tên đường"
                            />
                            {/* Ghi chú */}
                            <input className="h-16 w-full border border-black px-2 mt-6"
                                type="text"
                                placeholder="Ghi chú (nếu có)"
                            /> 
                            {/* Chọn phương thức thanh toán */}
                            <div className=" text-center text-[#151515] text-xl font-bold mt-8">Phương thức thanh toán</div>
                            <div className="mt-6 flex flex-row items-center">
                                <input className="h-5 w-5  rounded accent-black " 
                                    type="checkbox"                     
                                />
                                <div className="w-full h-7content-center text-black text-xl font-normal ml-2">Thanh toán khi nhận hàng (COD)</div> 
                            </div>
                            <div className="mt-6 flex flex-row items-center">
                                <input className="h-5 w-5  rounded accent-black " 
                                    type="checkbox"                     
                                />
                                <div className="w-full h-7content-center text-black text-xl font-normal ml-2">Chuyển khoản qua ngân hàng</div> 
                            </div>
                        </div>
                        {/* Cột đơn hàng */}
                        <div className=" px-20">
                            <div className="w-full text-center text-[#151515] text-xl font-bold mb-8">Đơn hàng</div>
                            {/* Danh sách sản phẩm trong đơn hàng */}
                            {ListProduct.map((product,index) => (
                                <ItemCheckOut key={index} product={product} />                            
                            ))}
                            {/* Tạm tính giá các sản phẩm */}
                            <div className="flex flex-row justify-between mt-3">
                                <div className=" h-6 content-center text-black text-[15px] font-normal ">Tạm tính: </div>
                                <div className="w-24 text-right text-[#c73659] text-base font-bold ">490000đ</div>
                            </div>
                            {/* Phí vận chuyển */}
                            <div className="flex flex-row justify-between mt-3">
                                <div className=" h-6 content-center text-black text-[15px] font-normal ">Phí vận chuyển: </div>
                                <div className="h-6 text-right text-black text-sm font-bold ">50000đ</div>
                            </div>
                            {/* Tổng giá */}
                            <div className="h-1 border-b-[1px] border-[#C4C4C4] mt-2"></div>
                            <div className="flex flex-row justify-between mt-3">
                                <div className="h-10 content-center text-black text-xl font-bold ">Tổng cộng </div>
                                <div className="h-10 text-right text-[#a91d3a] text-xl font-bold">500000đ</div>
                            </div>
                        </div>
                    </div>
                    {/* Nút thanh toán */}
                    <div className="w-fulf flex items-center justify-center mt-14">
                        <button className=" h-12 content-center text-center text-white text-2xl font-bold rounded-lg border border-black bg-[#c73659] px-10 py-1">THANH TOÁN</button>
                    </div>
                    
                </div>
            <Footer/>
        </div>
    )
}

export default CheckOut