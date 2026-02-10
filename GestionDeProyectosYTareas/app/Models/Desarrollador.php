<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Desarrollador extends Model
{
    protected $table = 'desarrollador';
    protected $fillable = ['nombre', 'email', 'password', 'fecha_alta', 'id_administrador', 'id_proyecto'];

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
