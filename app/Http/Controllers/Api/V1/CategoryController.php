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
        $queryItems = $filter->transform($request); //chuyển đổi các tham số trong $request thành một mảng [['column','operator','value']]
        if (count($queryItems) == 0)// Nếu không có điều kiện lọc
        {
            return new CategoryCollection(Category::paginate());//paginate chia nhỏ danh sách dữ liệu
        }
        else
        {
            $category = Category::where($queryItems)->paginate();//truy vấn các bản ghi trong category dựa trên $queryItems thông qua where()
            return new CategoryCollection($category->appends($request->query()));
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
    public function store(StoreCategoryRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //return category dua tren id
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
