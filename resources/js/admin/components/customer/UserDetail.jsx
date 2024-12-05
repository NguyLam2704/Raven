import React, { useEffect, useState } from 'react';
import axios from 'axios';
import loading from '../../asset/loading.svg'
import ChartUser from './Chart';
import OrderCart from './OrderCard';



const UserDetail = ({UserDetail, onClose}) => {

    const [isLoading, setIsLoading] = useState(true);


    const getSize = (size) => {
        switch (size) {
          case 1:
            return "S";
          case 2:
            return "M";
          case 3:
            return "L";
          case 4:
            return "XL";
          default:
            return "Không xác định";
        }
    }


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white w-[70rem] max-h-[90vh] overflow-y-auto mobile:p-4 mobile:mx-2 desktop:mx-0 desktop:p-6 rounded shadow-lg">
                <div className="border bg-white rounded-lg border-[#050c9c]">     
                    <div className="items-center rounded-tl-lg rounded-tr-lg flex w-full desktop:h-12 justify-center bg-[#C73659]">
                        <h2 className='mobile:text-[20px] ipad:text-[25px]  desktop:text-[32px] font-bold text-white'>Tổng quan về khách hàng</h2>
                    </div>
                    <div className="desktop:flex">
                        {/* Cột trái */}
                        <div className="desktop:w-[40%]">
                            <div className="w-[95%] h-auto mobile:mx-2 desktop:ml-4 my-4 bg-white rounded-[10px] border border-[#3572ef]" >
                                <div className='h-5 text-base font-bold text-black p-4'>Thông tin khách hàng</div>
                                <div className='flex flex-col mt-4 px-4 items-start justify-center'>
                                    <div className="pb-1">Số điện thoại: {UserDetail.user[0].phonenumber}</div>
                                    <div className="pb-1">Email: {UserDetail.user[0].email}</div>
                                    {/* <div className="pb-1">Địa chỉ: {UserDetail.user[0].address}</div> */}
                                    <div className="pb-1">Tổng số đơn hàng: {UserDetail.user[0].count}</div>
                                </div>
                           </div>

                           <div className="w-[95%] h-auto  ml-4 my-4 bg-white rounded-[10px] border border-[#3572ef]" >
                                <ChartUser user_id={UserDetail.user[0].user_id}/>

                           </div>

                        </div>

                        {/* Cột phải */}
                        <div className="desktop:w-[60%]">

                            <div className="w-[95%] h-auto max-h-[680px] mobile:mx-2 desktop:ml-4 my-4 bg-white rounded-[10px] border border-[#3572ef]" >
                                <div className='h-5 text-base font-bold text-black p-4'>Lịch sử đơn hàng</div>
                                <div className='mt-6 mb-2 h-[620px] overflow-y-auto'>
                                    {/* Map ở đây  */}
                                    {UserDetail.order.map(order => (
                                        <OrderCart key={order.order_id} order={order} products={UserDetail.products} />
                                    ))}
                                </div>
                             
                            </div>

            

                        </div>
                    </div>

                    <div className="items-center flex w-full justify-center my-4">
                        <button 
                            className="bg-[#C73659] text-white px-12 py-1 font-extrabold rounded border border-[#C73659] hover:bg-[#A91D3A] active:bg-[#cf9ca6] transition-all duration-200"
                            onClick={onClose}
                        >
                            Hoàn tất
                        </button>  
                    </div>
          
                </div>
                </div>
        </div>
    );
};

export default UserDetail;
