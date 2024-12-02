import React, { useState } from "react";
import remove from '../../assets/remove.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'

//Item Sản phẩm trong giỏ hàng
const ItemProduct = ({product, handlerPlus, handlerTru, removeProduct}) => {   
    const [check, setCheck] = useState(false)
    console.log(check)
    return(
        <div className="w-10/12 flex flex-row border-b-[1px] border-[#C4C4C4] ">
            <div className="w-5/12">
                <div className=" flex flex-row pt-3 pb-5 ml-2">
                    {/* ảnh sản phẩm */}
                    <button className="w-36 h-36 rounded-lg">
                        <img onClick={()=>navigate(`/detail_product/${product.proId}`)} className="w-36 h-36 rounded-lg"
                        src={product.productImage} alt="img" 
                        />
                    </button>
                    {/* Thông tin sản phẩm */}
                    <div className="h-40 ml-3">
                        <button onClick={()=>navigate(`/detail_product/${product.proId}`)} className="h-1/3 text-black text-xl font-medium pt-5 pr-10">{product.productName}</button>
                        <div className="h-1/3 text-black text-base font-medium pt-6">{product.color} / {product.size}</div>
                        {/* Xóa sản phẩm */}
                        <button className="h-1/3 pt-1 pb-6"
                            onClick={removeProduct}
                        >
                            <img className="h-5 hover:opacity-65" src={remove} alt="remove" />
                        </button>
                    </div>
                </div>
            </div>
            {/* Số lượng sản phẩm */}
            <div className="w-2/12 flex flex-row justify-center text-black text-lg font-bold pt-14">
                <button className=" h-7 border border-[#c4c4c4] bg-[#d9d9d9] px-2 "
                    onClick={handlerTru}
                >
                    <FontAwesomeIcon  icon={faMinus} />
                </button>                
                <div className="h-7 text-black text-base font-normal border border-[#c4c4c4] bg-[#d9d9d9] px-2 pt-[2px] mx-[1px] ">{product.quantity}</div>
                <button className=" h-7 border border-[#c4c4c4] bg-[#d9d9d9] px-2"
                    onClick={handlerPlus}
                >
                    <FontAwesomeIcon  icon={faPlus} />
                </button>
                
            </div>
            {/* Tổng giá sản phẩm */}
            <div className="w-2/12 text-center text-[#a91d3a] text-xl font-bold pt-14">{(product.cost-product.cost*product.discount/100).toLocaleString('vi-VN')}đ</div>
            <div className="w-2/12 text-center text-[#a91d3a] text-xl font-bold pt-14">{((product.cost-product.cost*product.discount/100)*product.quantity).toLocaleString('vi-VN')}đ</div>
            {/* Checkbox chọn sản phẩm */}
            <div className=" w-1/12 text-center ">
                <input className="h-5 w-5 mt-[59px] rounded accent-black" 
                    type="checkbox" 
                    value={check}    
                    onChange={()=>setCheck(!check)}
                />                
            </div>
        </div>
    )
}

export default ItemProduct