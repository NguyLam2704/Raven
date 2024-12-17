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
    public function addProduct(Request $request)
    {
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

        if (!$prod_create) { //kiểm tra thêm sp thành công chưa
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
            ]);
            if (!$image) {
                return 'Add img that bai';
            }
        }

        foreach ($request->color_size_quantity as $element) {
            $color = Color::insert([
                'color_code' => $element['color_code'],
                'color_name' => $element['nameColor']
            ]);

            if (!$color) {
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
                    $size_id = 4;
                    break;
            }

            $pro_color_size = ProColorSize::insert([
                'prod_id' => $prod->prod_id,
                'size_id' => $size_id,
                'color_id' => $color->color_id,
                'quantity_available' => $element['quantity']
            ]);

            if (!$pro_color_size) {
                return 'Add pro_color_size that bai';
            }
        }
    }

    public function deleteProduct($id)
    {
        $prod = Product::find($id);
        if (!$prod) {
            return [
                'error' => 'Không tồn tại id'
            ];
        }
        $prod->delete();

        // $prod = Product::withTrashed()->where('prod_id', $id);
        // $prod->restore();
    }

    public function getProduct($id)
    {
        $prod = Product::find($id);
        if (!$prod) {
            return [
                'error' => 'Không tồn tại id'
            ];
        }

        $images = ProductImage::where('prod_id', $id)->get(['image', 'is_primary']);
        $prod->images = $images;

        $pro_color_size = ProColorSize::where('prod_id', $id)
            ->join('colors', 'colors.color_id', '=', 'pro_color_size.color_id')
            ->join('sizes', 'sizes.size_id', '=', 'pro_color_size.size_id')
            ->get(['color_name', 'color_code', 'size_code', 'quantity_available']);
        $prod->pro_color_size = $pro_color_size;
        return $prod;
    }

    public function getProductDetails($id){
        $product = Product::where('prod_id',$id)
            ->first(["prod_id","prod_name","cost","discount","quantity_sold"]);
        $color_size = ProColorSize::where('prod_id',$id)
            ->join('colors', 'colors.color_id', '=', 'pro_color_size.color_id')
            ->join('product_order','product_order.pro_color_size_id','=','pro_color_size.pro_color_size_id')
            ->join('orders','orders.order_id','=','product_order.order_id')
            ->where('status',3)
            ->groupBy("pro_color_size.pro_color_size_id","size_id","color_name")
            ->get(["pro_color_size.pro_color_size_id","size_id","color_name",DB::raw("sum(quantity_available) as quantity_available"),DB::raw("sum(quantity) as quantity ")]);
        
        
        $sum = 0;
        foreach ($color_size as $key => $value) {
            $sum += $value->quantity;
        }
        $product->quantity_sold = $sum;
        return [
            'prod' => $product,
            'color_size' => $color_size
        ];
    }

    public function changeProduct(Request $request, $id)
    {

        $product = Product::find($id);
        if (!$product) {
            return [
                'error' => 'Không tồn tại id' + $id
            ];
        }

        $product->prod_name = $request->prod_name;
        $product->cost = $request->cost;
        $product->description = $request->description;
        $product->category_type_id = $request->category_type_id;
        $product->discount = $request->discount;
        $product->save();

        if (count($request->images) < 1)
        {
            return ['error' => 'Amount of image must be greater than 1'];
        }

        $hasPrimaryImg = false;
        foreach ($product->productImage as $value) {
            if ($value['is_primary'] == true){
                $hasPrimaryImg = true;
            }
        }
        if (!$hasPrimaryImg)
        {
            return ['error' => 'Must be have one primary img'];
        }

        if ($request->images) { //kiểm tra có thay đổi ảnh hay không
            $newImg = $request->images;
            foreach ($product->productImage as $lastImg) {
                $exists = false;
                for ($i=0; $i < count($request->images); $i++) { 
                    if($lastImg->image == $request->images[$i]['img']){
                        $lastImg->is_primary = $request->images[$i]['is_primary'];
                        $lastImg->save();
                        $exists = true;
                        unset($newImg[$i]);
                    } 
                } 
                if (!$exists){
                    $lastImg->delete();
                }
            }
        }

        foreach ($newImg as $e) {
            ProductImage::insert([
                'image' => $e['img'],
                'prod_id' => $product->prod_id,
                'is_primary' => $e['is_primary']
            ]);
        }

        $pro_color_size = $product->proColorSize;
        $hasChange = [];
        if (count($request->pro_color_size) < 1)
        {
            return ['error' => 'Amount of pro_size_color must be greater than 1'];
        }
        
        foreach ($pro_color_size as $db_procolorsize) {
            $check = false;
            foreach ($request->pro_color_size as $key => $req_value) {
                if ($db_procolorsize->color->color_code == $req_value['color_code'] && $db_procolorsize->size->size_code == $req_value['size_code']) {
                    $db_procolorsize->color->color_name = $req_value['color_name'];
                    $db_procolorsize->color->save();
                    $db_procolorsize->quantity_available = $req_value['quantity_available'];
                    $db_procolorsize->save();
                    array_push($hasChange, $key);
                    $check = true;
                }
            }
            if (!$check) {
                $db_procolorsize->delete();
            }
        }

        foreach ($request->pro_color_size as $key => $req_value) {
            if (!in_array($key, $hasChange)) {

                $size_id = 0; // Mã hoá số sang kí tự
                switch ($req_value['size_code']) {
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
                        $size_id = 4;
                        break;
                }

                $item_from_trash = ProColorSize::withTrashed()->join('colors','colors.color_id','=','pro_color_size.color_id')
                            ->where('color_code', $req_value['color_code'])
                            ->where('size_id', $size_id)
                            ->first('pro_color_size_id');
                if ($item_from_trash) {
                    ProColorSize::withTrashed()->where('pro_color_size_id', $item_from_trash->pro_color_size_id)->restore();
                    $item = ProColorSize::find($item_from_trash->pro_color_size_id);
                    $item_color = Color::find($item->color->color_id);
                    $item_color->color_name = $req_value['color_name'];
                    $item_color->updated_at = Carbon::now();
                    $item_color->save();
                    $item->quantity_available = $req_value['quantity_available'];
                    $item->save();
                } else {
                    $color = DB::table('colors')->where('color_code', $req_value['color_code'])->exists();

                    if (!$color) {
                        $color = Color::insert([
                            'color_code' => $req_value['color_code'],
                            'color_name' => $req_value['color_name']
                        ]);
                        if (!$color) {
                            return 'Add color that bai';
                        }
                    } else {
                        Color::where('color_code', $req_value['color_code'])->update([
                            'color_name' => $req_value['color_name']
                        ]);
                    }

                    $color = DB::table('colors')->where('color_code', $req_value['color_code'])->first();

                    $pro_color_size = ProColorSize::insert([
                        'prod_id' => $product->prod_id,
                        'size_id' => $size_id,
                        'color_id' => $color->color_id,
                        'quantity_available' => $req_value['quantity_available']
                    ]);

                    if (!$pro_color_size) {
                        return 'Add pro_color_size that bai';
                    }
                }
            }
        }
    }

    public function getChart($id)
    {
        // Doanh thu theo Week
        $week = array_fill(0, 7, 0); // Tạo mảng week = 0
        // Tạo giới hạn trong tuần
        $dayStartofWeek = Carbon::now()->startOfWeek();
        $dayEndofWeek = Carbon::now()->endOfWeek();

        $doanhthu = DB::table('pro_color_size')
            ->join('product_order', 'pro_color_size.pro_color_size_id', '=', 'product_order.pro_color_size_id')
            ->join('orders', 'product_order.order_id', '=', 'orders.order_id')
            ->where('prod_id', $id)
            ->where('status', 3)
            ->whereBetween('datecreated', [$dayStartofWeek, $dayEndofWeek])
            ->groupBy(DB::raw('DATE(datecreated)'))
            ->select(DB::raw('DATE(datecreated) as date'), DB::raw('SUM(quantity * after_discount_cost) as doanhthu'))
            ->get();

        // Set dữ liệu vừa thu được vào trong mảng
        foreach ($doanhthu as $e) {
            $day = Carbon::create($e->date)->dayOfWeek() - 1;
            if ($day < 0) {
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
            ->where(DB::raw('DATE_PART(\'year\', datecreated)'), Carbon::now()->year)
            ->groupBy(DB::raw('DATE_TRUNC(\'month\', datecreated)'))
            ->select(DB::raw('DATE_TRUNC(\'month\', datecreated) as date'), DB::raw('SUM(quantity * after_discount_cost) as doanhthu'))
            ->get();

        $month = array_fill(0, 12, 0);
        foreach ($doanhthu as $e) {
            $postition = Carbon::create($e->date)->monthOfYear() - 1;
            $month[$postition] = $e->doanhthu;
        }

        $doanhthu = DB::table('pro_color_size')
            ->join('product_order', 'pro_color_size.pro_color_size_id', '=', 'product_order.pro_color_size_id')
            ->join('orders', 'product_order.order_id', '=', 'orders.order_id')
            ->where('prod_id', $id)
            ->where('status', 3)
            ->groupBy(DB::raw('DATE_TRUNC(\'year\', datecreated)'))
            ->select(DB::raw('DATE_TRUNC(\'year\', datecreated) as date'), DB::raw('SUM(quantity * after_discount_cost) as doanhthu'))
            ->get();

        $year = array_fill(0, 4, 0);
        foreach ($doanhthu as $e) {
            $postition = Carbon::create($e->date)->year - Carbon::now()->year + 3;
            $year[$postition] = $e->doanhthu;
        }
        $bd_doanhthu = [
            'week' => $week,
            'month' => $month,
            'year' => $year
        ];

        $result = ProColorSize::select('color_name', 'color_code', DB::raw('sum(quantity) as sl'))
            ->join('colors', 'colors.color_id', '=', 'pro_color_size.color_id')
            ->join('product_order', 'product_order.pro_color_size_id', '=', 'pro_color_size.pro_color_size_id')
            ->join('orders', 'orders.order_id', '=', 'product_order.order_id')
            ->where('prod_id', $id)
            ->where('status', 3)
            ->groupBy('color_name', 'color_code')
            ->whereBetween('datecreated', [$dayStartofWeek, $dayEndofWeek])
            ->get();
        $week = collect();
        foreach ($result as $e) {
            $week->put($e->color_name, [$e->sl, $e->color_code]);
        }

        $result = ProColorSize::select('color_name', 'color_code', DB::raw('sum(quantity) as sl'))
            ->join('colors', 'colors.color_id', '=', 'pro_color_size.color_id')
            ->join('product_order', 'product_order.pro_color_size_id', '=', 'pro_color_size.pro_color_size_id')
            ->join('orders', 'orders.order_id', '=', 'product_order.order_id')
            ->where('prod_id', $id)
            ->where('status', 3)
            ->where(DB::raw('DATE_PART(\'month\', datecreated)'), Carbon::now()->month)
            ->groupBy('color_name', 'color_code')
            ->get();
        $month = collect();
        foreach ($result as $e) {
            $month->put($e->color_name, [$e->sl, $e->color_code]);
        }

        $result = ProColorSize::select('color_name', 'color_code', DB::raw('sum(quantity) as sl'))
            ->join('colors', 'colors.color_id', '=', 'pro_color_size.color_id')
            ->join('product_order', 'product_order.pro_color_size_id', '=', 'pro_color_size.pro_color_size_id')
            ->join('orders', 'orders.order_id', '=', 'product_order.order_id')
            ->where('prod_id', $id)
            ->where('status', 3)
            ->where(DB::raw('DATE_PART(\'year\', datecreated)'), Carbon::now()->year)
            ->groupBy('color_name', 'color_code')
            ->get();
        $year = collect();
        foreach ($result as $e) {
            $year->put($e->color_name, [$e->sl, $e->color_code]);
        }

        $bd_color = [
            'week' => $week,
            'month' => $month,
            'year' => $year
        ];

        $result = ProColorSize::select('size_code', DB::raw('sum(quantity) as sl'))
            ->join('sizes', 'sizes.size_id', '=', 'pro_color_size.size_id')
            ->join('product_order', 'product_order.pro_color_size_id', '=', 'pro_color_size.pro_color_size_id')
            ->join('orders', 'orders.order_id', '=', 'product_order.order_id')
            ->where('prod_id', $id)
            ->where('status', 3)
            ->groupBy('size_code')
            ->whereBetween('datecreated', [$dayStartofWeek, $dayEndofWeek])
            ->get();
        $week = collect();
        foreach ($result as $e) {
            $week->put($e->size_code, $e->sl);
        }

        $result = ProColorSize::select('size_code', DB::raw('sum(quantity) as sl'))
            ->join('sizes', 'sizes.size_id', '=', 'pro_color_size.size_id')
            ->join('product_order', 'product_order.pro_color_size_id', '=', 'pro_color_size.pro_color_size_id')
            ->join('orders', 'orders.order_id', '=', 'product_order.order_id')
            ->where('prod_id', $id)
            ->where('status', 3)
            ->where(DB::raw('DATE_PART(\'month\', datecreated)'), Carbon::now()->month)
            ->groupBy('size_code')
            ->get();
        $month = collect();
        foreach ($result as $e) {
            $month->put($e->size_code, $e->sl);
        }

        $result = ProColorSize::select('size_code', DB::raw('sum(quantity) as sl'))
            ->join('sizes', 'sizes.size_id', '=', 'pro_color_size.size_id')
            ->join('product_order', 'product_order.pro_color_size_id', '=', 'pro_color_size.pro_color_size_id')
            ->join('orders', 'orders.order_id', '=', 'product_order.order_id')
            ->where('prod_id', $id)
            ->where('status', 3)
            ->where(DB::raw('DATE_PART(\'year\', datecreated)'), Carbon::now()->year)
            ->groupBy('size_code')
            ->get();
        $year = collect();
        foreach ($result as $e) {
            $year->put($e->size_code, $e->sl);
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
