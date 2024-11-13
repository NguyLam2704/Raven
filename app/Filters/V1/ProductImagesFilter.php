<?php

namespace App\Filters\V1;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;
use function Laravel\Prompts\form;

class ProductImagesFilter extends ApiFilter{
    // can field sizeCode with =,!= operator
    protected $safeParms = [
        'prodId' => ['eq', 'ne'],
        'isPrimary' => ['eq', 'ne'],
    ];
    // map column with field in color table
    protected $columnMap = [
        'prodId' => 'prod_id',
        'isPrimary' => 'is_primary',
    ];

    protected $operatorMap = [
        'eq' => '=',
        'ne' => '!=',
    ];

}