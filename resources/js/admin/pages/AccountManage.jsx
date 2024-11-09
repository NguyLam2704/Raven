import React, { useState } from "react";
import { Helmet } from "react-helmet";
import NavigationAdmin from "../components/NavigationAdmin";

const AccountManage = () => {
    // Lấy admin từ trong local storage
    const admin = JSON.parse(localStorage.getItem("admin"));
    const [name, setName] = useState(admin.name);
    const [email, setEmail] = useState(admin.email);
    const [phoneNum, setPhoneNum] = useState(admin.phoneNumber);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            name: name,
            email: email,
            phoneNumber: phoneNum,
        };
        let id = admin.id;
        const res = await fetch("/api/admin/" + id, {
            method: "put",
            body: JSON.stringify(formData),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();

        if (data.errors) {
            setErrors(data.errors);
        } else {
            setErrors({});
            console.log(data);
        }
    };

    return (
        <NavigationAdmin>
            <Helmet>
                <title>Quản lý tài khoản</title>
            </Helmet>
            <div className="mt-2">
                <h1 className="text-[32px] font-bold text-black text-left mb-6">
                    Quản lý tài khoản
                </h1>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full h-auto border-2 border-red items-center justify-center">
                <div className="flex flex-col items-center mb-6">
                    <img
                        src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg"
                        alt="User Avatar"
                        className="w-24 h-24 rounded-full mb-2 border-2"
                    />
                    <a href="#" className="text-blue-500 text-sm">
                        Edit Photo
                    </a>
                </div>

                <form
                    className="w-[60%] items-center justify-center mx-auto"
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 mb-2"
                            htmlFor="name"
                        >
                            Họ và tên
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.name && (
                            <p className=" text-[12px] text-red-500">
                                Tên không hợp lệ!
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 mb-2"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.email && (
                            <p className=" text-[12px] text-red-500">
                                Email không hợp lệ!
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 mb-2"
                            htmlFor="phone"
                        >
                            Số điện thoại
                        </label>
                        <input
                            type="text"
                            id="phone"
                            value={phoneNum}
                            onChange={(e) => setPhoneNum(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.phoneNumber && (
                            <p className=" text-[12px] text-red-500">
                                Số điện thoại không hợp lệ!
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white my-6 py-2 rounded-md hover:bg-blue-600 transition mx-auto"
                    >
                        Xác nhận
                    </button>
                </form>
            </div>
        </NavigationAdmin>
    );
};

export default AccountManage;
