import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ItemCheckOut from "../components/CheckOut/ItemCheckOut";
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import LoadingCheckout from "../components/CheckOut/LoadingCheckout";
import img_loading from '../assets/loading.gif'

//Thanh toán
const CheckOut = () => {
    //Họ và tên
    const [name, setName] = useState('')
    const [stateName, setStateName] = useState(false)
    //email
    const [email, setEmail] = useState('')
    const [stateEmail, setstateEmail] = useState(false)
    //Số điện thoại
    const [phone, setPhone] = useState('')
    const [statePhone, setstatePhone] = useState(false)
    //Ghi chú
    const [note, setNote] = useState('')
    //Tên tỉnh
    const [selectedTinhName, setSelectedTinhName] = useState('');
    const [stateTinh, setStateTinh] = useState(false)
    //Tên huyện
    const [selectedQuanName, setSelectedQuanName] = useState('');
    const [stateQuan, setStateQuan] = useState(false)
    //Tên phường
    const [selectedPhuongName, setSelectedPhuongName] = useState('');
    const [statePhuong, setStatePhuong] = useState(false)
    //Tên đường
    const [street, setStreet] = useState('')
    const [stateStreet, setStateStreet] = useState(false)
    //Thanh toán tiền mặt
    const [COD, setCOD] = useState(false)
    //Thanh toán chuyển khoản
    const [banking, setBanking] = useState(true)
    const hanlderCOD = () =>{
        setCOD(true)
        setBanking(false)
    }
    const hanlderBanking = () =>{
        setCOD(false)
        setBanking(true)
    }

    const [storeProduct, setStoreProduct] = useState([]);
    const location = useLocation();
    const { product } = location.state || {};
    const [totalCost, setTotalCost] = useState(null);

    useEffect(() => {
        const savedProduct = localStorage.getItem('cart'); // Lấy dữ liệu từ localStorage
        let productsToProcess = [];
    
        if (product) {
            // Nếu product là một đối tượng, biến nó thành mảng
            productsToProcess = Array.isArray(product) ? product : [product];
        } else if (savedProduct) {
            try {
                productsToProcess = JSON.parse(savedProduct);
            } catch (error) {
                console.error("Lỗi khi parse dữ liệu từ localStorage:", error);
            }
        }
    
        // Tính tổng chi phí
        const calculateCost = productsToProcess.reduce((total, item) => {
            const itemCost = item.cost - (item.cost * item.discount / 100);
            return total + (itemCost * item.quantity);
        }, 0);
        setStoreProduct(productsToProcess)
        setTotalCost(calculateCost);
    }, [product]);
    
    //Các trang thái để lấy api tỉnh thành
    const [tinh, setTinh] = useState([]); 
    const [quan, setQuan] = useState([]); 
    const [phuong, setPhuong] = useState([]); 
    const [selectedTinh, setSelectedTinh] = useState(''); 
    const [selectedQuan, setSelectedQuan] = useState(''); 
    useEffect(() => { 
        axios.get('https://esgoo.net/api-tinhthanh/1/0.htm') 
        .then(response => { 
            if (response.data.error === 0) { setTinh(response.data.data); } 
        }); 
    }, []); 
    const handleTinhChange = (e) => { 
        const idtinh = e.target.value; 
        setSelectedTinh(idtinh); 
        const selectedTinhObj = tinh.find((item) => item.id === idtinh);
        setSelectedTinhName(selectedTinhObj?.full_name || '');
        axios.get(`https://esgoo.net/api-tinhthanh/2/${idtinh}.htm`) 
        .then(response => { 
            if (response.data.error === 0) { setQuan(response.data.data); setPhuong([]); } 
        }); 
    }; 
    const handleQuanChange = (e) => { 
        const idquan = e.target.value; 
        setSelectedQuan(idquan); 
        const selectedQuanObj = quan.find((item) => item.id === idquan);
        setSelectedQuanName(selectedQuanObj?.full_name || '');
        axios.get(`https://esgoo.net/api-tinhthanh/3/${idquan}.htm`) 
        .then(response => { 
            if (response.data.error === 0) { setPhuong(response.data.data); } 
        }); 
    };
    const handlePhuongChange = (e) => {
        const idphuong = e.target.value;
        const selectedPhuongObj = phuong.find((item) => item.id === idphuong);
        setSelectedPhuongName(selectedPhuongObj?.full_name || '');
    };
    const [loading,setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const fetchdata = async () => {
        // const response = await axios.get("/api/v1/testroute");
        // return response.data;
        setLoading(true)
        const response = await fetch(`/api/v1/updateOrder`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,         // Giả sử bạn truyền tham số name,
                phonenumber: phone,
                email: email,
                status: 1,          // Giả sử bạn truyền tham số status
                address: [selectedPhuongName,selectedQuanName, selectedTinhName].join(', '),// Địa chỉ giao hàng
                detail_address: street,      // Địa chỉ chi tiết
                payingmethod: banking,          // Phương thức thanh toán
                note: note,
                totalCost: totalCost+50000,
                product: storeProduct

                // Thêm các tham số khác nếu cần thiết
            }),
        });
        // const data = await response.json();  // Đọc dữ liệu phản hồi
          // Kiểm tra dữ liệu trả về
        console.log(storeProduct);

        if (!response.ok){
            setError(true)
            setLoading(false)
            throw new Error('Failed to fetch order info')
            
        }
        const data = await response.json();
        // delete data in local storage
        if (data.message === 'Order updated successfully')
        {
            localStorage.removeItem('cart');
            setLoading(false)
            setLoaded(true)            
        }
        setLoading(false)
        setLoaded(true) 
        
        console.log(data);
        // setOrderInfo(data.data || []);
        // console.log(orderInfo);
    };
    const navigate = useNavigate();
    const handleRedirect = () => {
        navigate('/');  // Redirect to a different path
      };
    const updateOrder = () =>{
        fetchMail();
    }

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

        <div className={`w-full justify-items-center font-Public bg-white ${(loaded || loading || error ) ? 'overflow-hidden h-screen' : 'overflow-auto'}`}>
            <Navigation/>
                <div className={`desktop:w-10/12 ipad:w-11/12 mobile:w-10/12 mt-[150px] ${(loaded || loading || error) ? 'overflow-hidden h-screen' : 'overflow-auto'} `}>
                    <div className=" text-center text-[#1E0342] desktop:text-3xl ipad:text-2xl mobile:text-xl font-extrabold">ĐẶT HÀNG</div>
                    <div className=" desktop:grid ipad:grid mobile:hidden grid-cols-2 mt-12">
                        {/* Cột nhập Thông tin thanh toán */}
                        <div className="border-r border-black desktop:px-20 ipad:px-10">
                            <div className=" text-center text-[#151515] text-xl font-bold ">Thông tin giao hàng</div>
                            {/* Nhập họ và tên */}
                            <input className="h-10 w-full border border-black px-2 mt-6 "
                                type="text"
                                placeholder="Họ và tên"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {
                                stateName && <div className="mt-[1px] ml-[2px] text-xs text-red-600">
                                <FontAwesomeIcon icon={faCircleExclamation} />  Vui lòng nhập họ tên</div>  
                            }                          
                            <div  className="h-10 w-full ipad:hidden desktop:flex flex-row mt-6  gap-4 ">
                                {/* Nhập email */}
                                <div className="w-2/3">
                                    <input className="h-10 w-full border border-black px-2  "
                                        type="text"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    /> 
                                    {
                                        stateEmail && <div className="mt-[1px] ml-[2px] text-xs text-red-600">
                                        <FontAwesomeIcon icon={faCircleExclamation} />  Vui lòng nhập email</div>  
                                    } 
                                </div>
                                {/* Nhập sđt    */}
                                <div className="">
                                    <input 
                                        className="h-10 w-full border border-black px-2  "
                                        type="text"
                                        placeholder="Số điện thoại"
                                        value={phone}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^\d*$/.test(value)) {
                                                setPhone(value); // Chỉ cho phép số
                                            }
                                        }}
                                    /> 
                                    {
                                        statePhone && <div className="mt-[1px] ml-[2px] text-xs text-red-600">
                                        <FontAwesomeIcon icon={faCircleExclamation} />  Vui lòng nhập số điện thoại</div>  
                                    } 
                                </div>                                                               
                            </div>
                            {/* Nhập email */}
                            <input className="h-10 w-full desktop:hidden border border-black px-2 mt-6  "
                                    type="text"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />  
                                {
                                    stateEmail && <div className="desktop:hidden mt-[1px] ml-[2px] text-xs text-red-600">
                                    <FontAwesomeIcon icon={faCircleExclamation} />  Vui lòng nhập email</div>  
                                } 
                                {/* Nhập sđt    */}
                                <input 
                                    className="h-10 w-full desktop:hidden border border-black px-2 mt-6  "
                                    type="text"
                                    placeholder="Số điện thoại"
                                    value={phone}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^\d*$/.test(value)) {
                                            setPhone(value); // Chỉ cho phép số
                                        }
                                    }}
                                /> 
                                {
                                    statePhone && <div className=" desktop:hidden mt-[1px] ml-[2px] text-xs text-red-600">
                                    <FontAwesomeIcon icon={faCircleExclamation} />  Vui lòng nhập số điện thoại</div>  
                                } 
                            {/* Chọn tỉnh thành */}
                            <select className={`h-10 w-full border border-black px-2   ${stateEmail?'mt-9':'mt-6 '} `} title="Chọn Tỉnh Thành" onChange={handleTinhChange}> 
                                <option value={tinh} >Tỉnh Thành</option> 
                                {tinh.map((item) => ( 
                                    <option key={item.id} value={item.id}>{item.full_name}</option>
                                ))} 
                            </select>                            
                            {
                                 stateTinh && <div className=" mt-[1px] ml-[2px] text-xs text-red-600">
                                    <FontAwesomeIcon icon={faCircleExclamation} />  Vui lòng chọn tỉnh thành</div>  
                            }  
                            <select className="h-10 w-full border border-black px-2 mt-6 " title="Chọn Quận Huyện" onChange={handleQuanChange}> 
                                <option value="0">Quận/Huyện</option> 
                                {quan.map((item) => ( <option key={item.id} value={item.id}>{item.full_name}</option> ))} 
                            </select>                            
                            {
                                stateQuan && <div className=" mt-[1px] ml-[2px] text-xs text-red-600">
                                    <FontAwesomeIcon icon={faCircleExclamation} />  Vui lòng chọn quận huyện</div>  
                            }   
                            <select className="h-10 w-full border border-black px-2 mt-6 " title="Chọn Phường Xã" onChange={handlePhuongChange}> 
                                <option value="0">Phường/Xã</option> {phuong.map((item) => ( <option key={item.id} value={item.id}>{item.full_name}</option> ))} 
                            </select>
                            {
                                statePhuong && <div className=" mt-[1px] ml-[2px] text-xs text-red-600">
                                    <FontAwesomeIcon icon={faCircleExclamation} />  Vui lòng chọn phường xã</div>  
                            } 
                            {/* Nhập tên đường, số nhà */}
                            <input className="h-10 w-full border border-black px-2 mt-6 "
                                type="text"
                                placeholder="Số nhà, Tên đường"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                            />
                            {
                                stateStreet && <div className=" mt-[1px] ml-[2px] text-xs text-red-600">
                                    <FontAwesomeIcon icon={faCircleExclamation} />  Vui lòng nhập địa chỉ nhà, tên đường</div>  
                            } 
                            {/* Ghi chú */}
                            <input className="h-16 w-full border border-black px-2 mt-6 "
                                type="text"
                                placeholder="Ghi chú (nếu có)"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            /> 
                            {/* Chọn phương thức thanh toán */}
                            <div className=" text-center text-[#151515] text-xl font-bold mt-8">Phương thức thanh toán</div>
                            <div className="mt-6 flex flex-row items-center">
                                <input className="h-5 w-5  rounded accent-black " 
                                    type="checkbox"      
                                    checked={COD}
                                    onChange={hanlderCOD}
                                />
                                <div className="w-full h-7content-center text-black text-xl font-normal ml-2">Thanh toán khi nhận hàng (COD)</div> 
                            </div>
                            <div className="mt-6 flex flex-row items-center">
                                <input className="h-5 w-5  rounded accent-black " 
                                    type="checkbox" 
                                    checked={banking} 
                                    onChange={hanlderBanking}                  
                                />
                                <div className="w-full h-7content-center text-black text-xl font-normal ml-2">Chuyển khoản qua ngân hàng</div> 
                            </div>
                            
                        </div>
                        {/* Cột đơn hàng */}
                        <div className="desktop:px-20 ipad:px-10">
                            <div className="w-full text-center text-[#151515] text-xl font-bold mb-8">Đơn hàng</div>
                            {/* Danh sách sản phẩm trong đơn hàng */}
                            {storeProduct.map((product,index) => (
                                <ItemCheckOut key={index} product={product} />                            
                            ))}
                            {/* Tạm tính giá các sản phẩm */}
                            <div className="flex flex-row justify-between mt-3">
                                <div className=" h-6 content-center text-black desktop:text-base ipad:text-sm font-normal ">Tạm tính: </div>
                                <div className="w-24 content-center text-right text-[#1E0342] desktop:text-base ipad:text-sm font-bold ">{totalCost?.toLocaleString()}đ</div> {/*render có thể xảy ra trước khi dữ liệu được tải đầy đủ => use ? to check */}
                            </div>
                            {/* Phí vận chuyển */}
                            <div className="flex flex-row justify-between mt-3">
                                <div className=" h-6 content-center text-black desktop:text-sm ipad:text-xs font-normal ">Phí vận chuyển: </div>
                                <div className="h-6 content-center text-right text-black desktop:text-sm ipad:text-xs font-bold ">50,000đ</div>
                            </div>
                            {/* Tổng giá */}
                            <div className="h-1 border-b-[1px] border-[#C4C4C4] mt-2"></div>
                            <div className="flex flex-row justify-between mt-3 ">
                                <div className="h-10 content-center text-black desktop:text-xl ipad:text-lg font-bold ">Tổng cộng </div>
                                <div className="h-10 content-center text-right text-[#a91d3a] desktop:text-xl ipad:text-lg font-bold">{(totalCost+50000).toLocaleString()}đ</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full desktop:hidden ipad:hidden mobile:grid mt-12">
                        {/* Cột đơn hàng */}
                        <div className="">
                            <div className="w-full text-center text-[#151515] text-xl font-bold mb-8">Đơn hàng</div>
                            {/* Danh sách sản phẩm trong đơn hàng */}
                            {storeProduct.map((product,index) => (
                                <ItemCheckOut key={index} product={product} />                            
                            ))}
                            {/* Tạm tính giá các sản phẩm */}
                            <div className="flex flex-row justify-between mt-3">
                                <div className=" h-6 content-center text-black desktop:text-base ipad:text-sm font-normal ">Tạm tính: </div>
                                <div className="w-24 content-center text-right text-[#1E0342] desktop:text-base ipad:text-sm font-bold ">{totalCost?.toLocaleString()}đ</div> {/*render có thể xảy ra trước khi dữ liệu được tải đầy đủ => use ? to check */}
                            </div>
                            {/* Phí vận chuyển */}
                            <div className="flex flex-row justify-between mt-3">
                                <div className=" h-6 content-center text-black desktop:text-sm ipad:text-xs font-normal ">Phí vận chuyển: </div>
                                <div className="h-6 content-center text-right text-black desktop:text-sm ipad:text-xs font-bold ">50,000đ</div>
                            </div>
                            {/* Tổng giá */}
                            <div className="h-1 border-b-[1px] border-[#C4C4C4] mt-2"></div>
                            <div className="flex flex-row justify-between mt-3 ">
                                <div className="h-10 content-center text-black desktop:text-xl ipad:text-lg font-bold ">Tổng cộng </div>
                                <div className="h-10 content-center text-right text-[#a91d3a] desktop:text-xl ipad:text-lg font-bold">{(totalCost+50000).toLocaleString()}đ</div>
                            </div>
                        </div>
                        {/* Cột nhập Thông tin thanh toán */}
                        <div className="mt-16">
                            <div className=" text-center text-[#151515] text-xl font-bold ">Thông tin thanh toán</div>
                            {/* Nhập họ và tên */}
                            <input className="h-10 w-full border border-black px-2 mt-6 "
                                type="text"
                                placeholder="Họ và tên"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />                            
                                {/* Nhập email */}
                                <input className="h-10 w-full col-span-2 border border-black px-2 mt-6  "
                                    type="text"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />  
                                {/* Nhập sđt    */}
                                <input 
                                    className="h-10 w-full border border-black px-2 mt-6  "
                                    type="text"
                                    placeholder="Số điện thoại"
                                    value={phone}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^\d*$/.test(value)) {
                                            setPhone(value); // Chỉ cho phép số
                                        }
                                    }}
                                />          
                            {/* Nhập email */}
                            <input className="h-10 w-full desktop:hidden border border-black px-2 mt-6  "
                                    type="text"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />  
                                {/* Nhập sđt    */}
                                <input 
                                    className="h-10 w-full desktop:hidden border border-black px-2 mt-6  "
                                    type="text"
                                    placeholder="Số điện thoại"
                                    value={phone}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^\d*$/.test(value)) {
                                            setPhone(value); // Chỉ cho phép số
                                        }
                                    }}
                                /> 
                            {/* Chọn tỉnh thành */}
                            <select className="h-10 w-full border border-black px-2 mt-6 " title="Chọn Tỉnh Thành" onChange={handleTinhChange}> 
                                <option value={tinh} >Tỉnh Thành</option> 
                                {tinh.map((item) => ( 
                                    <option key={item.id} value={item.id}>{item.full_name}</option>
                                ))} 
                            </select> 
                            <select className="h-10 w-full border border-black px-2 mt-6 " title="Chọn Quận Huyện" onChange={handleQuanChange}> 
                                <option value="0">Quận/Huyện</option> 
                                {quan.map((item) => ( <option key={item.id} value={item.id}>{item.full_name}</option> ))} 
                            </select> 
                            <select className="h-10 w-full border border-black px-2 mt-6 " title="Chọn Phường Xã" onChange={handlePhuongChange}> 
                                <option value="0">Phường/Xã</option> {phuong.map((item) => ( <option key={item.id} value={item.id}>{item.full_name}</option> ))} 
                            </select>
                            {/* Nhập tên đường, số nhà */}
                            <input className="h-10 w-full border border-black px-2 mt-6 "
                                type="text"
                                placeholder="Số nhà, Tên đường"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                            />
                            {/* Ghi chú */}
                            <input className="h-16 w-full border border-black px-2 mt-6 "
                                type="text"
                                placeholder="Ghi chú (nếu có)"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            /> 
                            {/* Chọn phương thức thanh toán */}
                            <div className=" text-center text-[#151515] text-xl font-bold mt-8">Phương thức thanh toán</div>
                            <div className="mt-6 flex flex-row items-center">
                                <input className="h-5 w-5  rounded accent-black " 
                                    type="checkbox"      
                                    checked={COD}
                                    onChange={hanlderCOD}
                                />
                                <div className="w-full h-7content-center text-black text-xl font-normal ml-2">Thanh toán khi nhận hàng (COD)</div> 
                            </div>
                            <div className="mt-6 flex flex-row items-center">
                                <input className="h-5 w-5  rounded accent-black " 
                                    type="checkbox" 
                                    checked={banking} 
                                    onChange={hanlderBanking}                  
                                />
                                <div className="w-full h-7content-center text-black text-xl font-normal ml-2">Chuyển khoản qua ngân hàng</div> 
                            </div>
                            
                        </div>
                        
                    </div>
                    {/* Nút thanh toán */}
                    <div className="w-fulf flex items-center justify-center mt-14">
                        <button className="content-center text-center text-white desktop:text-2xl ipad:text-xl font-bold rounded-lg border border-black bg-[#1E0342] px-10 py-1"
                            onClick={()=>{
                                if(name && email && phone && selectedTinhName && selectedQuanName && selectedPhuongName && street && (COD||banking) ){
                                    fetchdata() 
                                }else{ 
                                    if(name=='') setStateName(true)
                                        else setStateName(false)
                                    if(email == '') setstateEmail(true) 
                                        else setstateEmail( false)
                                    if(phone == '') setstatePhone(true)
                                        else setstatePhone(false)
                                    if(selectedTinhName == '') setStateTinh(true)
                                        else setStateTinh(false)
                                    if(selectedQuanName == '') setStateQuan(true)
                                        else setStateQuan(false)
                                    if(selectedPhuongName == '') setStatePhuong(true)
                                        else setStatePhuong(false)
                                    if(street == '')  setStateStreet(true)
                                        else setStateStreet(false)
                                }
                            }}
                        >ĐẶT HÀNG</button>
                    </div>
                    
                </div>
                { loading && 
                    <div className="absolute h-screen w-full justify-items-center content-center bg-gray-300 bg-opacity-30 top-0">
                        <img className="desKtop:w-20 desktop:h-20 ipad:w-16 ipad:h-16 mobile:h-14 mobile:w-14" src={img_loading}/>
                    </div>
                }
                {
                    error && <div className="absolute h-screen w-full  justify-items-center content-center bg-gray-300 bg-opacity-30 top-0">                        
                        <div className="bg-white justify-items-center p-5 rounded-lg">
                            <div className="text-red-500 font-bold py-3">Xảy ra lỗi, vui lòng thử lại sau</div>
                            <button onClick={()=>setError(false)} className=" font-semibold bg-[#1E0342] text-white px-2 py-[6px] mt-5 rounded-lg">Đặt hàng lại</button>
                        </div>
                    </div>
                }
                { loaded && <LoadingCheckout/>}
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

export default CheckOut