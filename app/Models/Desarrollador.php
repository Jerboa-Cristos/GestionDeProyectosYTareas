<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Desarrollador extends Model
{
    protected $table = 'desarrollador';
    protected $fillable = ['nombre', 'email', 'constraseña', 'fecha_alta'];

    public function administrador() {
        
        return $this->belongsTo(Administrador::class);
    }

    public function tarea() {
        return $this->hasMany(Tarea::class);
    }

    public function proyecto() {
        return $this->belongsTo(Proyecto::class);
    }

    public function comentario() {
        return $this->hasMany(Comentario::class);
    }
}
