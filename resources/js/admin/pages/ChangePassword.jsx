import React from 'react';
import { Helmet } from 'react-helmet';
import NavigationAdmin from '../components/NavigationAdmin';

const ChangePassword = () => {
  return (
    <NavigationAdmin>
        <Helmet>
          <title>Thay đổi mật khẩu</title>
        </Helmet>
    <div classNameName="mt-2">
        <h1 className="text-[32px] font-bold text-black text-left mb-6">Thay đổi mật khẩu</h1>
    </div>
    <div className="bg-white p-8 rounded-lg shadow-lg w-full h-auto border-2 tems-center justify-center">

        <form classNameName="w-[60%] items-center justify-center mx-auto border-5">
            <div className="mb-4 w-1/2 mx-auto">
                <label className="block text-gray-700 mb-2" for="password_old"><span className="text-red-500">*</span>Mật khẩu hiện tại</label>
                <input type="password" id="password_old" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"/>
            </div>
            <div className="mb-4 w-1/2 mx-auto">
                <label className="block text-gray-700 mb-2" for="password_new"><span className="text-red-500">*</span>Mật khẩu mới</label>
                <input type="password" id="password_new" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"/>
            </div>
            <div className="mb-4 w-1/2 mx-auto">
                <label className="block text-gray-700 mb-2" for="confirm_password"><span className="text-red-500">*</span>Nhập lại mật khẩu mới</label>
                <input type="password" id="confirm_password" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"/>
            </div>
            <button type="submit" className="w-1/2 bg-blue-500 my-6 text-white py-2 rounded-md hover:bg-blue-600 transition ml-[25%]">Xác nhận</button>
        </form>       
    </div>
    </NavigationAdmin>
  );
};

export default ChangePassword;
