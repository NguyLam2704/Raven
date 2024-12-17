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
            background-color: #1E0342;
            color: #fff;
            border-radius: 8px 8px 0 0;
        }

        .email-header img {
            max-width: 150px;
            /* Chỉnh kích thước logo */
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

        th,
        td {
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

        .payment-method {
            text-align: center;
            margin-top: 20px;
        }

        .qr-code img {
            max-width: 200px;
            margin: 20px auto;
        }
    </style>
</head>

<body>
    <div class="email-container">
        <!-- Email Header -->
        <div class="email-header">
            <h1>Xác Nhận Đơn Hàng tại Raven Clothes</h1>
        </div>

        <!-- Email Content -->
        <div class="email-content">
            <p>Chào {{ $CustomerName }},</p>
            <p>Cảm ơn bạn đã mua sắm tại <strong>Raven</strong>! Chúng tôi đã nhận được đơn hàng của bạn và dưới đây là
                thông tin chi tiết về đơn hàng của bạn:</p>

            <h3>Thông tin đơn hàng</h3>
            <p><strong>Mã đơn hàng:</strong> {{ $OrderId }}</p>
            <p><strong>Ngày đặt hàng:</strong> {{ $CustomerTimeOrder }}</p>

            <h3>Chi tiết sản phẩm</h3>
            <table>
                <tr>
                    <th>Sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Giá</th>
                </tr>
                @foreach ($Product as $product)
                    <tr>
                        <td>{{ $product['productName'] }}</td>
                        <td>{{ $product['quantity'] }}</td>
                        <td>{{ number_format($product['discount'] > 0 ? $product['cost'] - ($product['cost'] * $product['discount']) / 100 : $product['cost'], 0, ',', '.') }}
                            VND</td>
                    </tr>
                @endforeach
            </table>

            <h3>Thông tin giao hàng</h3>
            <p><strong>Tên người nhận:</strong> {{ $CustomerName }}</p>
            <p><strong>Địa chỉ giao hàng:</strong> {{ $CustomerDetailAddress }}, {{ $CustomerAddress }}</p>
            <p><strong>Số điện thoại:</strong> {{ $CustomerPhonenumber }}</p>
            <p><strong>Phí vận chuyển:</strong> 50.000 VND</p>

            <div class="order-total">
                <p><strong>Tổng giá trị đơn hàng: </strong>{{ number_format($TotalCost, 0, ',', '.') }} VND</p>
            </div>

            <!-- Điều kiện hiển thị QR Code hoặc Ship Code -->
            <div class="payment-method">
                @if ($PaymentMethod === true)
                    <p>Vui lòng chuyển khoản theo mã QR bên dưới để hoàn tất đơn hàng:</p>
                    <div class="qr-code">
                        <img src="{{ $message->embed(public_path('storage/asset/QR.png')) }}" alt="QR Code" />
                    </div>
                @elseif($PaymentMethod === false)
                    <p>Đơn hàng của bạn sẽ được giao hàng và thanh toán khi nhận hàng (Ship COD).</p>
                @endif
            </div>

            <p><strong>Lưu ý:</strong> Đơn hàng của bạn sẽ được giao trong vòng 3-5 ngày làm việc (tùy theo khu vực).
            </p>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>Cảm ơn bạn đã chọn mua sắm tại <strong>Raven</strong>.</p>
            <p>Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua email <a
                    href="mailto:22520827@gm.uit.edu.vn">22520827@gm.uit.edu.vn</a> hoặc gọi đến số <a
                    href="tel:0384666498">0384666498</a>.</p>
        </div>
    </div>
</body>

</html>
