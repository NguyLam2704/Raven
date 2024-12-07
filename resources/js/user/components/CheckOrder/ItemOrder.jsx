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
        <div className="w-full h-11">                
            <ul className="flex flex-row ">
                {/* Mã sản phẩm */}
                <li className="w-1/4 h-11 content-center border border-black border-r-0 border-t-0  text-center text-black text-lg font-medium">{order.orderId}</li>
                {/* Tên khách hàng */}
                <li className="w-1/3 h-11 content-center border border-black border-r-0 border-t-0 text-center text-black text-lg font-medium">{order.user.name}</li>
                {/* Ngày đặt hàng */}
                <li className="w-1/3 h-11 content-center border border-black border-r-0 border-t-0 text-center text-black text-lg font-medium">{order.dateCreated}</li>
                {/* Tổng tiền của đơn hàng */}
                <li className="w-1/3 h-11 content-center border border-black border-r-0 border-t-0  text-center text-black text-lg font-medium">{order.productOrder && order.productOrder.length > 0 
                    ? order.productOrder.reduce(
                        (totalCost, product_order) => totalCost + product_order.cost, 
                        50000
                    ).toLocaleString() 
                    : '50,000'
                }đ</li>
                {/* Trạng thái đơn hàng */}
                <li className="w-1/3 h-11 content-center border border-black border-t-0  text-center text-black text-lg font-medium">{mapStatus.get(order.status)}</li>
            </ul>             
        </div>
    )
}

export default ItemOrder