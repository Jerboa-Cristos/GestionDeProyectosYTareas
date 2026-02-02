<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class ProyectoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('es_Es');

        for($i=0; $i<=5; $i++) {
            DB::table('product_owner')->insert([
                'nombre'=> $faker->name(),
                'descripcion'=> $faker->text(),
                'fecha_inicio'=>date('Y-m-d'),
                'fecha_fin'=>$faker->date(),
                'created_at'=>date('Y-m-d'),
                'updated_at'=>date('Y-m-d'),
                'id_product_owner'=>random_int(1,5)
            ]);
        }
    }
}
