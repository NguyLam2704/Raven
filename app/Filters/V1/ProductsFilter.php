<?php

namespace App\Filters\V1;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;
use function Laravel\Prompts\form;

class ProductsFilter extends ApiFilter
{
    // can field sizeCode with =,!= operator
    protected $safeParms = [
        'cost' => ['eq', 'ne', 'gt', 'lt', 'lte', 'gte'],
        'discount' => ['eq', 'ne', 'gt', 'lt', 'lte', 'gte'],
        'quantitySold' => ['eq', 'ne', 'gt', 'lt', 'lte', 'gte'],
        'categoryTypeId' => ['eq', 'ne'],
        'proId' => ['eq', 'ne'],
    ];
    // map column with field in color table
    protected $columnMap = [
        'cost' => 'cost',
        'discount' => 'discount',
        'quantitySold' => 'quantity_sold',
        'categoryTypeId' => 'category_type_id',
        'proId' => 'prod_id'
    ];

    protected $operatorMap = [
        'eq' => '=',
        'ne' => '!=',
        'gt' => '>',
        'lt' => '<',
        'lte' => '<=',
        'gte' => '>='
    ];
}
