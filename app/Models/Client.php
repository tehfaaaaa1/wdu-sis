<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_name',
        'image',
        'alamat',
        'slug',
        'desc',
    ];

    public function project() : HasMany{

        return $this->hasMany(Project::class);
    }
}
