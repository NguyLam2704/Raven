import React, { useState, useEffect } from 'react';
import Logo from "../assets/qua_moi.png"
import Search from "../assets/Search.svg"
import Cart from "../assets/Cart.svg"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {

    faBars,
    faCaretDown,
    faCaretUp,
    faClose
} from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
    //Giá trị để kiểm soát trạng thái ẩn/hiện của mục Áo
    const [isOpenAo, setOpenAo] = useState(false);
    //Giá trị để kiểm soát trạng thái ẩn/hiện của mục Quần
    const [isOpenQuan, setOpenQuan] = useState(false);
    //Giá trị để kiểm soát trạng thái ẩn/hiện của mục Phụ kiện
    const [isOpenPk, setOpenPk] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

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

        //Kiểm soát trạng thái hiện của mục Áo
    const handleIsAo = () => {
        setOpenAo(!isOpenAo);
    };
    //Kiểm soát trạng thái ẩn/hiện của mục Quần
    const handleIsQuan = () => {
        setOpenQuan(!isOpenQuan);
    };
    //Kiểm soát trạng thái ẩn/hiện của mục Phụ kiện
    const handleIsPk = () => {
        setOpenPk(!isOpenPk);
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
    
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

    return(
        <div className="flex z-50 w-full border-4 border-green-500 max-w-[1557px] mx-auto bg-[#F5F6FA]">
            <div className={`fixed desktop:hidden inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out
                ${isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"} z-20`}
                onClick={toggleSidebar}>
            </div>

                {/* Sidebar mobile  */}
            <div className={`
                    mobile:z-30 ipad:z-30
                    mobile:absolute ipad:absolute desktop:hidden
                    transition-transform duration-300 ease-in-out 
            `}>
  
                {isSidebarOpen && (
                    <nav className={`mobile:w-[70%] ipad:w-[50%] h-full bg-[#EEEEEE] text-white flex flex-col
                            mobile:px-3 py-5 fixed left-0 top-0 bottom-0 border-r border-gray-300
                            transform transition-transform duration-300 ease-in-out
                            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} z-30`}
                    >
                        {/* Sidebar */}
                        <ul className="w-full h-full flex flex-col gap-4 items-start justify-start px-4 pt-8">
                            <li className='w-full flex items-end justify-between'>
                                <div className='text-[#1E0342] font-extrabold text-2xl'>Raven Store</div>
                                <button onClick={toggleSidebar}>
                                    <FontAwesomeIcon icon={faClose} color='#222831' size='2xl'/>
                                </button>
                            </li>
                            <div className='border border-[#1E0342] w-full'> </div>
                            <li className="w-full">
                                <div className='text-[#1E0342] text-lg font-bold  active:scale-[0.98] pl-2'>
                                    <Link to="/">HOME</Link>
                                </div>
                            </li>
                            <li className="w-full relative">
                                <div className='text-[#1E0342] flex justify-between text-lg font-bold  focus:scale-[0.98]  pl-2' 
                                    onClick={handleIsAo}>
                                    <Link>ÁO</Link>
                                    <FontAwesomeIcon icon={isOpenAo ? faCaretDown : faCaretUp} size='xl'/>
                                </div>
                                {isOpenAo && (
                                    <ul className='top-0 z-50 w-full rounded-md text-base uppercase text-left font-semibold text-[#1E0342] mt-0 ml-8'>
                                        <li onClick={toggleSidebar} className='py-2 px-3 active:scale-[0.98]'><Link to="/T_shirt">Áo thun</Link></li>
                                        <li onClick={toggleSidebar} className='py-2 px-3 active:scale-[0.98]'><Link to="/polo">Áo polo</Link></li>
                                        <li onClick={toggleSidebar} className='py-2 px-3 active:scale-[0.98]'><Link to="/outwear">Áo khoác</Link></li>
                                        <li onClick={toggleSidebar} className='py-2 px-3 active:scale-[0.98]'><Link to="/sweater">Áo sweater</Link></li>
                                        <li onClick={toggleSidebar} className='py-2 px-3 active:scale-[0.98]'><Link to="/shirt">Áo sơ mi</Link></li>
                                    </ul>
                                )}
                            </li>
                            <li className="w-full relative">
                                <div className='text-[#1E0342] flex justify-between text-lg font-bold  focus:scale-[0.98]  pl-2' 
                                    onClick={handleIsQuan}>
                                    <Link>QUẦN</Link>
                                    <FontAwesomeIcon icon={isOpenQuan ? faCaretDown : faCaretUp} size='xl'/>
                                </div>
                                {isOpenQuan && (
                                    <ul className='top-0 z-50 w-full rounded-md text-base uppercase text-left font-semibold text-[#1E0342] mt-0 ml-8'>
                                        <li onClick={toggleSidebar} className='py-2 px-3 active:scale-[0.98]'><Link to="/long_pants">QUẦN DÀI</Link></li>
                                        <li onClick={toggleSidebar} className='py-2 px-3 active:scale-[0.98]'><Link to="/short_pants">QUẦN SHORT</Link></li>
                                    </ul>
                                )}
                            </li>
                            <li className="w-full relative">
                                <div className='text-[#1E0342] flex justify-between text-lg font-bold  focus:scale-[0.98]  pl-2' 
                                    onClick={handleIsPk}>
                                    <Link>PHỤ KIỆN</Link>
                                    <FontAwesomeIcon icon={isOpenPk ? faCaretDown : faCaretUp} size='xl'/>
                                </div>
                                {isOpenPk && (
                                    <ul className='top-0 z-50 w-full rounded-md text-base uppercase text-left font-semibold text-[#1E0342] mt-0 ml-8'>
                                        <li onClick={toggleSidebar} className='py-2 px-3 active:scale-[0.98]'><Link to="/balo">cặp</Link></li>
                                        <li onClick={toggleSidebar} className='py-2 px-3 active:scale-[0.98]'><Link to="/handbag">túi xách</Link></li>
                                        <li onClick={toggleSidebar} className='py-2 px-3 active:scale-[0.98]'><Link to="/wallet">ví</Link></li>
                                        <li onClick={toggleSidebar} className='py-2 px-3 active:scale-[0.98]'><Link to="/hat">nón</Link></li>
                                    </ul>
                                )}
                            </li>
                            <li className="w-full">
                                <div className='text-[#1E0342] text-lg font-bold hover:border-l-4 hover:border-l-[#222831] active:scale-[0.98] hover:scale-[1.03] pl-2'>
                                    <Link to="/about_us">VỀ CHÚNG TÔI</Link>
                                </div>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>


            <div>
                <header className="header shadow-md w-full bg-[#EEEEEE] fixed top-0 right-0 flex items-center mobile:justify-center h-20 px-4 border-b font-Montserrat border-gray-300  z-10">
                    <button className={`desktop:hidden absolute left-6 mr-4`} onClick={toggleSidebar}>
                            <FontAwesomeIcon icon={faBars} />
                    </button>  


                    <Link
                        to="/"
                        className="flex justify-center items-center desktop:absolute desktop:left-5"
                    >
                        <img src={Logo} alt="Logo" className='mobile:h-14 mobile:w-14 desktop:w-20 desktop:h-20'/>
                    </Link>


                    {/* Của desktop  */}
                    <nav className={`w-[45%] max-w-[1557px] mobile:hidden desktop:flex flex-row items-center justify-center h-20 `}>
                        {/* Thanh điều hướng */}
                        <ul   className=" h-full gap-16 items-center justify-between flex mx-auto  ">
                            <li className=" h-full items-center justify-center justify-items-center mt-16 ">
                                <div className=' h-9  text-[#1E0342] text-lg font-bold hover:border-b-2 hover:border-b-[#222831] active:scale-[0.98] hover:scale-[1.03] '>
                                <Link to="/">HOME</Link></div>
                            </li>
                            <li className="h-full mt-16 "
                                onMouseLeave={handleMenuLeave} //ẩn mục ÁO
                            >
                                <div className=' h-9 text-[#1E0342] text-lg font-bold hover:border-b-2 hover:border-b-[#222831] active:scale-[0.98] hover:scale-[1.03]' 
                                    onMouseEnter={handleHoverAo} >
                                        <Link to="/T_shirt">
                                            ÁO
                                        </Link>
                                </div>
                                {isOpenAo && (<ul className=' absolute z-50 w-32 bg-[#1E0342] text-base uppercase text-left text-white mt-4 '>
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
                                <div className=' h-9  text-[#1E0342] text-lg font-bold hover:border-b-2 hover:border-b-[#222831] active:scale-[0.98] hover:scale-[1.03]' 
                                    onMouseEnter={handleHoverQuan} >
                                        <Link to="/long_pants"> 
                                            QUẦN
                                        </Link>
                                </div>
                                {isOpenQuan && (<ul className=' absolute z-50 w-36 bg-[#1E0342] text-base uppercase text-left text-white mt-4 '>
                                    <li className='py-2 pl-3 border-b-[1px] border-white hover:font-bold hover:pl-3'><Link to="/long_pants"> QUẦN DÀI</Link></li>
                                    <li className='py-2 pl-3 hover:font-bold hover:pl-3'><Link to="/short_pants">QUẦN SHORT</Link></li>
                                </ul>)}
                            </li>
                            <li className="h-full mt-16 "                    
                                onMouseLeave={handleMenuLeave} //ẩn mục Phụ kiện
                            >
                                <div className=' h-9 text-[#1E0342] text-lg font-bold hover:border-b-2 hover:border-b-[#222831] active:scale-[0.98] hover:scale-[1.03]' onMouseEnter={handleHoverPk}><Link to="/balo">PHỤ KIỆN</Link></div>
                                {isOpenPk && (<ul className=' absolute z-50 w-32 bg-[#1E0342] text-base uppercase text-left text-white mt-4 '>
                                    <li className='py-2 pl-3 border-b-[1px] border-white hover:font-bold hover:pl-3'><Link to="/balo">cặp</Link></li>
                                    <li className='py-2 pl-3 border-b-[1px] border-white hover:font-bold hover:pl-3'><Link to="/handbag">túi xách</Link></li>
                                    <li className='py-2 pl-3 border-b-[1px] border-white hover:font-bold hover:pl-3'><Link to="/wallet">ví</Link></li>                    
                                    <li className='py-2 pl-3 hover:font-bold hover:pl-3'><Link to="/hat">nón</Link></li>
                                </ul>)}
                            </li>

                            <li className=" h-full items-center justify-center justify-items-center mt-16">
                                <div className=' h-9  text-[#1E0342] text-lg font-bold hover:border-b-2 hover:border-b-[#222831] active:scale-[0.98] hover:scale-[1.03] '>
                                <Link to="/about_us">VỀ CHÚNG TÔI</Link></div>
                            </li>
                        </ul>
                    </nav>  

                    {/*tìm kiếm của desktop  */}
                    <div className='max-w-[550px] desktop:absolute desktop:right-7 mobile:hidden desktop:flex desktop:w-[25%] flex-row'>
                                            {/* Thanh tiềm kiếm */}
                        <div  className="w-[550px] flex flex-row bg-white justify-items-center rounded-lg shadow border items-center mt-4  "  >
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
                        <div className=" w-1/5 mt-6 ml-4 ">                    
                            <Link className="flex flex-row"  to="/cart">
                                <img className="inline-block desktop:h-7 ipad:h-6" src={Cart} alt="cart"/>
                                {/* <FontAwesomeIcon className='h-[30px]' icon={faBagShopping} /> */}
                                {/* Số lượng sản phẩm trong giỏ hàng */}
                                {/* <div className=" bottom-[27px] ml-[3px] absolute font-bold rounded-full text-center content-center align-middle h-[18px] w-[18px] text-base text-black focus:outline-none">{quantityCart}</div> */}
                                <div className=" desktop:bottom-[20px] desktop:h-[18px] desktop:w-[18px] desktop:ml-[14px] desktop:text-sm 
                                ipad:bottom-[35px] ipad:h-[15px] ipad:w-[15px] ipad:ml-[12px] ipad:text-xs
                                absolute bg-[#a91d3a] rounded-full text-center text-white focus:outline-none">{quantityCart}</div>
                            </Link>
                        </div>
                    </div>    


                    {/* tìm kiếm của mobile  */}
                    <div className="flex right-6 absolute items-center gap-2 desktop:hidden">
                        {/* Search */}
                        <div className="relative">
                            <button
                                className="p-2 rounded-full "
                                onClick={() => setMenuOpen(!menuOpen)}
                            >
                                <img src={Search} alt="search icon" className='mobile:h-5 mobile:w-5' />
                            </button>
                            {menuOpen && (
                                <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg p-2">
                                    <form onSubmit={navigateToAbout} className="flex items-center">
                                        <input
                                            className="flex-1 p-2 border rounded-l focus:outline-none"
                                            placeholder="Tìm kiếm..."
                                            value={text}
                                            onChange={(e) => setText(e.target.value)}
                                        />
                                        <button
                                            type="submit"
                                            className="p-2 bg-[#1E0342] text-white rounded-r"
                                        >
                                            Tìm
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>

                        {/* Cart */}
                        <Link to="/cart" className="relative">
                            <img
                                className="w-8 h-8 mobile:h-5 mobile:w-5 "
                                src={Cart}
                                alt="cart"
                            />
                            {quantityCart > 0 && (
                                <span className="absolute mobile:-top-1 desktop:-top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                    {quantityCart}
                                </span>
                            )}
                        </Link>
                    </div>
                </header>
            </div>


        </div>

    )
}

export default Navigation