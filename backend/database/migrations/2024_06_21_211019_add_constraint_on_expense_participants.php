<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('expense_participants', function (Blueprint $table) {
            $table->unique(['expense_id', 'user_id']);
        });
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
    }
};
