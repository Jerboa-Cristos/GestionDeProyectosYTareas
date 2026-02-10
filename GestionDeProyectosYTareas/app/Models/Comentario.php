<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comentario extends Model
{
    protected $table = 'comentario';
    protected $fillable = ['texto', 'fecha', 'id_desarrollador', 'id_productOwner', 'id_tarea'];

    
    public function desarrollador() {
        return $this->belongsTo(Desarrollador::class);
    }

    public function productowner() {
        return $this->belongsTo(ProductOwner::class);
    }

    public function tarea() {
        return $this->belongsTo(Tarea::class);
    }
}
