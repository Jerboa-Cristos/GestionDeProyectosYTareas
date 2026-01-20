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
        Schema::create('desarrollador', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 40);
            $table->string('email', 40);
            $table->enum('rol', ['administrador', 'desarrollador', 'product_owner'])->default('administrador');
            $table->string('contraseña');//Que tipo debe ser la contraseña
            $table->dateTime('fecha_alta');

            //Para actualizar la tabla
            $table->timestamps();

            //relaciones con la tabla administrador
            $table->foreignId('id_administrador')->constrained('administrador')->cascadeOnDelete()->cascadeOnUpdate();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('desarrollador');
    }
};
