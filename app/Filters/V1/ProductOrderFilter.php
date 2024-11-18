<?php

namespace App\Filters\V1;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;
use function Laravel\Prompts\form;

class ProductOrderFilter extends ApiFilter{
    // can field sizeCode with =,!= operator
    protected $safeParms = [
        'orderId' => ['eq', 'ne'],
        'proColorSizeId' => ['eq', 'ne'],
        'quantity' => ['eq', 'ne', 'lt', 'gt', 'gte', 'lte']
    ];
    // map column with field in color table
    protected $columnMap = [
        'orderId' => 'order_id',
        'proColorSizeId' => 'pro_color_size_id',
        'quantity' => 'quantity'
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