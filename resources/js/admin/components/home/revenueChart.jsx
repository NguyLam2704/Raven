import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import axios from "axios";
import { height } from "@fortawesome/free-brands-svg-icons/faApple";

//Tạo các thành phần của biểu đồ
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const MonthlyRevenueChart = () => {
    const month = [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12",
    ];
    const today = new Date();
    //Tạo trạng thái tháng đang được chọn, giá trị mặc định là tháng đầu tiên
    const [selectedMonth, setSelectedMonth] = useState(month[today.getMonth()]);
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async (month) => {
        const res = await axios.get("/api/dashboard/chitiet/" + month);
        setData(res.data.chartdata);
        setIsLoading(false);
    };

    useEffect(() => {
        const id = new Date();
        fetchData(id.getMonth() + 1);
    }, []);

    //Hàm này xử lý sự kiện khi người dùng thay đổi tháng được chọn
    // Nó cập nhật selectedMonth với giá trị được chọn.
    const handleMonthChange = (event) => {
        const id = month.indexOf(event.target.value) + 1;
        console.log(id);
        fetchData(id);

        setSelectedMonth(month[event.target.value]);
    };

    //Cấu hình dữ liệu cho biểu đồ
    const chartData = {
        labels: Object.keys(data), //Hiển thị nhãn trên trục X
        datasets: [
            {
                label: "Doanh thu", //Nhãn hiển thị của tập dữ liệu
                data: Object.values(data), //dữ liệu của biểu đồ
                //thiết lập màu sắc và hiển thị đường kẻ và các điểm trên biểu đồ
                borderColor: "blue",
                backgroundColor: "blue",
                fill: false,
                pointRadius: 3,
                pointHoverRadius: 5,
                borderWidth: 1,
                pointBackgroundColor: "blue",
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
                // stepSize: 1000000,
                //tùy chỉnh các nhãn trên trục y để hiển thị dưới dạng số có dấu phân cách hàng nghìn.
                ticks: {
                    callback: function (value) {
                        return value.toLocaleString();
                    },
                },
            },
            x: {
                ticks: {
                    autoSkip: true, // Bỏ qua một số nhãn nếu không đủ chỗ
                    maxRotation: 45, // Xoay nhãn để tránh chồng chéo
                    minRotation: 0,
                },
            },
        },
        plugins: {
            legend: {
                display: false, //ẩn chú thích
            },
            //tùy chỉnh khi chuột di chuyển đến
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `Doanh thu: ${tooltipItem.parsed.y.toLocaleString()} VND`;
                    },
                    title: function (tooltipItem) {
                        let title = tooltipItem[0].label;
                        return `Ngày: ${title}`;
                    },
                },
            },
        },
    };

    return (
        <div className="px-4 mobile:h-[300px] ipad:h-[400px] desktop:h-[470px]">
            <div className="flex items-center justify-between mb-1">
                <h2 className="desktop:text-2xl ipad:text-xl mobile:text-sm font-bold mobile:my-2 ipad:my-2 desktop:my-4">
                    Doanh thu bán hàng theo tháng
                </h2>
                <select
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    className="ipad:text-[14px] mobile:text-[11px] desktop:text-base pl-2 mr-4 border rounded"
                >
                    {month.map((month) => (
                        <option key={month} value={month}>
                            {month}
                        </option>
                    ))}
                </select>
            </div>

            {isLoading ? (
                <div></div>
            ) : (
                <Line 
                    data={chartData} 
                    options={options}                     
                />
            )}
        </div>
    );
};

export default MonthlyRevenueChart;
