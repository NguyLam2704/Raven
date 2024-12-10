import React, { useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

//Chính sách đổi trả
const ReturnInfo = () => {
    return(
        <div className="w-full font-Public">
            <Navigation/>
            <div className="w-full justify-items-center mt-[90px] ">
                <div className='desktop:w-8/12 ipad:w-9/12 mobile:w-11/12 justify-items-center pt-5'>
                    <div className='w-full  text-center desktop:text-lg  ipad:text-base font-bold py-5 '>CHÍNH SÁCH</div>
                    <div className='w-full text-center desktop:text-4xl ipad:text-3xl font-bold py-6 '>ĐỔI TRẢ SẢN PHẨM</div>
                    <div className='w-full border-b-2 border-black text-center desktop:text-2xl ipad:text-xl font-bold py-5 '>RAVEN</div>    
                    <ol class=" w-full list-decimal list-inside">
                        <li className="  text-black font-bold py-3 mt-10">
                            Điều kiện đổi trả
                            <ul className="list-none list-inside ml-5   text-black font-medium py-1"> 
                                <li className="py-2">1.1. Hoàn trả ngay khi nhận hàng: Nếu quý khách phát hiện kiện hàng có dấu hiệu ướt, rách, móp méo, không còn nguyên vẹn hoặc sai thông tin người nhận, quý khách vui lòng từ chối nhận hàng ngay tại thời điểm nhận hàng.</li> 
                                <li className="py-2">1.2. Với trường hợp sau khi nhận hàng và đã thanh toán cho đơn vị vận chuyển, bạn có quyền yêu cầu trả hàng khi mở kiện hàng và phát hiện một trong các lỗi bên dưới:
                                    <ul className="list-disc list-inside ml-8   text-black font-medium"> 
                                        <li className="py-1">Sản phẩm bị rách bao bì, vỡ hỏng trong quá trình vận chuyển.</li> 
                                        <li className="py-1">Sản phẩm bị giao sai, thiếu phụ kiện, thiếu quà tặng đi kèm.</li> 
                                        <li className="py-1">Sản phẩm chuyển nhầm hàng, nhầm màu so với đơn đặt.</li> 
                                        <li className="py-1">Kiện hàng không thực hiện đồng kiểm khi nhận hàng.</li> 
                                    </ul>
                                </li> 
                                <li className="py-2">1.3. Các trường hợp sản phẩm bị lỗi từ phía sản xuất.</li>
                            </ul> 
                        </li>
                        <li className="  text-black font-bold py-3">
                            Quy định thời gian:
                            <ul className="list-disc list-inside ml-5   text-black font-medium"> 
                                <li className="py-1">Đổi trả trong vòng 7 ngày kể từ khi nhận hàng.</li> 
                                <li className="py-1">Sản phẩm phải còn nguyên tem mác, chưa qua sử dụng và kèm hóa đơn mua hàng.</li> 
                            </ul> 
                        </li>
                        <li className="  text-black font-bold py-5">
                            Quy trình đổi trả:
                            <ul className="list-disc list-inside ml-5   text-black font-medium py-1"> 
                                <li className="py-2">Bước 1: Liên hệ Raven qua hotline hoặc email để thông báo yêu cầu đổi trả.</li> 
                                <li className="py-2">Bước 2: Raven kiểm tra thông tin và xác nhận yêu cầu.</li> 
                                <li className="py-2">Bước 3: Gửi sản phẩm về địa chỉ của Raven.</li>
                                <li className="py-2">Bước 4: Raven kiểm tra và tiến hành đổi sản phẩm hoặc hoàn tiền trong vòng 7 ngày.</li>
                            </ul>
                        </li>
                        <li className="  text-black font-bold py-5">
                            Phương thức hoàn tiền:                           
                            <ul className="list-disc list-inside ml-5   text-black font-medium"> 
                                <li className="py-1">Đối với đơn hàng hoàn trả do lỗi toàn bộ đơn, Chúng tôi hỗ trợ chính sách trả hàng và hoàn tiền qua tài khoản ngân hàng.</li> 
                                <li className="py-1">Đối với đơn hàng hoàn trả do lỗi một phần, Chúng tôi hỗ trợ đổi trả sản phẩm (nếu sản phẩm còn hàng) hoặc hoàn tiền qua tài khoản ngân hàng.</li> 
                            </ul>
                        </li>
                        <li className="  text-black font-bold py-5">
                            Lưu ý:
                            <ul className="list-disc list-inside ml-5   text-black font-medium"> 
                                <li className="py-1">Raven không hỗ trợ đổi trả sản phẩm đã qua sử dụng hoặc hư hỏng do khách hàng.</li> 
                                <li className="py-1">Phí vận chuyển đổi trả sẽ được Raven hỗ trợ trong trường hợp lỗi từ nhà sản xuất hoặc giao hàng sai.</li> 
                            </ul>
                        </li>
                        
                    </ol>
                </div>
                   
            </div>
            <Footer/>
        </div>
    )
}

export default ReturnInfo