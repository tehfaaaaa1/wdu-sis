<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Survey extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'desc',
        'project_id',
    ];

    public function project(): BelongsTo {
        return $this->BelongsTo(Project::class, 'project_id');
    }
}
