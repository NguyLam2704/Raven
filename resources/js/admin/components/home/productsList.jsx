import React from "react";


const ProductsList = ({data}) => {
    console.log('data',data);
    
    return(
        <div>
            <div className="max-h-[370px]">
                {/* top 5 product have biggest quantitySold */}
                {data.map((product) => (
                    <div key={product.prod_id} className="flex h-[70px] my-1 items-center rounded-[5px] border-[0.5px] border-[#0E46A3]">
                        <div className="desktop:w-[20%] mobile:w-[20%] ipad:w-[10%] ">
                            <img src={product.image} alt={product.prod_name} className="w-[60px] h-[60px] m-1 rounded-[5px]"/>
                        </div>
                        
                        <div className="mx-1 mobile:pl-2 ipad:pl-0  desktop:pl-0 w-[55%]">
                            <p className="text-[13px] font-semibold leading-[1.3] w-[197px] h-[35px]">{product.prod_name}</p>
                            {/* <p className="text-[13px] text-[#050C9C] font-semibold">{(product.cost).toLocaleString()}đ</p> */}
                        </div>

                        <div className="w-[25%] mr-1">
                            <p className="text-right text-[13px] font-semibold h-[35px] flex items-center justify-end">Đã bán:&nbsp;<span className="text-[#C73659]">{product.total_quantity}</span></p>
                            <p className="text-right text-[13px] font-extrabold text-[#C73659]">{product.total_cost?.toLocaleString()}đ</p>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsList;