<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ContactRecipient extends Model
{
    use HasFactory;
    protected $fillable =[
        'email_contact_id',
        'recipient_id'
    ];
    public function email_contact() : BelongsTo {
        return $this->belongsTo(EmailContact::class, 'email_contact_id');
    }
    public function recipient() : BelongsTo {
        return $this->belongsTo(Recipient::class);
    }
}
