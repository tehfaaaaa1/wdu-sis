<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Response extends Model
{
    use HasFactory;

    protected $fillable =[
        'user_id',
        'survey_id',
        'status',
    ];

    public function answer() : HasMany{

        return $this->hasMany(Answer::class);
    }
}
