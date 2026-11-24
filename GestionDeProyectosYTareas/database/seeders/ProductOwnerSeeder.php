<?php

namespace Database\Seeders;

use App\Models\ProductOwner;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;


class ProductOwnerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $password = Hash::make('password123');
        ProductOwner::updateOrCreate(
        ['email' => 'po@demo.com'],                        
        ['nombre' => 'Product Owner Demo', 'password' => $password, 'id_administrador' => 1]
        );
    }
}
