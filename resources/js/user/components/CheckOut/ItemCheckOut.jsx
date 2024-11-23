import React from "react";
import img_product from '../../assets/img_product.svg';
import remove from '../../assets/remove.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'

//Item sản phẩm trong thanh giỏ hàng
const ItemCheckOut = ({product}) => {
    return(
        <div className="w-full flex flex-row border-b-[1px] border-[#C4C4C4] mt-4">
            <img className="w-24 h-full rounded-lg  mb-2" src={product.img} alt="img" />
            <div className="w-full flex flex-col pl-2">
                {/* Thông tin sản phẩm */}
                <div className="h-12 content-center text-black text-base font-medium ">{product.name}</div>
                <div className=" text-black text-sm font-medium ">{product.color} / {product.size}</div>
                <div className="flex flex-row gird grid-cols-2 justify-between mt-1">
                    {/* Số lượng sản phẩm */}
                    <div className="text-black text-sm font-medium">Số lượng: {product.quality}</div>
                    {/* Giá sản phẩm */}
                    <div className=" text-[#c73659] text-sm font-bold ">{product.price}đ</div>
                </div>
            </div>


            
        </div>
    )
}

export default ItemCheckOut