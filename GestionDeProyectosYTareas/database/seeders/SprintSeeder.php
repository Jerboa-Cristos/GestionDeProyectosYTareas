<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class SprintSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('es_Es');

        for($i=0; $i<=5; $i++) {
            DB::table('sprint')->insert([
                'nombre'=> $faker->word(),
                'fecha_inicio'=>$faker->date(),
                'fecha_fin'=>$faker->date(),
                'id_proyecto'=>1
            ]);
        }
    }
}
