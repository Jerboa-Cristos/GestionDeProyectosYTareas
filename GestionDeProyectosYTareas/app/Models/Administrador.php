<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


//estas dos lineas son para la Autenticacion
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Administrador extends Authenticatable
{
    use HasApiTokens, HasFactory;
    protected $guard = 'administrador';
    
    protected $table = 'administrador';
    protected $fillable = ['nombre', 'email', 'password'];

    public function desarrolladores() {
        return $this->hasMany(Desarrollador::class);
    }

    public function productOwners() {
        return $this->hasMany(ProductOwner::class);
    }
}
