import React, { useState, useEffect } from 'react';
import Logo from "../assets/qua_moi.png"
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
        <div className="flex w-full fixed z-30 top-0 mx-auto bg-[#f7f2e1]">
            <header className="desktop:flex flex-row self-center shadow-md  items-center px-5 justify-center top-0 w-full bg-[#EEEEEE] font-montserrat ">
                {/* Logo  */}
                <div className="absolute border-red-500 border items-center h-20 left-2 justify-items-center ">
                        <Link to="/">
                            <img src={Logo} alt="Logo" className='w-22 h-20 ml-5'/>
                        </Link>
                </div>

                <nav className={`w-[45%] max-w-[1557px] mobile:hidden desktop:flex flex-row items-center justify-center h-20 border border-red-700`}>
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
                            {isOpenAo && (<ul className=' absolute z-50 w-32 bg-[#C73659] text-base uppercase text-left text-white mt-4 '>
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
                            {isOpenQuan && (<ul className=' absolute z-50 w-36 bg-[#C73659] text-base uppercase text-left text-white mt-4 '>
                                <li className='py-2 pl-3 border-b-[1px] border-white hover:font-bold hover:pl-3'><Link to="/long_pants"> QUẦN DÀI</Link></li>
                                <li className='py-2 pl-3 hover:font-bold hover:pl-3'><Link to="/short_pants">QUẦN SHORT</Link></li>
                            </ul>)}
                        </li>
                        <li className="h-full mt-16 "                    
                            onMouseLeave={handleMenuLeave} //ẩn mục Phụ kiện
                        >
                            <div className=' h-9 text-[#1E0342] text-lg font-bold hover:border-b-2 hover:border-b-[#222831] active:scale-[0.98] hover:scale-[1.03]' onMouseEnter={handleHoverPk}><Link to="/balo">PHỤ KIỆN</Link></div>
                            {isOpenPk && (<ul className=' absolute z-50 w-32 bg-[#C73659] text-base uppercase text-left text-white mt-4 '>
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

                <div className='max-w-[550px] w-[25%] absolute right-2 flex flex-row'>
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

                                {/* Hamburger Menu for mobile view */}
                <div className="md:hidden flex items-center">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-button">
                        <div className={`hamburger ${menuOpen ? 'open' : ''}`}>
                            <span className="bar"></span>
                            <span className="bar"></span>
                            <span className="bar"></span>
                        </div>
                    </button>
                </div>
            </header>
        </div>

    )
}

export default Navigation