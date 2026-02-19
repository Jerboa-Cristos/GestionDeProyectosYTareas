<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tarea extends Model
{
    protected $table = 'tarea';
    protected $fillable = ['nombre', 'tipo', 'estado', 'descripcion', 'fecha_fin', 'id_sprint', 'id_desarrollador'];

    public function desarrollador() {
        return $this->belongsTo(Desarrollador::class, 'id_desarrollador');
    }

    public function sprint() {
        return $this->belongsTo(Sprint::class, 'id_sprint');
    }

    public function comentario() {
        return $this->hasMany(Comentario::class, 'id_tarea');
    }
}
