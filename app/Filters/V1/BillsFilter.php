<?php

namespace App\Filters\V1;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;
use function Laravel\Prompts\form;

class BillsFilter extends ApiFilter{
    // can field sizeCode with =,!= operator
    protected $safeParms = [
        'orderId' => ['eq', 'ne'],
        'totalCost' => ['eq', 'ne', 'lt', 'gt', 'gte', 'lte'],
    ];
    // map column with field in color table
    protected $columnMap = [
        'orderId' => 'order_id',
        'totalCost' => 'total_cost'
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