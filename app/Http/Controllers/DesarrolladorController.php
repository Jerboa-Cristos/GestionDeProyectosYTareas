<?php

namespace App\Http\Controllers;

use App\Models\Desarrollador;
use Illuminate\Http\Request;


class DesarrolladorController extends Controller
{
    //El desarrolladro puede:
    //Ser asignado a un proyecto/tarea
    //Completar tareas AKA cambiar estado de la tarea a completado

    public function index() {
        $desarrolladores=Desarrollador::all();
    }

    public function create() {

    }

    public function store() {

    }

    public function edit() {

    }

    public function update() {

    }

    public function destroy() {

    }

}
