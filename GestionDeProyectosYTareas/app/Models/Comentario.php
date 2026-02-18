<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comentario extends Model
{
    protected $table = 'comentario';
    protected $fillable = ['texto', 'autor_id', 'autor_type', 'id_tarea'];

    public function autor() {
        return $this->morphTo();
    }

    public function tarea() {
        return $this->belongsTo(Tarea::class, 'id_tarea');
    }
}
