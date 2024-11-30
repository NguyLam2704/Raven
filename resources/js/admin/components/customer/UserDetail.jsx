import React, { useEffect, useState } from 'react';
import axios from 'axios';
import loading from '../../asset/loading.svg'
import ChartUser from './Chart';
import OrderCart from './OrderCard';


// const fetchSizeColorById = async (id) => {
//     const response = await axios.get(`/api/dashboard/getSizeColorById/${id}`);
//     return response.data; // Trả về dữ liệu từ API
// };

// const fetchColor = async (idColor) => {
//     const response = await axios.get(`/api/v1/color/${idColor}`);
//     return response.data.data.colorName; // Lấy `colorName` từ dữ liệu trả về
// };


const UserDetail = ({UserDetail, onClose}) => {

    const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     const LoadData = async () => {
    //         const product = await fetchSizeColorById(ProductDetail.proId); // Gọi API

    //         const updatedData = await Promise.all(
    //             product.map(async (item) => {
    //                 const colorName = await fetchColor(item.color_id); // Gọi API lấy tên màu
    //                 return {
    //                     ...item,
    //                     colorName, // Gắn thêm `colorName` vào item
    //                 };
    //             })
    //         );
    //         setSizeColor(updatedData); // Cập nhật state với dữ liệu trả về
    //         console.log(updatedData); // Kiểm tra dữ liệu trong console
    //         setIsLoading(false);
    //     };
    //     LoadData();

    // }, [ProductDetail?.proId]); 

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


  

    // {isLoading && (
    //     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    //         <img src={loading} alt="Loading..." className="w-12 h-12" />
    //     </div>
    // )}

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white w-[70rem] max-h-[90vh] overflow-y-auto p-6 rounded shadow-lg">
                <div className="border bg-white rounded-lg border-[#050c9c]">     
                    <div className="items-center rounded-tl-lg rounded-tr-lg flex w-full h-12 justify-center bg-[#3572ef]">
                        <h2 className='text-3xl font-bold text-white'>Tổng quan về sản phẩm</h2>
                    </div>
                    <div className="flex">
                        {/* Cột trái */}
                        <div className="w-[40%]">
                            <div className="w-[95%] h-auto ml-4 my-4 bg-white rounded-[10px] border border-[#3572ef]" >
                                <div className='h-5 text-base font-bold text-black p-4'>Thông tin khách hàng</div>
                                <div className='flex flex-col mt-4 px-4 items-start justify-center'>
                                    <div className="pb-1">Họ và tên: {UserDetail[0].name}</div>
                                    <div className="pb-1">Số điện thoại: {UserDetail[0].phonenumber}</div>
                                    <div className="pb-1">Email: {UserDetail[0].email}</div>
                                    <div className="pb-1">Địa chỉ: 35/18 đường 904, phường Hiệp Phú, Thành phố Thủ Đức, TP.Hồ Chí Minh</div>
                                    <div className="pb-1">Tổng số đơn hàng: 2</div>
                                </div>
                           </div>

                           <div className="w-[95%] h-auto  ml-4 my-4 bg-white rounded-[10px] border border-[#3572ef]" >
                                <ChartUser/>

                           </div>

                        </div>

                        {/* Cột phải */}
                        <div className="w-[60%]">

                            <div className="w-[95%] h-auto max-h-[680px] ml-4 my-4 bg-white rounded-[10px] border border-[#3572ef]" >
                                <div className='h-5 text-base font-bold text-black p-4'>Lịch sử đơn hàng</div>
                                <div className='mt-6 mb-2 h-[620px] overflow-y-auto'>
                                    <OrderCart/>
                                    <OrderCart/>
                                    <OrderCart/>
                                    <OrderCart/>
                                    <OrderCart/>
                                    <OrderCart/>
                                    <OrderCart/>
                                    <OrderCart/>
                                    <OrderCart/>  
                                </div>
                             
                            </div>

            

                        </div>
                    </div>

                    <div className="items-center flex w-full justify-center mt-4">
                        <button 
                            className="bg-blue-500 text-white px-12 py-1 font-extrabold rounded border border-[#050c9c]"
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
