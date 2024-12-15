import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import bg_login from "../asset/bg_login.png";

const ResetPassword = () => {
    const [formData, setFormData] = useState({
        new_password: "",
        new_password_confirmation: "",
    });
    const [errors, setErrors] = useState({});
    const [isNotExists, setNotExists] = useState(true);
    const navigate = useNavigate();
    const { "*": token } = useParams();

    useEffect(() => {
        // Kiểm tra xem đường link có hợp lệ không
        const url = "/api/admin/reset-password";
        const checkToken = async () => {
            const res = await fetch(url, {
                method: "post",
                body: JSON.stringify({ token: token }),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            if (res.status == 200) {
                setNotExists(false);
            }
            const data = await res.json();
            setFormData({ ...formData, gmail: data.gmail });
            console.log(formData);
        };

        checkToken();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Thay đổi mật khẩu cho admin
        const url = "/api/admin/changepass";
        const res = await fetch(url, {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        setErrors("");
        const data = await res.json();
        if (data.errors) {
            // Nếu lỗi thì xuất lên màn hình
            setErrors(data.errors);
        } else {
            console.log("Thay đổi mk thành công");
            // Điều hướng về trang đăng nhập
            navigate("/login_admin");
        }
    };

    return (
        <div>
            {isNotExists ? (
                <div>
                    <h1>404</h1>
                </div>
            ) : (
                <div
                    className="flex flex-col items-center justify-center h-screen bg-[#EEEEEE]"
                    // style={{ backgroundImage: `url(${bg_login})` }}
                >
                    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-[500px] h-[550px] border-2 border-red">
                        <h2 className="text-2xl font-medium text-center mb-4 mt-9">
                            Đặt lại mật khẩu
                        </h2>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4 w-[90%] mx-auto">
                                <label
                                    className="block text-gray-700 mb-2"
                                    htmlFor="password_new"
                                >
                                    <span className="text-red-500">*</span>Mật
                                    khẩu mới
                                </label>
                                <input
                                    value={formData.new_password}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const trueValue = value.replace(
                                            /\s/g,
                                            ""
                                        );
                                        setFormData({
                                            ...formData,
                                            new_password: trueValue,
                                        });
                                    }}
                                    type="password"
                                    id="password_new"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                {errors.new_password && (
                                    <p className=" text-[12px] text-red-500">
                                        {errors.new_password}
                                    </p>
                                )}
                            </div>
                            <div className="mb-4 w-[90%] mx-auto">
                                <label
                                    className="block text-gray-700 mb-2"
                                    htmlFor="confirm_password"
                                >
                                    <span className="text-red-500">*</span>Nhập
                                    lại mật khẩu mới
                                </label>
                                <input
                                    value={formData.new_password_confirmation}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const trueValue = value.replace(
                                            /\s/g,
                                            ""
                                        );
                                        setFormData({
                                            ...formData,
                                            new_password_confirmation:
                                                trueValue,
                                        });
                                    }}
                                    type="password"
                                    id="confirm_password"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                {errors.new_password_confirmation && (
                                    <p className=" text-[12px] text-red-500">
                                        {errors.new_password_confirmation}
                                    </p>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 mt-4 rounded-md hover:bg-blue-600 active:scale-[0.98]  transition"
                            >
                                Xác nhận
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResetPassword;
