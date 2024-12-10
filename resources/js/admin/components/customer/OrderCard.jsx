import React from 'react';

const OrderCart = ({ order, products }) => {
    const orderProducts = products.find(p => p[0]?.order_id === order.order_id) || [];
    const totalAmount = orderProducts.reduce((sum, product) => {
        const discountPrice = product.after_discount_cost;
        return sum + discountPrice * product.quantity;
    }, 0);

    return (
        <div className="w-[98%]">
            <div className="w-[100%] h-auto ipad:flex mobile:ml-1 ipad:mx-2 my-2 py-2 px-2 rounded-[5px] border-2 border-[#0E46A3]/50">
                <div className="h-full ipad:w-[35%] text-sm font-medium px-[4px]">
                    <div className="text-left">Mã đơn hàng: {order.order_id}</div>
                    <div className="text-left">Ngày đặt hàng: {new Date(order.datecreated).toLocaleDateString()}</div>
                    <div className="text-left">Số lượng: {orderProducts.reduce((sum, product) => sum + product.quantity, 0)}</div>
                </div>

                <div className="h-full ipad:w-[50%] text-sm font-medium px-[4px]">
                    <div className="text-left">Hình thức thanh toán: {order.payingmethod ? 'Chuyển khoản' : 'COD'}</div>
                    <div className="text-left">Trạng thái: {getStatus(order.status)}</div>
                    <div className="text-left">Địa chỉ: {order.detail_address}, {order.address} </div>
                </div>

                <div className="mobile:hidden ipad:block h-full ipad:w-[20%] text-base font-bold my-auto mx-auto">
                    <div className="flex justify-center items-center">Tổng tiền</div>
                    <div className="flex justify-center items-center text-red-600">{totalAmount.toLocaleString()}đ</div>
                </div>


                <div className="mobile:block ipad:hidden h-full text-base font-bold my-auto mx-auto">
                        <div className="flex justify-center items-center">Tổng tiền</div>
                        <div className="flex justify-center items-center text-red-600">{totalAmount.toLocaleString()}đ</div>
                </div>
            </div>


        </div>
    );
};

const getStatus = (status) => {
    switch (status) {
        case 0:
            return 'Chờ xác nhận';
        case 1:
            return 'Đang giao hàng';
        case 2:
            return 'Hoàn thành';
        case 3:
            return 'Đã hủy';
        default:
            return 'Không xác định';
    }
};

export default OrderCart;
