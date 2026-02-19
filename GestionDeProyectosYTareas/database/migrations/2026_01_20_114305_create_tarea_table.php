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
            $table->string('nombre');
            $table->enum('tipo', ['Backend', 'Frontend', 'Diseño','Despliegue', 'Testing']);
            $table->enum('estado', ['Por Hacer', 'En Curso', 'En Revision', 'Finalizado']);
            $table->text('descripcion')->nullable();
            $table->date('fecha_fin')->nullable();

            $table->timestamps();

            //Foreign Key
            $table->foreignId('id_sprint')->constrained('sprint')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('id_desarrollador')->constrained('desarrollador')->cascadeOnDelete()->cascadeOnUpdate();
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
