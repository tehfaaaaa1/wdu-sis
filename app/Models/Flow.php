<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
