import React, { useState } from "react";
import { Helmet } from "react-helmet";
import NavigationAdmin from "../components/NavigationAdmin";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        old_password: "",
        new_password: "",
        new_password_confirmation: "",
    });
    const [errors, setErrors] = useState([]);
    const token = "Bearer " + localStorage.getItem("token");

    // Lấy dữ liệu admin
    const data = JSON.parse(localStorage.getItem("admin"));
    const id = data.id;
    const url = "/api/admin/" + id + "/changepassword";
    const navigate = useNavigate();

    // Bấm xác nhận
    const handleSubmit = async (e) => {
        e.preventDefault();
        const loadingSwal = Swal.fire({
            title: "Loading...!",
            text: "Đang thay đổi mật khẩu.",
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading(); // Hiển thị spinner loading
            },
        });


        // Đẩy form data lên api
        const res = await fetch(url, {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: token,
            },
        });

        // Handle kết quả trả về
        setErrors("");
        const data = await res.json();
        if (data.errors) {
            // Nếu lỗi thì xuất lên màn hình
            setErrors(data.errors);
            Swal.fire({
                title: 'Cập nhật không thành công!',
                text: 'Cập nhật mật khẩu không thành công.',
                icon: 'error',
                showConfirmButton: false,
                timer: 4000,
            });
        } else {
            // Nếu không có lỗi thì lưu thông tin vô local storage
            data.password = formData.new_password;
            localStorage.setItem("admin", JSON.stringify(data));
            console.log("Thay đổi mk thành công");
            Swal.fire({
                title: 'Cập nhật thành công!',
                text: 'Cập nhật mật khẩu thành công.',
                icon: 'success',
                showConfirmButton: false,
                timer: 4000,
            });

            navigate("/login_admin")

        }
    };

    return (
        <NavigationAdmin>
            <Helmet>
                <title>Thay đổi mật khẩu</title>
            </Helmet>
            <div className="mt-2">
                <h1 className="mobile:text-[20px] ipad:text-[25px]  desktop:text-[32px] font-bold text-black text-left mb-6">
                    Thay đổi mật khẩu
                </h1>
            </div>
            <div className="bg-white mobile:p-2 ipad:p-4 rounded-lg shadow-lg w-full h-auto border-2 tems-center justify-center">
                <form
                    className="desktop:w-[60%] flex-col items-center justify-center mx-auto border-5"
                    onSubmit={handleSubmit}
                >
                    <div className="mb-4 mobile:w-[80%] ipad:w-2/3 mx-auto">
                        <label
                            className="block text-gray-700 mb-2"
                            htmlFor="password_old"
                        >
                            <span className="text-red-500">*</span>Mật khẩu hiện
                            tại
                        </label>
                        <input
                            value={formData.old_password}
                            onChange={(e) => {
                                const value = e.target.value;
                                const trueValue = value.replace(/\s/g, "");
                                setFormData({
                                    ...formData,
                                    old_password: trueValue,
                                });
                            }}
                            type="password"
                            id="password_old"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.old_password && (
                            <p className=" text-[12px] text-red-500">
                                {errors.old_password}
                            </p>
                        )}
                    </div>
                    <div className="mb-4 mobile:w-[80%] ipad:w-2/3 mx-auto">
                        <label
                            className="block text-gray-700 mb-2"
                            htmlFor="password_new"
                        >
                            <span className="text-red-500">*</span>Mật khẩu mới
                        </label>
                        <input
                            value={formData.new_password}
                            onChange={(e) => {
                                const value = e.target.value;
                                const trueValue = value.replace(/\s/g, "");
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
                    <div className="mb-4 mobile:w-[80%] ipad:w-2/3 mx-auto">
                        <label
                            className="block text-gray-700 mb-2"
                            htmlFor="confirm_password"
                        >
                            <span className="text-red-500">*</span>Nhập lại mật
                            khẩu mới
                        </label>
                        <input
                            value={formData.new_password_confirmation}
                            onChange={(e) => {
                                const value = e.target.value;
                                const trueValue = value.replace(/\s/g, "");
                                setFormData({
                                    ...formData,
                                    new_password_confirmation: trueValue,
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
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="mobile:w-[80%] ipad:w-2/3 bg-blue-500 my-6 text-white py-2 rounded-md hover:bg-blue-600 transition 
                            outline-none ring-indigo-500/70 ring-offset-2 focus-visible:ring-2 hover:scale-[1.03] active:scale-[0.98]"
                        >
                            Xác nhận
                        </button>
                    </div>

                </form>
            </div>
        </NavigationAdmin>
    );
};

export default ChangePassword;
