<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExpenseParticipant extends Model
{
    use HasFactory;

 /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'expense_id',
        'user_id',
        'amount_to_refund',
    ];

    /**
     * Get the user that participates in the expense.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the expense that this participant is associated with.
     */
    public function expense()
    {
        return $this->belongsTo(Expense::class);
    }
}
