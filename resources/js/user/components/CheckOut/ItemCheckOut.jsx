import React from "react";
import img_product from '../../assets/img_product.svg';
import remove from '../../assets/remove.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'

//Item sản phẩm trong thanh giỏ hàng
const ItemCheckOut = ({product}) => {
    return(
        <div className="w-full flex flex-row border-b-[1px] border-[#C4C4C4] mt-4 font-Public">
            <img className="desktop:w-24 ipad:w-20 mobile:w-20 h-full rounded-lg  mb-2" src={product.productImage} alt="img" />
            <div className="w-full flex flex-col justify-between pl-2 mb-2">
                {/* Thông tin sản phẩm */}
                <div className="content-center text-black desktop:text-base ipad:text-sm font-medium ">{product.productName}</div>
                <div className=" text-black desktop:text-sm ipad:text-xs font-medium ">{product.colorName} / {product.size}</div>
                <div className="flex flex-row gird grid-cols-2 justify-between mt-1">
                    {/* Số lượng sản phẩm */}
                    <div className="text-black desktop:text-sm ipad:text-xs mobile:text-xs font-medium">Số lượng: {product.quantity}</div>
                    {/* Giá sản phẩm */}
                    <div className=" text-[#c73659] desktop:text-sm ipad:text-xs mobile:text-xs font-bold ">{Number((product.cost - (product.cost * product.discount / 100))).toLocaleString()}đ</div>
                </div>
            </div>


            
        </div>
    )
}

export default ItemCheckOut