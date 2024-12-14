<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Models\Admin;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\ProColorSize;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function thongke(Request $request)
    {
        // Lấy ngày hiện tại
        $today = now()->toDateString();
        $yesterday = now()->subDay()->toDateString();

        // Lấy số người xem web
        $viewsAll = DB::table('webviews')->sum('views');

        // Lấy số view trong ngày
        $viewsToday = DB::table('webviews')
            ->whereDate('created_at', $today)
            ->max('views');
        if (!$viewsToday) {
            $viewsToday = 0;
        }

        // Lấy số view ngày hqua
        $viewsYesterday = DB::table('webviews')
            ->whereDate('created_at', $yesterday)
            ->max('views');
        if (!$viewsYesterday) {
            $viewsYesterday = 0;
        }

        // Lấy số lượng đơn hàng(bills)
        $donhang = DB::table('orders')->count();

        $donhangToday = Order::whereDate('datecreated', $today)->count();
        $donhangYesterday = Order::whereDate('datecreated', $yesterday)->count();


        // Doanh thu
        $doanhthu = Order::where('status', 3)
            ->join('product_order', 'product_order.order_id', '=', 'orders.order_id')
            ->select(DB::raw('sum(after_discount_cost*quantity) as sum'))
            ->value('sum');

        $doanhthuToday = Order::join('product_order', 'product_order.order_id', '=', 'orders.order_id')
            ->whereDate('datepaid', $today)
            ->where('status', '3')
            ->select(DB::raw('sum(after_discount_cost*quantity) as sum'))
            ->value('sum');

        $doanhthuYesterday = Order::join('product_order', 'product_order.order_id', '=', 'orders.order_id')
            ->whereDate('datepaid', $yesterday)
            ->where('status', '3')
            ->select(DB::raw('sum(after_discount_cost*quantity) as sum'))
            ->value('sum');



        // Lấy trạng thái 0 = huỷ, 1 = đang xử lý, 2 = đang giao, 3 đã hoàn thành
        $onProgress = Order::where('status', 2)->count();

        $top_prod = DB::select('select products.prod_id, cost , sum(quantity*after_discount_cost) as total_cost, sum(quantity) total_quantity,  prod_name, image
        from orders 
        join product_order pro_ord on orders.order_id = pro_ord.order_id
        join pro_color_size on pro_ord.pro_color_size_id = pro_color_size.pro_color_size_id
        join product_images img on pro_color_size.prod_id = img.prod_id
        join products on pro_color_size.prod_id = products.prod_id
        where status = 3 and is_primary = true
        group by products.prod_id, image
        order by total_cost desc
        limit 5');
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
                'today' => $doanhthuToday ? $doanhthuToday : 0,
                'yesterday' => $doanhthuYesterday ? $doanhthuYesterday : 0
            ],
            'onProgress' => $onProgress,
            'top5prod' => $top_prod
        ];
    }

    public function chitiet($nam, $thang)
    {
        if ($thang > 12 || $thang <= 0) {
            return ['error' => 'Không tồn tại tháng ' + $thang];
        }

        $doanhthu = Order::select(DB::raw('DATE(datepaid)'), DB::raw('sum(quantity*after_discount_cost) as sum'))
            ->join('product_order', 'product_order.order_id', '=', 'orders.order_id')
            ->where('status', '3')
            ->whereBetween('datecreated', [Carbon::create($nam, $thang, 1), Carbon::create($nam, $thang, 1)->endOfMonth()])
            ->groupBy(DB::raw('DATE(datepaid)'))
            ->get();

        return $doanhthu;
    }

    public function chitietdonhang(Request $request, $order_id)
    {
        // Lấy prod_color_size
        $prod_color_size = DB::table('product_order')->where('order_id', $order_id)
            ->join('pro_color_size', 'product_order.pro_color_size_id', 'pro_color_size.pro_color_size_id')
            ->join('colors','colors.color_id','=','pro_color_size.color_id')
            ->get(['prod_id', 'quantity', 'size_id', 'color_name', 'after_discount_cost']);

        $total_cost = 0;
        foreach ($prod_color_size as $value) {
            $total_cost += $value->after_discount_cost;
        }

        // Lấy prod_id
        $prod_id = [];
        foreach ($prod_color_size as $element) {
            $prod_id[] = $element->prod_id;
        }
        $prod_id = array_unique($prod_id);

        // Lấy thông tin products từ mảng prod_id
        $products = [];
        foreach ($prod_id as $element) {
            $item = DB::table('products')->where('products.prod_id', $element)
            ->join('product_images','products.prod_id','=','product_images.prod_id')->where('products.prod_id', $element)->where('is_primary', true)->first();
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
            'products' => $products,
            'total_cost' => $total_cost
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
        if ($status == 3){
           $prod_orders = $order->productOrder;
           foreach ($prod_orders as $key => $prod_order) {
            $quantity_had_sold = $prod_order->quantity;
            $prod_color_size = ProColorSize::find($prod_order->pro_color_size_id);
            $prod_color_size->quantity_available -= $quantity_had_sold;
            $prod_color_size->save();
            $prod = Product::find($prod_color_size->prod_id);
            $prod->quantity_sold += $quantity_had_sold;
            $prod->save();
           }

        $order->datepaid = Carbon::now();
        }
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
