<?php

namespace Database\Seeders;

use App\Models\Proyecto;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class ProyectoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Proyecto::updateOrCreate(
        ['nombre' => 'Proyecto demo'],                        
        [ 
            'descripcion' => 'Desarrollo de aplicación web.', 
            'fecha_inicio' => Carbon::now(),
            'fecha_fin' => Carbon::now()->addMonths(2),
            'id_product_owner' => 1
        ]
        );
    }
}
