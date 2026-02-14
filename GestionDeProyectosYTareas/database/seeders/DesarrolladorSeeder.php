<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class DesarrolladorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('es_ES');

        for($i = 0; $i<=15; $i++) {
            DB::table('desarrollador')->insert([
                'nombre' => $faker->name(),
                'email' => $faker->email(),
                'password' => $faker->password(5, 10),
                
                'created_at' => date('Y-m-d'),
                'updated_at' =>date('Y-m-d'),
                'id_administrador' => 1,
                'id_proyecto' => 1
            ]);
        }
    }
}
