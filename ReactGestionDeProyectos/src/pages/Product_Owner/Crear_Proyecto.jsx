import {useState} from "react";
import Menu_Izquierdo from "./Menu_Izquierdo";
import {funcion_crear_proyecto} from "../../services/ruta_api_proyecto"

function Crear_Proyecto() {
    const [datosForm, setDatosForm] = useState({
        nombre: '',
        descripcion: '', 
        fecha_fin: '',
        
    })

    console.log(datosForm.nombre, datosForm.descripcion, datosForm.fecha_fin)

    const botonGuardarProyecto = (e) => {
        e.preventDefault()
        funcion_crear_proyecto(datosForm)
        .then( respuesta => {
            console.log('proyecto creado', respuesta.data)
            console.log('data enviarda', datosForm)
        })
    }

    return ( 
        <>   
        <Menu_Izquierdo/>
        <div className=""> 
            <h1 className="text-center font-black m-4">Formulario de Proyecto</h1> 
        
            <form method="post" className="border border-blue-500 p-4 rounded-lg px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto">
                <div className="">
                    <label className="font-bold">Nombre del Proyecto*</label>
                    <input
                    onChange={e => setDatosForm({
                        ...datosForm, 
                        nombre: e.target.value
                    })} 
                    
                    type="text" 
                    name="nombre" 
                    required className="border border-gray-300 rounded-md focus:border-blue-300 outline-none focus:ring focus:ring-blue-300 w-full mt-3 mb-3"/> 
                </div>
                
                <div>
                    <label type="text" name="descripcion" className="font-bold ">Descripción del proyecto</label>
                    <textarea
                    onChange={e => setDatosForm({
                        ...datosForm,
                        descripcion: e.target.value
                    })} 
                    name="descripcion" 
                    placeholder="Escribe la descripción aquí" 
                    className="border border-gray-300 rounded-md w-full focus:border-blue-500 outline-none focus:ring focus:ring-blue-300 mt-3">

                    </textarea>
                </div>

                <div>
                    <label className="font-bold">Fecha final </label>
                    <input
                    onChange = {e => setDatosForm({
                        ...datosForm,
                        fecha_fin: e.target.value
                    })} 
                    type="date" 
                    name="fecha_fin" 
                    className="mt-3"/>
                </div>

                <button
                onClick={botonGuardarProyecto}
                type="submit" 
                className="bg-green-400 hover:bg-green-600 block font-bold mx-auto my-10 py-2 px-4 rounded-lg ">Guardar Proyecto</button>
            

            </form>
        
        </div> 
        
        </>
    
)
} 
    
export default Crear_Proyecto;