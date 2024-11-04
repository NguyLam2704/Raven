<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\StoreTestRequest;
use App\Http\Requests\UpdateTestRequest;
use App\Models\Test;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\TestResource;
class TestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tests = Test::all(); // Fetch all records from the Test model
        return TestResource::collection($tests); // Return as a collection of resources

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
    public function store(StoreTestRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Test $test)
    {
            if (!$test) {
        return response()->json(['message' => 'Resource not found'], 404);
    }
    return new TestResource($test);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Test $test)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTestRequest $request, Test $test)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Test $test)
    {
        //
    }
}
