import {useState} from "react";

function Crear_Proyecto() {
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaInicio, setInicio] = useState('')
    const [fechaFin, setFin] = useState('')
    console.log(nombre)

    return ( 


    <div> 
        <h1 className="text-center font-black m-4">Formulario de Proyecto</h1> 
    
        <form method="post" className="border border-blue-500 p-4 rounded-lg px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto">
            <div className="">
                <label className="font-bold">Nombre del Proyecto*</label>
                <input
                onChange={e => setNombre(e.target.value)} 
                
                type="text" 
                name="nombre_proyecto" 
                required className="border border-gray-300 rounded-md focus:border-blue-300 outline-none focus:ring focus:ring-blue-300 w-full mt-3 mb-3"/> 
            </div>
            
            <div>
                <label type="text" name="descripcion" className="font-bold ">Descripción del proyecto</label>
                <textarea name="descripcion_proyecto" placeholder="Escribe la descripción aquí" className="border border-gray-300 rounded-md w-full focus:border-blue-500 outline-none focus:ring focus:ring-blue-300 mt-3"></textarea>
            </div>

            <div>
                <label className="font-bold">Fecha de inicio* </label>
                <input type="date" name="fecha_inicio" required className="mt-3"/>
            </div>


            <div>
                <label className="font-bold">Fecha final </label>
                <input type="date" name="fecha_fin" className="mt-3"/>
            </div>

            <button type="submit" className="bg-green-400 hover:bg-green-600 block font-bold mx-auto my-10 py-2 px-4 rounded-lg ">Crear Proyecto</button>
            


        </form>
    
    </div> ); 
} 
    
export default Crear_Proyecto;