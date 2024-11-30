import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Loading from '../../asset/loading.svg'
import ProductDetail from './ProductDetail';

const fetchProductById = async (id) => {
    const response = await axios.get(`/api/v1/product/${id}`);
    return response.data;
};

const ProductsList = ({data}) => {
    const [selectedProduct, setSelectedProduct] = useState(null); //Lưu sản phẩm được chọn 
    const [isLoading, setIsLoading] = useState();

    //Hàm lưu sản phẩm khi được click vào
    const handleRowClick = async (orderId) => {
        setIsLoading(true);
        try {
            const productDetail = await fetchProductById(orderId);
            console.log(productDetail.data)
            setSelectedProduct(productDetail.data);
        } catch (error) {
            console.error('Error fetching order details:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const closeDetail = () => setSelectedProduct(null);//Đóng popup chi tiết sản phẩm
    
    return (
         <div className="container mx-auto px-4">
            <div className="overflow-y-auto w-full">
                <table className="w-full bg-white rounded-[14px] shadow-md">
                    <thead>
                        <tr>
                            <th className="py-4 px-2 border-b text-sm font-extrabold text-center">Mã sản phẩm</th>
                            <th className="py-4 px-2 border-b text-sm font-extrabold text-left">Tên sản phẩm</th>
                            <th className="py-4 px-2 border-b text-sm font-extrabold text-left">Số lượng đã bán</th>
                            <th className="py-4 px-2 border-b text-sm font-extrabold text-ccnter">Giá</th>
                            <th className="py-4 px-2 border-b text-sm font-extrabold text-center">Doanh thu</th>
                            <th className="py-4 px-2 border-b text-sm font-extrabold text-center">Còn lại</th>
                            <th className="py-4 px-2 border-b text-sm font-extrabold text-center">Tùy chỉnh</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map(product => (
                            <tr key={product.proId}
                                onClick={() => handleRowClick(product.proId)} //Sự kiện click vào sản phẩm
                                className="cursor-pointer hover:bg-gray-100"
                            >
                                <td className="py-5 px-2 h-20 border-b text-sm font-semibold text-center">{product.proId}</td>
                                <td className="py-5 px-2 h-20 border-b text-sm font-semibold text-left">{product.productName}</td>
                                <td className="py-5 pl-12 h-20 border-b text-sm font-semibold text-left">{product.quantitySold}</td>
                                <td className="py-5 px-2 h-20 border-b text-sm font-semibold text-center">
                                    {(product.cost).toLocaleString()}
                                </td>
                                <td className="py-5 px-2 h-20 border-b text-sm font-semibold text-center">
                                    {/* Tinh doanh thu */}
                                    {(product.cost * product.quantitySold).toLocaleString()}
                                </td>
                                <td className="py-5 px-2 h-20 border-b text-sm font-semibold text-center">
                                    <span className={`px-2 py-1 rounded inline-block w-[120px] text-center`}> 
                                        {/* Tinh so luong san pham con lai */}
                                        {product.proColorSize.reduce((sum,item) => sum + item.quantityAvailable,0)}
                                    </span>
                                </td>
                                <td className="py-5 px-2 h-20 border-b flex justify-center items-center">
                                    <div  className="w-24 bg-[#fafbfc] rounded-lg border">
                                        <button className='h-full w-1/2 border-r'>
                                            <FontAwesomeIcon icon={faPenToSquare} tyle={{color: "#000000",}} />
                                        </button>

                                        <button className='h-full w-1/2 border-l'>
                                            <FontAwesomeIcon icon={faTrashCan} style={{color: "#ef3826",}} />
                                        </button>
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <img src={Loading} alt="Loading..." className="w-12 h-12" />
                    <div> Product List</div>
                </div>
            )}
            {/* Hiển thị chi tiết đơn hàng khi đã có dữ liệu */}
            {selectedProduct && !isLoading && (
                <ProductDetail
                    ProductDetail={selectedProduct}
                    onClose={closeDetail}
                />
            )}

         </div>   
    )
}

export default ProductsList;