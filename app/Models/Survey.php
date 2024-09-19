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
        'target_response',
        'province_id',
        'city_id',
        'regency_id',
    ];

    public function project(): BelongsTo {
        return $this->BelongsTo(Project::class, 'project_id');
    }

    public function question():  Hasmany{
        return $this->hasMany(Question::class);
    }
    public function response():  Hasmany{
        return $this->hasMany(Response::class);
    }
    public function page():  Hasmany{
        return $this->hasMany(QuestionPage::class);
    }
    public function flow() : HasMany{
        return $this->hasMany(Flow::class);
    }
}
