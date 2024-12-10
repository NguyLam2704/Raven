import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import about1 from '../assets/about1.jpg'
import founder1 from '../assets/founder1.jpg'
import founder2 from '../assets/founder2.jpg'
import founder3 from '../assets/founder3.jpg'
import founder4 from '../assets/founder4.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle} from "@fortawesome/free-solid-svg-icons"

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

    return(
        
        <div className='w-full font-Public'>
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
                <div className=' w-10/12 pb-1 flex flow-row justify-between desktop:text-xl ipad:text-lg mobile:text-base font-bold text-[#a91d3a]'>
                    <div></div>
                    <div >2021</div>
                    <div></div>
                    <div >2023</div>
                    <div></div>
                </div>
                <div className=' w-10/12 h-[6px] items-center bg-[#C73659] rounded-3xl flex flow-row justify-between'>
                    <FontAwesomeIcon className=' w-5 h-5 bg-white rounded-3xl border-[3px] border-white hover:border-[#C73659]' color='#C73659' icon={faCircle} 
                        onMouseEnter={()=>set2020(true)} //hiện 2020
                        onMouseLeave={()=>set2020(false)} //ẩn 2020
                     />
                    <FontAwesomeIcon  className=' w-5 h-5 bg-white rounded-3xl border-[3px] border-white hover:border-[#C73659]' color='#C73659'icon={faCircle} 
                        onMouseEnter={()=>set2021(true)}  //hiện 2021
                        onMouseLeave={()=>set2021(false)} //ẩn 2021
                    />
                    <FontAwesomeIcon className=' w-5 h-5 bg-white rounded-3xl border-[3px] border-white hover:border-[#C73659]' color='#C73659' icon={faCircle} 
                         onMouseEnter={()=>set2022(true)} //hiện 2022
                         onMouseLeave={()=>set2022(false)} //ẩn 2022
                    />
                    <FontAwesomeIcon  className=' w-5 h-5 bg-white rounded-3xl border-[3px] border-white hover:border-[#C73659]' color='#C73659' icon={faCircle}
                        onMouseEnter={()=>set2023(true)} //hiện 2023
                        onMouseLeave={()=>set2023(false)} //ẩn 2023
                    />
                    <FontAwesomeIcon  className=' w-5 h-5 bg-white rounded-3xl border-[3px] border-white hover:border-[#C73659]' color='#C73659' icon={faCircle} 
                        onMouseEnter={()=>set2024(true)}  //hiện 2024
                        onMouseLeave={()=>set2024(false)} //ẩn 2024
                    />
                </div>
                <div className=' w-10/12 pt-1 flex flow-row justify-between desktop:text-xl ipad:text-lg mobile:text-base font-bold text-[#a91d3a]'>
                    <div>2020</div>
                    <div ></div>
                    <div>2022</div>
                    <div ></div>
                    <div>2024</div>
                </div>
                    { is2020 && (
                        <div className='w-10/12 text-justify desktop:text-xl ipad:text-lg mobile:text-base font-medium pt-5 pb-5 '>
                        <div className='desktop:text-2xl ipad:text-xl mobile:text-lg font-bold text-[#a91d3a]'> 2020 - Khởi Đầu:</div>
                            Raven được thành lập vào năm 2016 bởi bốn nhà sáng lập đầy nhiệt huyết: Đoàn Nguyễn Lâm, Thạch Minh Luân, Cao Quốc Kiệt, và Đỗ Nguyên Phương. Với tầm nhìn mang đến phong cách thời trang trẻ trung, mới mẻ và độc đáo, Raven nhanh chóng thu hút sự chú ý của giới trẻ.
                        </div>
                    )}
                    { is2021 && (
                        <div className='w-10/12 text-justify desktop:text-xl ipad:text-lg mobile:text-base font-semibold pt-5 pb-5 '>
                        <div className='desktop:text-2xl ipad:text-xl mobile:text-lg font-bold text-[#a91d3a]'> 2021 - Mở Rộng Quy Mô</div>
                            Với sự thành công ban đầu, Raven mở rộng quy mô sản xuất và khai trương cửa hàng đầu tiên tại TP. Hồ Chí Minh. Đây là bước ngoặt quan trọng, giúp Raven tiếp cận được nhiều khách hàng hơn và tăng cường sự hiện diện của thương hiệu.
                        </div>
                    )}
                    { is2022 && (
                        <div className='w-10/12 text-justify desktop:text-xl ipad:text-lg mobile:text-base font-semibold pt-5 pb-5 '>
                        <div className='desktop:text-2xl ipad:text-xl mobile:text-lg font-bold text-[#a91d3a]'> 2022 - Đa Dạng Hóa Sản Phẩm</div>
                        Raven tiếp tục đa dạng hóa sản phẩm với các dòng thời trang mới như phụ kiện, cặp, nón và túi xách. Sự đa dạng này không chỉ đáp ứng nhu cầu của khách hàng mà còn giúp Raven mở rộng thị trường.
                    </div>
                    )}
                    { is2023 && (
                        <div className='w-10/12 text-justify desktop:text-xl ipad:text-lg mobile:text-base font-semibold pt-5 pb-5 '>
                        <div className='desktop:text-2xl ipad:text-xl mobile:text-lg  font-bold text-[#a91d3a]'> 2023 - Hợp Tác Chiến Lược: </div>
                        Raven ký kết nhiều hợp tác chiến lược với các nhà thiết kế và thương hiệu nổi tiếng, mang đến những bộ sưu tập độc đáo và đẳng cấp. Những hợp tác này không chỉ nâng cao giá trị thương hiệu mà còn mở ra nhiều cơ hội phát triển mới, giúp Raven tiếp cận được nhiều khách hàng hơn.
                    </div>
                    )}
                    { is2024 && (
                        <div className='w-10/12 text-justify desktop:text-xl ipad:text-lg mobile:text-base font-semibold pt-5 pb-5 '>
                        <div className='desktop:text-2xl ipad:text-xl mobile:text-lg font-bold text-[#a91d3a]'> 2024 - Tiếp Tục Sáng Tạo</div>
                        Raven không ngừng sáng tạo và đổi mới để mang đến những sản phẩm thời trang độc đáo và chất lượng cao. Với tầm nhìn dài hạn và chiến lược phát triển bền vững, Raven tiếp tục khẳng định vị thế của mình trong ngành công nghiệp thời trang.
                    </div>
                    )}
            </div>
            <Footer/>
        </div>
    )
}

export default AboutUs