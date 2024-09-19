<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Flow extends Model
{
    use HasFactory;
    protected $fillable =[
        'flow_name',
        'question_page_id',
        'question_id',
        'question_choice_id',
        'next_page_order',
        'survey_id',
        'current_page_order'
    ];  
    public function question(): BelongsTo{
        return $this->belongsTo(Question::class);
    }
    public function pages(): BelongsTo{
        return $this->belongsTo(QuestionPage::class, 'question_page_id');
    }
    public function choice() : BelongsTo {
        return $this->belongsTo(QuestionChoice::class, 'question_choice_id');
    }
    public function survey(): BelongsTo{
        return $this->belongsTo(Survey::class);
    }
}
