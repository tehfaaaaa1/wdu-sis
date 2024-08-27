<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Biodata extends Model
{
    use HasFactory;
    protected $fillable =[
        'nama_responden',
        'alamat',
        'no_hp',
        'instansi',
        'user_id'
    ];
}
