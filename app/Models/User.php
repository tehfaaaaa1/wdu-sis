<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Jetstream\HasTeams;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable
{
    use HasApiTokens;
    use HasFactory;
    use HasProfilePhoto;
    use HasTeams;
    use Notifiable;
    use TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'usertype',
        'client_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'profile_photo_url',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function response():  Hasmany{
        return $this->hasMany(Response::class);
    }
    public function client():  BelongsTo{
        return $this->belongsTo(Client::class);
    }
    public function biodata():  BelongsTo{
        return $this->belongsTo(Biodata::class);
    }
    public function scopeFilter(Builder $query, array $filters) {
        $query->when($filters['search'] ?? false, fn($query, $search)  =>
            $query->where('name', 'like', '%'. $search. '%')->orWhere('usertype', 'like', '%'. $search. '%')->orWhere('email', 'like', '%'. $search. '%')
        );

        $query->when($filters['client']??false, fn($query, $client)=> 
            $query->whereHas('client', fn($query)=> $query->whereIn('slug', $client))
        );
        $query->when($filters['team']??false, fn($query, $team)=> 
            $query->whereHas('currentTeam', fn($query)=> $query->whereIn('name', $team))
        );
        $query->when($filters['noteam'] ?? false, fn($query)=> 
            $query->where('current_team_id', null)
        );
        $query->when($filters['noclient'] ?? false, fn($query)=> 
            $query->where('client_id', null)
        );
    }
}
