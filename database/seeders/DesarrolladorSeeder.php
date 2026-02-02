<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Hash;
use Illuminate\Support\Str;
use Faker\Factory as Faker;


class NombreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('es_ES');

        for($i = 0; $i<=15; $i++) {
            DB::table('desarrolador')->insert([
                'nombre' => $faker->name(),
                'email' => $faker->email(),
                'password'
            ]);
        }
    }
}
