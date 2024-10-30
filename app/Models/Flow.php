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
        'current_page_id',
        'next_page_id',
        'question_id',
        'question_choice_id',
        'survey_id'
    ];  
    public function question(): BelongsTo{
        return $this->belongsTo(Question::class);
    }
    public function currentpages(): BelongsTo{
        return $this->belongsTo(QuestionPage::class, 'current_page_id');
    }
    public function nextpages(): BelongsTo{
        return $this->belongsTo(QuestionPage::class, 'next_page_id');
    }
    public function choice() : BelongsTo {
        return $this->belongsTo(QuestionChoice::class, 'question_choice_id');
    }
    public function survey(): BelongsTo{
        return $this->belongsTo(Survey::class);
    }
}
