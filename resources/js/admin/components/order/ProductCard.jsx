import React, { useEffect, useState } from "react";
import axios from "axios";

const fetchImg = async () => {
    const response = await axios.get(`/api/v1/productImage`);
    return response.data;
  };

const ProductCardInOrderDetail = ({products, sizes, colors, quantity}) => {
    const [img, setImg] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const LoadData = async () => {
          const data = await fetchImg();
            setImg(data.data)
            setIsLoading(false)
        }
        LoadData();
    } ,[])

    if(isLoading){
        return <div>Loading...</div>
    }


    return (
        <div className="w-[90%]">
            {products.map((product, index) => (
                <div key={index} className="w-full flex my-2 h-20 rounded-[5px] border-2 border-[#3d55cb]/50">
                    <div className="flex gap-2 h-full">
                        <div className="h-full flex justify-center items-center">
                            <img className="w-[60px] mx-2 h-[60px] rounded-[5px] shadow" alt="image"/>
                            {/* <img src={product.data.productImage} alt={product.data.productName} className="w-[60px] h-[60px] m-1 rounded-[5px]"/> */}
                        </div>
                        <div className="h-full flex flex-col justify-center text-left">
                            <div className="w-48 h-10 text-sm font-medium">{product.data.productName}</div>
                            <div className="w-48 h-5 text-sm font-medium"> {colors[index].data.colorName} / {sizes[index].data.sizeCode}</div>
                        </div>
                    </div>

                    <div className="h-full mx-2 flex justify-center items-center">
                        <div className="text-black text-sm font-medium px-4">Số lượng: {quantity[index]} </div>
                    </div>

                    <div className="h-full mx-4 flex justify-center items-center">
                        <div className="text-[#050c9c] text-sm font-medium px-4">{product.data.cost}đ</div>
                    </div>

                </div>
            ))}

        </div>
    )
}

export default ProductCardInOrderDetail;