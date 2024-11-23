import React from "react";


const ProductsList = ({data}) => {

    return(
        <div>
            <div className="max-h-[370px]">
                {/* top 5 product have biggest quantitySold */}
                {data.sort((a, b) => b.quantitySold - a.quantitySold).slice(0, 5).map((product) => (
                    <div key={product.proId} className="flex h-[70px] my-1 items-center rounded-[5px] border-[0.5px] border-[#A7E6FF]">
                        <div className="w-[20%]">
                            <img src={product.productImage.find(img => img.isPrimary)?.image} alt={product.productName} className="w-[60px] h-[60px] m-1 rounded-[5px]"/>
                        </div>
                        
                        <div className="mx-1 w-[55%]">
                            <p className="text-[13px] font-semibold leading-[1.3] w-[197px] h-[35px]">{product.productName}</p>
                            <p className="text-[13px] text-[#050C9C] font-semibold">{(product.cost).toLocaleString()}đ</p>
                        </div>

                        <div className="w-[25%] mr-1">
                            <p className="text-right text-[13px] font-semibold h-[35px] flex items-center justify-end">Đã bán:&nbsp;<span className="text-[#C73659]">{product.quantitySold}</span></p>
                            <p className="text-right text-[13px] font-extrabold text-[#C73659]">{(product.cost * product.quantitySold).toLocaleString()}đ</p>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsList;