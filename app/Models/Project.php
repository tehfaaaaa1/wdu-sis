<?php

namespace App\Models;

use Illuminate\Support\Arr;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Project extends Model
{
    use HasFactory;
    protected $fillable = [
        'project_name',
        'image',
        'client_id',
        'slug',
        'desc',
    ];

    public function survey() : HasMany{

        return $this->hasMany(Survey::class);
    }
    public function client(): BelongsTo {
        return $this->BelongsTo(Client::class, 'client_id');
    }
}
