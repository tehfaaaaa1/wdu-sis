<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Question extends Model
{
    use HasFactory;

    protected $fillable =[
        'survey_id', 
        'question_page_id',
        'question_text',
        'question_type_id',
        'order',
        'required',
    ];

    public function choice(): HasMany{
        return $this->hasMany(QuestionChoice::class);
    }
    public function answer(): HasMany{
        return $this->hasMany(Answer::class);
    }
    public function survey(): BelongsTo{
        return $this->belongsTo(Survey::class);
    }
    public function page(): BelongsTo{
        return $this->belongsTo(QuestionPage::class);
    }
}
