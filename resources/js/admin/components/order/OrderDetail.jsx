import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCardInOrderDetail from './ProductCard';
import loading from '../../asset/loading.svg'


const shipfee = 50000;

const OrderDetail = ({orderDetail, formatDate , onClose}) => {
    const [product, setProduct] = useState(orderDetail.products);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const modalFalse = () => setShowModal(false);

    useEffect(() => {
        const LoadData = async () => {
            
            // Set state with the fetched data
            setIsLoading(false)
            setShowModal(true);
        }
        LoadData();
    },[orderDetail]); 

    const handleStatus = async(e) => {
        console.log(e.target.value);
        const url = 'api/dashboard/chitietdonhang/' + orderDetail.order.order_id;
        
        await axios.patch(url,
            {
                // Đây là body của yêu cầu
                status: e.target.value
            }, 
            {
                // Đây là header của yêu cầu
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
                }
            }
        );
    }
 
    if (isLoading) {
        return (
            <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ${showModal ? 'opacity-100' : 'opacity-0'}`}>
                <div className={`mobile:p-4 mobile:mx-2 desktop:mx-0 desktop:p-6 bg-white w-[70rem] max-h-[90vh] overflow-y-auto p-6 rounded shadow-lg transform transition-transform duration-100 ${showModal ? 'translate-y-0' : 'translate-y-full'}`}>
                    <img src={loading} alt="Loading..." className="w-12 h-12"/>
                </div>
            </div>
        )
    }

     
    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ${showModal ? 'opacity-100' : 'opacity-0'} z-10`}>
            <div className={`mobile:p-4 mobile:mx-2 desktop:mx-0 desktop:p-6 bg-white w-[70rem] max-h-[90vh] overflow-y-auto p-6 rounded shadow-lg transform transition-transform duration-300 ${showModal ? 'translate-y-0' : 'translate-y-full'}`}>
    
                <div className="border bg-white rounded-lg border-[#0E46A3]">     
                    <div className="items-center rounded-tl-lg rounded-tr-lg flex w-full desktop:h-12 justify-center bg-[#1E0342]">
                        <h2 className='mobile:text-[20px] ipad:text-[25px]  desktop:text-[32px] font-bold text-white'>Thông tin đơn hàng</h2>
                    </div>

                    <div className="desktop:flex">
                        {/* Cột trái */}
                        <div className="desktop:w-[60%] mobile:hidden desktop:block">
                            <div className="desktop:w-[600px] h-auto mobile:mx-2 desktop:ml-4 my-4 bg-white rounded-[10px] border border-[#0E46A3]" >
                                <div className='h-5 text-base font-bold text-black p-4'>Tất cả</div>
                                <div className='flex flex-col mt-4 items-center justify-center'>
                                    <ProductCardInOrderDetail 
                                        products={product}
                                        pro_color_size={orderDetail.pro_color_size}
                                    />                               
                                </div>
                           </div>

                           <div className="desktop:w-[600px] h-auto mobile:mx-2 desktop:ml-4 my-4 bg-white rounded-[10px] border border-[#0E46A3]" >
                                <div className='h-[1px] mt-4 mx-6 text-base font-bold bg-black'></div>
                                <div className='flex mx-6 mt-4'>
                                    <div className='w-1/2 text-start text-lg'>Tạm tính:</div>
                                    <div className='w-1/2 text-end text-lg text-black font-semibold'>{orderDetail.total_cost?.toLocaleString()}đ</div>
                                </div>

                                <div className='flex mx-6 mt-2'>
                                    <div className='w-1/2 text-start text-lg'>Phí vận chuyển:</div>
                                    <div className='w-1/2 text-end text-base text-black font-semibold'>{shipfee.toLocaleString()}đ</div>
                                </div>

                                <div className='h-[0.5px] mt-4 mx-6 text-base font-bold bg-black'></div>

                                <div className='flex mx-6 my-4'>
                                    <div className='w-1/2 text-start text-lg font-bold'>Tổng cộng:</div>
                                    <div className='w-1/2 text-end text-lg text-[#ef3826] font-bold'>{(orderDetail.total_cost + shipfee).toLocaleString()}đ</div>
                                </div>

                           </div>

                        </div>

                        {/* Cột phải */}
                        <div className="desktop:w-[40%]">
                            <div className=" h-auto mobile:mx-2 desktop:mr-4 my-4 py-2 bg-white rounded-[10px] border border-[#0E46A3]" >
                                <div className='h-5 text-base font-bold text-black pl-4'>Tóm tắt</div>
                                <div className='flex flex-col mt-4 pl-4 items-start justify-center'>
                                    <div className="pb-1">Mã đơn hàng: {orderDetail.order.order_id}</div>
                                    <div className="pb-1">Ngày đặt hàng: {formatDate(orderDetail.order.datecreated)}</div>
                                    <div className="pb-1">Họ tên: {orderDetail.user.name}</div>
                                    <div className="pb-1">Số điện thoại: {orderDetail.user.phonenumber}</div>
                                    <div>Email: {orderDetail.user.email}</div>
                                </div>
                           </div>

                           <div className="h-auto mobile:mx-2 desktop:mr-4 my-4 py-2 bg-white rounded-[10px] border border-[#0E46A3]" >
                                <div className='h-5 text-base font-bold text-black pl-4'>Địa chỉ</div>
                                <div className='flex flex-col mt-2 pl-4 items-start justify-center'>
                                    <div className="pb-1">{orderDetail.order.detail_address}, {orderDetail.order.address}</div>
                                </div>
                           </div>

                           <div className="h-auto mobile:mx-2 desktop:mr-4 my-4 py-2 bg-white rounded-[10px] border border-[#0E46A3]" >
                                <div className='h-5 text-base font-bold text-black pl-4'>Phương thức thanh toán</div>
                                <div className='flex flex-col mt-2 pl-4 items-start justify-center'>
                                    <div className="pb-1">
                                        {orderDetail.order.payingmethod ? "Chuyển khoản ngân hàng" : "Thanh toán khi nhận hàng (COD)"}
                                    </div>
                                </div>
                           </div>

                           
                           <div className="flex h-auto mobile:mx-2 desktop:mr-4 my-4 py-2 bg-white rounded-[10px] border border-[#0E46A3]" >
                                <div className='h-8 text-base font-bold text-black pl-4'>Trạng thái đơn hàng</div>
                                <div className='h-8 flex rounded-lg ml-5 items-start justify-center'>
                                    <select
                                        onChange={handleStatus}
                                        defaultValue={orderDetail.order.status}
                                        className="p-2 border rounded-md text-sm"
                                    >
                                        <option value={1}>Đang xử lý</option>
                                        <option value={2}>Đang giao hàng</option>
                                        <option value={3}>Đã giao</option>
                                        <option value={0}>Đã hủy</option>
                                    </select>
                                </div>
                           </div>

                        </div>

                        {/* Chỉ hiện khi là mobile hoặc ipad  */}
                        <div className="mobile:block desktop:hidden">
                            <div className="h-auto mobile:mx-2 desktop:ml-4 my-4 bg-white rounded-[10px] border border-[#0E46A3]" >
                                <div className='h-5 text-base font-bold text-black p-4'>Tất cả</div>
                                <div className='flex flex-col mt-4 items-center justify-center'>
                                    <ProductCardInOrderDetail 
                                        products={product}
                                        pro_color_size={orderDetail.pro_color_size}
                                    />                               
                                </div>
                           </div>

                           <div className="desktop:w-[600px] h-auto mobile:mx-2 desktop:ml-4 my-4 bg-white rounded-[10px] border border-[#0E46A3]" >
                                <div className='h-[1px] mt-4 mx-6 text-base font-bold bg-black'></div>
                                <div className='flex mx-6 mt-4'>
                                    <div className='w-1/2 text-start text-lg'>Tạm tính:</div>
                                    <div className='w-1/2 text-end text-lg text-black font-semibold'>{orderDetail.total_cost?.toLocaleString()}đ</div>
                                </div>

                                <div className='flex mx-6 mt-2'>
                                    <div className='w-1/2 text-start text-lg'>Phí vận chuyển:</div>
                                    <div className='w-1/2 text-end text-base text-black font-semibold'>{shipfee.toLocaleString()}đ</div>
                                </div>

                                <div className='h-[0.5px] mt-4 mx-6 text-base font-bold bg-black'></div>

                                <div className='flex mx-6 my-4'>
                                    <div className='w-1/2 text-start text-lg font-bold'>Tổng cộng:</div>
                                    <div className='w-1/2 text-end text-lg text-[#ef3826] font-bold'>{(orderDetail.total_cost + shipfee).toLocaleString()}đ</div>
                                </div>

                           </div>

                        </div>


                    </div>

                    <div className="items-center flex w-full justify-center my-4">
                        <button 
                            className="bg-[#1E0342] text-white px-12 py-1 font-extrabold rounded border
                                       border-[#0E46A3] hover:bg-[#0E46A3] active:bg-[#cf9ca6] transition-all duration-200
                                       outline-none ring-indigo-500/70 ring-offset-2 focus-visible:ring-2 hover:scale-[1.03] active:scale-[0.98]"
                            onClick={() => {
                                modalFalse();
                                setTimeout(() => {
                                    onClose(); 
                                }, 400);                           
                            }}
                        >
                            Hoàn tất
                        </button>  
                    </div>
          
                </div>
                </div>
        </div>
    );
};

export default OrderDetail;