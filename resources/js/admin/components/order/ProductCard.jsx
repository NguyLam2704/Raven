import React, { useEffect, useState } from "react";
import axios from "axios";



const ProductCardInOrderDetail = ({products, sizes, colors, quantity}) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const LoadData = async () => {
            console.log("KEK" + products)
        }
        LoadData();
    } ,[])


    return (
        <div>
            {products.map((product, index) => (
                <div key={index} className="flex my-2 h-20 rounded-[5px] border-2 border-[#1E0342]/50">
                    <div className="flex ipad:gap-2 h-full desktop:pr-8">

                        <div className="h-full flex justify-center items-center">
                            <img src={product.image} alt={product.prod_name} className="w-[60px] h-[60px] m-1 shadow-md rounded-[5px]"/>
                        </div>

                        <div className="h-full mobile:w-40 flex flex-col justify-center text-left">
                            <div className="ipad:w-48 desktop:h-10  text-sm font-medium"
                            >
                                {product.prod_name}
                            </div>
                            <div className="ipad:w-48 desktop:h-5 text-sm font-medium"> {colors[index].data.colorName} / {sizes[index].data.sizeCode}</div>
                            <div className="text-black text-sm font-medium mobile:block ipad:hidden">Số lượng: {quantity[index]} </div>
                        </div>

                        {/* mobile không hiện phần này  */}
                        <div className="h-full mx-2 flex justify-center items-center mobile:hidden ipad:flex">
                            <div className="text-black text-sm font-medium px-4">Số lượng: {quantity[index]} </div>
                        </div>

                        <div className="h-full mobile:mx-1 ipad:mx-4 flex justify-center items-center ">
                            <div className="text-[#A91D3A] text-sm font-semibold ipad:px-4">{(product.cost).toLocaleString('vi-VN')}đ</div>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default ProductCardInOrderDetail;