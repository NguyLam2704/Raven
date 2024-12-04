import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import 'tailwindcss/tailwind.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BieuDoCot = () => {
    // Dữ liệu
    const data = {
        week: [200, 100, 300, 50, 250, 80, 400],
        month: [1200, 4530, 5600, 6000, 5400, 6600, 6400, 5000, 4800, 5200, 4500, 6000],
        year: [60000, 75000, 80000, 95000],
    };

    const labels = {
        week: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        month: [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        ],
        year: ['2021', '2022', '2023', '2024'],
    };

    const [view, setView] = useState('week'); // Xem theo tuần, tháng, năm

    // Dữ liệu biểu đồ
    const chartData = {
        labels: labels[view],
        datasets: [
            {
                label: 'Doanh thu',
                data: data[view],
                backgroundColor: '#5a99f0', // Màu cột
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
                        weight: '500',
                    },
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    drawBorder: false,
                },
                ticks: {
                    stepSize: 50000,
                    font: {
                        size: 12,
                    },
                },
            },
        },
    };

    return (
        <div className="bg-white h-[450px] shadow-lg rounded-lg p-4 max-w-3xl mx-auto">
            {/* Nút chuyển đổi */}
            <div className="flex justify-end mb-4">
                <div className='h-5 w-full text-base font-bold  text-black p-4'>Thống kê doanh thu</div>
                <select
                    className="border rounded-md px-4 py-2 text-sm bg-gray-100"
                    value={view}
                    onChange={(e) => setView(e.target.value)}
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

export default BieuDoCot;
