<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\StoreProColorSizeRequest;
use App\Http\Requests\UpdateProColorSizeRequest;
use App\Models\ProColorSize;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\ProColorSizeResource;
use App\Filters\V1\ProColorSizeFilter;
use App\Http\Resources\V1\ProColorSizeCollection;
use Illuminate\Http\Request;
class ProColorSizeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new ProColorSizeFilter();
        $queryItems = $filter->transform($request); //chuyển đổi các tham số  trong $request thành một mảng [['column','operator','value']]
        if (count($queryItems) == 0)// Nếu không có điều kiện lọc
        {
            return new ProColorSizeCollection(ProColorSize::with(['color','size'])->paginate());//paginate chia nhỏ danh sách dữ liệu
        }
        else
        {
            $proColorSize = ProColorSize::where($queryItems)->with(['color','size'])->paginate();//truy vấn dựa trên $queryItems thông qua where()
            return new ProColorSizeCollection($proColorSize->appends($request->query()));
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
    public function store(StoreProColorSizeRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ProColorSize $proColorSize)
    {
        return new ProColorSizeResource($proColorSize);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProColorSize $proColorSize)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProColorSizeRequest $request, ProColorSize $proColorSize)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProColorSize $proColorSize)
    {
        //
    }
}
