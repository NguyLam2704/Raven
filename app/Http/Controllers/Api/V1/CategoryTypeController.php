<?php

namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryTypeRequest;
use App\Http\Requests\UpdateCategoryTypeRequest;
use App\Http\Resources\V1\CategoryTypeResource;
use App\Models\CategoryType;
use App\Http\Resources\V1\CategoryTypeCollection;
use App\Filters\V1\CategoryTypesFilter;
use Illuminate\Http\Request;
class CategoryTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new CategoryTypesFilter();
        $queryItems = $filter->transform($request); //[['column','operator','value']]
        if (count($queryItems) == 0)
        {
            return new CategoryTypeCollection(CategoryType::paginate());
        }
        else
        {
            $size = CategoryType::where($queryItems)->paginate();
            return new CategoryTypeCollection($size->appends($request->query()));
        }
        CategoryType::where($queryItems);
        // return new SizeCollection(Size::all());
        // $fillable = new CustomerQuery();
        return new CategoryTypeCollection(CategoryType::paginate());
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
    public function store(StoreCategoryTypeRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(CategoryType $categoryType)
    {
        return new CategoryTypeResource($categoryType);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CategoryType $categoryType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryTypeRequest $request, CategoryType $categoryType)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CategoryType $categoryType)
    {
        //
    }
}
