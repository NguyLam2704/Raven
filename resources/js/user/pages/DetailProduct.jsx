import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import CartMini from '../components/Cart/CartMini';


const DetailProduct = () =>{
    const [isCartMini, setCart] =useState(false)
    const handleCart = () => {
        setCart(!isCartMini)
    }

    return(
        
        <div className={`w-full  ${isCartMini ? 'overflow-hidden h-screen' : 'overflow-auto'}`}>
            <Navigation/>
            <div className='w-full justify-items-center pt-16 mt-[90px] z-40'>
                <button onClick={handleCart} className='bg-red-50'>Open cart</button>
                <div className='w-10/12 border-b-[3px] border-black text-center text-7xl font-extrabold py-10 '>RAVEN</div>
                <div className='w-10/12 text-justify text-2xl font-semibold pt-10'>Raven là thương hiệu thời trang nổi bật với phong cách trẻ trung, mới mẻ và đặc biệt là sự độc đáo. Được thiết kế dành riêng cho những người yêu thích sự sáng tạo và cá tính, Raven mang đến những bộ sưu tập thời trang không chỉ bắt mắt mà còn thể hiện rõ nét cá nhân của người mặc. Với mỗi sản phẩm, Raven không chỉ chú trọng  chất lượng mà còn tạo nên những thiết kế độc đáo, giúp bạn tự tin tỏa sáng, khẳng định phong cách và chất riêng của bạn.</div>
                <div className='w-10/12 text-center text-2xl font-bold pt-2 pb-10'>Hãy để Raven đồng hành cùng bạn trên hành trình khám phá và thể hiện bản thân!</div>
            </div>
            
            <Footer/>
            { isCartMini && <CartMini handleCart={()=>handleCart()} />

            }
        </div>
    )
}

export default DetailProduct