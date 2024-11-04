<?php

namespace App\Filters\V1;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;
use function Laravel\Prompts\form;

class SizesFilter extends ApiFilter{
    // can field sizeCode with =,!= operator
    protected $safeParms = [
        'sizeCode' => ['eq', 'ne']
    ];
    
    protected $columnMap = [
        'sizeCode' => 'size_code'
    ];

    protected $operatorMap = [
        'eq' => '=',
        'ne' => '!='
    ];

}