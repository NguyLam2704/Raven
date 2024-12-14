<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Filters\V1\UsersFilter;
use App\Http\Resources\V1\UserCollection;
use App\Http\Resources\V1\UserResource;
use App\Models\User;
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new UsersFilter();
        $queryItems = $filter->transform($request); //chuyển đổi các tham số  trong $request thành một mảng [['column','operator','value']]
        if (count($queryItems) == 0)// Nếu không có điều kiện lọc
        {
            return new UserCollection(User::paginate(10));//paginate chia nhỏ danh sách dữ liệu
        }
        else
        {
            $user = User::where($queryItems)->paginate(10);//truy vấn dựa trên $queryItems thông qua where()
            return new UserCollection($user->appends($request->query()));
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
