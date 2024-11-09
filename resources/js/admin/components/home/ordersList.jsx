import React from "react";


const OrderList = ({data}) => {

    const getStatusClass = (status) => {
        switch (status){
            case "Đã hoàn thành":
                return "bg-[#00B69B]/20 text-[#00B69B]";
            case "Đang xử lý":
                return "bg-[#6226EF]/20  text-[#6226EF]";
            case "Đã hủy":
                return "bg-[#EF3826]/20 text-[#EF3826]";    
            case "Đang giao hàng":
                return "bg-[#7C990A]/20  text-[#7C990A]";      
            default:
                return "bg-gray-200 text-gray-600"     
        }
    };
    
    
    return (
         <div className="container mx-auto px-4">
            <div className="overflow-y-auto w-full">
                <table className="w-full bg-white rounded-[14px] shadow-md">
                    <thead>
                        <tr>
                            <th className="py-4 px-2 border-b text-sm font-extrabold text-center">Mã đơn hàng</th>
                            <th className="py-4 px-2 border-b text-sm font-extrabold text-left">Tên khách hàng</th>
                            <th className="py-4 px-2 border-b text-sm font-extrabold text-left">Địa chỉ</th>
                            <th className="py-4 px-2 border-b text-sm font-extrabold text-left">Ngày</th>
                            <th className="py-4 px-2 border-b text-sm font-extrabold text-center">Hình thức thanh toán</th>
                            <th className="py-4 px-2 border-b text-sm font-extrabold text-center">Trạng thái</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map(order => (
                            <tr key={order.ord_id}>
                                <td className="py-5 px-2 border-b text-sm font-semibold text-center">{order.ord_id}</td>
                                <td className="py-5 px-2 border-b text-sm font-semibold text-left">{order.cus_name}</td>
                                <td className="py-5 px-2 border-b text-sm font-semibold text-left">{order.address}</td>
                                <td className="py-5 px-2 border-b text-sm font-semibold text-left">{order.ord_date}</td>
                                <td className="py-5 pl-12 border-b text-sm font-semibold text-left">{order.paymethod}</td>
                                <td className="py-5 px-2 border-b text-sm font-semibold text-center">
                                    <span className={`px-2 py-1 rounded inline-block w-[120px] text-center ${getStatusClass(order.status)}`}> 
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

         </div>   
    )
}

export default OrderList;