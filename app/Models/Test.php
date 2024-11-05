<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Test extends Model
{
    use HasFactory;
    // protected $table = 'category_type';
    // protected $primaryKey ='category_type_id';
    protected $table = 'pro_color_size'; // Ensure this matches your table name
    protected $primaryKey = 'pro_color_size_id'; // This is the default; specify it if different
    public $incrementing = false; // Set to false since it's not auto-incrementing
    protected $keyType = 'int'; // Set the key type to integer
}
