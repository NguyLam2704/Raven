import React from "react";
import img_product from '../../assets/img_product.svg';
import remove from '../../assets/remove.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'

//Item sản phẩm trong thanh giỏ hàng
const ItemMini = () => {
    return(
        <div className="w-11/12 flex flex-row border-b-[1px] border-[#C4C4C4] ">
            <img className="w-20 h-full rounded-lg border-black border mb-2" src={img_product} alt="img" />
            <div className="flex flex-col pl-2 gap-1">
                {/* Thông tin sản phẩm */}
                <div className="w-full text-black text-xs font-semibold">Áo Polo Raven Local Brand Unisex Flxame</div>
                <div className=" text-black text-xs font-medium ">Đen / L</div>
                <div className="flex flex-row gird grid-cols-2 justify-between">
                    {/* Số lượng sản phẩm */}
                    <div> 
                        <div className="text-[#151515] text-xs font-medium">Số lượng</div>
                        <div className="flex flex-row text-black text-lg font-bold pt-1">
                            <button className="h-5 border border-[#c4c4c4] bg-[#d9d9d9] px-1">
                                <FontAwesomeIcon className="h-2 pb-2"  icon={faMinus} />
                            </button>
                            <div className="text-center text-black text-xs font-normal border border-[#c4c4c4] bg-[#d9d9d9] mx-[1px] px-1 pt-[2px] ">2</div>
                            <button className="h-5 border border-[#c4c4c4] bg-[#d9d9d9] px-1">
                                <FontAwesomeIcon className="h-2 pb-2"  icon={faPlus} />
                            </button>
                        </div>
                    </div>

                    <div className=" justify-items-center">
                        {/* Giá sản phẩm */}
                        <div className=" text-[#a91d3a] text-sm font-bold ">100000đ</div>
                        {/* Xóa sản phẩm */}
                        <img className="h-5" src={remove} alt="remove" />
                    </div>

                </div>
            </div>


            
        </div>
    )
}

export default ItemMini