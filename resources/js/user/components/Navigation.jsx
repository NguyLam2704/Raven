import React, { useState } from 'react';
import Logo from "../assets/Raven.svg"
import Search from "../assets/Search.svg"
import Cart from "../assets/Cart.svg"
import { Link } from 'react-router-dom';
const Navigation = ({img, name, price}) => {
    const [isOpenAo, setOpenAo] = useState(false);
    const [isOpenQuan, setOpenQuan] = useState(false);
    const [isOpenPk, setOpenPk] = useState(false);

    const handleHoverAo = () => {
        setOpenAo(true);
    };
    const handleHoverQuan = () => {
        setOpenQuan(true);
    };
    const handleHoverPk = () => {
        setOpenPk(true);
    };

    const handleMenuLeave = () => {
        setOpenAo(false);
        setOpenQuan(false);
        setOpenPk(false);
    };


    return(
        <header class=" fixed left-0 z-40 top-0 w-full bg-white  ">
        <nav   class="flex flex-row items-center justify-between h-24 border-b-[1px] border-b-slate-300 w-full">
            <div class=" items-center justify-items-center basis-2/12 ">
                <img src={Logo} alt="Logo"/>
            </div>
            <ul   class=" h-full basis-6/12 items-center justify-between flex mt-10 mb-4 mr-10  ">
                <li class=" h-full items-center justify-center justify-items-center mt-16">
                    <div className=' h-9  text-[#a91d3a] text-2xl font-bold hover:border-b-2 hover:border-b-[#a91d3a] '>
                    <Link to="/">HOME</Link></div>
                </li>
                <li class="h-full mt-16 "
                    onMouseEnter={handleHoverAo}
                    onMouseLeave={handleMenuLeave}
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
                <li class="h-full mt-16 "
                    onMouseEnter={handleHoverQuan}
                    onMouseLeave={handleMenuLeave}
                >
                    <div className=' h-9  text-[#a91d3a] text-2xl font-bold hover:border-b-2 hover:border-b-[#a91d3a] '><Link to="/long_pants"> QUẦN</Link></div>
                    {isOpenQuan && (<ul className=' absolute z-50 w-36 bg-[#C73659] text-base uppercase text-left text-white mt-4 '>
                        <li className='py-2 pl-3 border-b-[1px] border-white hover:font-bold hover:pl-3'><Link to="/long_pants"> QUẦN DÀI</Link></li>
                        <li className='py-2 pl-3 hover:font-bold hover:pl-3'><Link to="/short_pants">QUẦN SHORT</Link></li>
                    </ul>)}
                </li>
                <li class="h-full mt-16 "
                    onMouseEnter={handleHoverPk}
                    onMouseLeave={handleMenuLeave}
                >
                    <div className=' h-9 text-[#a91d3a] text-2xl font-bold hover:border-b-2 hover:border-b-[#a91d3a]'><Link to="/balo">PHỤ KIỆN</Link></div>
                    {isOpenPk && (<ul className=' absolute z-50 w-32 bg-[#C73659] text-base uppercase text-left text-white mt-4 '>
                        <li className='py-2 pl-3 border-b-[1px] border-white hover:font-bold hover:pl-3'><Link to="/balo">cặp</Link></li>
                        <li className='py-2 pl-3 border-b-[1px] border-white hover:font-bold hover:pl-3'><Link to="/handbag">túi xách</Link></li>
                        <li className='py-2 pl-3 border-b-[1px] border-white hover:font-bold hover:pl-3'><Link to="/wallet">ví</Link></li>                    
                        <li className='py-2 pl-3 hover:font-bold hover:pl-3'><Link to="/hat">nón</Link></li>
                    </ul>)}
                </li>

                <li class=" h-9 text-center text-[#a91d3a] text-2xl font-bold font-mont hover:border-b-2 hover:border-b-[#a91d3a]">
                    <Link to="/about_us">VỀ CHÚNG TÔI</Link></li>
            </ul>
            
            <div class=" basis-3/12 flex flex-row justify-items-center rounded-[8px] shadow border items-center w-fit mt-4 ">
                
                    <img class="inline-block m-2" src={Search} alt="search"/>
                    <span >
                        <input placeholder="Tìm kiếm" class="m-2 focus:outline-none"></input>
                    </span>
                    
            </div>
            <div class=" basis-1/12 flex flex-row mt-6 ml-10 ">
                    <img class="inline-block" src={Cart} alt="cart"/>
                    <span>
                        <div class="ml-1 focus:outline-none">3</div>
                    </span>
            </div>
        </nav>
        
    </header>
    )
}

export default Navigation