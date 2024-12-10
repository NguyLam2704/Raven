import React, { useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ItemOrder from "../components/CheckOrder/ItemOrder";

//Kiểm tra đơn hàng
const CheckOrder = () => {
    //nhận dữ liệu của input
    const [input, setInput] = useState('')

    const [orderInfo, setOrderInfo] = useState([]); // state để lưu danh sách các order
    const [loading, setLoading] = useState(false); // state lưu trạng thái loading
    const [error, setError] = useState(null); // state lưu trạng thái lỗi
    //Fetch api get orderInfo
    const fetchOrderInfo = async (e) => {
        e.preventDefault(); // Ngăn hành vi reload của form
        setLoading(true); // Bắt đầu trạng thái tải
        setError(null); // Xóa trạng thái lỗi trước đó
        try {
            const response = await fetch(`api/v1/orderInfo`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({input: input})
            });

            if (!response.ok){
                throw new Error('Failed to fetch order info')
            }
            const data = await response.json();
            setOrderInfo(data.data || []);
            console.log(orderInfo);
        }
        catch (err) {
            setError(err.message); // Lưu thông báo lỗi nếu xảy ra
        } finally {
            setLoading(false); // Kết thúc trạng thái tải
        }
    }
    return(
        <div className="w-full font-Public">
            <Navigation/>
            <div className="w-full justify-items-center pt-24 mt-24 ">
                <div className="text-black desktop:text-2xl ipad:text-xl font-bold uppercase ">kiểm tra đơn hàng</div>
                {/* Text input email hoặc sdt để kiểm tra đơn hàng */}
                <form onSubmit={fetchOrderInfo} className="desktop:w-1/3 ipad:w-2/3 mobile:w-3/4 justify-items-center">
                    <div className="flex w-full h-10 border border-black desktop:mt-16 ipad:mt-14 mobile:mt-10">
                           <input className=" w-full px-2 focus:outline-none" 
                                type="text" 
                                placeholder="Nhập số điện thoại hoặc email" 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}                            
                            />
                    </div>
                    <button className="bg-[#C73659] rounded-md border border-black text-[#eeeeee] text-base font-bold  mt-6 px-5 py-1">Kiểm tra</button>
                </form>
               
                { orderInfo.length !=0 //Kiểm tra độ dài của mảng
                    && (<div className="desktop:w-4/6 ipad:w-4/6 mobile:w-5/6 desktop:mt-24 ipad:mt-20 mobile:mt-16 ">
                        {/* Các cột thông tin của đơn hàng */}
                        <ul className="flex flex-row desktop:text-lg ipad:text-sm mobile:text-xs">
                            <li className="w-1/4 h-11 content-center border border-black border-r-0 bg-[#eeeeee] text-center text-[#a91d3a] font-bold">Mã đơn hàng</li>
                            <li className="w-1/3 h-11 content-center border border-black border-r-0 bg-[#eeeeee] text-center text-[#a91d3a] font-bold">Tên khách hàng</li>                            
                            <li className="w-1/3 h-11 content-center border border-black border-r-0 bg-[#eeeeee] text-center text-[#a91d3a] font-bold">Ngày đặt hàng</li>
                            <li className="w-1/3 h-11 content-center border border-black border-r-0 bg-[#eeeeee] text-center text-[#a91d3a] font-bold">Tổng tiền thanh toán</li>
                            <li className="w-1/3 h-11 content-center border border-black  bg-[#eeeeee] text-center text-[#a91d3a] font-bold">Trạng thái đơn hàng</li>
                        </ul>
                        {/* Danh sách các đơn hàng */}
                        {orderInfo.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)).slice(0,10).map((order, index)=>{

                            return(
                                <ItemOrder key={index} order={order} />
                            )
                        })}
                    </div>
                )}                
            </div>
            <Footer/>
        </div>
    )
}

export default CheckOrder