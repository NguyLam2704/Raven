import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MonthlyRevenueChart = ({ data }) => {
  const [selectedMonth, setSelectedMonth] = useState(Object.keys(data)[0]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const chartData = {
    labels: Object.keys(data[selectedMonth]),
    datasets: [
      {
        label: 'Doanh thu',
        data: Object.values(data[selectedMonth]),
        borderColor: 'blue',
        backgroundColor: 'blue',
        fill: false,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: 'blue',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 10000000,
        stepSize: 1000000,
        ticks: {
          callback: function(value) {
            return value.toLocaleString();
          },
        },
      },
      x: {
        ticks: {
          autoSkip: false,
        },
      },
    },
    plugins: {
      legend:{
        display: false,
      },
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
