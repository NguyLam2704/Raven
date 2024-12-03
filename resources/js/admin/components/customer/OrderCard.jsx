import React from 'react';

const OrderCart = ({ order, products }) => {
    const orderProducts = products.find(p => p[0]?.order_id === order.order_id) || [];
    const totalAmount = orderProducts.reduce((sum, product) => {
        const discountPrice = product.cost * (1 - product.discount / 100);
        return sum + discountPrice * product.quantity;
    }, 0);

    return (
        <div className="w-[99%]">
            <div className="w-[100%] h-auto flex my-2 mx-1 py-2 rounded-[5px] border-2 border-[#a7e6ff]/50">
                <div className="h-full w-[35%] text-sm font-medium px-[4px]">
                    <div className="text-left">Mã đơn hàng: {order.order_id}</div>
                    <div className="text-left">Ngày đặt hàng: {new Date(order.datecreated).toLocaleDateString()}</div>
                    <div className="text-left">Số lượng: {orderProducts.reduce((sum, product) => sum + product.quantity, 0)}</div>
                </div>

                <div className="h-full w-[50%] text-sm font-medium px-[4px]">
                    <div className="text-left">Hình thức thanh toán: {order.payingmethod ? 'Chuyển khoản' : 'COD'}</div>
                    <div className="text-left">Trạng thái: {getStatus(order.status)}</div>
                    <div className="text-left">Địa chỉ: {order.detail_address}, {order.address} </div>
                </div>

                <div className="h-full w-[20%] text-base font-bold my-auto mx-auto">
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
