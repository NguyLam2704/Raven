import React from "react";
import remove from '../../assets/remove.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from "react";
import { Pagination } from "@mui/material";
import {Skeleton, Box} from "@mui/material";

//Item sản phẩm trong thanh giỏ hàng
const ItemMini = ({products, handlerPlus, handlerTru, removeProduct, handler}) => {
    const [product, setProduct] = useState(products)
    const [loading, setLoading] = useState(false);
    const [quantityAvailable, setQuantityAvailable] = useState(0);
    const fetchDetail = async () => {
        try {
            const response = await fetch(`/api/v1/proColorSize?prodId[eq]=${product.proId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            const productDetail = data.data;
            // Tính toán quantityAvailable
            const filterProColorSize = productDetail?.filter(
                (item) =>
                    item.colorId === product.colorId &&
                    item.sizeId === product.sizeId
            );
            setQuantityAvailable(filterProColorSize[0]?.quantityAvailable);
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
        handler(product,quantityAvailable)
    }, [quantityAvailable]);    


    if (loading) {
        return(
            <div className="space-y-0.5 mb-2 w-full">
                <Box display="flex" alignItems="center">
                        {/* Hình chữ nhật bo góc */}
                        <Skeleton
                            variant="rectangular"
                            width={80}
                            height={80}
                            animation="wave"
                            style={{
                            borderRadius: "8px",
                            backgroundColor: "#f0f0f0",
                            }}
                        />

                        {/* Hai thanh ngang */}
                        <Box ml={2} width="100%">
                            <Skeleton
                                variant="rectangular"
                                height={15}
                                animation="wave"
                                style={{ backgroundColor: "#f0f0f0", marginBottom: 8 }}
                            />
                            <Skeleton
                                variant="rectangular"
                                height={15}
                                width="80%"
                                animation="wave"
                                style={{ backgroundColor: "#f0f0f0", marginBottom: 8 }}
                            />
                            <Skeleton
                                variant="rectangular"
                                height={15}
                                width="60%"
                                animation="wave"
                                style={{ backgroundColor: "#f0f0f0" }}
                            />
                        </Box>
                    </Box>
            </div>          
        )
    }

    return(        
        <div className="w-full flex flex-row border-b-[1px] border-[#C4C4C4] pb-2 pt-4">
            <img className="w-[80px] h-[90px] self-center rounded-lg object-cover border-black border" src={product.productImage} alt="img" />
            <div className=" w-full flex flex-col pl-2 gap-1">
                {/* Thông tin sản phẩm */}
                <div className="w-full text-black text-sm  font-semibold">{product.productName}</div>
                <div className=" text-black text-xs font-medium ">{product.colorName} / {product.size}</div>
                <div className="flex flex-row gird grid-cols-2 justify-between">
                    {/* Số lượng sản phẩm */}
                    <div> 
                        <div className="text-[#151515] text-xs font-medium">Số lượng</div>
                        <div className="flex flex-row text-black text-lg font-bold pt-1">
                            <button className={`h-5 border border-[#c4c4c4] bg-[#d9d9d9] px-1 ${product.quantity!=1?' opacity-100':' opacity-65'}`}
                                onClick={handlerTru}
                                disabled={!quantityAvailable || product.quantity===1}
                            >
                            
                                <FontAwesomeIcon className="h-2 pb-2"  icon={faMinus} />
                            </button>
                            <div className="text-center content-center text-black text-xs font-normal border border-[#c4c4c4] bg-[#d9d9d9] mx-[1px] px-1  ">{product.quantity}</div>
                            <button className={`h-5 border border-[#c4c4c4] bg-[#d9d9d9] px-1 ${product.quantity!=quantityAvailable?' opacity-100':' opacity-65'}`}
                                onClick={handlerPlus}
                                disabled={!quantityAvailable || product.quantity>=quantityAvailable}
                            >
                                <FontAwesomeIcon className="h-2 pb-2"  icon={faPlus} />
                            </button>
                        </div>
                    </div>

                    <div className="w-20 justify-items-center">
                        {/* Giá sản phẩm */}
                        {quantityAvailable ? (
                            <div className=" w-20 text-end  text-[#a91d3a] text-sm font-bold ">{(product.cost-product.cost*product.discount/100).toLocaleString('vi-VN')}đ</div>
                        ):(
                            loading ? (<div className="text-sm font-black text-black">
                                
                            </div>): (
                                <div className="text-sm font-black text-black">
                                    Hết hàng
                                </div>
                        ))

                        }
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