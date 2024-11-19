<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Models\Order;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\OrderResource;
use App\Http\Resources\V1\OrderCollection;
use App\Filters\V1\OrdersFilter;
use Illuminate\Http\Request;
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
        {
            return new OrderCollection(Order::with('user')->paginate());//paginate chia nhỏ danh sách dữ liệu
        }
        else
        {
            $order = Order::where($queryItems)->with('user')->paginate();//truy vấn dựa trên $queryItems thông qua where()
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
        //
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
        $input = $request->input('input');// Lấy phoneNumber từ query parameter
        // Kiểm tra nếu không có phoneNumber trong request
        if (!$input) {
            return response()->json([
                'message' => 'Input is required',
            ], 400);
        }
        // Kiểm tra định dạng email
        elseif (filter_var($input, FILTER_VALIDATE_EMAIL)) {
            $orders = Order::whereRelation('user','email','=',$input)->with(['user', 'bill'])->get();
            return new OrderCollection($orders);
        }

        // Kiểm tra định dạng số điện thoại (10 chữ số, bắt đầu bằng 0)
        elseif (preg_match('/^0\d{9}$/', $input)) {
            $orders = Order::whereRelation('user','phonenumber','=',$input)->with(['user', 'bill'])->get();
            return new OrderCollection($orders);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Vui lòng nhập email hoặc số điện thoại hợp lệ.'
        ], 400);
        //query user have $phoneNumber 
        // phonenumber is field's name in database 
        // user is name of relationship in order model
        // ->with(['user', 'bill'] to get user and bill data
        // $orders = Order::whereRelation('user','phonenumber','=',$input)->with(['user', 'bill'])->get();
        // return response()->json($orders);
        // return new OrderCollection($orders);
    }
}
