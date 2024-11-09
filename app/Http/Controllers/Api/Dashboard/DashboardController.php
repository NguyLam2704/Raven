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
        $viewsToday = DB::table('webviews')->max('views');
        $viewsYesterday = DB::table('webviews')
            ->whereDate('created_at', $yesterday)
            ->max('views');


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
        $onProgress = Order::where('status', 1)->count();

        return [
            'view' => [
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

    public function donhang()
    {
       
        return [
            'donhang' => 'hehe'
        ];
    }
}
