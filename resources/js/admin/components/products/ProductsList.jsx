import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const ProductsList = ({data}) => {
    
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
                            <tr key={product.proId}>
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

         </div>   
    )
}

export default ProductsList;