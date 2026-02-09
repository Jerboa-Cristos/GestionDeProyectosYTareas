<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Proyecto extends Model
{
    protected $table = 'proyecto';

    protected $fillable = ['nombre', 'descripcion'];

    public function product_owner(){
        return $this->belongsTo(ProductOwner::class, 'id_product_owner');
    }

    public function desarrollador(){
        return $this->belongsTo(Desarrollador::class, 'id_desarrollador');
    }

    public function sprints(){
        return $this->hasMany(Sprint::class, 'id_sprint');
    }

    public function tareas(){
        return $this->hasMany(Tarea::class, 'id_tarea');
    }



}
