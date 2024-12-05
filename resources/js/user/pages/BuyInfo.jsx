import React, { useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

//Chinh sách mua hàng
const BuyInfo = () => {
    return(
        <div className="w-full">
            <Navigation/>
            <div className="w-full justify-items-center mt-[90px] ">
                <div className='w-8/12 justify-items-center pt-5'>
                    <div className='w-full  text-center text-lg font-bold py-5 '>CHÍNH SÁCH</div>
                    <div className='w-full text-center text-5xl font-bold py-10 '>THÔNG TIN MUA HÀNG</div>
                    <div className='w-full border-b-2 border-black text-center text-3xl font-bold py-5 '>RAVEN</div>                    
                    <ol class=" w-full list-decimal list-inside">
                        <li className="text-lg text-black font-bold py-3 mt-10">
                            Quy định chung:
                            <ul className="list-none list-inside ml-5 text-lg text-black font-medium py-1"> 
                                <li className="py-1">Khi vào website của chúng tôi, người dùng tối thiểu phải 18 tuổi hoặc truy cập dưới sự giám sát của cha mẹ hay người giám hộ hợp pháp.</li> 
                                <li className="py-1">Khi truy cập vào website Raven, khách hàng đồng ý tuân thủ các điều khoản mua sắm của chúng tôi.</li> 
                                <li className="py-1">Raven có quyền thay đổi chính sách mà không cần thông báo trước.</li>
                            </ul> 
                        </li>
                        <li className="text-lg text-black font-bold py-3">
                            Đặt hàng và thanh toán:
                            <ul className="list-none list-inside ml-5 text-lg text-black font-medium py-1"> 
                                <li className="py-1">Khách hàng đặt hàng trực tiếp qua website hoặc liên hệ hotline.</li> 
                                <li className="py-1">Phương thức thanh toán: chuyển khoản hoặc thanh toán khi nhận hàng (COD) </li> 
                                <li className="py-1">Raven có quyền từ chối các đơn hàng không hợp lệ, thiếu thông tin hoặc nghi ngờ gian lận</li>
                            </ul> 
                        </li>
                        <li className="text-lg text-black font-bold py-5">
                            Giá cả và chương trình khuyến mãi:
                            <ul className="list-none list-inside ml-5 text-lg text-black font-medium py-1"> 
                                <li className="py-1 text-justify">Chúng tôi cam kết sẽ cung cấp thông tin giá cả chính xác nhất cho người tiêu dùng. Tuy nhiên, vẫn có sai sót xảy ra, ví dụ như trường hợp giá sản phẩm không hiển thị chính xác trên trang website hoặc sai giá, tùy theo từng trường hợp chúng tôi sẽ liên hệ hướng dẫn hoặc thông báo hủy đơn hàng đó cho quý khách trong thời gian sớm nhất có thể. Nếu chúng tôi không thể liên hệ được quý khách, đơn hàng sẽ tự động huỷ trên hệ thống và lệnh hoàn tiền sẽ được thực hiện (nếu đơn hàng đã được thanh toán trước). Chúng tôi cũng có quyền từ chối hoặc hủy bỏ bất kỳ đơn hàng nào dù đơn hàng đó đã hay chưa được xác nhận hoặc đã được thanh toán.</li> 
                                <li className="py-1">Giá cả sản phẩm được niêm yết tại Raven là giá bán cuối cùng đã bao gồm thuế giá trị gia tăng (VAT). Giá cả của sản phẩm có thể thay đổi tùy thời điểm và chương trình khuyến mãi kèm theo.</li> 
                                <li className="py-1">Chương trình khuyến mãi áp dụng trong thời gian quy định, không cộng dồn với các ưu đãi khác.</li>
                            </ul> 
                        </li>
                        <li className="text-lg text-black font-bold py-5">
                            Vận chuyển:                         
                            <ul className="list-none list-inside ml-5 text-lg text-black font-medium py-1"> 
                                <li className="py-1">Raven hợp tác với các đơn vị vận chuyển uy tín để đảm bảo sản phẩm được giao đúng hạn và an toàn.</li> 
                                <li className="py-1">Phí vận chuyển được thông báo rõ ràng tại bước thanh toán.</li> 
                            </ul> 
                        </li>
                        <li className="text-lg text-black font-bold py-5">
                            Quyền từ chối giao dịch:
                            <ul className="list-none list-inside ml-5 text-lg text-black font-medium py-1"> 
                                <li className="py-1">Raven có quyền từ chối phục vụ các đơn hàng không tuân thủ chính sách.</li> 
                                <li className="py-1">Các hành vi lợi dụng chính sách mua hàng có thể dẫn đến hủy đơn hoặc khóa tài khoản.</li> 
                            </ul> 
                        </li>
                        
                    </ol>
                </div>
                   
            </div>
            <Footer/>
        </div>
    )
}

export default BuyInfo