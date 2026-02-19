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
        Schema::create('proyecto', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 40);
            $table->text('descripcion');
            $table->dateTime('fecha_fin')->nullable();
            $table->timestamps();

            //relaciones
            $table->foreignId('id_product_owner')->constrained('product_owner')->cascadeOnDelete()->cascadeOnUpdate();



        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proyecto');
    }
};
