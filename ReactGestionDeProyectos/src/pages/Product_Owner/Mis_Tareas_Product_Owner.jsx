import React, { useState } from 'react';
import MenuTop from '../../Components/MenuTop';
import Menu_Izquierdo from '../Menus/Menu_Izquierdo';
import {Link, useParams} from 'react-router-dom'

function Mis_Tareas_Product_Owner() {
    const [nombre, setNombre] = useState()
    const id_sprint = useParams()
    

    return (
         <div className="min-h-screen bg-blueDark p-4 flex flex-col font-sans">
            <MenuTop rutaPerfil='/product_owner_profile'/>

            


            <div className="flex flex-1 gap-4 overflow-hidden h-full">
                <Menu_Izquierdo/>

                <main className="flex-1 bg-white rounded-xl shadow-lg p-8 overflow-auto flex flex-col gap-6">
                    <h1 className="text-3xl font-bold text-blueDark mb-6">Mis Tareas</h1>


                    <div className="flex justify-between items-center mt-4 mb-4">
                    <h2 className="text-xl font-bold text-BlueDarkDark">SPRINTS</h2>

                    <Link to={`/crear_tarea/${id_sprint}`}
                    className="bg-blueBase hover:bg-blue-300 transition rounded px-4 py-2 text-BlueDarkDark font-bold shadow"
                    >
                    <p>+ Nueva Tarea</p>
                    
                    </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       {/*Aquí deben estar las cosas de TAREAS*/}
                    </div>

                </main>
            </div>
        </div>  
    )
}

export default Mis_Tareas_Product_Owner;