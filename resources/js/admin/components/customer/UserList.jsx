import React, {useState} from 'react';
import axios from 'axios';
import UserDetail from './UserDetail';
import Loading from '../../asset/loading.svg'


const fetchUserOrder = async (id) => {
    const response = await axios.get(`/api/dashboard/user/${id}`);
    return response.data;
}; 


const UserList = ({data}) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [isLoading, setIsLoading] = useState();

    const handleRowClick = async (phoneNum) => {
        setIsLoading(true);
        try {
            const userDetail = await fetchUserOrder(phoneNum);
            console.log("Sdt:" + phoneNum);
            console.log(userDetail)
            setSelectedUser(userDetail);
        } catch (error) {
            console.error('Error fetching user details:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const closeDetail = () => setSelectedUser(null);

   
    return (
         <div className="container mx-auto px-4">
            <div className="overflow-y-auto w-full">
                <table className="w-full bg-white rounded-[14px] shadow-md">
                    <thead>
                        <tr>
                            <th className="py-4 px-2 border-b text-sm font-extrabold text-center">Số điện thoại</th>
                            <th className="py-4 px-2 border-b text-sm font-extrabold text-left">Email</th>
                            <th className="py-4 px-2 border-b text-sm font-extrabold text-left">Số đơn hàng đã mua</th>

                        </tr>
                    </thead>

                    <tbody>
                        {data.map(user => (
                            <tr key={user.phoneNumber} 
                                onClick={() => handleRowClick(user.userId)}
                                className="cursor-pointer hover:bg-gray-100"
                            >
                                <td className="py-5 px-2 border-b text-sm font-semibold text-center">{user.phoneNumber}</td>
                                <td className="py-5 px-2 border-b text-sm font-semibold text-left">{user.email}</td>
                                <td className="py-5 px-2 border-b text-sm font-semibold text-left"></td>
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
            {/* Hiển thị chi tiết khách hàng khi đã có dữ liệu */}
            {selectedUser && !isLoading  && (
                <UserDetail
                UserDetail={selectedUser}
                onClose={closeDetail}
            />
            )}


         </div>   
    )
}

export default UserList;