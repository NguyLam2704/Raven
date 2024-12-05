import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import "tailwindcss/tailwind.css";
import axios from "axios";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const ChartUser = ({user_id}) => {
    // Khởi tạo dữ liệu
    const [data, setData] = useState({
        week: [0, 0, 0, 0, 0, 0, 0],
        month: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        year: [0, 0, 0, 0],
    });
    const currentYear = new Date().getFullYear();

    // Hàm lấy dữ liệu từ DB
    const getData = async (type) => {
        const res = await axios.get(`/api/dashboard/user/${user_id}/bieudo/${type}`);

        const value = res.data;
        if (type == "week") {
            let week = [0, 0, 0, 0, 0, 0, 0];
            value.forEach((element) => {
                // Lấy vị trí lưu vào biến
                let position = new Date(element.date).getDay() - 1;
                // Vì hàm Date của React Sunday = 0 ngược với Laravel => +6 để lấy được đúng vị trí
                if (position < 0) {
                    position = 6;
                }
                week[position] = element.buy;
            });
            setData({...data,week});
        } else if (type == 'month') {
            let month = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            value.forEach((element) => {
                // Lấy vị trí lưu vào biến
                let position = new Date(element.date).getMonth();
                month[position] = element.buy;
            });
            setData({...data,month});
        }else {
            let year = [0, 0, 0, 0];
            value.forEach((element) => {
                // Lấy vị trí lưu vào biến. Vì các năm là số /2024/ nên để lấy được position thì cần trừ đi năm hiện tại
                let position = new Date(element.date).getFullYear() - currentYear + 3;
                year[position] = element.buy;
            });
            setData({...data,year});
        }
    };

    useEffect(() => {
        getData("week");
    }, []);

    const labels = {
        week: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        month: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        year: [currentYear - 3, currentYear - 2, currentYear - 1, currentYear],
    };

    const [view, setView] = useState("week"); // Xem theo tuần, tháng, năm
    const handleChangeLabel = (e) => {
        getData(e.target.value);
        setView(e.target.value);
    }

    // Dữ liệu biểu đồ
    const chartData = {
        labels: labels[view],
        datasets: [
            {
                label: "Doanh thu",
                data: data[view],
                backgroundColor: "#5a99f0", // Màu cột
                borderRadius: 6, // Bo góc
                barThickness: 20, // Độ dày cột
            },
        ],
    };

    // Tùy chọn hiển thị biểu đồ
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false, // Ẩn legend
            },
            title: {
                display: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false, // Ẩn lưới ngang
                },
                ticks: {
                    font: {
                        size: 12,
                        weight: "500",
                    },
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    drawBorder: false,
                },
                ticks: {
                    stepSize: 2,
                    font: {
                        size: 12,
                    },
                },
            },
        },
    };

    return (
        <div className="bg-white h-[450px] rounded-lg p-4 max-w-3xl mx-auto">
            {/* Nút chuyển đổi */}
            <div className="flex justify-end mb-4">
                <div className='h-5 w-full text-base font-bold  text-black p-4'>Thống kê đơn hàng đã giao</div>
                <select
                    className="border rounded-md px-4 py-2 text-sm bg-gray-100"
                    value={view}
                    onChange={handleChangeLabel}
                >
                    <option value="week">Tuần</option>
                    <option value="month">Tháng</option>
                    <option value="year">Năm</option>
                </select>
            </div>

            {/* Biểu đồ */}
            <div className="bg-white h-[380px] rounded-lg p-4 mx-auto">
                <Bar data={chartData} options={options} height={300} />
            </div>
        </div>
    );
};

export default ChartUser;
