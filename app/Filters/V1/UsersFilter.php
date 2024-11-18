<?php

namespace App\Filters\V1;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;
use function Laravel\Prompts\form;

class UsersFilter extends ApiFilter{
    // can field sizeCode with =,!= operator
    protected $safeParms = [
        'phoneNumber' => ['eq', 'ne']
    ];
    
    protected $columnMap = [
        'phoneNumber' => 'phonenumber'
    ];

    protected $operatorMap = [
        'eq' => '=',
        'ne' => '!='
    ];

}