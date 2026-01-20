<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('administrador', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 40);
            $table->string('email', 40);
            $table->enum('rol', ['administrador', 'desarrollador', 'product_owner'])->default('administrador');
            $table->string('contraseña');//Que tipo debe ser la contraseña
            $table->dateTime('fecha_alta');

            //Para actualizar las tablas
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('administrador');
    }
};
