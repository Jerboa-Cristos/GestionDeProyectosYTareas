<?php

namespace Database\Seeders;

use App\Models\Administrador;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdministradorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $password = Hash::make('password123');
        Administrador::updateOrCreate(
        ['email' => 'admin@demo.com'],                        
        ['nombre' => 'Admin Demo', 'password' => $password]
        );
    }
}
