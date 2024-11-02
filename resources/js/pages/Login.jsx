import React from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate('/home_admin');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-login">
    <div className="mt-5">
        <h1 className="text-[32px] font-bold text-white text-center mb-6">ADMIN DASHBOARD</h1>
    </div>
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-[500px] h-3/4 border-2 border-red">
        <h2 className="text-2xl font-medium text-center mb-4 mt-9">Đăng nhập</h2>
        <p className="text-sm text-center mb-6 text-gray-600">Vui lòng nhập email và password Admin đã được cung cấp</p>
        
        <form onSubmit={handleSubmit}>
            <div className="mb-6">
                <label className="block text-gray-700 mb-2" for="username">Username:</label>
                <input type="text" id="username" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="username"/>
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 mb-2" for="password">Mật khẩu:</label>
                <input type="password" id="password" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="•••••••"/>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 mt-8 rounded-md hover:bg-blue-600 transition">Đăng nhập</button>
        </form>
        
        <p className="text-xs text-center text-gray-500 mt-12 w-[80%] mx-auto">*Lưu ý: Nếu quên mật khẩu vui lòng liên hệ email 22520736@gm.uit.edu.vn để được hỗ trợ</p>
    </div>
    </div>
  );
};

export default Login;
