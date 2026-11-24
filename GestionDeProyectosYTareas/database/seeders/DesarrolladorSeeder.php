<?php

namespace Database\Seeders;

use App\Models\Desarrollador;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DesarrolladorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $password = Hash::make('password123');
        $dev = [
            ['dev@demo.com', 'Desarrollador Demo'],
            ['dev1@demo.com', 'Lucia Navarro'],
            ['dev2@demo.com', 'Antonio Banderas'],
        ];

        foreach($dev as [$email, $nombre]) {
            Desarrollador::updateOrCreate(
            ['email' => $email],                        
            ['nombre' => $nombre, 'password' => $password, 'id_administrador' => 1, 'id_proyecto' => 1]
        );
        }

    }
}
