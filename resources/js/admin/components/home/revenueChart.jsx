import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

//Tạo các thành phần của biểu đồ
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MonthlyRevenueChart = ({ data }) => {
  //Tạo trạng thái tháng đang được chọn, giá trị mặc định là tháng đầu tiên
  const [selectedMonth, setSelectedMonth] = useState(Object.keys(data)[0]);

  //Hàm này xử lý sự kiện khi người dùng thay đổi tháng được chọn 
  // Nó cập nhật selectedMonth với giá trị được chọn.
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };


  //Cấu hình dữ liệu cho biểu đồ
  const chartData = {
    labels: Object.keys(data[selectedMonth]), //Hiển thị nhãn trên trục X
    datasets: [
      {
        label: 'Doanh thu', //Nhãn hiển thị của tập dữ liệu
        data: Object.values(data[selectedMonth]), //dữ liệu của biểu đồ
        //thiết lập màu sắc và hiển thị đường kẻ và các điểm trên biểu đồ
        borderColor: 'blue',
        backgroundColor: 'blue',
        fill: false,
        pointRadius: 3,
        pointHoverRadius: 5,
        borderWidth: 1,
        pointBackgroundColor: 'blue',
      },
    ],
  };

  const options = {
    //cấu hình các trục
    scales: {
      //trục y bắt đầu từ 0 - 10000000, bước nhảy 1000000
      y: {
        beginAtZero: true,
        min: 0,
        max: 10000000,
        stepSize: 1000000,
        //tùy chỉnh các nhãn trên trục y để hiển thị dưới dạng số có dấu phân cách hàng nghìn.
        ticks: {
          callback: function(value) {
            return value.toLocaleString();
          },
        },
      },
      x: {
        ticks: {
          autoSkip: false, //đảm bảo tất cả các nhãn điều được hiển thị
        },
      },
    },
    plugins: {
      legend:{
        display: false, //ẩn chú thích
      },
      //tùy chỉnh khi chuột di chuyển đến
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `Doanh thu: ${tooltipItem.parsed.y.toLocaleString()} VND`;
          },
          title: function(tooltipItem){
            let title = tooltipItem[0].label;
            return `Ngày: ${title}`;
          }
        },
      },
    },
  };

  return (
    <div className="px-4 bg-white rounded-[14px] shadow-md h-[444px]">
        <div className="flex items-center justify-between mb-1">
            <h2 className="text-2xl font-bold my-4">Doanh thu bán hàng theo tháng</h2>
            <select value={selectedMonth} onChange={handleMonthChange} className="pl-2 mr-4 border rounded">
                {Object.keys(data).map((month) => (
                <option key={month} value={month}>{month}</option>
                ))}
            </select>
        </div>

        <div className="relative h-96">
          <Line data={chartData} options={options} />
        </div>
    </div>
  );
};

export default MonthlyRevenueChart;
