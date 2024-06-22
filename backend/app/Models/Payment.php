<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'payer_id',
        'payee_id',
        'expense_id',
        'amount',
        'payment_date',
    ];

    /**
     * Get the user who made the payment.
     */
    public function payer()
    {
        return $this->belongsTo(User::class, 'payer_id');
    }

    /**
     * Get the user who received the payment.
     */
    public function payee()
    {
        return $this->belongsTo(User::class, 'payee_id');
    }

    /**
     * Get the expense that this payment is associated with.
     */
    public function expense()
    {
        return $this->belongsTo(Expense::class);
    }
}
