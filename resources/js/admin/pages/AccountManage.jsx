import React from 'react';
import { Helmet } from 'react-helmet';
import NavigationAdmin from '../components/NavigationAdmin';

const AccountManage = () => {
  return (
    <NavigationAdmin>
        <Helmet>
          <title>Quản lý tài khoản</title>
        </Helmet>
    <div class="mt-2">
        <h1 class="text-[32px] font-bold text-black text-left mb-6">Quản lý tài khoản</h1>
    </div>
    <div class="bg-white p-8 rounded-lg shadow-lg w-full h-auto border-2 border-red items-center justify-center">
        <div class="flex flex-col items-center mb-6">
            <img src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg" alt="User Avatar" class="w-24 h-24 rounded-full mb-2 border-2"/>
            <a href="#" class="text-blue-500 text-sm">Edit Photo</a>
        </div>

        <form class="w-[60%] items-center justify-center mx-auto">
            <div class="mb-4">
                <label class="block text-gray-700 mb-2" for="name">Họ và tên</label>
                <input type="text" id="name" value="Luan dz" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"/>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 mb-2" for="email">Email</label>
                <input type="email" id="email" value="22520827@gmail.com" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"/>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 mb-2" for="phone">Số điện thoại</label>
                <input type="text" id="phone" value="0364997254" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"/>
            </div>
            <button type="submit" class="w-full bg-blue-500 text-white my-6 py-2 rounded-md hover:bg-blue-600 transition mx-auto">Xác nhận</button>
        </form>
        
    </div>
    </NavigationAdmin>
  );
};

export default AccountManage;
