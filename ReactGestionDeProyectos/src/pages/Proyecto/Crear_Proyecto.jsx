import { useState } from "react";
import { funcion_crear_proyecto } from "../../services/ruta_api_proyecto";
import Menu_Izquierdo from "../Menus/Menu_Izquierdo";
import { useNavigate } from "react-router-dom";
import MenuTop from '../../Components/MenuTop'
import { Save } from "lucide-react";

function Crear_Proyecto() {
    const [esMovil, setEsMovil] = useState(false)
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
console.log('esMovil:', esMovil, 'window.innerWidth:', window.innerWidth)
    return ( 
        <>
        <div className="h-screen bg-blueDark p-4 flex flex-col">
        <MenuTop rutaPerfil='/product_owner_profile'/>

        <div className="flex flex-1 gap-4 overflow-hidden flex-col md:flex-row">

        <div className="md:h-full md:flex">
            <Menu_Izquierdo/>

        </div>
         
            <div className="flex-1 bg-white rounded-xl shadow-lg p-4 sm:p-8 overflow-auto">
            
                    <h1 className="text-3xl font-bold text-BlueDarkDark mb-4">Crear Proyecto</h1>


                    <form 
                    method="post" 
                    className="bg-blueDashboard rounded-lg p-6"
                    onSubmit={botonGuardarProyecto}
                    >
                        <h1 className="text-[1.2em] font-bold text-white mb-6">
                            Crear de Proyecto
                        </h1>   
                        <div className="">
                            
                            <label className="font-bold text-white">Nombre del Proyecto*</label>
                            <input
                            onChange={e => setDatosForm({
                                ...datosForm, 
                                nombre: e.target.value
                            })} 
                            type="text" 
                            name="nombre" 
                            required className="border border-gray-300 rounded-md focus:border-blue-300 outline-none focus:ring focus:ring-blue-300 w-full mt-3 mb-3 bg-blueBase p-1"
                            placeholder="Escribe el nombre aqui"
                            /> 
                        </div>
                        
                        <div>
                            <label type="text" name="descripcion" className="font-bold text-white">Descripción del proyecto</label>
                            <textarea
                            onChange={e => setDatosForm({
                                ...datosForm,
                                descripcion: e.target.value
                            })} 
                            name="descripcion" 
                            placeholder="Escribe la descripción aquí" 
                            className="border border-gray-300 rounded-md w-full focus:border-blue-500 outline-none focus:ring focus:ring-blue-300 mt-3 p-1  bg-blueBase">

                            </textarea>
                        </div>

                        <div>
                            <label className="font-bold text-white">Fecha final </label>
                            <input
                            onChange = {e => setDatosForm({
                                ...datosForm,
                                fecha_fin: e.target.value
                            })} 
                            type="date" 
                            name="fecha_fin" 
                            className="mt-3 text-white"/>
                        </div>

                        <div className="flex justify-end">
                            <button
                            className="text-blueDark bg-blueBase hover:bg-green-300 font-bold my-10 py-2 px-4 rounded-lg  items-center gap-2"
                            >
                                
                            <Save size={23} />
                            Guardar 
                            
                            </button>

                        </div>
                    

                        </form>
                

                </div>
            
            </div>
        </div>
           
              
        
    </>
    )
} 
    
export default Crear_Proyecto;