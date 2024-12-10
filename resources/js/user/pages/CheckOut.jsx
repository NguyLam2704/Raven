import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import img_product from '../assets/img_product.svg'
import ItemCheckOut from "../components/CheckOut/ItemCheckOut";
import QR from '../assets/QR.svg'
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";

//Thanh toán
const CheckOut = () => {
    //Họ và tên
    const [name, setName] = useState('')
    //email
    const [email, setEmail] = useState('')
    //Số điện thoại
    const [phone, setPhone] = useState('')
    //Ghi chú
    const [note, setNote] = useState('')
    //Tên tỉnh
    const [selectedTinhName, setSelectedTinhName] = useState('');
    //Tên huyện
    const [selectedQuanName, setSelectedQuanName] = useState('');
    //Tên phường
    const [selectedPhuongName, setSelectedPhuongName] = useState('');
    //Tên đường
    const [street, setStreet] = useState('')
    //Thanh toán tiền mặt
    const [COD, setCOD] = useState(false)
    //Thanh toán chuyển khoản
    const [banking, setBanking] = useState(false)
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

    const fetchdata = async () => {
        // const response = await axios.get("/api/v1/testroute");
        // return response.data;
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
            throw new Error('Failed to fetch order info')
        }
        const data = await response.json();
        // delete data in local storage
        if (data.message === 'Order updated successfully')
            {
                localStorage.removeItem('cart');
                handleRedirect();
            }

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
    return(

        <div className="w-full justify-items-center font-Public">
            <Navigation/>
                <div className="desktop:w-10/12 ipad:w-11/12 mobile:w-10/12 mt-[150px]">
                    <div className=" text-center text-[#a91d3a] desktop:text-3xl ipad:text-2xl mobile:text-xl font-extrabold">THANH TOÁN</div>
                    <div className=" desktop:grid ipad:grid mobile:hidden grid-cols-2 mt-12">
                        {/* Cột nhập Thông tin thanh toán */}
                        <div className="border-r border-black desktop:px-20 ipad:px-10">
                            <div className=" text-center text-[#151515] text-xl font-bold ">Thông tin thanh toán</div>
                            {/* Nhập họ và tên */}
                            <input className="h-10 w-full border border-black px-2 mt-6"
                                type="text"
                                placeholder="Họ và tên"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />                            
                            <div  className="h-10 w-full ipad:hidden desktop:grid grid-cols-3 mt-5 gap-4">
                                {/* Nhập email */}
                                <input className="h-10 w-full col-span-2 border border-black px-2 "
                                    type="text"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />  
                                {/* Nhập sđt    */}
                                <input 
                                    className="h-10 w-full border border-black px-2 "
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
                            </div>
                            {/* Nhập email */}
                            <input className="h-10 w-full desktop:hidden border border-black px-2 mt-6 "
                                    type="text"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />  
                                {/* Nhập sđt    */}
                                <input 
                                    className="h-10 w-full desktop:hidden border border-black px-2 mt-6 "
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
                            <select className="h-10 w-full border border-black px-2 mt-6" title="Chọn Tỉnh Thành" onChange={handleTinhChange}> 
                                <option value={tinh} >Tỉnh Thành</option> 
                                {tinh.map((item) => ( 
                                    <option key={item.id} value={item.id}>{item.full_name}</option>
                                ))} 
                            </select> 
                            <select className="h-10 w-full border border-black px-2 mt-6" title="Chọn Quận Huyện" onChange={handleQuanChange}> 
                                <option value="0">Quận/Huyện</option> 
                                {quan.map((item) => ( <option key={item.id} value={item.id}>{item.full_name}</option> ))} 
                            </select> 
                            <select className="h-10 w-full border border-black px-2 mt-6" title="Chọn Phường Xã" onChange={handlePhuongChange}> 
                                <option value="0">Phường/Xã</option> {phuong.map((item) => ( <option key={item.id} value={item.id}>{item.full_name}</option> ))} 
                            </select>
                            {/* Nhập tên đường, số nhà */}
                            <input className="h-10 w-full border border-black px-2 mt-6"
                                type="text"
                                placeholder="Số nhà, Tên đường"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                            />
                            {/* Ghi chú */}
                            <input className="h-16 w-full border border-black px-2 mt-6"
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
                                <div className="w-24 content-center text-right text-[#c73659] desktop:text-base ipad:text-sm font-bold ">{totalCost?.toLocaleString()}đ</div> {/*render có thể xảy ra trước khi dữ liệu được tải đầy đủ => use ? to check */}
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
                                <div className="w-24 content-center text-right text-[#c73659] desktop:text-base ipad:text-sm font-bold ">{totalCost?.toLocaleString()}đ</div> {/*render có thể xảy ra trước khi dữ liệu được tải đầy đủ => use ? to check */}
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
                            <input className="h-10 w-full border border-black px-2 mt-6"
                                type="text"
                                placeholder="Họ và tên"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />                            
                                {/* Nhập email */}
                                <input className="h-10 w-full col-span-2 border border-black px-2 mt-6 "
                                    type="text"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />  
                                {/* Nhập sđt    */}
                                <input 
                                    className="h-10 w-full border border-black px-2 mt-6 "
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
                            <input className="h-10 w-full desktop:hidden border border-black px-2 mt-6 "
                                    type="text"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />  
                                {/* Nhập sđt    */}
                                <input 
                                    className="h-10 w-full desktop:hidden border border-black px-2 mt-6 "
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
                            <select className="h-10 w-full border border-black px-2 mt-6" title="Chọn Tỉnh Thành" onChange={handleTinhChange}> 
                                <option value={tinh} >Tỉnh Thành</option> 
                                {tinh.map((item) => ( 
                                    <option key={item.id} value={item.id}>{item.full_name}</option>
                                ))} 
                            </select> 
                            <select className="h-10 w-full border border-black px-2 mt-6" title="Chọn Quận Huyện" onChange={handleQuanChange}> 
                                <option value="0">Quận/Huyện</option> 
                                {quan.map((item) => ( <option key={item.id} value={item.id}>{item.full_name}</option> ))} 
                            </select> 
                            <select className="h-10 w-full border border-black px-2 mt-6" title="Chọn Phường Xã" onChange={handlePhuongChange}> 
                                <option value="0">Phường/Xã</option> {phuong.map((item) => ( <option key={item.id} value={item.id}>{item.full_name}</option> ))} 
                            </select>
                            {/* Nhập tên đường, số nhà */}
                            <input className="h-10 w-full border border-black px-2 mt-6"
                                type="text"
                                placeholder="Số nhà, Tên đường"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                            />
                            {/* Ghi chú */}
                            <input className="h-16 w-full border border-black px-2 mt-6"
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
                        <button className="content-center text-center text-white desktop:text-2xl ipad:text-xl font-bold rounded-lg border border-black bg-[#c73659] px-10 py-1"
                            onClick={()=>{
                                fetchdata() 
                                // console.log("tên", name)
                                // console.log("email", email)
                                // console.log("sdt", phone)
                                // console.log("diachi", street, selectedPhuongName,selectedQuanName, selectedTinhName)
                                // console.log("ghi chú", note)
                                // console.log(storeProduct)
                            }}
                        >THANH TOÁN</button>
                    </div>
                    
                </div>
            <Footer/>
        </div>
    )
}

export default CheckOut