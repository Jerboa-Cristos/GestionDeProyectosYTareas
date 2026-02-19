import { useState } from "react";
import { funcion_crear_proyecto } from "../../services/ruta_api_proyecto";
import Menu_Izquierdo from "../Menus/Menu_Izquierdo";
import { useNavigate } from "react-router-dom";
import MenuTop from '../../Components/MenuTop'
function Crear_Proyecto() {
    const [datosForm, setDatosForm] = useState({
        nombre: '',
        descripcion: '', 
        fecha_fin: '',
        
    })
    const navigate = useNavigate()

    console.log(datosForm.nombre, datosForm.descripcion, datosForm.fecha_fin)

    const botonGuardarProyecto = (e) => {
        e.preventDefault()

        const token = localStorage.getItem('token')
        funcion_crear_proyecto(datosForm, token)
        .then( respuesta => {
            console.log('proyecto creado', respuesta.data)
            console.log('data enviada', datosForm)

            console.log('funcion', funcion_crear_proyecto)
            console.log('token en crear proyecto', token)
            navigate('/lista_proyectos')
        })
        .catch(error => {
            error.data
        }) 


        
    }

    return ( 
        <>
        <MenuTop/>
        <div className="flex">
            <div className="w-56">
                <Menu_Izquierdo/>
            </div>

            <div className="flex-1 p-10 bg-white">
                <h1 className="text-3xl font-bold text-BlueDarkDark mb-4">Mis Proyectos</h1>
                <div className="bg-blueDashboard border border-gray-200 rounded-xl shadow-sm p-8 max-w-xl mx-auto">

                <h1 className="text-3xl font-bold text-center text-white mb-8">
                    Crear de Proyecto
                </h1> 

                <form 
                method="post" 
                className="border border-blue-500 p-4 rounded-lg px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto"
                onSubmit={botonGuardarProyecto}
                >
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
                    className="bg-green-400 hover:bg-green-600 block font-bold mx-auto my-10 py-2 px-4 rounded-lg ">Guardar Proyecto</button>
                

                    </form>
                </div>
            </div> 
        </div>   
    </>
    )
} 
    
export default Crear_Proyecto;