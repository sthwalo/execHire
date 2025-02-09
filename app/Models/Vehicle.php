<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    protected $fillable = [
        'name',
        'image',
        'price_per_hour',
        'category',
        'featured'
    ];
}
