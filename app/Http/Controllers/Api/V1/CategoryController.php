<?php

namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\V1\CategoryResource;
use App\Models\Category;
use App\Filters\V1\CategoriesFilter;
use Illuminate\Http\Request;
use App\Http\Resources\V1\CategoryCollection;
class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new CategoriesFilter();
        $queryItems = $filter->transform($request); //[['column','operator','value']]
        if (count($queryItems) == 0)
        {
            return new CategoryCollection(Category::paginate());
        }
        else
        {
            $size = Category::where($queryItems)->paginate();
            return new CategoryCollection($size->appends($request->query()));
        }
        Category::where($queryItems);
        // return new SizeCollection(Size::all());
        // $fillable = new CustomerQuery();
        return new CategoryCollection(Category::paginate());
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
    public function store(StoreCategoryRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        return new CategoryResource($category);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //
    }
}
