<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\StoreProColorSizeRequest;
use App\Http\Requests\UpdateProColorSizeRequest;
use App\Models\ProColorSize;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\ProColorSizeResource;
class ProColorSizeController extends Controller
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
