<?php

namespace Database\Seeders;

use App\Models\Sprint;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class SprintSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Sprint::updateOrCreate(
        ['nombre' => 'Sprint 1'],                        
        [ 
            'fecha_inicio' => Carbon::now(),
            'fecha_fin' => Carbon::now()->addMonths(1),
            'meta_sprint' => '',
            'id_proyecto' => 1
        ]
        );
    }
}
