<?php

namespace App\Models;

use App\Models\Question;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Survey extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'desc',
        'slug',
        'status',
        'project_id',
        'city_id',
        'regency_id',
        'province_targets', 
    ];

    protected $casts = [
        'province_targets' => 'array', 
    ];

    public function project(): BelongsTo {
        return $this->BelongsTo(Project::class, 'project_id');
    }

    public function question(): HasMany {
        return $this->hasMany(Question::class);
    }

    public function response(): HasMany {
        return $this->hasMany(Response::class);
    }

    public function page(): HasMany {
        return $this->hasMany(QuestionPage::class);
    }
}
