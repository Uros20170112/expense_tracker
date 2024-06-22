<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
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

    public function expenseParticipants()
    {
        return $this->hasMany(ExpenseParticipant::class);
    }

    public function expensesPaid()
    {
        return $this->hasMany(Expense::class, 'paid_by');
    }

    /**
     * Get the payments made by the user.
     */
    public function paymentsMade()
    {
        return $this->hasMany(Payment::class, 'payer_id');
    }

    /**
     * Get the payments received by the user.
     */
    public function paymentsReceived()
    {
        return $this->hasMany(Payment::class, 'payee_id');
    }
}
