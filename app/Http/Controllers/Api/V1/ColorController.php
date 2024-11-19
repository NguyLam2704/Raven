<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\StoreColorRequest;
use App\Http\Requests\UpdateColorRequest;
use App\Models\Color;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\ColorCollection;
use App\Filters\V1\ColorsFilter;
use App\Http\Resources\V1\ColorResource;
use Illuminate\Http\Request;
class ColorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new ColorsFilter();
        $queryItems = $filter->transform($request); //chuyển đổi các tham số  trong $request thành một mảng [['column','operator','value']]
        if (count($queryItems) == 0)// Nếu không có điều kiện lọc
        {
            return new ColorCollection(Color::paginate());//paginate chia nhỏ danh sách dữ liệu
        }
        else
        {
            $size = Color::where($queryItems)->paginate();//truy vấn dựa trên $queryItems thông qua where()
            return new ColorCollection($size->appends($request->query()));
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
    public function store(StoreColorRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Color $color)
    {
        return new ColorResource($color);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Color $color)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateColorRequest $request, Color $color)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Color $color)
    {
        //
    }
}
