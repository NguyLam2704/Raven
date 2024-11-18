import React from "react";

//Thông tin đơn hàng trong  kiểm tra đơn hàng
const ItemOrder = ({order}) => {

    return(
        <div className="w-full h-11">                
            <ul className="flex flex-row ">
                {/* Mã sản phẩm */}
                <li className="w-1/4 h-11 content-center border border-black border-r-0 border-t-0  text-center text-black text-lg font-medium">{order.idOrder}</li>
                {/* Tên khách hàng */}
                <li className="w-1/3 h-11 content-center border border-black border-r-0 border-t-0 text-center text-black text-lg font-medium">{order.name}</li>
                {/* Tổng tiền của đơn hàng */}
                <li className="w-1/3 h-11 content-center border border-black border-r-0 border-t-0  text-center text-black text-lg font-medium">{order.totalCost.toLocaleString()}đ</li>
                {/* Trạng thái đơn hàng */}
                <li className="w-1/3 h-11 content-center border border-black border-t-0  text-center text-black text-lg font-medium">{order.state}</li>
            </ul>             
        </div>
    )
}

export default ItemOrder