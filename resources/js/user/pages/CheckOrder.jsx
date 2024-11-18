import React, { useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ItemOrder from "../components/CheckOrder/ItemOrder";

const ListOrder = [
    {
        key: 1,
        idOrder: "555",
        name: "Cao Quốc Kiệt",
        totalCost: 1000000,
        state: "Thành công",
      },
      {
          key: 2,
          idOrder: "8855",
          name: "Cao Quốc Kiệt",
          totalCost: 1000000,
          state: "Thành công",
        },
        {
          key: 3,
          idOrder: "5558",
          name: "Cao Quốc Kiệt",
          totalCost: 1000000,
          state: "Thành công",
        },
  
        {
          key: 4,
          idOrder: "07414",
          name: "Cao Quốc Kiệt",
          totalCost: 1000000,
          state: "Thành công",
        },
  
        {
          key: 5,
          idOrder: "03222",
          name: "Cao Quốc Kiệt",
          totalCost: 1000000,
          state: "Thành công",
        },
    
  ];

//Kiểm tra đơn hàng
const CheckOrder = () => {
    //nhận dữ liệu của input
    const [email, setEmail] = useState('')

    return(
        <div className="w-full">
            <Navigation/>
            <div className="w-full justify-items-center pt-24 mt-24 ">
                <div className="text-black text-2xl font-bold uppercase ">kiểm tra đơn hàng</div>
                {/* Text input email hoặc sdt để kiểm tra đơn hàng */}
                <form onSubmit={()=>setEmail(email)} className="w-1/3 justify-items-center">
                    <div className="flex w-full h-10 border border-black mt-16">
                           <input className=" w-full px-2 focus:outline-none" 
                                type="text" 
                                placeholder="Nhập số điện thoại hoặc email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}                            
                            />
                    </div>
                    <button className="bg-[#C73659] rounded-md border border-black text-[#eeeeee] text-base font-bold  mt-6 px-5 py-1">Kiểm tra</button>
                </form>
               
                { ListOrder.length !=0 //Kiểm tra độ dài của mảng
                    && (<div className="w-4/6 mt-24 ">
                        {/* Các cột thông tin của đơn hàng */}
                        <ul className="flex flex-row ">
                            <li className="w-1/4 h-11 content-center border border-black border-r-0 bg-[#eeeeee] text-center text-[#a91d3a] text-lg font-bold">Mã đơn hàng</li>
                            <li className="w-1/3 h-11 content-center border border-black border-r-0 bg-[#eeeeee] text-center text-[#a91d3a] text-lg font-bold">Tên khách hàng</li>
                            <li className="w-1/3 h-11 content-center border border-black border-r-0 bg-[#eeeeee] text-center text-[#a91d3a] text-lg font-bold">Tổng tiền thanh toán</li>
                            <li className="w-1/3 h-11 content-center border border-black  bg-[#eeeeee] text-center text-[#a91d3a] text-lg font-bold">Trạng thái đơn hàng</li>
                        </ul>
                        {/* Danh sách các đơn hàng */}
                        {ListOrder.map((order)=>{
                            return(
                                <ItemOrder order={order} />
                            )
                        })}
                    </div>
                )}                
            </div>
            <Footer/>
        </div>
    )
}

export default CheckOrder