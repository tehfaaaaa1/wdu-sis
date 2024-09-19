<?php

namespace App\Models;

use App\Models\Flow;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class QuestionChoice extends Model
{
    use HasFactory;

    protected $fillable =[
        'question_id',
        'order',
        'value',
    ];

    public function question(): BelongsTo{
        return $this->belongsTo(Question::class);
    }
    public function flow() : HasMany{
        return $this->hasMany(Flow::class);
    }
}
