import React, { useState } from 'react';
import Logo from "../assets/Raven.svg"
import Search from "../assets/Search.svg"
import Cart from "../assets/Cart.svg"
import { Link, useLocation } from 'react-router-dom';
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
    const navigateToAbout = () => { 
        if( text != ''){            
            navigate('/search', { state: { message: text } });             
            console.log(location.pathname)
        }
    };
    const location = useLocation()
    return(
        
        <header className=" fixed left-0 z-30 top-0 w-full bg-white  ">
        <nav   className="flex flex-row items-center justify-between h-24 border-b-[1px] border-b-slate-300 w-full">
            {/* Logo  */}
            <div className=" items-center justify-items-center basis-2/12 ">
                <Link to="/">
                    <img src={Logo} alt="Logo"/>
                </Link>
            </div>
            {/* Thanh điều hướng */}
            <ul   className=" h-full basis-6/12 items-center justify-between flex mt-10 mb-4 mr-10  ">
                <li className=" h-full items-center justify-center justify-items-center mt-16">
                    <div className=' h-9  text-[#a91d3a] text-2xl font-bold hover:border-b-2 hover:border-b-[#a91d3a] '>
                    <Link to="/">HOME</Link></div>
                </li>
                <li className="h-full mt-16 "
                    onMouseEnter={handleHoverAo} //hiện mục Áo
                    onMouseLeave={handleMenuLeave} //ẩn mục ÁO
                >
                    <div className=' h-9 text-[#a91d3a] text-2xl font-bold hover:border-b-2 hover:border-b-[#a91d3a]  '><Link to="/T_shirt">ÁO</Link></div>
                    {isOpenAo && (<ul className=' absolute z-50 w-32 bg-[#C73659] text-base uppercase text-left text-white mt-4 '>
                        <li className='py-2 pl-3 border-b-[1px] border-white hover:font-bold hover:pl-3'><Link to="/T_shirt">Áo thun</Link></li>
                        <li className='py-2 pl-3 border-b-[1px] border-white hover:font-bold hover:pl-3'><Link to="/polo">Áo polo</Link></li>
                        <li className='py-2 pl-3 border-b-[1px] border-white hover:font-bold hover:pl-3'><Link to="/outwear">Áo khoác</Link></li>                  
                        <li className='py-2 pl-3 border-b-[1px] border-white hover:font-bold hover:pl-3'><Link to="/sweater">Áo sweater</Link></li>
                        <li className='py-2 pl-3 hover:font-bold hover:pl-3 '><Link to="/shirt">Áo sơ mi</Link></li>
                    </ul>)}
                </li>
                <li className="h-full mt-16 "
                    onMouseEnter={handleHoverQuan} //hiện mục Quần
                    onMouseLeave={handleMenuLeave} //ẩn much Quần
                >
                    <div className=' h-9  text-[#a91d3a] text-2xl font-bold hover:border-b-2 hover:border-b-[#a91d3a] '><Link to="/long_pants"> QUẦN</Link></div>
                    {isOpenQuan && (<ul className=' absolute z-50 w-36 bg-[#C73659] text-base uppercase text-left text-white mt-4 '>
                        <li className='py-2 pl-3 border-b-[1px] border-white hover:font-bold hover:pl-3'><Link to="/long_pants"> QUẦN DÀI</Link></li>
                        <li className='py-2 pl-3 hover:font-bold hover:pl-3'><Link to="/short_pants">QUẦN SHORT</Link></li>
                    </ul>)}
                </li>
                <li className="h-full mt-16 "
                    onMouseEnter={handleHoverPk} //hiện mục Phụ kiện
                    onMouseLeave={handleMenuLeave} //ẩn mục Phụ kiện
                >
                    <div className=' h-9 text-[#a91d3a] text-2xl font-bold hover:border-b-2 hover:border-b-[#a91d3a]'><Link to="/balo">PHỤ KIỆN</Link></div>
                    {isOpenPk && (<ul className=' absolute z-50 w-32 bg-[#C73659] text-base uppercase text-left text-white mt-4 '>
                        <li className='py-2 pl-3 border-b-[1px] border-white hover:font-bold hover:pl-3'><Link to="/balo">cặp</Link></li>
                        <li className='py-2 pl-3 border-b-[1px] border-white hover:font-bold hover:pl-3'><Link to="/handbag">túi xách</Link></li>
                        <li className='py-2 pl-3 border-b-[1px] border-white hover:font-bold hover:pl-3'><Link to="/wallet">ví</Link></li>                    
                        <li className='py-2 pl-3 hover:font-bold hover:pl-3'><Link to="/hat">nón</Link></li>
                    </ul>)}
                </li>

                <li className=" h-9 mt-1 text-center text-[#a91d3a] text-2xl font-bold font-mont hover:border-b-2 hover:border-b-[#a91d3a]">
                    <Link to="/about_us">VỀ CHÚNG TÔI</Link></li>
            </ul>
            {/* Thanh tiềm kiếm */}
            <div  className=" basis-3/12 flex flex-row justify-items-center rounded-lg shadow border items-center w-fit mt-4  "  >
                <form onSubmit={navigateToAbout} className='w-full flex' >                    
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
                    <img className="inline-block" src={Cart} alt="cart"/>
                    <span>
                        {/* Số lượng sản phẩm trong giỏ hàng */}
                        <div className="ml-1 focus:outline-none">3</div>
                    </span>
                </Link>
            </div>
        </nav>        
    </header>
    )
}

export default Navigation