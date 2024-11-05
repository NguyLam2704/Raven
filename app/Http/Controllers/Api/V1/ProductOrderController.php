<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\StoreProductOrderRequest;
use App\Http\Requests\UpdateProductOrderRequest;
use App\Models\ProductOrder;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\ProductOrderResource;
class ProductOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function show($field1, $field2)
    {
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
