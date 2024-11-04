<?php

namespace App\Filters\V1;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;
use function Laravel\Prompts\form;

class ColorsFilter extends ApiFilter{
    // can field sizeCode with =,!= operator
    protected $safeParms = [
        'colorCode' => ['eq', 'ne'],
        'colorName' => ['eq', 'ne']
    ];
    // map column with field in color table
    protected $columnMap = [
        'colorCode' => 'color_code',
        'colorName' => 'color_name'
    ];

    protected $operatorMap = [
        'eq' => '=',
        'ne' => '!='
    ];

}