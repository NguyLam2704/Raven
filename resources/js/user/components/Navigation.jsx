import React from 'react';
import Logo from "../assets/Raven.svg"
import Search from "../assets/Search.svg"
import Cart from "../assets/Cart.svg"

const Navigation = ({img, name, price}) => {
    return(
        <header class=" fixed left-0 z-50 top-0 w-full bg-white  ">
        <nav class="flex flex-row items-center justify-between h-24 border-b-[1px] border-b-slate-300 w-full">
            <div class=" items-center justify-items-center basis-2/12 ">
                <img src={Logo} alt="Logo"/>
            </div>
            <ul class=" basis-6/12 items-center flex justify-between mt-10 mb-4 mx-20 ">
                <li class=" h-9 text-center text-[#a91d3a] text-2xl font-bold font-mont"><a href="/home">HOME</a></li>
                <li class=" h-9 text-center text-[#a91d3a] text-2xl font-bold font-mont"><a href="/home">ÁO</a></li>
                <li class=" h-9 text-center text-[#a91d3a] text-2xl font-bold font-mont"><a href="/home">QUẦN</a></li>
                <li class=" h-9 text-center text-[#a91d3a] text-2xl font-bold font-mont"><a href="/home">PHỤ KIỆN</a></li>
                <li class=" h-9 text-center text-[#a91d3a] text-2xl font-bold font-mont"><a href="/home">VỀ CHÚNG TÔI</a></li>
            </ul>
            <div class=" basis-3/12 flex flex-row justify-items-center rounded-[8px] shadow border items-center w-full mt-3 ">
                
                    <img class="inline-block m-2" src={Search} alt="search"/>
                    <span >
                        <input placeholder="Tìm kiếm" class="m-2 focus:outline-none"></input>
                    </span>
                    
            </div>
            <div class=" basis-1/12 flex flex-row mt-3 ml-10 ">
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