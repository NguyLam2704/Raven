import React from 'react';
import { useNavigate } from 'react-router-dom';

const Product = ({ key, proId, img, name, price, sale}) => {
    //Tính giá tiền được giảm giá
    const discountedPrice = price - (price * sale / 100);
    const navigate = useNavigate()    
    return (
        
        <div className="w-full items-center font-Public flex justify-center ">
            <button onClick={()=>navigate(`/detail_product/${proId}`)} className=" desktop:w-[250px] ipad:w-[220px] mobile:w-[160px] justify-items-center items-center rounded-[20px] border border-[#d9d9d9] relative hover:scale-105 transition duration-200">
                {/* Hiển thị thẻ discount khi có discount */}
                {sale > 0 && (
                    <div className="absolute desktop:w-[250px] ipad:w-[200px]  desktop:h-[350px] ipad:h-[300px] mobile:w-[150px] mobile:h-[270px]">
                        <div className="desktop:w-10 desktop:h-10 ipad:h-9 ipad:w-9 mobile:h-8 mobile:w-8 mt-2 ml-4 bg-[#a91d3a] content-center text-center rounded-b-md text-white desktop:text-sm ipad:text-xs mobile:text-[10px] font-normal ">
                            {sale}%<br />OFF
                        </div>
                    </div>
                )}
                {/* Ảnh sản phẩm */}
                <img className="desktop:w-[230px] ipad:w-[200px]  desktop:h-[235px] ipad:h-[205px] mobile:w-[140px] mobile:h-[155px]  rounded-md my-2 object-cover" src={img} alt={name} />
                {/* Tên sản phẩm */}
                <div className="desktop:h-10 ipad:h-8 mobile:h-6 content-center text-center desktop:text-base ipad:text-sm mobile:text-xs font-medium">{name}</div>
                
                {sale === 0 ? (
                    // Hiển thị giá sản phẩm khi không có discount
                    <div className="desktop:mt-3 desktop:mb-5 desktop:h-5 ipad:h-4 ipad:mt-1 ipad:mb-3 mobile:mt-1 mobile:mb-1 flex text-center desktop:text-xl ipad:text-base mobile:text-sm font-medium text-[#a91d3a]">{price.toLocaleString('vi-VN')}đ</div>
                ) : (
                    //Hiển thị giá sản phẩm khi có discount
                    <div className='desktop:mt-3 desktop:mb-5 desktop:h-5 ipad:h-4 ipad:mt-1 ipad:mb-3 mobile:mt-1 mobile:mb-1 flex text-center desktop:text-xl ipad:text-base mobile:text-sm font-medium'>
                        <div className="text-[#a91d3a]">{discountedPrice.toLocaleString('vi-VN')}đ</div>
                        <div className="ml-4 text-[#9f9f9f] line-through">{(price).toLocaleString('vi-VN')}đ</div>               
                    </div>
                )}
            </button>
        </div>
    );
};

export default Product;
