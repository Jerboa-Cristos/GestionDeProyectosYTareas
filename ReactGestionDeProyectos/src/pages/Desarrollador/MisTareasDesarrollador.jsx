import React from 'react';
import Tarea from '../../Components/Com_Desarrollador/Tarea';
import MenuTop from '../../Components/MenuTop';
import MenuLateralDesarrollador from '../../Components/Com_Desarrollador/MenuLateralDesarrollador';

function MisTareasDesarrollador() {
    return (
         <div className="min-h-screen bg-blueDark p-4 flex flex-col font-sans">
            <MenuTop/>
            <div className="flex flex-1 gap-4 overflow-hidden h-full">
                <MenuLateralDesarrollador/>
                <main className="flex-1 bg-white rounded-xl shadow-lg p-8 overflow-auto flex flex-col gap-6">
                    <h1 className="text-3xl font-bold text-blueDark mb-6">Mis Tareas</h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       {/*Aquí deben estar las cosas de TAREAS*/}
                    </div>

                </main>
            </div>
        </div>  
    )
}

export default MisTareasDesarrollador;