<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use App\Http\Resources\V1\ProductResource;
use App\Filters\V1\ProductsFilter;
use Illuminate\Http\Request;
use App\Http\Resources\V1\ProductCollection;
class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new ProductsFilter();
        $filterItems = $filter->transform($request); //chuyển đổi các tham số  trong $request thành một mảng [['column','operator','value']]
        $includePicture = $request->query('includeImage'); //if the query has 'includeImage', retrieve the product with productImage
        $includeProColorSize = $request->query('includeProColorSize');//if the query has 'includeProColorSize', retrieve the product with ProColorSize
        $product = Product::where($filterItems);
        if($includePicture)//if the query has 'includeImage'
        {
            $product = $product->with('productImage');
        }
        if($includeProColorSize)//if the query has 'includeProColorSize', return proColorSize
        {
            $product = $product->with(['proColorSize.color','proColorSize.size']); //return relationship proColorSize and relationship color of it
        }
        return new ProductCollection($product->paginate()->appends($request->query()));
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
    public function store(StoreProductRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        /*Url if you want to includeImage: http://127.0.0.1:8000/api/v1/product/1?includeImage=true */
        $includePicture = request()->query('includeImage');
        if($includePicture)
        {
            return new ProductResource($product->loadMissing('productImage'));
        }
        return new ProductResource($product);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
