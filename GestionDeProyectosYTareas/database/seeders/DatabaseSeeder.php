<?php

namespace Database\Seeders;

use App\Models\Sprint;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            AdministradorSeeder::class,
            ProductOwnerSeeder::class,
            ProyectoSeeder::class,
            DesarrolladorSeeder::class,
            SprintSeeder::class,
            TareaSeeder::class
        ]);

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
    }
}
