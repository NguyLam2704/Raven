import React from "react";
import remove from '../../assets/remove.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'

//Item sản phẩm trong thanh giỏ hàng
const ItemMini = ({product, handlerPlus, handlerTru, removeProduct}) => {
    
    return(        
        <div className="w-full flex flex-row border-b-[1px] border-[#C4C4C4] pb-2 pt-4">
            <img className="w-20 h-20 rounded-lg border-black border" src={product.productImage} alt="img" />
            <div className=" w-full flex flex-col pl-2 gap-1">
                {/* Thông tin sản phẩm */}
                <div className="w-full text-black text-xs font-semibold">{product.productName}</div>
                <div className=" text-black text-xs font-medium ">{product.color} / {product.size}</div>
                <div className="flex flex-row gird grid-cols-2 justify-between">
                    {/* Số lượng sản phẩm */}
                    <div> 
                        <div className="text-[#151515] text-xs font-medium">Số lượng</div>
                        <div className="flex flex-row text-black text-lg font-bold pt-1">
                            <button className="h-5 border border-[#c4c4c4] bg-[#d9d9d9] px-1"
                                onClick={handlerTru}
                            >
                                <FontAwesomeIcon className="h-2 pb-2"  icon={faMinus} />
                            </button>
                            <div className="text-center content-center text-black text-xs font-normal border border-[#c4c4c4] bg-[#d9d9d9] mx-[1px] px-1  ">{product.quantity}</div>
                            <button className="h-5 border border-[#c4c4c4] bg-[#d9d9d9] px-1"
                                onClick={handlerPlus}
                            >
                                <FontAwesomeIcon className="h-2 pb-2"  icon={faPlus} />
                            </button>
                        </div>
                    </div>

                    <div className="w-20 justify-items-center">
                        {/* Giá sản phẩm */}
                        <div className=" w-20 text-end  text-[#a91d3a] text-sm font-bold ">{(product.cost-product.cost*product.discount/100).toLocaleString('vi-VN')}đ</div>
                        {/* Xóa sản phẩm */}
                        <button className="h-5 w-14 justify-items-end"
                            onClick={removeProduct}
                        >
                            <img className="h-5  hover:opacity-65" src={remove} alt="remove" />
                        </button>
                    </div>
                </div>
                
            </div>


            
        </div>
    )
}

export default ItemMini