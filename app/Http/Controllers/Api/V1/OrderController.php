<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Models\Order;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\OrderResource;
use App\Http\Resources\V1\OrderCollection;
use App\Filters\V1\OrdersFilter;
use App\Mail\CheckOrder;
use App\Models\Bill;
use App\Models\ProColorSize;
use App\Models\Product;
use App\Models\ProductOrder;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new OrdersFilter();
        $queryItems = $filter->transform($request); //chuyển đổi các tham số  trong $request thành một mảng [['column','operator','value']]
        if (count($queryItems) == 0)// Nếu không có điều kiện lọc
        $queryItems = $filter->transform($request); //chuyển đổi các tham số  trong $request thành một mảng [['column','operator','value']]
        if (count($queryItems) == 0)// Nếu không có điều kiện lọc
        {
            return new OrderCollection(Order::with(['user', 'bill'])->get());//return them quan he user va bill, paginate chia nhỏ danh sách dữ liệu
        }
        else
        {
            $order = Order::where($queryItems)->with(['user', 'bill'])->get();//return them quan he user va bill,truy vấn dựa trên $queryItems thông qua where()
            return new OrderCollection($order->appends($request->query()));
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        $date = now()->format('Ymd'); // 20241205
        $id = str_pad(Order::max('order_id') + 1, 3, '0', STR_PAD_LEFT); // 001
        $order_id = "ORD-{$date}-{$id}"; // Kết quả: ORD-20241205-001
        $status = 0;
        $user_id = 1;
        $payingMethod = false;
        $address = 'Di An, Binh Duong';
        $detailAddress = '35/18';
        Order::create([
            // 'order_id' => $order_id,
            'status' => $status,
            'user_id' => $user_id,
            'datecreated' => $date,
            'address' => $address,
            'detail_address' => $detailAddress,
            'payingmethod' => $payingMethod
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        return new OrderResource($order);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }

    //Write api for order (have user and product_order)
    public function orderInfo(Request $request)
    {
        $input = $request->input('input');// Lấy parameter từ query parameter
        // Kiểm tra nếu không có phoneNumber trong request
        if (!$input) {
            return response()->json([
                'message' => 'Input is required',
            ], 400);
        }
        // Kiểm tra định dạng email
        elseif (filter_var($input, FILTER_VALIDATE_EMAIL)) {
            $orders = Order::whereRelation('user','email','=',$input)->with(['user', 'productOrder'])->get();
            return new OrderCollection($orders);
        }

        // Kiểm tra định dạng số điện thoại (10 chữ số, bắt đầu bằng 0)
        elseif (preg_match('/^0\d{9}$/', $input)) {
            $orders = Order::whereRelation('user','phonenumber','=',$input)->with(['user', 'productOrder'])->get();
            return new OrderCollection($orders);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Vui lòng nhập email hoặc số điện thoại hợp lệ.'
        ], 400);
    }

    public function testMail(Request $request) {
        // $input = $request->input('input');// Lấy parameter từ query parameter
        $message = $request->input('input');// Lấy parameter từ query parameter
        $toEmail = '22520736@gm.uit.edu.vn';
        // Mail::to($toEmail)->send(new CheckOrder($message));
    }

    public function updateOrder(Request $request){
        //check phonenumber
        $validator_user = Validator::make($request->all(),[
            'phonenumber' => 'required|unique:users,phonenumber'
        ]);
        
        if ($validator_user->fails()) {
            // return response()->json(['errors' => $validator_user->errors()], 400);
        }
        else{
            // insert user if not exist
            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->phonenumber = $request->phonenumber;
            $user->datefirstbuy = Carbon::now();
            $user->save();
            $user->refresh();
        }
        /******************************/
        /*****************************/
        // Insert order
        $user = User::where('phonenumber', $request->phonenumber)->first();
        $order = new Order();
        $order->status =  $request->status;
        $order->address = $request->address;
        $order->datecreated = Carbon::now();
        $order->detail_address = $request->detail_address;
        $order->payingmethod = $request->payingmethod;
        $order->user_id = $user->user_id; 
        $order->email = $request->email;
        $order->save();
        $order->fresh();
        /************************************* */
        $productOrder = new ProductOrder();
        $products = $request->product;
        foreach($products as $product){
            $proId = $product['proId'];
            $colorId = $product['colorId'];
            $sizeId = $product['sizeId'];
            // update quantity_available in pro_color_size
            $proColorSize = ProColorSize::where('prod_id',$proId)->where('color_id',$colorId)->where('size_id',$sizeId)->first();
            $proColorSize->quantity_available = $proColorSize->quantity_available - $product['quantity'];
            $proColorSize->save();

            /************************************************************ */
            // update quantity_sold in products
            $updateProQuantitySold = Product::where('prod_id',$proId)->first();
            $updateProQuantitySold->quantity_sold = $updateProQuantitySold->quantity_sold+$product['quantity'];
            $updateProQuantitySold->save();
            /************************************************************ */
            // insert to product_order
            $productOrder->order_id = $order->order_id;
            $productOrder->pro_color_size_id = $proColorSize->pro_color_size_id;
            $productOrder->quantity = $product['quantity'];
            $productOrder->after_discount_cost = $product['discount'] > 0 ? $product['cost'] - $product['cost']*$product['discount']/100 : $product['cost'] ;
            $productOrder->save();
            // return response()->json(['message' => $proColorSize->pro_color_size_id]);
        }
        /************************************ */
        $bill = new Bill();
        $bill->total_cost = $request->totalCost;
        $order = $order->refresh();
        $bill->order_id = $order->order_id;
        $bill->save();
        // $product = json_decode($products, true);
        Mail::to($request->email)->send(new CheckOrder($request->name, $request->phonenumber, $request->address, $request->detail_address, Carbon::now(), $order->order_id, $request->totalCost, $request->product, $request->payingmethod));
        return response()->json(['message' => 'Order updated successfully']);
    }
}
