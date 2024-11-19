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
        $today = now();
        $yesterday = now()->subDay();


        // Lấy số người xem web
        $viewsAll = DB::table('webviews')->max('views');
        $viewsMaxToday = DB::table('webviews')
            ->whereDate('created_at', now())
            ->max('views');
        $viewsMinToday = DB::table('webviews')
            ->whereDate('created_at', now())
            ->min('views');
        $viewsMaxYesterday = DB::table('webviews')
            ->whereDate('created_at', now()->subDay())
            ->max('views');
        $viewsMinYesterday = DB::table('webviews')
            ->whereDate('created_at', now()->subDay())
            ->min('views');

        // Lấy số lượng đơn hàng(bills)
        $donhang = DB::table('bills')->count();

        $donhangToday = Order::whereDate('datecreated', $today)->count();
        $donhangYesterday = Order::whereDate('datecreated', $yesterday)->count();


        // Doanh thu
        $doanhthu = DB::table('bills')->sum('total_cost');

        $doanhthuToday = Order::join('bills', 'bills.order_id', '=', 'orders.order_id')
            ->whereDate('datepaid', $today)
            ->where('status', '3')->sum('total_cost');

        $doanhthuYesterday = Order::join('bills', 'bills.order_id', '=', 'orders.order_id')
            ->whereDate('datepaid', $yesterday)
            ->where('status', '3')->sum('total_cost');


        // Lấy trạng thái 0 = huỷ, 1 = đang xử lý, 2 = đang giao, 3 đã hoàn thành
        $onProgress = Order::where('status', 2)->count();

        return [
            'view' => [
                'all' => $viewsAll,
                'today' => $viewsMaxToday - $viewsMinToday,
                'yesterday' => $viewsMaxYesterday - $viewsMinYesterday,
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
        ];
    }

    public function chitiet($id)
    {
        $date = Carbon::create(2024, $id);
        $data = array();
        for ($i = 1; $i <= $date->daysInMonth(); $i++) {
            $x = Carbon::create(2024, $id, $i);
            $doanhthu = Order::join('bills', 'bills.order_id', '=', 'orders.order_id')
                ->whereDate('datepaid', $x)
                ->where('status', '3')->sum('total_cost');
            array_push($data, $doanhthu);
        }
        return [
            'doanhthu' => $data
        ];
    }

    public function chitietdonhang(Request $request, $order_id)
    {
       $products = DB::table('product_order')->where('order_id', $order_id)
       ->join('pro_color_size','product_order.pro_color_size_id','pro_color_size.pro_color_size_id')
       ->get(['prod_id','quantity','size_id','color_id']);
       
       $order = DB::table('orders')->where('order_id', $order_id)->first();
       $user = DB::table('users')->where('user_id', $order->user_id)->get();
    //    $products[0]->product_id = 1;
        return [
            'products' => $products,
            'user' => $user,
            'order' => $order
        ];
    }

    public function ChangeStatus(Request $request, $order_id){
        $status = $request->status;
        $order = Order::find($order_id);
        if ( !$order){
            abort(404);
        }
        $order->status = $status;
        $order->save();
        return $order;
    }
}
