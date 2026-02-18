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

            //Para actualizarlo a tiempo
            $table->timestamps();

            $table->foreignId('id_desarrollador')->nullable()->constrained('desarrollador')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('id_productOwner')->nullable()->constrained('product_owner')->cascadeOnDelete()->cascadeOnUpdate();

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
