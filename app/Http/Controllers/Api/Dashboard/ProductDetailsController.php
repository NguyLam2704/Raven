<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Color;
use App\Models\Order;
use App\Models\ProColorSize;
use App\Models\Product;
use App\Models\ProductImage;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductDetailsController extends Controller
{
    public function addProduct(Request $request){
        // Thêm vào bảng product
        $prod_create = DB::table('products')->insert([ // trả về giá trị boolean
            'prod_name' => $request->prod_name,
            'cost' => $request->cost,
            'discount' => $request->discount,
            'quantity_sold' => 0,
            'description' => $request->description,
            'category_type_id' => $request->category_type_id,
            'dateposted' => now()
        ]);

        if (!$prod_create){ //kiểm tra thêm sp thành công chưa
            return 'Add product that bai';
        }

        // Lấy sản phẩm vừa thêm
        $prod = DB::table('products')->orderByDesc('prod_id')->first();

        // Thêm vào bảng prod_img
        foreach ($request->images as $element) {
            $image = ProductImage::insert([ 
                'image' => $element['img'],
                'prod_id' => $prod->prod_id,
                'is_primary' => $element['is_primary']
            ]) ;
            if (!$image){
                return 'Add img that bai';
            }
        }

        foreach ($request->color_size_quantity as $element) {
            $color = Color::insert([
                'color_code' => $element['color_code'],
                'color_name' => $element['nameColor']
            ]);

            if(!$color){
                return 'Add color that bai';
            }
            $color = DB::table('colors')->orderByDesc('color_id')->first();


            $size_id = 0; // Mã hoá số sang kí tự
            switch ($element['size_code']) {
                case 'S':
                    $size_id = 1;
                    break;
                case 'M':
                    $size_id = 2;
                    break;
                case 'L':
                    $size_id = 3;
                    break;
                default:
                    $size_id= 4;
                    break;
            }

            $pro_color_size = ProColorSize::insert([
                'prod_id' => $prod->prod_id,
                'size_id' => $size_id,
                'color_id' => $color->color_id,
                'quantity_available' => $element['quantity']
            ]);

            if(!$pro_color_size){
                return 'Add pro_color_size that bai';
            }
        }

    }

    public function getChart($id){
        // Doanh thu theo Week
        $week = array_fill(0,7,0); // Tạo mảng week = 0
        // Tạo giới hạn trong tuần
        $dayStartofWeek = Carbon::now()->startOfWeek();
        $dayEndofWeek = Carbon::now()->endOfWeek();

        $doanhthu = DB::table('pro_color_size')
                ->join('product_order', 'pro_color_size.pro_color_size_id', '=', 'product_order.pro_color_size_id')
                ->join('orders', 'product_order.order_id', '=', 'orders.order_id')
                ->where('prod_id', $id)
                ->where('status', 3)
                ->whereBetween('datecreated',[$dayStartofWeek, $dayEndofWeek])
                ->groupBy(DB::raw('DATE(datecreated)'))
                ->select(DB::raw('DATE(datecreated) as date'),DB::raw('SUM(quantity * after_discount_cost) as doanhthu'))
                ->get();
        
        // Set dữ liệu vừa thu được vào trong mảng
        foreach($doanhthu as $e ){
            $day = Carbon::create($e->date)->dayOfWeek() - 1; 
            if ($day < 0 ) {
                $week[6] = $e->doanhthu; // trường hợp chủ nhận
            } else {
                $week[$day] = $e->doanhthu;
            }
        }

        // Tương tự như trên => Tháng, năm tương tự

        $doanhthu = DB::table('pro_color_size')
                ->join('product_order', 'pro_color_size.pro_color_size_id', '=', 'product_order.pro_color_size_id')
                ->join('orders', 'product_order.order_id', '=', 'orders.order_id')
                ->where('prod_id', $id)
                ->where('status', 3)
                ->where(DB::raw('DATE_PART(\'year\', datecreated)'),Carbon::now()->year)
                ->groupBy(DB::raw('DATE_TRUNC(\'month\', datecreated)'))
                ->select(DB::raw('DATE_TRUNC(\'month\', datecreated) as date'),DB::raw('SUM(quantity * after_discount_cost) as doanhthu'))
                ->get();
        
        $month = array_fill(0,12,0);
        foreach($doanhthu as $e ){
            $postition = Carbon::create($e->date)->monthOfYear() - 1;
            $month[$postition] = $e->doanhthu;
        }

        $doanhthu = DB::table('pro_color_size')
                ->join('product_order', 'pro_color_size.pro_color_size_id', '=', 'product_order.pro_color_size_id')
                ->join('orders', 'product_order.order_id', '=', 'orders.order_id')
                ->where('prod_id', $id)
                ->where('status', 3)
                ->groupBy(DB::raw('DATE_TRUNC(\'year\', datecreated)'))
                ->select(DB::raw('DATE_TRUNC(\'year\', datecreated) as date'),DB::raw('SUM(quantity * after_discount_cost) as doanhthu'))
                ->get();

        $year = array_fill(0,4,0);
        foreach($doanhthu as $e ){
            $postition = Carbon::create($e->date)->year - Carbon::now()->year + 3;
            $year[$postition] = $e->doanhthu;
        }
        $bd_doanhthu = [
            'week' => $week,
            'month' => $month,
            'year' => $year
        ];

        $result = ProColorSize::select('color_name','color_code',DB::raw('sum(quantity) as sl'))
        ->join('colors','colors.color_id', '=', 'pro_color_size.color_id')
        ->join('product_order','product_order.pro_color_size_id', '=', 'pro_color_size.pro_color_size_id')
        ->join('orders','orders.order_id','=','product_order.order_id')
        ->where('prod_id',$id)
        ->where('status',3)
        ->groupBy('color_name','color_code')
        ->whereBetween('datecreated',[$dayStartofWeek, $dayEndofWeek])
        ->get();
    $week = collect();
    foreach ($result as $e) {
        $week->put($e->color_name , [$e->sl,$e->color_code]);
    }

    $result = ProColorSize::select('color_name','color_code',DB::raw('sum(quantity) as sl'))
        ->join('colors','colors.color_id', '=', 'pro_color_size.color_id')
        ->join('product_order','product_order.pro_color_size_id', '=', 'pro_color_size.pro_color_size_id')
        ->join('orders','orders.order_id','=','product_order.order_id')
        ->where('prod_id',$id)
        ->where('status',3)
        ->where(DB::raw('DATE_PART(\'month\', datecreated)'),Carbon::now()->month)
        ->groupBy('color_name','color_code')
        ->get();
    $month = collect();
    foreach ($result as $e) {
        $month->put($e->color_name,[$e->sl,$e->color_code]);
    }

    $result = ProColorSize::select('color_name','color_code',DB::raw('sum(quantity) as sl'))
        ->join('colors','colors.color_id', '=', 'pro_color_size.color_id')
        ->join('product_order','product_order.pro_color_size_id', '=', 'pro_color_size.pro_color_size_id')
        ->join('orders','orders.order_id','=','product_order.order_id')
        ->where('prod_id',$id)
        ->where('status',3)
        ->where(DB::raw('DATE_PART(\'year\', datecreated)'),Carbon::now()->year)
        ->groupBy('color_name','color_code')
        ->get();
    $year = collect();
    foreach ($result as $e) {
        $year->put($e->color_name,[$e->sl,$e->color_code]);
    }
    
    $bd_color = [
        'week' => $week,
        'month' => $month,
        'year' => $year
    ];

    $result = ProColorSize::select('size_code',DB::raw('sum(quantity) as sl'))
            ->join('sizes','sizes.size_id', '=', 'pro_color_size.size_id')
            ->join('product_order','product_order.pro_color_size_id', '=', 'pro_color_size.pro_color_size_id')
            ->join('orders','orders.order_id','=','product_order.order_id')
            ->where('prod_id',$id)
            ->where('status',3)
            ->groupBy('size_code')
            ->whereBetween('datecreated',[$dayStartofWeek, $dayEndofWeek])
            ->get();
        $week = collect();
        foreach ($result as $e) {
            $week->put($e->size_code , $e->sl);
        }

        $result = ProColorSize::select('size_code',DB::raw('sum(quantity) as sl'))
            ->join('sizes','sizes.size_id', '=', 'pro_color_size.size_id')
            ->join('product_order','product_order.pro_color_size_id', '=', 'pro_color_size.pro_color_size_id')
            ->join('orders','orders.order_id','=','product_order.order_id')
            ->where('prod_id',$id)
            ->where('status',3)
            ->where(DB::raw('DATE_PART(\'month\', datecreated)'),Carbon::now()->month)
            ->groupBy('size_code')
            ->get();
        $month = collect();
        foreach ($result as $e) {
            $month->put($e->size_code , $e->sl);
        }

        $result = ProColorSize::select('size_code',DB::raw('sum(quantity) as sl'))
            ->join('sizes','sizes.size_id', '=', 'pro_color_size.size_id')
            ->join('product_order','product_order.pro_color_size_id', '=', 'pro_color_size.pro_color_size_id')
            ->join('orders','orders.order_id','=','product_order.order_id')
            ->where('prod_id',$id)
            ->where('status',3)
            ->where(DB::raw('DATE_PART(\'year\', datecreated)'),Carbon::now()->year)
            ->groupBy('size_code')
            ->get();
        $year = collect();
        foreach ($result as $e) {
            $year->put($e->size_code , $e->sl);
        }
        
        $bd_size = [
            'week' => $week,
            'month' => $month,
            'year' => $year
        ];
    

        return [
            'doanhthu' => $bd_doanhthu,
            'color' => $bd_color,
            'size' => $bd_size
        ];
    }
}

   