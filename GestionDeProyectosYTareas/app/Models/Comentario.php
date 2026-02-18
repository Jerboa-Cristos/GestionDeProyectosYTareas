<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comentario extends Model
{
    protected $table = 'comentario';
    protected $fillable = ['texto', 'id_desarrollador', 'id_productOwner', 'id_tarea'];

    
    public function desarrollador() {
        return $this->belongsTo(Desarrollador::class, 'id_desarrollador');
    }

    public function productowner() {
        return $this->belongsTo(ProductOwner::class, 'id_productOwner');
    }

    public function tarea() {
        return $this->belongsTo(Tarea::class, 'id_tarea');
    }
}
