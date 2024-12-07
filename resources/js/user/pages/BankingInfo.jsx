import React, { useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

//Hướng dẫn thanh toán
const BankingInfo = () => {
    return(
        <div className="w-full font-Public">
            <Navigation/>
            <div className="w-full justify-items-center mt-[90px] ">
                <div className='w-8/12 justify-items-center pt-5'>
                    <div className='w-full  text-center desktop:text-lg  ipad:text-base font-bold py-5 '>HỖ TRỢ</div>
                    <div className='w-full text-center desktop:text-4xl ipad:text-3xl font-bold py-6 '>HƯỚNG DẪN THANH TOÁN</div>
                    <div className='w-full border-b-2 border-black text-center desktop:text-2xl ipad:text-xl font-bold py-5 '>RAVEN</div>                    
                    <ol class=" w-full list-decimal list-inside">
                        <li className="  text-black font-bold py-3 mt-10">
                            Chấp nhận hình thức thanh toán qua thẻ ATM (thẻ ngân hàng, thẻ thanh toán nội địa):
                            <div  className="  text-black font-normal ml-5 py-2">Thông tin chuyển khoản:</div>
                            <ul className="list-disc list-inside ml-8   text-black font-medium py-1"> 
                                <li className="py-1">Ngân hàng Vietcombank</li> 
                                <li className="py-1">Số tài khoản: 1031969541</li> 
                                <li className="py-1">Tên chủ tài khoản: Thạch Minh Luân</li> 
                            </ul> 
                        </li>
                        <li className="  text-black font-bold py-3">
                            Thanh toán khi nhận hàng (Ship COD)
                            <div  className="  text-black text-justify font-normal ml-5 py-2">Thanh toán COD là hình thức khách hàng thanh toán tiền mặt trực tiếp cho nhân viên khi nhận hàng. Khi hàng được giao đến, bạn có thể kiểm tra tình trạng gói hàng còn nguyên vẹn và mở gói hàng kiểm tra và thử sản phẩm trước khi thanh toán. Nếu sản phẩm có bất kỳ lỗi hay khiếm khuyết nào không đúng ý muốn, bạn có thể trả lại nhân viên vận chuyển ngay tại thời điểm đó.</div>
                            
                        </li>
                        
                    </ol>
                </div>
                   
            </div>
            <Footer/>
        </div>
    )
}

export default BankingInfo