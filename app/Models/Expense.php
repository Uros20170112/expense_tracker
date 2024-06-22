<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    use HasFactory;
    protected $fillable = [
        'description',
        'amount',
        'paid_by',
        'category_id',
        'paid_on',
    ];

    /**
     * Get the user who paid for the expense.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'paid_by');
    }

    /**
     * Get the participants for the expense.
     */
    public function participants()
    {
        return $this->hasMany(ExpenseParticipant::class);
    }
    /**
     * Get the category for the expense.
     */
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
