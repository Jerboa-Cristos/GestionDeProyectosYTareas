<?php

namespace Database\Seeders;

use App\Models\Tarea;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class TareaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tareas = [
            ['Diseñar pantalla de login', 'Diseño', 'Por Hacer', 2, 1],
            ['API de autenticación', 'Backend', 'En Revision', 1, 2],
            ['Formulario de login', 'Frontend', 'En Curso', 3, 1],
            ['Listado de reservas', 'Frontend', 'Por Hacer', 7, 3],
            ['Endpoint de reservas', 'Backend', 'En Curso', 2, 2],
            ['Tests de autenticación', 'Testing', 'Por Hacer', 8, 3],
            ['Configurar servidor', 'Despliegue', 'Por Hacer', 12, 1],
        ];

         foreach ($tareas as [$nombre, $tipo, $estado, $dias, $dev]) {
            Tarea::updateOrCreate(
            ['nombre' => $nombre],                        
            [ 
                'tipo' => $tipo,
                'estado' => $estado,
                'descripcion' => "Prueba de:{$nombre}",
                'fecha_fin' => Carbon::now()->addDays($dias),
                'id_sprint' => 1,
                'id_desarrollador' => $dev
            ]);
        }
    }
}
