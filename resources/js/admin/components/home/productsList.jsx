import React from "react";


const ProductsList = ({data}) => {

    return(
        <div>
            <div className="max-h-[370px] overflow-y-auto">
                {data.map((product) => (
                    <div key={product.id} className="flex h-[70px] my-1 items-center rounded-[5px] border-[0.5px] border-[#A7E6FF]">
                        <div className="w-[20%]">
                            <img src={product.img} alt={product.prod_name} className="w-[60px] h-[60px] m-1 rounded-[5px]"/>
                        </div>
                        
                        <div className="mx-1 w-[55%]">
                            <p className="text-[13px] font-semibold leading-[1.3] w-[197px] h-[35px]">{product.prod_name}</p>
                            <p className="text-[13px] text-[#050C9C] font-semibold">{(product.price).toLocaleString()}đ</p>
                        </div>

                        <div className="w-[25%] mr-1">
                            <p className="text-right text-[13px] font-semibold h-[35px] flex items-center justify-end">Đã bán: <span className="text-[#C73659]">{product.quantity_sold}</span></p>
                            <p className="text-right text-[13px] font-extrabold text-[#C73659]">{(product.price * product.quantity_sold).toLocaleString()}đ</p>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsList;