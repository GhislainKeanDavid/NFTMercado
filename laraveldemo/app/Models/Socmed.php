<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Socmed extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'category';

    protected $fillable = [
        'name', 
        'title', 
        'content', 
        'post_date'
    ];

    // Optional: Define the date format for the 'post_date' column
    protected $casts = [
        'post_date' => 'date',
    ];

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
