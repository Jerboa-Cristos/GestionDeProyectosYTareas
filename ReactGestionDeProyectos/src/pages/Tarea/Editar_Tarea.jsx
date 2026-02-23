import { useState } from "react"
import MenuTop from "../../Components/MenuTop"
import Menu_Izquierdo from "../Menus/Menu_Izquierdo"
import { Save } from "lucide-react"
import { funcion_actualizar_tarea } from "../../services/ruta_api_tarea"
import { useParams, useNavigate } from "react-router-dom"

function Editar_Tarea (){
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [estado, setEstado] = useState('')
    const id_sprint = useParams()
    const id_tarea = useParams()

    const botonEditarTarea = (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        const data = {
            nombre, descripcion
        }

        funcion_actualizar_tarea(id_sprint, id_tarea, data, token)
        .then(respuesta => {
            console.log('se ha actualizado la tarea', respuesta.data)
            navigate('/mis_tareas_product_owner')
        })
        .catch(error => {
            console.log('Error al editar tarea', error)
        })
    }


    return(

        <>
        <MenuTop/>  
    <div className="flex">
        <Menu_Izquierdo/>

        <div className="w-full p-6 min-h-screen">
            <div className="bg-white rounded-xl p-8 h-auto">

                <form onSubmit={botonEditarTarea}>
                    <div className="bg-blueDashboard rounded-lg p-6">
                        <h2 className="font-bold text-white mb-4 text-[1.2em]">Editar Tarea</h2>
                        
                        <label className="font-semibold text-white mt-4 block">Nombre</label>
                        <input
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)}
                        type="text" 
                        className="w-full rounded px-3 py-2 mt-1 bg-blueBase border border-BlueBaseDark"
                        required
                        placeholder="Escribe el nombre de la tarea aquí" 
                        />

                        <label className="font-semibold text-white mt-4 block">Descripción</label>
                        <textarea
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)} 
                        name="descripcion" 
                        placeholder="Escribe la descripcion"
                        className=" w-full rounded px-3 py-2 mt-1 h-24 bg-blueBase"
                        >
                        
                        </textarea>

                        <label className="block text-white font-semibold">Estado</label>
                        <select  
                        onChange={(e) => setEstado(e.target.value)}

                        className="rounded  bg-blueBase px-3 py-2 w-60 mt-1 text-BlueDarkDark">
                            <option value="">Por Hacer</option>
                            <option value="">En Curso</option>
                            <option value="">En Revisión</option>
                            <option value="">Finalizado</option>
                        </select>
                       


                        <div className="flex justify-end">
                        <button
                        className="bg-blueBase text-blueDark font-bold px-6 py-2 mt-6 rounded-lg hover:bg-GreenLite transition flex items-center gap-2"
                        >
                        <Save size={23} />
                        Guardar cambios
                        
                        </button>

                        </div>
                    </div>

                </form>   
            </div>
        </div>
    </div>
        
        
        </>
    )
}


export default Editar_Tarea