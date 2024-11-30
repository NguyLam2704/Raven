import React, { useEffect, useState } from "react";
import axios from "axios";



const OrderCart = () => {


    return (
        <div className="w-[99%]">
                <div className="w-[100%] h-auto flex gap-2 my-2 mx-1 py-2 rounded-[5px] border-2 border-[#a7e6ff]/50">
                    <div className="h-full  text-sm font-medium px-2">
                        <div className="text-left">
                            Mã đơn hàng: 1
                        </div>
                        <div className="text-left">
                            Ngày đặt hàng: 24/12/2023
                        </div>
                        <div className="text-left">
                            Số lượng: 3
                        </div>
                    </div>

                    <div className="h-full  text-sm font-medium px-4">
                        <div className="text-left">
                            Hình thức thanh toán: 
                        </div>
                        <div className="text-left">
                            Trạng thái: Đang giao hàng
                        </div>
                        <div className="text-left">
                            Ngày giao hàng: 26/12/2023
                        </div>
                    </div>

                    <div className="h-full text-base font-bold my-auto mx-auto">
                        <div className="flex justify-center items-center">
                            Tổng số tiền
                        </div>
                        <div className="flex justify-center items-center text-red-600">
                            950.000đ
                        </div>

                    </div>

                </div>

        </div>
    )
}

export default OrderCart;