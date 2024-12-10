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
            const response = await fetch(`/api/v1/product?proId[eq]=${product.proId}&includeProColorSize=true&includeImage=true`);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            const productDetail = data.data[0];
            // Tính toán quantityAvailable
            const filterProColorSize = productDetail?.proColorSize.filter(
                (item) =>
                    item.color.colorCode === product.color &&
                    item.size.sizeCode === product.size
            );
            setQuantityAvailable(filterProColorSize?.[0]?.quantityAvailable);
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
        <div className="w-10/12 flex flex-row border-b-[1px] border-[#C4C4C4] font-Public ">
            <div className="w-5/12">
                <div className="flex flex-row pt-3 pb-5 ml-2">
                    {/* ảnh sản phẩm */}
                    <button className="w-1/3 justify-items-center">
                        <img
                            onClick={() => navigate(`/detail_product/${product.proId}`)}                            
                            src={product.productImage}
                            className="desktop:w-36  ipad:w-32  object-fill rounded-lg"
                            alt="img"
                        />
                    </button>
                    {/* Thông tin sản phẩm */}
                    <div className=" w-2/3 flex flex-col ml-3 justify-between py-2">
                        <button
                            onClick={() => navigate(`/detail_product/${product.proId}`)}
                            className="text-left text-black desktop:text-xl ipad:text-base font-medium "
                        >
                            {product.productName}
                        </button>
                        <div className="text-black desktop:text-base ipad:text-sm font-medium ">
                            {product.colorName} / {product.size}
                        </div>
                        {/* Xóa sản phẩm */}
                        <button className="" onClick={removeProduct}>
                            <img className="desktop:h-5 ipad:h-4 hover:opacity-65" src={remove} alt="remove" />
                        </button>
                    </div>
                </div>
            </div>
            {/* Số lượng sản phẩm */}
            <div className="w-2/12 flex flex-row justify-center text-black text-lg font-bold pt-14">
                <button
                    className="desktop:h-7 desktop:w-7 ipad:h-6 ipad:w-6 flex justify-center items-center border border-[#c4c4c4] bg-[#d9d9d9] px-2"
                    onClick={handlerTru}
                    disabled={!quantityAvailable}
                >
                    <FontAwesomeIcon className="h-3 w-3" i icon={faMinus} />
                </button>
                <div className="desktop:h-7 desktop:w-7 ipad:h-6 ipad:w-6  text-center content-center text-black desktop:text-base ipad:text-sm font-normal border border-[#c4c4c4] bg-[#d9d9d9] px-2 mx-[2px]">
                    {product.quantity}
                </div>
                <button
                    className="desktop:h-7 desktop:w-7 ipad:h-6 ipad:w-6 flex justify-center items-center border border-[#c4c4c4] bg-[#d9d9d9] px-2"
                    onClick={handlerPlus}
                    disabled={!quantityAvailable || product.quantity>=quantityAvailable}
                >
                    <FontAwesomeIcon className="h-3 w-3" icon={faPlus} />
                </button>
            </div>
            {/* Tổng giá sản phẩm */}
            <div className="w-2/12 text-center text-[#a91d3a] desktop:text-xl ipad:text-lg font-bold pt-14">
                {(product.cost - product.cost * product.discount / 100).toLocaleString('vi-VN')}đ
            </div>
            <div className="w-2/12 text-center text-[#a91d3a] desktop:text-xl ipad:text-lg font-bold pt-14">
                {((product.cost - product.cost * product.discount / 100) * product.quantity).toLocaleString('vi-VN')}đ
            </div>
            {/* Checkbox chọn sản phẩm */}
            <div className="w-1/12 text-center ">
                {loading ? (
                    <div></div>
                ) : quantityAvailable > 0 ? (
                    <input
                        className="h-5 w-5 mt-[59px] rounded accent-black"
                        type="checkbox"
                        checked={check}
                        onChange={handleCheckChange}
                    />
                ) : (
                    <div className="desktop:text-base ipad:text-sm font-black text-black mt-[59px]">Hết hàng</div>
                )}
            </div>
        </div>
    );
};

export default ItemProduct;
