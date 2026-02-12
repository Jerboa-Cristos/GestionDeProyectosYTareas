<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class ProductOwner extends Model
{
    use HasApiTokens;
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
