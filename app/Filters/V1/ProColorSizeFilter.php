<?php

namespace App\Filters\V1;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;
use function Laravel\Prompts\form;

class ProColorSizeFilter extends ApiFilter{
    // can field sizeCode with =,!= operator
    protected $safeParms = [
        'prodId' => ['eq','ne'],
        'sizeId' => ['eq','ne'],
        'colorId' => ['eq','ne'],
        'quantityAvailable' => ['eq', 'ne', 'gt','lt','lte','gte']
    ];
    // map column with field in color table
    protected $columnMap = [
        'prodId' => 'prod_id',
        'sizeId' => 'size_id',
        'colorId' => 'color_id',
        'quantityAvailable' => 'quantity_available'
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