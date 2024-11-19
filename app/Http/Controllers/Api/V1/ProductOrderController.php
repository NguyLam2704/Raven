<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\StoreProductOrderRequest;
use App\Http\Requests\UpdateProductOrderRequest;
use App\Models\ProductOrder;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\ProductOrderResource;
use App\Filters\V1\ProductOrderFilter;
use App\Http\Resources\V1\ProductOrderCollection;
use Illuminate\Http\Request;
class ProductOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new ProductOrderFilter();
        $queryItems = $filter->transform($request); //chuyển đổi các tham số  trong $request thành một mảng [['column','operator','value']]
        if (count($queryItems) == 0)// Nếu không có điều kiện lọc
        {
            return new ProductOrderCollection(ProductOrder::paginate());//paginate chia nhỏ danh sách dữ liệu
        }
        else
        {
            $size = ProductOrder::where($queryItems)->paginate();//truy vấn dựa trên $queryItems thông qua where()
            return new ProductOrderCollection($size->appends($request->query()));
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
    public function store(StoreProductOrderRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ProductOrder $productOrder)
    {
        return new ProductOrderResource($productOrder);
        // $productOrder = ProductOrder::where('field1', $field1)
        //                          ->where('field2', $field2)
        //                          ->first();
        
        // if (!$productOrder) {
        // return response()->json(['message' => 'Resource not found'], 404);
        // }

        // return new ProductOrderResource($productOrder);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProductOrder $productOrder)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductOrderRequest $request, ProductOrder $productOrder)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductOrder $productOrder)
    {
        //
    }
}
