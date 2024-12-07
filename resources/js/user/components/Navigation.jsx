import React, { useState, useEffect } from 'react';
import Logo from "../assets/Raven.svg"
import Search from "../assets/Search.svg"
import Cart from "../assets/Cart.svg"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
    //Giá trị để kiểm soát trạng thái ẩn/hiện của mục Áo
    const [isOpenAo, setOpenAo] = useState(false);
    //Giá trị để kiểm soát trạng thái ẩn/hiện của mục Quần
    const [isOpenQuan, setOpenQuan] = useState(false);
    //Giá trị để kiểm soát trạng thái ẩn/hiện của mục Phụ kiện
    const [isOpenPk, setOpenPk] = useState(false);

    //Kiểm soát trạng thái hiện của mục Áo
    const handleHoverAo = () => {
        setOpenAo(true);
    };
    //Kiểm soát trạng thái ẩn/hiện của mục Quần
    const handleHoverQuan = () => {
        setOpenQuan(true);
    };
    //Kiểm soát trạng thái ẩn/hiện của mục Phụ kiện
    const handleHoverPk = () => {
        setOpenPk(true);
    };
    //Kiểm soát trạng thái ẩn của mục Áo/Quần/Phụ kiện
    const handleMenuLeave = () => {
        setOpenAo(false);
        setOpenQuan(false);
        setOpenPk(false);
    };

    //Nhận nội dung của Thanh tìm kiếm
    const [text, setText] = useState('')

    const navigate = useNavigate();
    
    //Hàm chuyển đến trang Tìm kiếm và truyền nội dung tìm kiếm
    const navigateToAbout = (e) => { 
        e.preventDefault(); // prevent default form submission
        navigate(`/search?query=${text}`); // include search query in URL
      };

    //Số lượng trong giỏ hàng
    const [quantityCart, setQuantityCart] = useState()
    const [storeProduct, setStoreProduct] = useState([]);
    useEffect(() => {
        // Hàm này sẽ chạy khi thêm hoặc xóa sản phẩm trong localStorage
        const updateCartQuantity = () => {
            const savedProduct = localStorage.getItem('cart'); // Lấy dữ liệu từ localStorage
            if (savedProduct) {
                try {
                    const parsedProducts = JSON.parse(savedProduct); // Parse dữ liệu
                    if (Array.isArray(parsedProducts)) {
                        setStoreProduct(parsedProducts); // Lưu vào state
                        setQuantityCart(parsedProducts.length); // Đếm số lượng sản phẩm
                    }
                } catch (error) {
                    console.error("Lỗi parse dữ liệu từ localStorage:", error);
                    setStoreProduct([]); 
                    setQuantityCart(0); 
                }
            } else {
                setStoreProduct([]); 
                setQuantityCart(0); 
            }
        };
    
        // Theo dõi sự kiện `storage` (cho trường hợp localStorage thay đổi ở tab khác)
        window.addEventListener('storage', updateCartQuantity);
    
        // Lắng nghe sự thay đổi khi người dùng thao tác thêm/xóa sản phẩm
        const interval = setInterval(updateCartQuantity, 5); // Polling kiểm tra mỗi 5ms
    
    }, []);
    

    return(
        
        <header className=" fixed left-0 z-30 top-0 w-full bg-white  font-Public">
        <nav   className="flex flex-row items-center justify-between h-24 border-b-[1px] border-b-slate-300 w-full">
            {/* Logo  */}
            <div className=" items-center justify-items-center basis-2/12 ">
                <Link to="/">
                    <img src={Logo} alt="Logo"/>
                </Link>
            </div>
            {/* Thanh điều hướng */}
            <ul   className=" h-full basis-6/12 items-center justify-between flex mt-10 mb-4 mr-10 desktop:text-2xl ipad:text-xl   ">
                <li className=" h-full items-center justify-center justify-items-center mt-16">
                    <div className=' h-9  text-[#a91d3a]  font-bold hover:border-b-2 hover:border-b-[#a91d3a] '>
                    <Link to="/">HOME</Link></div>
                </li>
                <li className="h-full mt-16 "
                    onMouseLeave={handleMenuLeave} //ẩn mục ÁO
                >
                    <div className=' h-9 text-[#a91d3a]  font-bold hover:border-b-2 hover:border-b-[#a91d3a]  ' onMouseEnter={handleHoverAo} ><Link to="/T_shirt">ÁO</Link></div>
                    {isOpenAo && (<ul className=' absolute z-50 desktop:w-32 ipad:w-28 bg-[#C73659] desktop:text-base ipad:text-sm uppercase text-left text-white mt-4 '>
                        <li className='py-2 pl-3 border-b-[1px] border-white hover:font-bold hover:pl-3'><Link to="/T_shirt">Áo thun</Link></li>
                        <li className='py-2 pl-3 border-b-[1px] border-white hover:font-bold hover:pl-3'><Link to="/polo">Áo polo</Link></li>
                        <li className='py-2 pl-3 border-b-[1px] border-white hover:font-bold hover:pl-3'><Link to="/outwear">Áo khoác</Link></li>                  
                        <li className='py-2 pl-3 border-b-[1px] border-white hover:font-bold hover:pl-3'><Link to="/sweater">Áo sweater</Link></li>
                        <li className='py-2 pl-3 hover:font-bold hover:pl-3 '><Link to="/shirt">Áo sơ mi</Link></li>
                    </ul>)}
                </li>
                <li className="h-full mt-16 "
                    onMouseLeave={handleMenuLeave} //ẩn much Quần
                >
                    <div className=' h-9  text-[#a91d3a]  font-bold hover:border-b-2 hover:border-b-[#a91d3a] ' onMouseEnter={handleHoverQuan} ><Link to="/long_pants"> QUẦN</Link></div>
                    {isOpenQuan && (<ul className=' absolute z-50 desktop:w-32 ipad:w-28 bg-[#C73659] desktop:text-base ipad:text-sm uppercase text-left text-white mt-4 '>
                        <li className='py-2 pl-3 border-b-[1px] border-white hover:font-bold hover:pl-3'><Link to="/long_pants"> QUẦN DÀI</Link></li>
                        <li className='py-2 pl-3 hover:font-bold hover:pl-3'><Link to="/short_pants">QUẦN NGẮN</Link></li>
                    </ul>)}
                </li>
                <li className="h-full mt-16 "                    
                    onMouseLeave={handleMenuLeave} //ẩn mục Phụ kiện
                >
                    <div className=' h-9 text-[#a91d3a]  font-bold hover:border-b-2 hover:border-b-[#a91d3a]' onMouseEnter={handleHoverPk}><Link to="/balo">PHỤ KIỆN</Link></div>
                    {isOpenPk && (<ul className=' absolute z-50 desktop:w-32 ipad:w-28 bg-[#C73659] desktop:text-base ipad:text-sm uppercase text-left text-white mt-4 '>
                        <li className='py-2 pl-3 border-b-[1px] border-white hover:font-bold hover:pl-3'><Link to="/balo">cặp</Link></li>
                        <li className='py-2 pl-3 border-b-[1px] border-white hover:font-bold hover:pl-3'><Link to="/handbag">túi xách</Link></li>
                        <li className='py-2 pl-3 border-b-[1px] border-white hover:font-bold hover:pl-3'><Link to="/wallet">ví</Link></li>                    
                        <li className='py-2 pl-3 hover:font-bold hover:pl-3'><Link to="/hat">nón</Link></li>
                    </ul>)}
                </li>

                <li className=" h-9 mt-1 text-center text-[#a91d3a]  font-bold font-mont hover:border-b-2 hover:border-b-[#a91d3a]">
                    <Link to="/about_us">VỀ CHÚNG TÔI</Link></li>
            </ul>
            {/* Thanh tiềm kiếm */}
            <div  className=" basis-3/12 flex flex-row  mt-4  "  >
                <form onSubmit={navigateToAbout} className='w-full flex rounded-lg shadow border items-center' >                    
                    <img className="inline-block m-2" src={Search} alt="search"/>                    
                        <input className="w-full my-2 pr-2 focus:outline-none"
                            placeholder="Tìm kiếm"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />      
                </form>
            </div>
            {/* Nút giỏ hàng */}
            <div className=" basis-1/12 mt-6 ml-10 ">                    
                <Link className="flex flex-row"  to="/cart">
                    <img className="inline-block desktop:h-7 ipad:h-6" src={Cart} alt="cart"/>
                    {/* <FontAwesomeIcon className='h-[30px]' icon={faBagShopping} /> */}
                    {/* Số lượng sản phẩm trong giỏ hàng */}
                    {/* <div className=" bottom-[27px] ml-[3px] absolute font-bold rounded-full text-center content-center align-middle h-[18px] w-[18px] text-base text-black focus:outline-none">{quantityCart}</div> */}
                    <div className=" desktop:bottom-[34px] desktop:h-[18px] desktop:w-[18px] desktop:ml-[14px] desktop:text-sm 
                     ipad:bottom-[35px] ipad:h-[15px] ipad:w-[15px] ipad:ml-[12px] ipad:text-xs
                    absolute bg-[#a91d3a] rounded-full text-center text-white focus:outline-none">{quantityCart}</div>
                </Link>
            </div>
        </nav>        
    </header>
    )
}

export default Navigation