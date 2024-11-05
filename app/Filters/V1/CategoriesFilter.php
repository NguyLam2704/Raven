<?php

namespace App\Filters\V1;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;
use function Laravel\Prompts\form;

class CategoriesFilter extends ApiFilter{
    // can field sizeCode with =,!= operator
    protected $safeParms = [
        'categoryName' => ['eq', 'ne'],
        'categoryId' => ['eq', 'ne'],
    ];
    // map column with field in color table
    protected $columnMap = [
        'categoryName' => 'category_name',
        'categoryId' => 'category_id'
    ];

    protected $operatorMap = [
        'eq' => '=',
        'ne' => '!='
    ];

}