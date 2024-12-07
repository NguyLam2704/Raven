import React from "react";

const mapStatus = new Map([
    [0, "Đã hủy"],
    [1, "Đang xử lý"],
    [2, "Đang giao"],
    [3, "Đã hoàn thành"]
])
//Thông tin đơn hàng trong  kiểm tra đơn hàng
const ItemOrder = ({order}) => {

    return(
        <div className="w-full h-11 font-Public">                
            <ul className="flex flex-row desktop:text-lg ipad:text-sm ">
                {/* Mã sản phẩm */}
                <li className="w-1/4 h-11 content-center border border-black border-r-0 border-t-0  text-center text-black font-medium">{order.orderId}</li>
                {/* Tên khách hàng */}
                <li className="w-1/3 h-11 content-center border border-black border-r-0 border-t-0 text-center text-black font-medium">{order.user.name}</li>
                {/* Tổng tiền của đơn hàng */}
                <li className="w-1/3 h-11 content-center border border-black border-r-0 border-t-0  text-center text-black font-medium">{order.bill.totalCost.toLocaleString()}đ</li>
                {/* Trạng thái đơn hàng */}
                <li className="w-1/3 h-11 content-center border border-black border-t-0  text-center text-black font-medium">{mapStatus.get(order.status)}</li>
            </ul>             
        </div>
    )
}

export default ItemOrder