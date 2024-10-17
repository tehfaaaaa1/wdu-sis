<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Database\Eloquent\Builder;

class EmailContact extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'company',
        'occupation',
    ];
    public function scopeFilter(Builder $query, array $filters) {
        $query->when($filters['search'] ?? false, fn($query, $search)  =>
            $query->where('first_name', 'like', '%'. $search. '%')->orWhere('last_name', 'like', '%'. $search. '%')->orWhere('email', 'like', '%'. $search. '%')->orWhere('company', 'like', '%'. $search. '%')->orWhere('occupation', 'like', '%'. $search. '%')
        );
    }
}
