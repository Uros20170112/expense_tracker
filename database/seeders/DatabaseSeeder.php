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
            CategorySeeder::class,
        ]);
        // User::truncate();
        Expense::truncate();
        // Category::truncate();
        // ExpenseParticipant::truncate();
        // Payment::truncate();


        User::factory(10)->create();
        Expense::factory(10)->create();
        // Category::factory(5)->create();
        // ExpenseParticipant::factory(5)->create();
        // Payment::factory(5)->create();
    }
}
