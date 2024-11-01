<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class QuestionPage extends Model
{
    use HasFactory;

    protected $fillable= [
        'page_name',
        'survey_id',
        'order'
    ];

    public function survey() : BelongsTo{
        return $this->belongsTo(Survey::class);
    }
    public function question() : HasMany{
        return $this->hasMany(Question::class);
    }
    public function flow() : HasMany{
        return $this->hasMany(Flow::class, 'current_page_id');
    }
}
