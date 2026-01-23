<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Desarrollador extends Model
{
    protected $table = 'desarrollador';
    protected $fillable = ['nombre', 'email', 'rol', 'constraseña', 'fecha_alta'];

    public function administrador() {
        return $this->belongsTo(Administrador::class);
    }
}
