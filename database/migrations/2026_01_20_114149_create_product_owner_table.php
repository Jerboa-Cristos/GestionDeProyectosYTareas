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
        Schema::create('product_owner', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 40);
            $table->string('email', 40);
            $table->string('password');
            $table->dateTime('fecha_alta');
            //crea 2 tablas, la tabla de cuando fue creada y la tabla de cuando se actualiza
            $table->timestamps();

            //relaciones
            $table->foreignId('id_administrador')->constrained('administrador')->cascadeOnDelete()->cascadeOnUpdate();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_owner');
    }
};
