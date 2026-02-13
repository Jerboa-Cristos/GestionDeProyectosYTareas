<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

//estas dos lineas son para la Autenticacion
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProductOwner extends Authenticatable
{
    use HasApiTokens, HasFactory;
    protected $guard = 'product_owner';

    protected $table = 'product_owner';
    protected $fillable = ['nombre', 'email', 'password', 'id_administrador'];

    public function administrador(){
        return $this->belongsTo(Administrador::class, 'id_administrador');
    }

    public function proyectos(){
        return $this->hasMany(Proyecto::class, 'id_product_owner');
    }


    public function sprints(){
        return $this->hasManyThrough(Sprint::class, Proyecto::class, 'id_product_owner', 'id_proyecto');
    }

    public function comentarios(){
        return $this->hasMany(Comentario::class, 'id_product_owner');
    }
}