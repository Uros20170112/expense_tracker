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
        Schema::table('payments', function (Blueprint $table) {
            $table->unsignedBigInteger('payer_id')->after('id');
            $table->unsignedBigInteger('payee_id')->after('payer_id');
            $table->unsignedBigInteger('expense_id')->after('payee_id');

            // Dodavanje stranih ključeva
            $table->foreign('payer_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('payee_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('expense_id')->references('id')->on('expenses')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            // Uklanjanje stranih ključeva
            $table->dropForeign(['payer_id']);
            $table->dropForeign(['payee_id']);
            $table->dropForeign(['expense_id']);

            // Uklanjanje kolona
            $table->dropColumn(['payer_id', 'payee_id', 'expense_id']);
        });
    }
};
