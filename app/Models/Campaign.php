<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Campaign extends Model
{
    use HasFactory;
    protected $fillable=[
        'name',
        'subject',
        'sender',
        'recipient_id',
        'content'
    ];

    public function recipient() : BelongsTo {
        return $this->belongsTo(Recipient::class, 'recipient_id');
    }
}
