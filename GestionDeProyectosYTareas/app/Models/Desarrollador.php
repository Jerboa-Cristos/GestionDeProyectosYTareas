<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

//estas dos lineas son para la Autenticacion
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Desarrollador extends Model
{
    use HasApiTokens, HasFactory;
    protected $guard = 'desarrollador';
    
    protected $table = 'desarrollador';
    protected $fillable = ['nombre', 'email', 'password', 'id_administrador', 'id_proyecto'];

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
