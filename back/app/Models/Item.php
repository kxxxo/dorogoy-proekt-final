<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/** @property $name string */
/** @property $rating int */
class Item extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'rating'];

    protected $hidden = ['created_at', 'updated_at'];
}

