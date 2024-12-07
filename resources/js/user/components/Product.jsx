import React from 'react';
import { useNavigate } from 'react-router-dom';

const Product = ({ key, proId, img, name, price, sale}) => {
    //Tính giá tiền được giảm giá
    const discountedPrice = price - (price * sale / 100);
    const navigate = useNavigate()    
    return (
        
        <button onClick={()=>navigate(`/detail_product/${proId}`)}  className="w-full justify-items-center items-center">
            <div  className="w-[250px] justify-items-center items-center rounded-[20px] border border-[#d9d9d9] relative">
                {/* Hiển thị thẻ discount khi có discount */}
                {sale > 0 && (
                    <div className="absolute w-[250px] h-[350px]">
                        <div className="w-10 h-10 mt-2 ml-4 bg-[#a91d3a] content-center text-center rounded-b-md text-white text-xs font-normal font-['Public Sans']">
                            {sale}%<br />OFF
                        </div>
                    </div>
                )}
                {/* Ảnh sản phẩm */}
                <img className="w-[230px] h-[235px] rounded-md my-2 object-cover" src={img} alt={name} />
                {/* Tên sản phẩm */}
                <div className="h-10 content-center text-center text-base font-medium">{name}</div>
                
                {sale === 0 ? (
                    // Hiển thị giá sản phẩm khi không có discount
                    <div className="mt-3 mb-5 h-5 flex text-center text-xl font-medium text-[#a91d3a]">{price.toLocaleString('vi-VN')}đ</div>
                ) : (
                    //Hiển thị giá sản phẩm khi có discount
                    <div className='mt-3 mb-5 h-5 flex text-center text-xl font-medium'>
                        <div className="text-[#a91d3a]">{discountedPrice.toLocaleString('vi-VN')}đ</div>
                        <div className="ml-4 text-[#9f9f9f] line-through">{(price).toLocaleString('vi-VN')}đ</div>               
                    </div>
                )}
            </div>
        </button>
    );
};

export default Product;
