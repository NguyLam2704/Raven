import React from 'react';

const Product = ({ img, name, price, sale }) => {
    const discountedPrice = price - (price * sale / 100);

    return (
        <div className="w-full justify-items-center items-center">
            <div className="w-[250px]  justify-items-center items-center rounded-[20px] border border-[#d9d9d9] relative">
                {sale > 0 && (
                    <div className="absolute w-[250px] h-[350px]">
                        <div className="w-[38px] h-9 mt-2 ml-5 bg-[#a91d3a] text-center text-white text-xs font-normal font-['Public Sans']">
                            {sale}%<br />OFF
                        </div>
                    </div>
                )}
                <img className="w-[230px] h-[235px] my-2" src={img} alt={name} />
                <div className="text-center text-base font-medium">{name}</div>
                {sale === 0 ? (
                    <div className="mt-3 mb-5 h-5 flex text-center text-xl font-medium text-[#a91d3a]">{price.toLocaleString()}đ</div>
                ) : (
                    <div className='mt-3 mb-5 h-5 flex text-center text-xl font-medium'>
                        <div className="text-[#a91d3a]">{discountedPrice.toLocaleString()}đ</div>
                        <div className="ml-4 text-[#9f9f9f] line-through">{(price).toLocaleString()}đ</div>               
                    </div>
                )}
            </div>
        </div>
    );
};

export default Product;
