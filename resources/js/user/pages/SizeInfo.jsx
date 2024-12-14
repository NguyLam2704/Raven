import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import size from '../assets/size.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

//Hướng dẫn chọn size
const SizeInfo = () => {

    const [showScrollToTop, setShowScrollToTop] = useState(false);
    
        // Theo dõi sự kiện scroll
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;

            // Hiển thị nút khi scroll gần đến cuối trang
            setShowScrollToTop(scrollTop > clientHeight);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

        // Hàm lướt lên đầu trang
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return(
        <div className="w-full bg-white font-Public">
            <Navigation/>
            <div className="w-full justify-items-center mt-[90px] ">
                <div className="w-8/12 text-center desktop:text-5xl ipad:text-4xl text-[#1E0342] font-bold py-10">RAVEN</div>
                <div className="w-full justify-items-center">
                <img className="desktop:w-8/12 ipad:w-9/12 mobile:w-11/12" src={size} alt="size" />   
                </div>                
            </div>
            <Footer/>
                        {/* Nút Lên đầu trang */}
            {showScrollToTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-4 right-4 p-3 bg-[#1E0342] text-white rounded-full shadow-lg hover:bg-blue-600"
                >
                     <FontAwesomeIcon icon={faArrowUp} color='white' className='h-6 w-6' />  
                </button>
            )}          
        </div>
    )
}

export default SizeInfo