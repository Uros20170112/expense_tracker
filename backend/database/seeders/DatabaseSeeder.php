<?php

namespace Database\Seeders;

use App\Models\Expense;
use App\Models\ExpenseParticipant;
use App\Models\Payment;
use App\Models\User;
use App\Models\Category;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::create([
            'name' => 'Uros Soljaga',
            'email' => 'uros@example.com',
            'password' => Hash::make('password'),
            'role' => 'Administrator',
            'email_verified_at' => now(),
            'remember_token' => Str::random(10)
        ]);
        $user = User::create([
            'name' => 'Zarko Colic',
            'email' => 'zarko@example.com',
            'password' => Hash::make('password'),
            'role' => 'User',
            'email_verified_at' => now(),
            'remember_token' => Str::random(10)
        ]);
        $this->call([
            UserSeeder::class,
            CategorySeeder::class,
            ExpenseSeeder::class,
            ExpenseParticipantSeeder::class,
            PaymentSeeder::class
        ]);
    }
}
