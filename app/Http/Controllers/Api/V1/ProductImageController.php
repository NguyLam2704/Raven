<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\StoreProductImageRequest;
use App\Http\Requests\UpdateProductImageRequest;
use App\Models\ProductImage;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\ProductImageResource;
use App\Http\Resources\V1\ProductImageCollection;
use App\Filters\V1\ProductImagesFilter;
use Illuminate\Http\Request;
class ProductImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new ProductImagesFilter();
        $queryItems = $filter->transform($request); //[['column','operator','value']]
        if (count($queryItems) == 0)
        {
            return new ProductImageCollection(ProductImage::paginate());
        }
        else
        {
            $size = ProductImage::where($queryItems)->paginate();
            return new ProductImageCollection($size->appends($request->query()));
        }
        ProductImage::where($queryItems);
        // return new SizeCollection(Size::all());
        // $fillable = new CustomerQuery();
        return new ProductImageCollection(ProductImage::paginate());
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
    public function store(StoreProductImageRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ProductImage $productImage)
    {
        return new ProductImageResource($productImage);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProductImage $productImage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductImageRequest $request, ProductImage $productImage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductImage $productImage)
    {
        //
    }
}
