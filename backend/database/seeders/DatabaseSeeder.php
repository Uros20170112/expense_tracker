<?php

namespace Database\Seeders;

use App\Models\Expense;
use App\Models\ExpenseParticipant;
use App\Models\Payment;
use App\Models\User;
use App\Models\Category;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            CategorySeeder::class,
            ExpenseSeeder::class,
            ExpenseParticipantSeeder::class,
        ]);
    }
}
