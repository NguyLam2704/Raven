import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons'
import loading from '../../asset/loading.svg'
import BieuDoCot from './BieuDoCot';
import BieuDoTron from './BieuDoTron';


const ProductDetail = ({ProductID, chart , onClose}) => {
    const [prod, setProduct] = useState({});
    const [SizeColor, setSizeColor] = useState([]); //Biến trạng thái lưu size và color
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const modalFalse = () => setShowModal(false);

    useEffect(() => {
        const LoadData = async () => {
            const response = await axios.get(`/api/dashboard/product/details/${ProductID}`);
            setProduct(response.data.prod)
            setSizeColor(response.data.color_size); // Cập nhật state với dữ liệu trả về
            
            setIsLoading(false);
            setShowModal(true);
        };
        LoadData();
        
        

    }, []); 

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
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ${showModal ? 'opacity-100' : 'opacity-0'} z-10`}>
            <div className={`mobile:p-4 mobile:mx-2 desktop:mx-0 desktop:p-6 bg-white w-[70rem] max-h-[90vh] overflow-y-auto p-6 rounded shadow-lg transform transition-transform duration-300 ${showModal ? 'translate-y-0' : 'translate-y-full'}`}>
         
                <div className="border bg-white rounded-lg border-[#0E46A3]">     
                    <div className="items-center rounded-tl-lg rounded-tr-lg flex w-full desktop:h-12 justify-center bg-[#1E0342]">
                        <h2 className='mobile:text-[20px] ipad:text-[25px]  desktop:text-[32px] font-bold text-white'>Tổng quan về sản phẩm</h2>
                    </div>
                    <div className="desktop:flex">
                        {/* Cột trái */}
                        {/* (prod.cost).toLocaleString() */}
                        <div className="desktop:w-[60%]">
                            <div className="desktop:w-[600px] h-auto mobile:mx-2 desktop:ml-4 my-4 bg-white rounded-[10px] border border-[#0E46A3]" >
                                <div className='h-5 text-base font-bold text-black p-4'>Thông tin về sản phẩm</div>
                                <div className='flex flex-col mt-4 pl-4 items-start justify-center'>
                                    <div className="pb-1">Mã sản phẩm: {prod.prod_id}</div>
                                    <div className="pb-1">Tên sản phẩm:  {prod.prod_name}</div>
                                    <div className="pb-1">Giá: {prod.cost?.toLocaleString()}đ</div>
                                    <div className="pb-1">Số lượng đã bán: {prod.quantity_sold}</div>
                                </div>
                           </div>

                           <div className="desktop:w-[600px] desktop:h-[630px] mobile:mx-2 desktop:ml-4 my-4 bg-white rounded-[10px] border border-[#0E46A3]" >
                                <div className='h-5 text-base font-bold text-black p-4'>Thống kê số lượng mỗi sản phẩm</div>
                                <div className='flex flex-col mt-4 px-4 max-h-[570px] overflow-y-auto items-center justify-start'>
                                    <table className="w-full bg-white rounded-[14px]">
                                        <thead >
                                            <tr>
                                                <th className="py-4 px-2 border-b text-sm font-extrabold text-center">Size</th>
                                                <th className="py-4 px-2 border-b text-sm font-extrabold text-center">Màu sắc</th>
                                                <th className="py-4 px-2 border-b text-sm font-extrabold text-center">Số lượng còn lại</th>
                                                <th className="py-4 px-2 border-b text-sm font-extrabold text-center">Số lượng đã bán</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {SizeColor.map(product => (
                                                <tr key={product.pro_color_size_id}
                                                >
                                                    <td className="py-5 px-2 h-20 border-b text-sm font-semibold text-center">{getSize(product.size_id)}</td>
                                                    <td className="py-5 px-2 h-20 border-b text-sm font-semibold text-center">{product.color_name}</td>
                                                    <td className="py-5 px-2 h-20 border-b text-sm font-semibold text-center">{product.quantity_available}</td>
                                                    <td className="py-5 px-2 h-20 border-b text-sm font-semibold text-center">{product.quantity}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                           </div>

                        </div>

                        {/* Cột phải */}
                        <div className="desktop:w-[40%] mobile:px-2 desktop:pr-2 pt-4 flex-col">
                            <div  className="h-auto mb-1 bg-white rounded-[10px] border border-[#0E46A3]" >
                                <BieuDoCot data={chart.doanhthu}/>
                            </div>
                            <div  className='flex w-full justify-between mr-4'>
                                <div  className=" flex-1 w-1/2 h-auto bg-white rounded-[10px] mr-[1px] border border-[#0E46A3]">
                                    <BieuDoTron data={chart.color} title={"Màu sắc"}/>
                                </div>
                                <div  className="flex-1 w-1/2 h-auto bg-white rounded-[10px] ml-[1px] border border-[#0E46A3]">
                                    <BieuDoTron data={chart.size} title={"Size"}/>
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

export default ProductDetail;
