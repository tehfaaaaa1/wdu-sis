<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    use HasFactory;

    protected $fillable = ['name','target_response'];

    public function regencies()
    {
        return $this->hasMany(Regency::class);
    }

    public function cities()
    {
        return $this->hasMany(City::class);
    }
}
