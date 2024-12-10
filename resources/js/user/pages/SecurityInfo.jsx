import React, { useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

//Chính sách bảo mặt thông tin
const SecurityInfo = () => {
    return(
        <div className="w-full font-Public">
            <Navigation/>
            <div className="w-full justify-items-center mt-[90px] ">
                <div className='desktop:w-8/12 ipad:w-9/12 mobile:w-11/12 justify-items-center pt-5'>
                    <div className='w-full  text-center desktop:text-lg  ipad:text-base font-bold py-5 '>CHÍNH SÁCH</div>
                    <div className='w-full text-center desktop:text-4xl ipad:text-3xl font-bold py-6 '>BẢO MẬT THÔNG TIN</div>
                    <div className='w-full border-b-2 border-black text-center desktop:text-2xl ipad:text-xl font-bold py-5 '>RAVEN</div>                    
                    <ol class=" w-full list-decimal list-inside">
                        <li className="  text-black font-bold py-3 mt-10">
                            Mục đích và phạm vi thu thập
                            <div  className="  text-black font-normal ml-5 py-2">Raven thu thập thông tin cá nhân bao gồm họ tên, email, số điện thoại, địa chỉ liên lạc và các thông tin khác khi khách hàng đăng ký tài khoản, đặt hàng hoặc liên hệ trên website. Mục đích thu thập nhằm:</div>
                            <ul className="list-disc list-inside ml-8   text-black font-medium py-1"> 
                                <li className="py-1">Xác nhận và xử lý đơn hàng, hỗ trợ giao dịch.</li> 
                                <li className="py-1">Cung cấp thông tin sản phẩm, chương trình khuyến mãi đến khách hàng.</li> 
                                <li className="py-1">Cải thiện dịch vụ, nâng cao trải nghiệm người dùng.</li> 
                                <li className="py-1">Đáp ứng yêu cầu từ cơ quan pháp luật khi cần thiết.</li> 
                            </ul> 
                        </li>
                        <li className="  text-black font-bold py-3">
                            Phạm vi sử dụng thông tin:
                            <div  className="  text-black font-normal ml-5 py-2">Thông tin khách hàng chỉ được sử dụng trong nội bộ Raven để:</div>
                            <ul className="list-disc list-inside ml-8   text-black font-medium"> 
                                <li className="py-1">Thực hiện giao dịch mua bán và cung cấp dịch vụ theo yêu cầu.</li> 
                                <li className="py-1">Gửi thông tin khuyến mãi, quảng cáo qua email hoặc tin nhắn.</li> 
                                <li className="py-1">Cải thiện dịch vụ, nâng cao trải nghiệm người dùng.</li> 
                                <li className="py-1">Hỗ trợ chăm sóc khách hàng. Raven cam kết không cung cấp thông tin khách hàng cho bên thứ ba, trừ trường hợp được khách hàng đồng ý hoặc theo yêu cầu pháp luật.</li> 
                            </ul> 
                        </li>
                        <li className="  text-black font-bold py-5">
                            Thời gian lưu trữ thông tin:
                            <div  className="  text-black font-normal ml-5 py-2">Thông tin cá nhân sẽ được lưu trữ trong hệ thống đến khi khách hàng yêu cầu hủy hoặc không còn cần thiết cho mục đích sử dụng.</div>
                        </li>
                        <li className="  text-black font-bold py-5">
                            Đối tượng tiếp cận thông tin:                            
                            <ul className="list-disc list-inside ml-8   text-black font-medium"> 
                                <li className="py-1">Yêu cầu kiểm tra, chỉnh sửa hoặc hủy thông tin cá nhân.</li> 
                                <li className="py-1">Từ chối nhận các thông báo tiếp thị qua email hoặc tin nhắn.</li> 
                            </ul>
                        </li>
                        <li className="  text-black font-bold py-5">
                            Quyền của khách hàng đối với thông tin cá nhân:
                            <div  className="  text-black font-normal ml-5 py-2">Khách hàng có quyền:</div>
                            <ul className="list-disc list-inside ml-8   text-black font-medium"> 
                                <li className="py-1">Yêu cầu kiểm tra, chỉnh sửa hoặc hủy thông tin cá nhân.</li> 
                                <li className="py-1">Từ chối nhận các thông báo tiếp thị qua email hoặc tin nh</li> 
                            </ul>
                        </li>
                        <li className="  text-black font-bold py-5">
                            Địa chỉ liên hệ:
                            <ul className="list-disc list-inside ml-8   text-black font-medium"> 
                                <li className="py-1">Raven Store</li> 
                                <li className="py-1">Địa chỉ: Thủ Đức, Hồ Chí Minh</li>  
                                <li className="py-1">Email: 22520736@gm.uit.edu.vn</li>  
                                <li className="py-1">Điện thoại: 0384666498</li> 
                            </ul>
                        </li>
                        <li className="  text-black font-bold py-5">
                            Khiếu nại về bảo mật thông tin:
                            <div  className="  text-black font-normal ml-5 py-2">Trong trường hợp có khiếu nại, khách hàng vui lòng liên hệ qua các kênh liên lạc trên. Raven cam kết xử lý kịp thời và bảo vệ quyền lợi khách hàng.</div>
                        </li>
                    </ol>
                </div>
                   
            </div>
            <Footer/>
        </div>
    )
}

export default SecurityInfo