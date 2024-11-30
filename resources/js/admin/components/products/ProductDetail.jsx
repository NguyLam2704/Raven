import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons'
import loading from '../../asset/loading.svg'
import BieuDoCot from './BieuDoCot';
import BieuDoTron from './BieuDoTron';

const fetchSizeColorById = async (id) => {
    const response = await axios.get(`/api/dashboard/getSizeColorById/${id}`);
    return response.data; // Trả về dữ liệu từ API
};

const fetchColor = async (idColor) => {
    const response = await axios.get(`/api/v1/color/${idColor}`);
    return response.data.data.colorName; // Lấy `colorName` từ dữ liệu trả về
};

const dataTronColor = {
    "week": {
        "Đen": [0, '#000000'],
        "Trắng": [0, '#FFFFFF'],
    },
    "month": {
        "Đen": [200, '#000000'],
        "Trắng": [498, '#FFFFFF'],
    },
    "year": {
        "Đen": [1000, '#000000'],
        "Trắng": [698, '#FFFFFF'],
    },
};

const dataTronSize = {
    "week": {
        "S": 100,
        "M": 298,
        "L": 50,
    },
    "month": {
        "S": 200,
        "M": 198,
        "L": 510,
    },
    "year": {
        "S": 400,
        "M": 598,
        "L": 600,
    },
};


const ProductDetail = ({ProductDetail, onClose}) => {

    const [SizeColor, setSizeColor] = useState([]); //Biến trạng thái lưu size và color
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const LoadData = async () => {
            const product = await fetchSizeColorById(ProductDetail.proId); // Gọi API

            const updatedData = await Promise.all(
                product.map(async (item) => {
                    const colorName = await fetchColor(item.color_id); // Gọi API lấy tên màu
                    return {
                        ...item,
                        colorName, // Gắn thêm `colorName` vào item
                    };
                })
            );
            setSizeColor(updatedData); // Cập nhật state với dữ liệu trả về
            console.log(updatedData); 
            setIsLoading(false);
        };
        LoadData();

    }, [ProductDetail?.proId]); 

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


    {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <img src={loading} alt="Loading..." className="w-12 h-12" />\
            <div> Product Detail</div>
        </div>
    )}

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white w-[70rem] max-h-[90vh] overflow-y-auto p-6 rounded shadow-lg">
                <div className="border bg-white rounded-lg border-[#050c9c]">     
                    <div className="items-center rounded-tl-lg rounded-tr-lg flex w-full h-12 justify-center bg-[#3572ef]">
                        <h2 className='text-3xl font-bold text-white'>Tổng quan về sản phẩm</h2>
                    </div>
                    <div className="flex">
                        {/* Cột trái */}
                        <div className="w-[60%]">
                            <div className="w-[600px] h-auto ml-4 my-4 bg-white rounded-[10px] border border-[#3572ef]" >
                                <div className='h-5 text-base font-bold text-black p-4'>Thông tin về sản phẩm</div>
                                <div className='flex flex-col mt-4 pl-4 items-start justify-center'>
                                    <div className="pb-1">Mã sản phẩm: {ProductDetail.proId}</div>
                                    <div className="pb-1">Tên sản phẩm:  {ProductDetail.productName}</div>
                                    <div className="pb-1">Giá: {(ProductDetail.cost).toLocaleString()}đ</div>
                                    <div className="pb-1">Số lượng đã bán: {ProductDetail.quantitySold}</div>
                                </div>
                           </div>

                           <div className="w-[600px] h-auto ml-4 my-4 bg-white rounded-[10px] border border-[#3572ef]" >
                                <div className='h-5 text-base font-bold text-black p-4'>Thống kê số lượng mỗi sản phẩm</div>
                                <div className='flex flex-col mt-4 pl-4 items-start justify-center'>
                                    <table className="w-full bg-white rounded-[14px] shadow-md">
                                        <thead>
                                            <tr>
                                                <th className="py-4 px-2 border-b text-sm font-extrabold text-center">Size</th>
                                                <th className="py-4 px-2 border-b text-sm font-extrabold text-center">Màu sắc</th>
                                                <th className="py-4 px-2 border-b text-sm font-extrabold text-center">Số lượng còn lại</th>

                                            </tr>
                                        </thead>

                                        <tbody>
                                            {SizeColor.map(product => (
                                                <tr key={product.pro_color_size_id}
                                                >
                                                    <td className="py-5 px-2 h-20 border-b text-sm font-semibold text-center">{getSize(product.size_id)}</td>
                                                    <td className="py-5 px-2 h-20 border-b text-sm font-semibold text-center">{product.colorName}</td>
                                                    <td className="py-5 px-2 h-20 border-b text-sm font-semibold text-center">{product.quantity_available}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                           </div>

                        </div>

                        {/* Cột phải */}
                        <div className="w-[40%] pr-2 pt-4 flex-col">
                            <div  className="h-auto mb-1 bg-white rounded-[10px] border border-[#3572ef]" >
                                <BieuDoCot/>
                            </div>
                            <div  className='flex w-full justify-between mr-4'>
                                <div  className=" flex-1 w-1/2 h-auto bg-white rounded-[10px] mr-[1px] border border-[#3572ef]">
                                    <BieuDoTron data={dataTronColor} title={"Màu sắc"}/>
                                </div>
                                <div  className="flex-1 w-1/2 h-auto bg-white rounded-[10px] ml-[1px] border border-[#3572ef]">
                                    <BieuDoTron data={dataTronSize} title={"Size"}/>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="items-center flex w-full justify-center my-4">
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

export default ProductDetail;