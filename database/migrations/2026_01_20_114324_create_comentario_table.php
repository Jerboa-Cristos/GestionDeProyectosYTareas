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
        Schema::create('comentario', function (Blueprint $table) {
            $table->id();
            $table->text('texto');
            $table->date('fecha');

            //Para actualizarlo a tiempo
            $table->timestamps();

            $table->foreignId('id_desarrollador')->constrained('desarrollador')->cascadeOnDelete()->cascadeOnUpdate();
            //$table->foreignId('id_productOwner')->constrained('product_owner')->cascadeOnDelete()->cascadeOnUpdate();

            $table->foreignId('id_tarea')->constrained('tarea')->cascadeOnDelete()->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comentario');
    }
};
