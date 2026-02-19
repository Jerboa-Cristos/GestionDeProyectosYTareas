<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sprint extends Model
{
    protected $table = 'sprint';

    protected $fillable = ['nombre', 'fecha_inicio', 'fecha_fin','meta_sprint'];

    public function proyecto(){
        return $this->belongsTo(Proyecto::class, 'id_proyecto');
    }

    public function tareas(){
        return $this->hasMany(Tarea::class, 'id_sprint');
    }

}
