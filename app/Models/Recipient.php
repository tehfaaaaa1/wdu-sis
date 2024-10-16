<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Recipient extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
    ];
    public function contact_recipient(): HasMany
    {
        return $this->hasMany(ContactRecipient::class);
    }
}
