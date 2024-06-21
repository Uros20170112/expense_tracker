<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ExpenseParticipant;
use Illuminate\Support\Facades\DB;


class ExpenseParticipantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::statement('
            INSERT INTO expense_participants (expense_id, user_id, amount_to_refund, created_at)
            SELECT id, paid_by AS user_id, 0, NOW()
            FROM expenses
        ');

        ExpenseParticipant::factory(5)->create();

        DB::statement('
        UPDATE expense_participants ep
        JOIN (
            SELECT
                ep.expense_id,
                e.amount / COUNT(ep.user_id) AS amount_per_participant
            FROM expenses e
            JOIN expense_participants ep ON e.id = ep.expense_id
            GROUP BY ep.expense_id, e.amount
        ) AS calculated ON ep.expense_id = calculated.expense_id
        SET ep.amount_to_refund = calculated.amount_per_participant;
    ');
    }
}
