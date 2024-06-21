<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Ubacujemo paid_by kao novi UserID u tabelu expense_participants i postavljamo AmountToRefund na 0
        DB::statement('
            INSERT INTO expense_participants (expense_id, user_id, amount_to_refund, created_at)
            SELECT id, paid_by AS user_id, 0, NOW()
            FROM expenses
        ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('
            DELETE FROM expense_participants
            WHERE user_id IN (SELECT paid_by FROM expenses)
        ');
    }
};
