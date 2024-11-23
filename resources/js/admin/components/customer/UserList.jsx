import React, {useState} from 'react';

const UserList = ({data}) => {
   
    return (
         <div className="container mx-auto px-4">
            <div className="overflow-y-auto w-full">
                <table className="w-full bg-white rounded-[14px] shadow-md">
                    <thead>
                        <tr>
                            <th className="py-4 pl-10 border-b text-sm font-extrabold text-left">Tên khách hàng</th>
                            <th className="py-4 px-2 border-b text-sm font-extrabold text-left">Số điện thoại</th>
                            <th className="py-4 px-2 border-b text-sm font-extrabold text-left">Email</th>
                            <th className="py-4 px-2 border-b text-sm font-extrabold text-left">Số đơn hàng đã mua</th>

                        </tr>
                    </thead>

                    <tbody>
                        {data.map(user => (
                            <tr key={user.phoneNumber} 
                                className="cursor-pointer hover:bg-gray-100"
                            >
                                <td className="py-5 pl-10 border-b text-sm font-semibold text-left">{user.name}</td>
                                <td className="py-5 px-2 border-b text-sm font-semibold text-left">{user.phoneNumber}</td>
                                <td className="py-5 px-2 border-b text-sm font-semibold text-left">{user.email}</td>
                                <td className="py-5 px-2 border-b text-sm font-semibold text-left"></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


         </div>   
    )
}

export default UserList;