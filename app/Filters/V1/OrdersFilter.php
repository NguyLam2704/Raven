<?php

namespace App\Filters\V1;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;
use function Laravel\Prompts\form;

class OrdersFilter extends ApiFilter{
    // can field sizeCode with =,!= operator
    protected $safeParms = [
        'status' => ['eq', 'ne'],
        'userId' => ['eq', 'ne'],
        'payingMethod' => ['eq', 'ne'],
        'dateCreated' => ['eq', 'ne']
    ];
    // map column with field in color table
    protected $columnMap = [
        'status' => 'status',
        'userId' => 'user_id',
        'payingMethod' => 'payingmethod',
        'dateCreated' => 'datecreated'
    ];

    protected $operatorMap = [
        'eq' => '=',
        'ne' => '!=',
    ];

}