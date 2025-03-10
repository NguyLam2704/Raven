<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\StoreBillRequest;
use App\Http\Requests\UpdateBillRequest;
use App\Models\Bill;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\BillResource;
use App\Http\Resources\V1\BillCollection;
use App\Filters\V1\BillsFilter;
use Illuminate\Http\Request;
class BillController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new BillsFilter();
        $queryItems = $filter->transform($request); //chuyển đổi các tham số trong $request thành một mảng [['column','operator','value']]
        if (count($queryItems) == 0) // Nếu không có điều kiện lọc
        {
            return new BillCollection(Bill::paginate()); //paginate chia nhỏ danh sách dữ liệu thành các trang giúp giảm tải 
        }
        else
        {
            $bill = Bill::where($queryItems)->paginate(); //truy vấn các bản ghi trong bills dựa trên $queryItems thông qua where()
            return new BillCollection($bill->appends($request->query()));
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
    public function store(StoreBillRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Bill $bill)
    {
        //return bill dua tren id 
        return new BillResource($bill);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Bill $bill)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBillRequest $request, Bill $bill)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bill $bill)
    {
        //
    }
}
