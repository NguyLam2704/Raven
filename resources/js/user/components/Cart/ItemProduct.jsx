import React, { useState, useEffect } from "react";
import remove from '../../assets/remove.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import { findIconDefinition } from "@fortawesome/fontawesome-svg-core";

const ItemProduct = ({ product, handlerPlus, handlerTru, removeProduct, onCheckChange }) => {   
    const [check, setCheck] = useState(true);
    const [loading, setLoading] = useState(false);
    const [quantityAvailable, setQuantityAvailable] = useState(0); // Thêm trạng thái cho quantityAvailable
    const navigate = useNavigate();

    const fetchDetail = async () => {
        try {
            const response = await fetch(`/api/v1/proColorSize?prodId[eq]=${product.proId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            const productDetail = data.data;
            console.log(productDetail);
            // Tính toán quantityAvailable
            const filterProColorSize = productDetail?.filter(
                (item) =>
                    item.colorId === product.colorId &&
                    item.sizeId === product.sizeId
            );
            console.log(filterProColorSize);
            console.log(filterProColorSize[0].quantityAvailable);
            setQuantityAvailable(filterProColorSize[0].quantityAvailable);
        } catch (err) {
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchDetail();
    }, []);
    useEffect(() => {
        handleCheckChange()
    }, [quantityAvailable]);
    
    const handleCheckChange = () => {
        const newCheckState = !check;
        setCheck(newCheckState);
        onCheckChange(product, newCheckState, quantityAvailable);
    };
    console.log(quantityAvailable)
    return (
        <div className="desktop:w-10/12 ipad:w-10/12 mobile:w-11/12 flex flex-row border-b-[1px] border-[#C4C4C4] font-Public ">
            <div className="desktop:w-5/12 ipad:w-5/12 mobile:w-7/12">
                <div className="flex flex-row pt-3 pb-5 ml-2">
                    {/* ảnh sản phẩm */}
                    <button className="justify-items-center">
                        <img
                            onClick={() => navigate(`/detail_product/${product.proId}`)}                            
                            src={product.productImage}
                            className="desktop:w-32 desktop:h-36  ipad:w-28 ipad:h-32 mobile:w-20 mobile:h-24 object-cover rounded-lg"
                            alt="img"
                        />
                    </button>
                    {/* Thông tin sản phẩm */}
                    <div className=" w-2/3 flex flex-col ml-3 justify-between py-2">
                        <button
                            onClick={() => navigate(`/detail_product/${product.proId}`)}
                            className="text-left text-black desktop:text-xl ipad:text-base mobile:text-sm font-medium "
                        >
                            {product.productName}
                        </button>
                        <div className="text-black desktop:text-base ipad:text-sm font-medium ">
                            {product.colorName} / {product.size}
                        </div>
                        {/* Xóa sản phẩm */}
                        <button className="" onClick={removeProduct}>
                            <img className="desktop:h-6 ipad:h-5 mobile:h-4 hover:opacity-65" src={remove} alt="remove" />
                        </button>
                    </div>
                </div>
            </div>
            {/* Số lượng sản phẩm */}
            <div className="w-2/12 flex flex-row justify-center text-black text-lg font-bold desktop:pt-14 ipad:pt-12 mobile:pt-8">
                <button
                    className={`desktop:h-7 desktop:w-7 ipad:h-6 ipad:w-6 mobile:h-5 mobile:w-5 flex justify-center items-center border border-[#c4c4c4] bg-[#d9d9d9] px-2 ${product.quantity!=1?' opacity-100':' opacity-65'}`}
                    onClick={handlerTru}
                    disabled={!quantityAvailable}
                >
                    <FontAwesomeIcon className="h-3 w-3" i icon={faMinus} />
                </button>
                <div className="desktop:h-7 desktop:w-7 ipad:h-6 ipad:w-6 mobile:h-5 mobile:w-5 text-center content-center text-black desktop:text-base ipad:text-sm mobile:text-xs font-normal border border-[#c4c4c4] bg-[#d9d9d9] px-2 mobile:px-0 mx-[2px]">
                    {product.quantity}
                </div>
                <button
                    className={`desktop:h-7 desktop:w-7 ipad:h-6 ipad:w-6 mobile:h-5 mobile:w-5 flex justify-center items-center border border-[#c4c4c4] bg-[#d9d9d9] px-2 ${quantityAvailable!=product.quantity?' opacity-100':' opacity-65'}`}
                    onClick={handlerPlus}
                    disabled={!quantityAvailable || product.quantity>=quantityAvailable}
                >
                    <FontAwesomeIcon className="h-3 w-3" icon={faPlus} />
                </button>
            </div>
            {/* Tổng giá sản phẩm */}
            <div className="w-2/12 text-center text-[#a91d3a] desktop:text-xl ipad:text-lg mobile:text-xs font-bold desktop:pt-14 ipad:pt-12 mobile:pt-8">
                {(product.cost - product.cost * product.discount / 100).toLocaleString('vi-VN')}đ
            </div>
            <div className="desktop:flex ipad:flex w-2/12 justify-center mobile:hidden text-right text-[#a91d3a] desktop:text-xl ipad:text-lg font-bold desktop:pt-14 ipad:pt-12 mobile:pt-8">
                {((product.cost - product.cost * product.discount / 100) * product.quantity).toLocaleString('vi-VN')}đ
            </div>
            {/* Checkbox chọn sản phẩm */}
            <div className="w-1/12 text-center desktop:pt-14 ipad:pt-12 mobile:pt-8">
                {loading ? (
                    <div></div>
                ) : quantityAvailable > 0 ? (
                    <input
                        className="desktop:h-5 desktop:w-5 ipad:h-4 ipad:w-4 mobile:h-3 mobile:w-3 rounded accent-black"
                        type="checkbox"
                        checked={check}
                        onChange={handleCheckChange}
                    />
                ) : (
                    <div className="desktop:text-base ipad:text-sm mobile:text-xs font-black text-black">Hết hàng</div>
                )}
            </div>
        </div>
    );
};

export default ItemProduct;
