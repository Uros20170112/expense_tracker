<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PaymentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement("
            INSERT INTO payments (payer_id, payee_id, expense_id, amount, payment_date)
            SELECT 
                ep.user_id AS payer_id,
                e.paid_by AS payee_id,
                ep.expense_id,
                ep.amount_to_refund AS amount,
                CURRENT_TIMESTAMP AS payment_date
            FROM 
                expense_participants ep
            JOIN 
                expenses e ON ep.expense_id = e.id
            WHERE 
                ep.amount_to_refund > 0;
        ");

        DB::statement("
            UPDATE expense_participants
            SET amount_to_refund = 0
            WHERE amount_to_refund > 0;
        ");
    }
}
