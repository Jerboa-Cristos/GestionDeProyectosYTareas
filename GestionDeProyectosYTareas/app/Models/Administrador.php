<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Administrador extends Model
{
    protected $table = 'administrador';
    protected $fillable = ['nombre', 'email', 'password'];

    public function desarrolladores() {
        return $this->hasMany(Desarrollador::class);
    }

    public function productOwners() {
        return $this->hasMany(ProductOwner::class);
    }
}
