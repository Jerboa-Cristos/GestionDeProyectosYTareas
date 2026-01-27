<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tarea extends Model
{
    protected $table = 'tarea';
    protected $fillable = ['tipo', 'descripcion', 'fecha_inicio', 'fecha_fin'];

    public function desarrollador() {
        return $this->belongsTo(Desarrollador::class);
    }

    public function proyecto() {
        return $this->belongsTo(Proyecto::class);
    }

    public function sprint() {
        return $this->belongsTo(Sprint::class);
    }

    public function estado() {
        return $this->belongsTo(Estado::class);
    }

    public function comentario() {
        return $this->hasMany(Comentario::class);
    }
}
