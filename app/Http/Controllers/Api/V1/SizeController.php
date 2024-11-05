<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\StoreSizeRequest;
use App\Http\Requests\UpdateSizeRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\SizeResource;
use App\Http\Resources\V1\SizeCollection;
use App\Filters\V1\SizesFilter;
use Illuminate\Http\Request;
use App\Models\Size;

class SizeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    //Fetching all data from server,HE
    public function index(Request $request)
    {
        $filter = new SizesFilter();
        $queryItems = $filter->transform($request); //[['column','operator','value']]
        if (count($queryItems) == 0)
        {
            return new SizeCollection(Size::paginate());
        }
        else
        {
            $size = Size::where($queryItems)->paginate();
            return new SizeCollection($size->appends($request->query()));
        }
        Size::where($queryItems);
        // return new SizeCollection(Size::all());
        // $fillable = new CustomerQuery();
        return new SizeCollection(Size::paginate());
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
    //POST
    public function store(StoreSizeRequest $request)
    {
        return response()->json();
    }

    /**
     * Display the specified resource.
     */
    public function show(Size $size)
    {
        return new SizeResource($size);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Size $size)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSizeRequest $request, Size $size)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Size $size)
    {
        //
    }
}
