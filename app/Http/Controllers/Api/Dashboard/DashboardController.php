<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Models\Admin;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function thongke(Request $request)
    {
        $today = now()->toDateString();
        $yesterday = now()->subDay()->toDateString();

        // Lấy số người xem web
        $viewsAll = DB::table('webviews')->sum('views');

        $viewsToday = DB::table('webviews')
            ->whereDate('created_at', $today)
            ->max('views');
        if (!$viewsToday){
            $viewsToday = 0;
        }

        $viewsYesterday = DB::table('webviews')
            ->whereDate('created_at', $yesterday)
            ->max('views');
        if (!$viewsYesterday){
            $viewsYesterday = 0;
        }

        // Lấy số lượng đơn hàng(bills)
        $donhang = DB::table('bills')->count();

        $donhangToday = Order::whereDate('datecreated', $today)->count();
        $donhangYesterday = Order::whereDate('datecreated', $yesterday)->count();


        // Doanh thu
        $doanhthu = Order::join('bills', 'bills.order_id', '=', 'orders.order_id')
        ->where('status', '3')->sum('total_cost');

        $doanhthuToday = Order::join('bills', 'bills.order_id', '=', 'orders.order_id')
            ->whereDate('datepaid', $today)
            ->where('status', '3')->sum('total_cost');

        $doanhthuYesterday = Order::join('bills', 'bills.order_id', '=', 'orders.order_id')
            ->whereDate('datepaid', $yesterday)
            ->where('status', '3')->sum('total_cost');



        // Lấy trạng thái 0 = huỷ, 1 = đang xử lý, 2 = đang giao, 3 đã hoàn thành
        $onProgress = Order::where('status', 2)->count();


        $date = Carbon::now();
        $m = $date->month;
        $data = array();
        // for ($i = 1; $i <= $date->day; $i++) {
        //     $x = Carbon::create(2024, $m, $i);
        //     $doanhthu = Order::join('bills', 'bills.order_id', '=', 'orders.order_id')
        //         ->whereDate('datepaid', $x)
        //         ->where('status', '3')->sum('total_cost');
        //     $data[$i] = $doanhthu;
        // }
        $month = '';
        switch ($m) {
            case 1:
                $month = 'Tháng 1';
                break;
            case 2:
                $month = 'Tháng 2';
                break;
            case 3:
                $month = 'Tháng 3';
                break;
            case 4:
                $month = 'Tháng 4';
                break;
            case 5:
                $month = 'Tháng 5';
                break;
            case 6:
                $month = 'Tháng 6';
                break;
            case 7:
                $month = 'Tháng 7';
                break;
            case 8:
                $month = 'Tháng 8';
                break;
            case 9:
                $month = 'Tháng 9';
                break;
            case 10:
                $month = 'Tháng 10';
                break;
            case 11:
                $month = 'Tháng 11';
                break;
            default:
                $month = 'Tháng 12';
                break;
        }

        return [
            'view' => [
                'all' => $viewsAll,
                'today' => $viewsToday,
                'yesterday' => $viewsYesterday,
            ],
            'donhang' => [
                'all' => $donhang,
                'today' => $donhangToday,
                'yesterday' => $donhangYesterday
            ],
            'doanhthu' => [
                'all' => $doanhthu,
                'today' => $doanhthuToday,
                'yesterday' => $doanhthuYesterday
            ],
            'onProgress' => $onProgress,
            'chart' => [$month => $data]
        ];
    }

    public function chitiet($id)
    {
        if ($id > 12 || $id <= 0) {
            return ['error' => 'Không tồn tại tháng ' + $id];
        }

            $date = Carbon::create(2024, $id);
            $data = array();
            for ($i = 1; $i <= $date->daysInMonth(); $i++) {
                $x = Carbon::create(2024, $id, $i);
                $doanhthu = Order::join('bills', 'bills.order_id', '=', 'orders.order_id')
                    ->whereDate('datepaid', $x)
                    ->where('status', '3')->sum('total_cost');
                $data[$i] = $doanhthu;

        }
    
        return [
            'chartdata'=> $data
        ];
    }

    public function chitietdonhang(Request $request, $order_id)
    {
        // Lấy prod_color_size
        $prod_color_size = DB::table('product_order')->where('order_id', $order_id)
            ->join('pro_color_size', 'product_order.pro_color_size_id', 'pro_color_size.pro_color_size_id')
            ->get(['prod_id', 'quantity', 'size_id', 'color_id']);
        
        // Lấy prod_id
        $prod_id = [];
        foreach ($prod_color_size as $element ) {
            $prod_id[] = $element->prod_id;
        }
        $prod_id = array_unique($prod_id);

        // Lấy thông tin products từ mảng prod_id
        $products = [];
        foreach ($prod_id as $element) {
            $item = DB::table('products')->where('prod_id',$element)->first();
            $img = DB::table('product_images')->where('prod_id',$element)->where('is_primary',true)->first();
            $item->image = $img->image;
            $products[] = $item;
        }

        // Lấy thông tin đơn hàng
        $order = DB::table('orders')->where('order_id', $order_id)->first();
    
        // Lấy thông tin user
        $user = DB::table('users')->where('user_id', $order->user_id)->first();

        return [
            'pro_color_size' => $prod_color_size,
            'user' => $user,
            'order' => $order,
            'products' => $products
        ];
    }

    public function ChangeStatus(Request $request, $order_id)
    {
        // Lấy trạng thái cần thay đổi
        $status = $request->status;

        // Tìm đơn hàng
        $order = Order::find($order_id);
        // Nếu không có trả về 404
        if (!$order) {
            abort(404);
        }
        // Chuyển trạng thái
        $order->status = $status;
        $order->save();
        
        return $order;
    }

    public function getSizeColorById(Request $request, $product_id)
    {
        $SizeColor = DB::table('pro_color_size')->where('prod_id', $product_id)->get();
        return $SizeColor;
    }

    public function getUserByPhone(Request $request, $phone_num)
    {
        $user = DB::table('users')->where('phonenumber', $phone_num)->get();
        return $user;
    }

    public function getOrderByPhone(Request $request, $phone_num)
    {
        $user = DB::table('users')->where('phonenumber', $phone_num)->get();
        return $user;
    }
}
