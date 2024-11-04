import React from 'react';

const Product = ({img, name, price, sale}) => {
    return(
        <div class=" w-full justify-items-center items-center">
            <div class="w-[250px] h-[350px] justify-items-center items-center rounded-[20px] border border-[#d9d9d9] relative">
                    <div className={`absolute w-[250px] h-[350px] ${0} ?}`}>
                        <div class="w-[38px] h-9 mt-2 ml-5 bg-[#a91d3a] text-center text-white text-xs font-normal font-['Public Sans']">{sale}%<br/>OFF</div>                          
                    </div>                    
                <img class="w-[230px] h-[235px] my-2" src={img} />
                <div class=" text-center text-base font-medium">{name}</div>
                 <div class=" mt-3 h-5 text-center text-[#a91d3a] text-xl font-medium">{price}</div>
            </div>                    
        </div>
    )
}


export default Product