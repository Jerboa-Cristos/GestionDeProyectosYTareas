<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Administrador extends Model
{
    protected $table = 'administrador';
    protected $fillable = ['nombre', 'email', 'rol', 'constraseña', 'fecha_alta'];

    public function desarrolladores() {
        return $this->hasMany(Desarrollador::class);
    }

    public function productOwners() {
        return $this->hasMany(ProductOwner::class);
    }
}
