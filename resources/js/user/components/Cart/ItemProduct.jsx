import React from "react";
import remove from '../../assets/remove.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'

//Item Sản phẩm trong giỏ hàng
const ItemProduct = ({product}) => {   
    return(
        <div className="w-10/12 flex flex-row border-b-[1px] border-[#C4C4C4] ">
            <div className="w-6/12">
                <div className=" flex flex-row pt-3 pb-7 ml-2">
                    {/* ảnh sản phẩm */}
                    <img className="w-36 h-40 rounded-lg" src={product.img} alt="img" />
                    {/* Thông tin sản phẩm */}
                    <div className="h-40 ml-3">
                        <div className="h-1/3 text-black text-xl font-medium pt-5 pr-10">{product.name}</div>
                        <div className="h-1/3 text-black text-base font-medium pt-6">{product.color} / {product.size}</div>
                        {/* Xóa sản phẩm */}
                        <img className="h-1/3 pt-1 pb-6" src={remove} alt="remove" />
                    </div>
                </div>
            </div>
            {/* Số lượng sản phẩm */}
            <div className="w-2/12 flex flex-row justify-center text-black text-lg font-bold pt-14">
                <button className=" h-7 border border-[#c4c4c4] bg-[#d9d9d9] px-2 "
                    
                >
                    <FontAwesomeIcon  icon={faMinus} />
                </button>                
                <div className="h-7 text-black text-base font-normal border border-[#c4c4c4] bg-[#d9d9d9] px-2 pt-[2px] mx-[1px] ">{product.quality}</div>
                <button className=" h-7 border border-[#c4c4c4] bg-[#d9d9d9] px-2"
                    
                >
                    <FontAwesomeIcon  icon={faPlus} />
                </button>
                
            </div>
            {/* Tổng giá sản phẩm */}
            <div className="w-2/12 text-center text-[#a91d3a] text-xl font-bold pt-14">{Number((product.price - (product.price * product.sale / 100))*product.quality).toLocaleString()}đ</div>
            {/* Checkbox chọn sản phẩm */}
            <div className=" w-2/12 text-center">
                <input className="h-5 w-5 mt-[59px] text-black bg-white border-red-700 rounded focus:ring-black" 
                    type="checkbox"                     
                />
            </div>
        </div>
    )
}

export default ItemProduct