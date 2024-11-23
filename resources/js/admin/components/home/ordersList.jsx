import React, {useState} from 'react';
import axios from 'axios';
import OrderDetail from '../order/OrderDetail';
import Loading from '../../asset/loading.svg'


const fetchOrderDetail = async (id) => {
    const response = await axios.get(`/api/dashboard/chitietdonhang/${id}`);
    return response.data;
  };

const fetchOrderBill = async (id) => {
    const response = await axios.get(`/api/v1/bill/${id}`);
    return response.data;
};

const OrderList = ({data}) => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [costBill, setCostBill] = useState(0);
    const [isLoading, setIsLoading] = useState();

    //Lấy background tùy vào trạng thái
    const getStatusClass = (status) => {
        switch (status){
            case 3:
                return "bg-[#00B69B]/20 text-[#00B69B]";
            case 1:
                return "bg-[#6226EF]/20  text-[#6226EF]";
            case 0:
                return "bg-[#EF3826]/20 text-[#EF3826]";    
            case 2:
                return "bg-[#7C990A]/20  text-[#7C990A]";      
            default:
                return "bg-gray-200 text-gray-600"     
        }
    };

    //Lấy ra chuỗi tùy vào trạng thái là số
    const getOrderStatus = (status) => {
        switch (status) {
          case 3:
            return "Đã hoàn thành";
          case 1:
            return "Đang xử lý";
          case 0:
            return "Đã hủy";
          case 2:
            return "Đang giao hàng";
          default:
            return "Trạng thái không xác định";
        }
      }

      
      const formatDate = (dateIn) => {
        const date = new Date(dateIn); //tạo kiểu dữ liệu Data với date lấy từ db
        // Format date với định dạng dd/mm/yyyy
        //lấy ra ngày của date, padStart đảm bảo độ dài tối thiểu 2 kí tự bằng cách thêm số 0 ở đầu nếu cần thiết
        const day = String(date.getDate()).padStart(2, '0'); 
        //lấy ra tháng của date (vì hàm này trả về 0 cho tháng 1,... nên cộng thêm 1), padStart đảm bảo độ dài tối thiểu 2 kí tự bằng cách thêm số 0 ở đầu nếu cần thiết
        const month = String(date.getMonth() + 1).padStart(2, '0');
        //Lấy ra năm của date
        const year = date.getFullYear();
        return `${day}/${month}/${year}`; //trả về chuỗi ngày tháng dạng dd/mm/yyyy
      };

      const handleRowClick = async (orderId) => {
        setIsLoading(true);
        try {
            const orderDetail = await fetchOrderDetail(orderId);
            const orderBill = await fetchOrderBill(orderId);
            console.log(orderBill.data.totalCost)
            setSelectedOrder(orderDetail);
            setCostBill(orderBill.data.totalCost);
        } catch (error) {
            console.error('Error fetching order details:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const closeDetail = () => setSelectedOrder(null);
    
    return (
         <div className="container mx-auto px-4">
            <div className="overflow-y-auto w-full">
                <table className="w-full bg-white rounded-[14px] shadow-md">
                    <thead>
                        <tr>
                            <th className="py-4 px-2 border-b text-sm font-extrabold text-center">Mã đơn hàng</th>
                            <th className="py-4 px-2 border-b text-sm font-extrabold text-left">Tên khách hàng</th>
                            <th className="py-4 px-2 border-b text-sm font-extrabold text-left">Địa chỉ</th>
                            <th className="py-4 px-2 border-b text-sm font-extrabold text-left">Ngày đặt hàng</th>
                            <th className="py-4 px-2 border-b text-sm font-extrabold text-center">Hình thức thanh toán</th>
                            <th className="py-4 px-2 border-b text-sm font-extrabold text-center">Trạng thái</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map(order => (
                            <tr key={order.orderId} 
                                onClick={() => handleRowClick(order.orderId)}
                                className="cursor-pointer hover:bg-gray-100"
                            >
                                <td className="py-5 px-2 border-b text-sm font-semibold text-center">{order.orderId}</td>
                                <td className="py-5 px-2 border-b text-sm font-semibold text-left">{order.user.name}</td>
                                <td className="py-5 px-2 border-b text-sm font-semibold text-left">{order.address}</td>
                                <td className="py-5 px-2 border-b text-sm font-semibold text-left">
                                    {formatDate(order.dateCreated)}
                                </td>
                                <td className="py-5 pl-12 border-b text-sm font-semibold text-left">{order.payingMethod ? "Chuyển khoản" : "Thanh toán khi nhận hàng"}</td>
                                <td className="py-5 px-2 border-b text-sm font-semibold text-center">
                                    <span className={`px-2 py-1 rounded inline-block w-[120px] text-center ${getStatusClass(order.status)}`}> 
                                        {getOrderStatus(order.status)}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <img src={Loading} alt="Loading..." className="w-12 h-12" />
                </div>
            )}

            {/* Hiển thị chi tiết đơn hàng khi đã có dữ liệu */}
            {selectedOrder && !isLoading && (
                <OrderDetail
                    orderDetail={selectedOrder}
                    costBill={costBill}
                    formatDate={formatDate}
                    onClose={closeDetail}
                />
            )}
         </div>   
    )
}

export default OrderList;