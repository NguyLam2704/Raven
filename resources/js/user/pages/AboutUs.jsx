import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import about1 from '../assets/about1.jpg'
import founder1 from '../assets/founder1.jpg'
import founder2 from '../assets/founder2.jpg'
import founder3 from '../assets/founder3.jpg'
import founder4 from '../assets/founder4.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faArrowUp} from "@fortawesome/free-solid-svg-icons"

const AboutUs = () => {
    //Giá trị để kiểm soát trạng thái ẩn/hiện của năm 2020
    const [is2020,set2020] = useState(false)
    //Giá trị để kiểm soát trạng thái ẩn/hiện của năm 2021
    const [is2021,set2021] = useState(false)
    //Giá trị để kiểm soát trạng thái ẩn/hiện của năm 2022
    const [is2022,set2022] = useState(false)
    //Giá trị để kiểm soát trạng thái ẩn/hiện của năm 2023
    const [is2023,set2023] = useState(false)
    //Giá trị để kiểm soát trạng thái ẩn/hiện của năm 2024
    const [is2024,set2024] = useState(false)

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
        <div className='bg-white'>
            <Navigation/>
            <div className='w-full justify-items-center pt-16 mt-[90px]'>
                <div className='w-10/12 border-b-[3px] border-black text-center desktop:text-7xl ipad:text-6xl mobile:text-5xl font-extrabold py-10 '>RAVEN</div>
                <div className='w-10/12 text-justify desktop:text-2xl ipad:text-xl mobile:text-lg font-medium pt-10'>Raven là thương hiệu thời trang nổi bật với phong cách trẻ trung, mới mẻ và đặc biệt là sự độc đáo. Được thiết kế dành riêng cho những người yêu thích sự sáng tạo và cá tính, Raven mang đến những bộ sưu tập thời trang không chỉ bắt mắt mà còn thể hiện rõ nét cá nhân của người mặc. Với mỗi sản phẩm, Raven không chỉ chú trọng  chất lượng mà còn tạo nên những thiết kế độc đáo, giúp bạn tự tin tỏa sáng, khẳng định phong cách và chất riêng của bạn.</div>
                <div className='w-10/12 text-center desktop:text-2xl ipad:text-xl mobile:text-lg font-bold pt-2 pb-10'>Hãy để Raven đồng hành cùng bạn trên hành trình khám phá và thể hiện bản thân!</div>
                <img className='w-10/12' src={about1} alt="img" />
            </div>
            <div className='w-full justify-items-center pt-16 desktop:text-xl ipad:text-lg mobile:text-sm'>            
                <div className='desktop:w-10/12 ipad:w-10/12 mobile:w-11/12 grid grid-cols-3 py-5'>
                    <div className=' w-full h-full rounded-full justify-items-center'> 
                        <img className='desktop:h-60 desktop:w-60 ipad:h-48 ipad:w-48 mobile:w-32 mobile:h-32 rounded-full' src={founder1} alt="" />
                    </div>
                    <div className=' col-span-2 content-center text-justify  font-medium'>Đoàn Nguyễn Lâm Là người sáng lập và giám đốc sáng tạo của Raven, Đoàn Nguyễn Lâm mang đến sự sáng tạo và tầm nhìn độc đáo cho thương hiệu. Với nền tảng vững chắc trong thiết kế thời trang và niềm đam mê không ngừng nghỉ, Lâm đã dẫn dắt Raven trở thành biểu tượng của phong cách trẻ trung và mới mẻ.</div>
                </div>
                <div className='desktop:w-10/12 ipad:w-10/12 mobile:w-11/12 grid grid-cols-3 py-5'>                    
                    <div className=' col-span-2 content-center text-justify  font-medium'>Thạch Minh Luân là chuyên gia về marketing và truyền thông, đóng vai trò quan trọng trong việc xây dựng hình ảnh và thương hiệu của Raven. Với kinh nghiệm dày dặn trong lĩnh vực quảng cáo và truyền thông, Luân đã giúp Raven tiếp cận và thu hút được đông đảo khách hàng trẻ tuổi.</div>
                    <div className=' w-full justify-items-center'> 
                        <img className='desktop:h-60 desktop:w-60 ipad:h-48 ipad:w-48 mobile:w-32 mobile:h-32  rounded-full' src={founder2} alt="" />
                    </div>
                </div>
                <div className='desktop:w-10/12 ipad:w-10/12 mobile:w-11/12 grid grid-cols-3 py-5'>
                    <div className=' w-full justify-items-center'> 
                        <img className='desktop:h-60 desktop:w-60 ipad:h-48 ipad:w-48 mobile:w-32 mobile:h-32 rounded-full' src={founder3} alt="" />
                    </div>
                    <div className='col-span-2 content-center text-justify font-medium'>Cao Quốc Kiệt là giám đốc tài chính của Raven, Cao Quốc Kiệt đảm bảo rằng mọi hoạt động tài chính của công ty đều được quản lý một cách hiệu quả. Với kiến thức sâu rộng về tài chính và quản lý, Kiệt đã giúp Raven phát triển bền vững và mở rộng quy mô kinh doanh.</div>
                </div>
                <div className='desktop:w-10/12 ipad:w-10/12 mobile:w-11/12 grid grid-cols-3 py-5 rounded-full'>                    
                    <div className=' col-span-2 content-center text-justify font-medium'>Đỗ Nguyên Phương là giám đốc sản xuất của Raven, chịu trách nhiệm giám sát quá trình sản xuất và đảm bảo chất lượng sản phẩm. Với kinh nghiệm lâu năm trong ngành công nghiệp thời trang, Phương đã mang đến những sản phẩm chất lượng cao và độc đáo, giúp Raven khẳng định vị thế trên thị trường.</div>
                    <div className=' w-full justify-items-center'> 
                        <img className='desktop:h-60 desktop:w-60 ipad:h-48 ipad:w-48 mobile:w-32 mobile:h-32  rounded-full' src={founder4} alt="" />
                    </div>
                </div>
            </div>
            <div className='w-full h-96  justify-items-center pt-16 mb-30'>
                <div className='w-10/12 text-center desktop:text-3xl ipad:text-2xl mobile:text-xl font-bold py-10 '>LỊCH SỬ PHÁT TRIỂN</div>
                <div className=' w-10/12 pb-1 flex flow-row justify-between desktop:text-xl ipad:text-lg mobile:text-sm font-bold text-[#1E0342]'>
                    <div></div>
                    <div >2021</div>
                    <div></div>
                    <div >2023</div>
                    <div></div>
                </div>
                <div className=' w-10/12 h-[6px] items-center bg-[#1E0342] rounded-3xl desktop:flex ipad:hidden mobile:hidden flow-row justify-between'>
                    <FontAwesomeIcon className=' w-5 h-5 bg-white rounded-3xl border-[3px] border-white hover:border-[#1E0342]' color='#1E0342' icon={faCircle} 
                        onMouseEnter={()=>set2020(true)} //hiện 2020
                        onMouseLeave={()=>set2020(false)} //ẩn 2020
                     />
                    <FontAwesomeIcon  className=' w-5 h-5 bg-white rounded-3xl border-[3px] border-white hover:border-[#1E0342]' color='#1E0342'icon={faCircle} 
                        onMouseEnter={()=>set2021(true)}  //hiện 2021
                        onMouseLeave={()=>set2021(false)} //ẩn 2021
                    />
                    <FontAwesomeIcon className=' w-5 h-5 bg-white rounded-3xl border-[3px] border-white hover:border-[#1E0342]' color='#1E0342' icon={faCircle} 
                         onMouseEnter={()=>set2022(true)} //hiện 2022
                         onMouseLeave={()=>set2022(false)} //ẩn 2022
                    />
                    <FontAwesomeIcon  className=' w-5 h-5 bg-white rounded-3xl border-[3px] border-white hover:border-[#1E0342]' color='#1E0342' icon={faCircle}
                        onMouseEnter={()=>set2023(true)} //hiện 2023
                        onMouseLeave={()=>set2023(false)} //ẩn 2023
                    />
                    <FontAwesomeIcon  className=' w-5 h-5 bg-white rounded-3xl border-[3px] border-white hover:border-[#1E0342]' color='#1E0342' icon={faCircle} 
                        onMouseEnter={()=>set2024(true)}  //hiện 2024
                        onMouseLeave={()=>set2024(false)} //ẩn 2024
                    />
                </div>
                <div className='desktop:hidden w-10/12 h-[5px] items-center bg-[#1E0342] rounded-3xl flex flow-row justify-between'>
                    <FontAwesomeIcon className=' w-4 h-4 bg-white rounded-3xl border-[2px] border-white hover:border-[#1E0342]' color='#1E0342' icon={faCircle} 
                        onClick={()=>{
                            set2020(true)
                            set2021(false)
                            set2022(false)
                            set2023(false)
                            set2024(false)
                        }}
                     />
                    <FontAwesomeIcon  className=' w-4 h-4 bg-white rounded-3xl border-[2px] border-white hover:border-[#1E0342]' color='#1E0342'icon={faCircle} 
                        onClick={()=>{
                            set2020(false)
                            set2021(true)
                            set2022(false)
                            set2023(false)
                            set2024(false)
                        }}
                    />
                    <FontAwesomeIcon className=' w-4 h-4 bg-white rounded-3xl border-[2px] border-white hover:border-[#1E0342]' color='#1E0342' icon={faCircle} 
                         onClick={()=>{
                            set2020(false)
                            set2021(false)
                            set2022(true)
                            set2023(false)
                            set2024(false)
                        }}
                    />
                    <FontAwesomeIcon  className=' w-4 h-4 bg-white rounded-3xl border-[2px] border-white hover:border-[#1E0342]' color='#1E0342' icon={faCircle}
                        onClick={()=>{
                            set2020(false)
                            set2021(false)
                            set2022(false)
                            set2023(true)
                            set2024(false)
                        }}
                    />
                    <FontAwesomeIcon  className=' w-4 h-4 bg-white rounded-3xl border-[2px] border-white hover:border-[#1E0342]' color='#1E0342' icon={faCircle} 
                        onClick={()=>{
                            set2020(false)
                            set2021(false)
                            set2022(false)
                            set2023(false)
                            set2024(true)
                        }}
                    />
                </div>
                <div className=' w-10/12 pt-1 flex flow-row justify-between desktop:text-xl ipad:text-lg mobile:text-sm font-bold text-[#1E0342]'>
                    <div>2020</div>
                    <div ></div>
                    <div>2022</div>
                    <div ></div>
                    <div>2024</div>
                </div>
                    { is2020 && (
                        <div className='w-10/12 text-justify desktop:text-xl ipad:text-lg mobile:text-base font-medium pt-5 pb-5 '>
                        <div className='desktop:text-2xl ipad:text-xl mobile:text-lg font-bold text-[#1E0342]'> 2020 - Khởi Đầu:</div>
                            Raven được thành lập vào năm 2016 bởi bốn nhà sáng lập đầy nhiệt huyết: Đoàn Nguyễn Lâm, Thạch Minh Luân, Cao Quốc Kiệt, và Đỗ Nguyên Phương. Với tầm nhìn mang đến phong cách thời trang trẻ trung, mới mẻ và độc đáo, Raven nhanh chóng thu hút sự chú ý của giới trẻ.
                        </div>
                    )}
                    { is2021 && (
                        <div className='w-10/12 text-justify desktop:text-xl ipad:text-lg mobile:text-base font-semibold pt-5 pb-5 '>
                        <div className='desktop:text-2xl ipad:text-xl mobile:text-lg font-bold text-[#1E0342]'> 2021 - Mở Rộng Quy Mô</div>
                            Với sự thành công ban đầu, Raven mở rộng quy mô sản xuất và khai trương cửa hàng đầu tiên tại TP. Hồ Chí Minh. Đây là bước ngoặt quan trọng, giúp Raven tiếp cận được nhiều khách hàng hơn và tăng cường sự hiện diện của thương hiệu.
                        </div>
                    )}
                    { is2022 && (
                        <div className='w-10/12 text-justify desktop:text-xl ipad:text-lg mobile:text-base font-semibold pt-5 pb-5 '>
                        <div className='desktop:text-2xl ipad:text-xl mobile:text-lg font-bold text-[#1E0342]'> 2022 - Đa Dạng Hóa Sản Phẩm</div>
                        Raven tiếp tục đa dạng hóa sản phẩm với các dòng thời trang mới như phụ kiện, cặp, nón và túi xách. Sự đa dạng này không chỉ đáp ứng nhu cầu của khách hàng mà còn giúp Raven mở rộng thị trường.
                    </div>
                    )}
                    { is2023 && (
                        <div className='w-10/12 text-justify desktop:text-xl ipad:text-lg mobile:text-base font-semibold pt-5 pb-5 '>
                        <div className='desktop:text-2xl ipad:text-xl mobile:text-lg  font-bold text-[#1E0342]'> 2023 - Hợp Tác Chiến Lược: </div>
                        Raven ký kết nhiều hợp tác chiến lược với các nhà thiết kế và thương hiệu nổi tiếng, mang đến những bộ sưu tập độc đáo và đẳng cấp. Những hợp tác này không chỉ nâng cao giá trị thương hiệu mà còn mở ra nhiều cơ hội phát triển mới, giúp Raven tiếp cận được nhiều khách hàng hơn.
                    </div>
                    )}
                    { is2024 && (
                        <div className='w-10/12 text-justify desktop:text-xl ipad:text-lg mobile:text-base font-semibold pt-5 pb-5 '>
                        <div className='desktop:text-2xl ipad:text-xl mobile:text-lg font-bold text-[#1E0342]'> 2024 - Tiếp Tục Sáng Tạo</div>
                        Raven không ngừng sáng tạo và đổi mới để mang đến những sản phẩm thời trang độc đáo và chất lượng cao. Với tầm nhìn dài hạn và chiến lược phát triển bền vững, Raven tiếp tục khẳng định vị thế của mình trong ngành công nghiệp thời trang.
                    </div>
                    )}
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

export default AboutUs