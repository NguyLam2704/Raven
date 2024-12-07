{{-- <div>
    <h2>Xin chào {{$CustomMessage}},</h2>
    <p>
        Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn. Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.<br>
        
        Để đặt lại mật khẩu của bạn, vui lòng nhấp vào liên kết dưới đây:<br>
        

        
        
        Liên kết này sẽ hết hạn sau <strong>10 phút</strong> , vì vậy hãy đảm bảo bạn sử dụng nó trước khi hết hạn.<br>
        
        Nếu bạn gặp bất kỳ vấn đề nào, vui lòng liên hệ với bộ phận hỗ trợ khách hàng của chúng tôi.<br>
        
        Trân trọng,<br>
        Raven</p>
</div> --}}
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Xác Nhận Đơn Hàng</title>
    <style>
        /* General styles */
        body {
            font-family: Arial, sans-serif;
            background-color: #f8f8f8;
            margin: 0;
            padding: 0;
        }

        .email-container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
        }

        .email-header {
            text-align: center;
            padding: 20px;
            background-color: #c73659;
            color: #fff;
            border-radius: 8px 8px 0 0;
        }

        .email-header img {
            max-width: 150px;  /* Chỉnh kích thước logo */
            margin-bottom: 10px;
        }

        .email-header h1 {
            margin: 0;
            font-size: 24px;
        }

        .email-content {
            padding: 20px;
        }

        .email-content h3 {
            font-size: 20px;
            color: #333;
            margin-bottom: 10px;
        }

        .email-content p {
            font-size: 16px;
            color: #333;
            line-height: 1.5;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th, td {
            padding: 12px;
            border: 1px solid #ddd;
            text-align: left;
        }

        th {
            background-color: #f4f4f4;
            font-weight: bold;
        }

        .order-total {
            font-size: 18px;
            font-weight: bold;
            margin-top: 20px;
        }

        .footer {
            text-align: center;
            padding: 20px;
            font-size: 14px;
            color: #777;
            background-color: #f8f8f8;
            border-radius: 0 0 8px 8px;
        }

        .footer a {
            color: #c73659;
            text-decoration: none;
        }

        .button {
            background-color: #c73659;
            color: #fff;
            padding: 10px 20px;
            border-radius: 5px;
            text-decoration: none;
            font-weight: bold;
            display: inline-block;
            margin-top: 20px;
        }

        .button:hover {
            background-color: #a02d47;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Email Header -->
        <div class="email-header">
            <img src='../Logo.svg' alt="Logo [Tên Shop]" />
            <h1>Xác Nhận Đơn Hàng tại Raven Clothes</h1>
        </div>

        <!-- Email Content -->
        <div class="email-content">
            <p>Chào {{$CustomerName}},</p>
            <p>Cảm ơn bạn đã mua sắm tại <strong>Raven</strong>! Chúng tôi đã nhận được đơn hàng của bạn và dưới đây là thông tin chi tiết về đơn hàng của bạn:</p>

            <h3>Thông tin đơn hàng</h3>
            <p><strong>Mã đơn hàng:</strong> {{$OrderId}}</p>
            <p><strong>Ngày đặt hàng:</strong> {{$CustomerTimeOrder}}</p>

            <h3>Chi tiết sản phẩm</h3>
            <table>
                <tr>
                    <th>Sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Giá</th>
                </tr>
                {{-- <pre>
                    @php
                        print_r($Product);
                    @endphp
                </pre>
                @php
                $dataType = gettype($Product);
                @endphp

                <p>The data type of the storeProduct is: {{ $dataType }}</p> --}}
                @foreach($Product as $product)
                    <tr>
                        <td>{{ $product['productName'] }}</td>
                        <td>{{ $product['quantity']}}</td> <!-- Assuming you have a pivot table for many-to-many relationships -->
                        <td>{{ number_format($product['discount'] > 0 ?$product['cost'] - $product['cost']*$product['discount']/100 : $product['cost'], 0, ',', '.') }} VND</td>
                    </tr>
                @endforeach
                {{-- {var_dump() --}}
                <!-- Add more rows as needed -->
            </table>

            <h3>Thông tin giao hàng</h3>
            <p><strong>Tên người nhận:</strong> {{$CustomerName}}</p>
            <p><strong>Địa chỉ giao hàng:</strong> {{$CustomerDetailAddress}}, {{$CustomerAddress}}</p>
            <p><strong>Số điện thoại:</strong> {{$CustomerPhonenumber}}</p>
            <p><strong>Phí vận chuyển:</strong> 50.000 VND</p>

            <div class="order-total">
                <p><strong>Tổng giá trị đơn hàng: </strong>{{ number_format($TotalCost, 0, ',', '.') }} VND</p>
            </div>

            <p><strong>Lưu ý:</strong> Đơn hàng của bạn sẽ được giao trong vòng 3-5 ngày làm việc (tùy theo khu vực).</p>

            {{-- <a href="[Link Đến Trang Web]" class="button">Xem Đơn Hàng của Bạn</a> --}}
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>Cảm ơn bạn đã chọn mua sắm tại <strong>Raven</strong>.</p>
            <p>Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua email <a href="mailto:[Email Shop]"> 22520827@gm.uit.edu.vn</a> hoặc gọi đến số <a href="tel:[Số Điện Thoại Shop]"> 01234567891</a>.</p>
        </div>
    </div>
</body>
</html>
