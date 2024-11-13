<?php

namespace App\Filters\V1;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;
use function Laravel\Prompts\form;

class CategoryTypesFilter extends ApiFilter{
    // can field sizeCode with =,!= operator
    protected $safeParms = [
        'categoryId' => ['eq', 'ne'],
        'categorytypeName' => ['eq', 'ne'],
    ];
    // map column with field in color table
    protected $columnMap = [
        'categoryId' => 'category_id',
        'categorytypeName' => 'category_type_name'
    ];

    protected $operatorMap = [
        'eq' => '=',
        'ne' => '!='
    ];

}