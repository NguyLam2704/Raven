import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import ProductCardInOrderDetail from './ProductCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons'
import loading from '../../asset/loading.svg'


const shipfee = 50000;

// const fetchProduct = async (id) => {
//     const response = await axios.get(`/api/v1/product?proId[eq]=${id}&includeImage=true`);
//     return response.data;
//   }

const fetchProduct = async (id) => {
    const response = await axios.get(`/api/v1/product/${id}`);
    console.log("product "+response.data)
    return response.data;
  }

const fetchSize = async (id) => {
    const response = await axios.get(`/api/v1/size/${id}`);
    console.log("size "+response.data)
    return response.data;
}

const fetchColor = async (id) => {
    const response = await axios.get(`/api/v1/color/${id}`);
    console.log("color "+response.data)
    return response.data;
}
const OrderDetail = ({orderDetail, formatDate, getOrderStatus , costBill, onClose}) => {
    const [product, setProduct] = useState(orderDetail.products);
    const [size, setSize] = useState();
    const [color, setColor] = useState();
    const [quantity, setQuantity] = useState();
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
        const LoadData = async () => {
            const sizePromises = orderDetail.pro_color_size.map((item) =>
                fetchSize(item.size_id)
            );
            const colorPromises = orderDetail.pro_color_size.map((item) =>
                fetchColor(item.color_id)
            );
    
            const sizeResults = await Promise.all(sizePromises);
            const colorResults = await Promise.all(colorPromises);
            
            console.log("Product in detail: " + product)
            console.log(sizeResults);
            console.log(colorResults);
            // Set state with the fetched data
            setSize(sizeResults);
            setColor(colorResults);
            setQuantity(orderDetail.pro_color_size.map((item) => item.quantity));
            setIsLoading(false)
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
            <div className="fixed inset-0 bg-black  bg-opacity-50 flex justify-center items-center">
                <img src={loading} alt="Loading..." className="w-12 h-12"/>
            </div>
        )
    }



    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white w-[70rem] max-h-[90vh] overflow-y-auto mobile:p-4 mobile:mx-2 desktop:mx-0 desktop:p-6 rounded shadow-lg">
                <div className="border bg-white rounded-lg border-[#050c9c]">     
                    <div className="items-center rounded-tl-lg rounded-tr-lg flex w-full desktop:h-12 justify-center bg-[#C73659]">
                        <h2 className='mobile:text-[20px] ipad:text-[25px]  desktop:text-[32px] font-bold text-white'>Thông tin đơn hàng</h2>
                    </div>

                    <div className="desktop:flex">
                        {/* Cột trái */}
                        <div className="desktop:w-[60%] mobile:hidden desktop:block">
                            <div className="desktop:w-[600px] h-auto mobile:mx-2 desktop:ml-4 my-4 bg-white rounded-[10px] border border-[#3572ef]" >
                                <div className='h-5 text-base font-bold text-black p-4'>Tất cả</div>
                                <div className='flex flex-col mt-4 items-center justify-center'>
                                    <ProductCardInOrderDetail 
                                        products={product}
                                        sizes={size}
                                        colors={color}
                                        quantity={quantity}
                                    />                               
                                </div>
                           </div>

                           <div className="desktop:w-[600px] h-auto mobile:mx-2 desktop:ml-4 my-4 bg-white rounded-[10px] border border-[#3572ef]" >
                                <div className='h-[1px] mt-4 mx-6 text-base font-bold bg-black'></div>
                                <div className='flex mx-6 mt-4'>
                                    <div className='w-1/2 text-start text-lg'>Tạm tính:</div>
                                    <div className='w-1/2 text-end text-lg text-black font-semibold'>{costBill.toLocaleString()}đ</div>
                                </div>

                                <div className='flex mx-6 mt-2'>
                                    <div className='w-1/2 text-start text-lg'>Phí vận chuyển:</div>
                                    <div className='w-1/2 text-end text-base text-black font-semibold'>{shipfee.toLocaleString()}đ</div>
                                </div>

                                <div className='h-[0.5px] mt-4 mx-6 text-base font-bold bg-black'></div>

                                <div className='flex mx-6 my-4'>
                                    <div className='w-1/2 text-start text-lg font-bold'>Tổng cộng:</div>
                                    <div className='w-1/2 text-end text-lg text-[#ef3826] font-bold'>{(costBill + shipfee).toLocaleString()}đ</div>
                                </div>

                           </div>

                        </div>

                        {/* Cột phải */}
                        <div className="desktop:w-[40%]">
                            <div className=" h-auto mobile:mx-2 desktop:mr-4 my-4 py-2 bg-white rounded-[10px] border border-[#3572ef]" >
                                <div className='h-5 text-base font-bold text-black pl-4'>Tóm tắt</div>
                                <div className='flex flex-col mt-4 pl-4 items-start justify-center'>
                                    <div className="pb-1">Mã đơn hàng: {orderDetail.order.order_id}</div>
                                    <div className="pb-1">Ngày đặt hàng: {formatDate(orderDetail.order.datecreated)}</div>
                                    <div className="pb-1">Họ tên: {orderDetail.user.name}</div>
                                    <div className="pb-1">Số điện thoại: {orderDetail.user.phonenumber}</div>
                                    <div>Email: {orderDetail.user.email}</div>
                                </div>
                           </div>

                           <div className="h-auto mobile:mx-2 desktop:mr-4 my-4 py-2 bg-white rounded-[10px] border border-[#3572ef]" >
                                <div className='h-5 text-base font-bold text-black pl-4'>Địa chỉ</div>
                                <div className='flex flex-col mt-2 pl-4 items-start justify-center'>
                                    <div className="pb-1">{orderDetail.order.detail_address}, {orderDetail.order.address}</div>
                                </div>
                           </div>

                           <div className="h-auto mobile:mx-2 desktop:mr-4 my-4 py-2 bg-white rounded-[10px] border border-[#3572ef]" >
                                <div className='h-5 text-base font-bold text-black pl-4'>Phương thức thanh toán</div>
                                <div className='flex flex-col mt-2 pl-4 items-start justify-center'>
                                    <div className="pb-1">
                                        {orderDetail.order.payingmethod ? "Chuyển khoản ngân hàng" : "Thanh toán khi nhận hàng (COD)"}
                                    </div>
                                </div>
                           </div>

                           
                           <div className="flex h-auto mobile:mx-2 desktop:mr-4 my-4 py-2 bg-white rounded-[10px] border border-[#3572ef]" >
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
                            <div className="h-auto mobile:mx-2 desktop:ml-4 my-4 bg-white rounded-[10px] border border-[#3572ef]" >
                                <div className='h-5 text-base font-bold text-black p-4'>Tất cả</div>
                                <div className='flex flex-col mt-4 items-center justify-center'>
                                    <ProductCardInOrderDetail 
                                        products={product}
                                        sizes={size}
                                        colors={color}
                                        quantity={quantity}
                                    />                               
                                </div>
                           </div>

                           <div className="desktop:w-[600px] h-auto mobile:mx-2 desktop:ml-4 my-4 bg-white rounded-[10px] border border-[#3572ef]" >
                                <div className='h-[1px] mt-4 mx-6 text-base font-bold bg-black'></div>
                                <div className='flex mx-6 mt-4'>
                                    <div className='w-1/2 text-start text-lg'>Tạm tính:</div>
                                    <div className='w-1/2 text-end text-lg text-black font-semibold'>{costBill.toLocaleString()}đ</div>
                                </div>

                                <div className='flex mx-6 mt-2'>
                                    <div className='w-1/2 text-start text-lg'>Phí vận chuyển:</div>
                                    <div className='w-1/2 text-end text-base text-black font-semibold'>{shipfee.toLocaleString()}đ</div>
                                </div>

                                <div className='h-[0.5px] mt-4 mx-6 text-base font-bold bg-black'></div>

                                <div className='flex mx-6 my-4'>
                                    <div className='w-1/2 text-start text-lg font-bold'>Tổng cộng:</div>
                                    <div className='w-1/2 text-end text-lg text-[#ef3826] font-bold'>{(costBill + shipfee).toLocaleString()}đ</div>
                                </div>

                           </div>

                        </div>


                    </div>

                    <div className="items-center flex w-full justify-center my-4">
                        <button 
                            className="bg-[#C73659] text-white px-12 py-1 font-extrabold rounded border  border-[#C73659] hover:bg-[#A91D3A] active:bg-[#cf9ca6] transition-all duration-200"
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

export default OrderDetail;