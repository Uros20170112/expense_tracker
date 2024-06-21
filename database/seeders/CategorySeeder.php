<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['id' => 1, 'name' => 'loan'],
            ['id' => 2, 'name' => 'health & fitness'],
            ['id' => 3, 'name' => 'cars & transportation'],
            ['id' => 4, 'name' => 'groceries'],
            ['id' => 5, 'name' => 'going out'],
            ['id' => 6, 'name' => 'shopping & services'],
            ['id' => 7, 'name' => 'vacation & travel'],
            ['id' => 8, 'name' => 'leisure & lifestyle activities'],
            ['id' => 9, 'name' => 'uncategorized'],
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(['id' => $category['id']], $category);
        }
    }

}
