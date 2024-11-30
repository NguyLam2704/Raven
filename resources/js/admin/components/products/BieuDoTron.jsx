import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Đăng ký các thành phần của biểu đồ
ChartJS.register(ArcElement, Tooltip, Legend);

const BieuDoTron = ({ data, title }) => {
  // State để lưu thời gian được chọn
  const [timeFrame, setTimeFrame] = useState('week');

  // Tạo dữ liệu từ thời gian được chọn
  const labels = Object.keys(data[timeFrame]); // Lấy danh sách size (S, M, L, ...)
  const values = title === "Size" ? Object.values(data[timeFrame]) : labels.map((label) => data[timeFrame][label][0]); // Lấy số lượng tương ứng
  const backgroundColors = labels.map((label) => data[timeFrame][label][1]); 

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: title === "Size" ? ['#FFCE56', '#FF5722', '#4CAF50', '#2196F3'] : backgroundColors, // Màu cho từng phần
        hoverOffset: 4,
        borderWidth: 0.3, // Độ dày viền
        borderColor: '#cccccc', // Màu viền (xám nhạt)
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) =>
            `${tooltipItem.label}: ${tooltipItem.raw} (${(
              (tooltipItem.raw /
                values.reduce((total, num) => total + num, 0)) *
              100
            ).toFixed(1)}%)`,
        },
      },
      legend: {
        display: false, // Ẩn legend mặc định
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="p-4 w-[100%] rounded-md my-1">

      {/* Dropdown chọn thời gian */}
      <div className="flex justify-end mb-4">
        <div className="h-9 w-full text-base font-bold  text-black p-4">{title}</div>
        <select
          className="border rounded-md text-sm bg-gray-100"
          value={timeFrame}
          onChange={(e) => setTimeFrame(e.target.value)}
        >
          <option value="week">Tuần</option>
          <option value="month">Tháng</option>
          <option value="year">Năm</option>
        </select>
      </div>

      {/* Biểu đồ */}
      <div className="relative flex h-40 w-[100%]  self-center items-center">
        <Pie data={chartData} options={options} />
      </div>

      {/* Chú thích */}
      <div className="mt-4">
        {labels.map((label, index) => (
          <div key={label} className="flex items-center mb-2 text-sm">
            <span
              className="w-4 h-4 mr-2 rounded"
              style={{ backgroundColor: chartData.datasets[0].backgroundColor[index],  border: '0.3px solid #cccccc' }}
            ></span>
            {title === "Màu sắc" ? `Màu ${label}` : `Size ${label}`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BieuDoTron;
