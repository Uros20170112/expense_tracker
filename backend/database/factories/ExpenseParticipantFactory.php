<?php

namespace Database\Factories;

use App\Models\Expense;
use App\Models\ExpenseParticipant;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ExpenseParticipant>
 */
class ExpenseParticipantFactory extends Factory
{
    protected $model = ExpenseParticipant::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'expense_id' =>  Expense::all()->random()->id,
            'user_id' =>  User::all()->random()->id,
            'amount_to_refund' => $this->faker->randomFloat(2, 1, 1000),
        ];
    }
}
