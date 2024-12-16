import React, { useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ItemOrder from "../components/CheckOrder/ItemOrder";
import img_loading from '../assets/loading.gif'

//Kiểm tra đơn hàng
const CheckOrder = () => {
    //nhận dữ liệu của input
    const [input, setInput] = useState('')

    const [orderInfo, setOrderInfo] = useState([]); // state để lưu danh sách các order
    const [loading, setLoading] = useState(false); // state lưu trạng thái loading
    const [error, setError] = useState(null); // state lưu trạng thái lỗi
    const [stateClick, setStateClick] = useState(false)
    //Fetch api get orderInfo
    const fetchOrderInfo = async (e) => {
        e.preventDefault(); // Ngăn hành vi reload của form
        setLoading(true); // Bắt đầu trạng thái tải
        setStateClick(true)
        setOrderInfo([])
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
        }
        catch (err) {
            setError(err.message); // Lưu thông báo lỗi nếu xảy ra
        } finally {
            setLoading(false); // Kết thúc trạng thái tải
        }
    }
    console.log(orderInfo)
    return(
        <div className="w-full font-Public bg-white">
            <Navigation/>
            <div className="w-full justify-items-center pt-24 mt-24 ">
                <div className="text-black desktop:text-2xl ipad:text-xl font-bold uppercase ">kiểm tra đơn hàng</div>
                {/* Text input email hoặc sdt để kiểm tra đơn hàng */}
                <form onSubmit={fetchOrderInfo} className="desktop:w-1/3 ipad:w-2/3 mobile:w-3/4 justify-items-center ">
                    <div className="flex w-full h-10 border border-black desktop:mt-16 ipad:mt-14 mobile:mt-10">
                           <input className=" w-full px-2 focus:outline-none bg-white" 
                                type="text" 
                                placeholder="Nhập số điện thoại hoặc email" 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}                            
                            />
                            
                    </div>
                    <button className="bg-[#1E0342] rounded-md border border-black text-[#eeeeee] text-base font-bold  mt-6 px-5 py-1">Kiểm tra</button>
                </form>
                {
                    loading && (<img className="desKtop:w-20 desktop:h-20 ipad:w-16 ipad:h-16 mobile:h-14 mobile:w-14" src={img_loading}/>) 
                }
                { (orderInfo.length !=0 )//Kiểm tra độ dài của mảng
                    ? (<div className="desktop:w-4/6 ipad:w-4/6 mobile:w-5/6 desktop:mt-24 ipad:mt-20 mobile:mt-16 ">
                        {/* Các cột thông tin của đơn hàng */}
                        <ul className="flex flex-row desktop:text-lg ipad:text-sm mobile:text-xs">
                            <li className="w-1/4 h-11 content-center border border-black border-r-0 bg-[#eeeeee] text-center text-[#1E0342] font-bold">Mã đơn hàng</li>
                            <li className="w-1/3 h-11 content-center border border-black border-r-0 bg-[#eeeeee] text-center text-[#1E0342] font-bold">Tên khách hàng</li>                            
                            <li className="w-1/3 h-11 content-center border border-black border-r-0 bg-[#eeeeee] text-center text-[#1E0342] font-bold">Ngày đặt hàng</li>
                            <li className="w-1/3 h-11 content-center border border-black border-r-0 bg-[#eeeeee] text-center text-[#1E0342] font-bold">Tổng tiền thanh toán</li>
                            <li className="w-1/3 h-11 content-center border border-black  bg-[#eeeeee] text-center text-[#1E0342] font-bold">Trạng thái đơn hàng</li>
                        </ul>
                        {/* Danh sách các đơn hàng */}
                        {orderInfo.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)).slice(0,10).map((order, index)=>{

                            return(
                                <ItemOrder key={index} order={order} />
                            )
                        })}
                    </div>
                    ):(
                        stateClick && !loading &&  <div className="mt-6 text-base font-medium">Hiện tại bạn chưa có đơn hàng nào</div>
                    )
                }                
            </div>
            <Footer/>
        </div>
    )
}

export default CheckOrder