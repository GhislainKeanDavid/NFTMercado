<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = ['content', 'socmed_id'];

    public function socmed()
    {
        return $this->belongsTo(Socmed::class);
    }
}
