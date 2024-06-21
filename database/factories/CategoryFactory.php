<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{

    protected $model = Category::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // $categories = ['loan', 'health & fitness', 'cars & transportation', 'groceries', 'going out', 'shopping & services', 'vacation & travel', 'leisure & lifestyle activities', 'uncategorized'];
        return [
            // 'name' => $this->faker->randomElement($categories),
        ];
    }
}
