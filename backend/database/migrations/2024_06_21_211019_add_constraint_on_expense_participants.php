<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('expense_participants', function (Blueprint $table) {
            $table->unique(['expense_id', 'user_id']);
        });

        DB::unprepared('
            CREATE TRIGGER limit_expense_participants
            BEFORE INSERT ON expense_participants
            FOR EACH ROW
            BEGIN
                DECLARE participant_count INT;
                
                SELECT COUNT(*) INTO participant_count
                FROM expense_participants
                WHERE expense_id = NEW.expense_id;
                
                IF participant_count >= 4 THEN
                    SIGNAL SQLSTATE "45000"
                    SET MESSAGE_TEXT = "Cannot add more than 4 participants to an expense.";
                END IF;
            END
        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::table('expense_participants', function (Blueprint $table) {
            $table->dropUnique(['expense_id', 'user_id']);
        });

        DB::unprepared('DROP TRIGGER IF EXISTS limit_expense_participants');
    }
};
