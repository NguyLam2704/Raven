import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Loading from '../../asset/loading.svg'
import ProductDetail from './ProductDetail';
import ProductEdit from './ProductEdit';

const fetchProductById = async (id) => {
    const response = await axios.get(`/api/v1/product/${id}`);
    return response.data;
};

const getProductEdit = async (id) => {
    const response = await axios.get(`/api/dashboard/product/${id}`);
    return response.data;
};

const deleteProduct = async (id) => {
    await axios.delete(`/api/dashboard/product/${id}`);
};
const ProductsList = ({data}) => {
    const [productList, setProductList] = useState(data);
    const [selectedProduct, setSelectedProduct] = useState(null); //Lưu sản phẩm được chọn 
    const [productEdit, setProductEdit] = useState();
    const [isLoading, setIsLoading] = useState();
    const [bieudo, setBieudo] = useState({});
    //Hàm lưu sản phẩm khi được click vào
    const handleRowClick = async (prodId) => {
        console.log("Đang gọi detail", prodId)
        setIsLoading(true);
        try {
            const res = await axios.get(`/api/dashboard/product/${prodId}/bieudo`);
            setBieudo(res.data);
            setSelectedProduct(prodId);
        } catch (error) {
            console.error('Error fetching product details:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditClick = async (prodId) => {
        console.log("Đang gọi edit")
        setIsLoading(true);
        try {
            const productedit = await getProductEdit(prodId);
            console.log(productedit)
            setProductEdit(productedit);
        } catch (error) {
            console.error('Error fetching product edit:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteClick = async (prodId) => {
        console.log("Đang gọi delete")
        setIsLoading(true);
        try {
            await deleteProduct(prodId);
            console.log("delete thành công");
            const newList = productList.filter((item) => item.proId !== prodId);
            setProductList(newList);
            console.log(newList);
            
        } catch (error) {
            console.error('Error fetching product edit:', error);
        } finally {
            setIsLoading(false);
            
        }
    };

    

    const closeDetail = () => setSelectedProduct(null);//Đóng popup chi tiết sản phẩm
    const closeEdit = () => setProductEdit(null);
    
    return (
         <div className="container mobile:block">
            <div>
                <table className="bg-white ipad:w-[1200px] desktop:w-[1200px] mobile:w-[1200px] rounded-[14px] shadow-md">
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
                        {productList.map(product => (
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
                                        <button className='h-full w-1/2 border-r'
                                             onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEditClick(product.proId)
                                        }}>
                                            <FontAwesomeIcon icon={faPenToSquare} tyle={{color: "#000000",}} />
                                        </button>

                                        <button className='h-full w-1/2 border-l z-10' onClick={(e) =>{
                                            e.stopPropagation();
                                            handleDeleteClick(product.proId);
                                        }} >
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
                </div>
            )}
            {/* Hiển thị chi tiết đơn hàng khi đã có dữ liệu */}
            {selectedProduct && (
                <ProductDetail
                    ProductID={selectedProduct}
                    chart={bieudo}
                    onClose={closeDetail}
                />
            )}

            {productEdit && (
                <ProductEdit 
                    products={productEdit}
                    onClose={closeEdit}
                />

            )

            }

         </div>   
    )
}

export default ProductsList;