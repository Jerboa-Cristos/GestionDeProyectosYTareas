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
        Schema::create('tarea', function (Blueprint $table) {
            $table->id();
            $table->enum('tipo', ['Backend', 'Frontend', 'Diseño','Despliegue', 'Testing']);
            $table->text('descripcion', 300)->nullable();
            $table->date('fecha_fin')->nullable();

            $table->timestamps();

            //Foreign Key
            $table->foreignId('id_sprint')->constrained('sprint')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('id_desarrollador')->constrained('desarrollador')->cascadeOnDelete()->cascadeOnUpdate();

            //$table->foreignId('id_proyecto')->constrained('proyecto')->cascadeOnDelete()->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tarea');
    }
};
