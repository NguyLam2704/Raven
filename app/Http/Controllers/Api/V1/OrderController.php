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
            return new OrderCollection(Order::paginate());//paginate chia nhỏ danh sách dữ liệu
        }
        else
        {
            $size = Order::where($queryItems)->paginate();//truy vấn dựa trên $queryItems thông qua where()
            return new OrderCollection($size->appends($request->query()));
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
}
