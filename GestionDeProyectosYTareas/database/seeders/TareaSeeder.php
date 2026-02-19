<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class TareaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('es_Es');

        for($i=0; $i<=5; $i++) {
            DB::table('tarea')->insert([
                'nombre'=> $faker->word(),
                'tipo'=> 'Frontend',
                'estado'=> 'En Curso',
                'descripcion'=> $faker->text(),
                'fecha_fin'=>$faker->date(),
                'id_sprint'=> 1,
                'id_desarrollador'=>1
            ]);
        }
    }
}
