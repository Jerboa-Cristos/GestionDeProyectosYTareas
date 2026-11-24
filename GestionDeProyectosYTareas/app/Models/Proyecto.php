<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Proyecto extends Model
{
    protected $table = 'proyecto';

    protected $fillable = ['nombre', 'descripcion', 'fecha_inicio', 'fecha_fin', 'id_product_owner'];

    public function product_owner(){
        return $this->belongsTo(ProductOwner::class, 'id_product_owner');
    }

    public function desarrollador(){
        return $this->hasMany(Desarrollador::class, 'id_proyecto');
    }

    public function sprints(){
        return $this->hasMany(Sprint::class, 'id_proyecto');
    }

    public function tareas(){
        return $this->hasManyThrough(Tarea::class, Sprint::class, 'id_proyecto', 'id_sprint');
    }



}
