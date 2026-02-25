import { useEffect, useState } from "react"
import MenuTop from "../../Components/MenuTop"
import Menu_Izquierdo from "../Menus/Menu_Izquierdo"
import { Save } from "lucide-react"
import { useParams, useNavigate } from "react-router-dom"
import { funcion_actualizar_sprint, funcion_mostrar_sprint } from "../../services/ruta_api_sprint"

function Editar_Sprint (){
    const [nombre, setNombre] = useState('')
    const [meta_sprint, setMetaSprint] = useState('')
    const [fechaInicio, setFechaInicio] = useState('')
    const [fechaFin, setFechaFin] = useState('')
    const {id_proyecto, id_sprint} = useParams()
    
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')

        funcion_mostrar_sprint(id_proyecto, id_sprint, token)
        .then(respuesta => {
            const sprint = respuesta.data
            setNombre(sprint.nombre)
            setMetaSprint(sprint.meta_sprint)
            setFechaInicio(sprint.fecha_inicio?.split('')[0] || '')
            setFechaFin(sprint.fecha_fin?.split('')[0] || '')

        })
        .catch(error => console.log('Error al cargar el sprint', error))

        

    }, [id_proyecto, id_sprint])


    const botonEditarSprint = (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        const data = {
            nombre, meta_sprint, fecha_inicio: fechaInicio, fecha_fin: fechaFin
        }

        funcion_actualizar_sprint(id_proyecto, id_sprint , data, token)
        .then(respuesta => {
            console.log('se ha actualizado el sprint', respuesta.data)
            navigate(`/mostrar_proyecto/${id_proyecto}`)
        })
        .catch(error => {
            console.log('Error al editar sprint', error)
        })
    }


    return(

        <>
        <MenuTop rutaPerfil='/product_owner_profile'/>  
    <div className="flex">
        <Menu_Izquierdo/>

        <div className="w-full p-6 min-h-screen">
            <div className="bg-white rounded-xl p-8 h-auto">

                <form onSubmit={botonEditarSprint}>
                    <div className="bg-blueDashboard rounded-lg p-6">
                        <h2 className="font-bold text-white mb-4 text-[1.2em]">Editar Sprint</h2>
                        
                        <label className="font-semibold text-white mt-4 block">Nombre</label>
                        <input
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)}
                        type="text" 
                        className="w-full rounded px-3 py-2 mt-1 bg-blueBase border border-BlueBaseDark"
                        required
                        placeholder="Escribe el nombre del sprint aquí" 
                        />

                        <label className="font-semibold text-white mt-4 block">Meta del Sprint</label>
                        <textarea
                        value={meta_sprint}
                        onChange={(e) => setMetaSprint(e.target.value)} 
                        name="meta_sprint" 
                        placeholder="Escribe la meta del sprint"
                        className=" w-full rounded px-3 py-2 mt-1 h-24 bg-blueBase"
                        >
                        
                        </textarea>

                        <label className="font-semibold text-white mt-4 block">Fecha Inicio</label>
                        <input 
                        value={fechaInicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                        type="date" 
                        name="fecha_inicio"  
                        className="rounded-lg px-4 py-2 bg-blueBase mt-1 text-blueDark"/>

                        <label className="font-semibold text-white mt-4 block">Fecha de finalización</label>
                        <input 
                        value={fechaFin}
                        onChange={(e) => setFechaFin(e.target.value)}
                        type="date" 
                        name="fecha_fin"  
                        className="rounded-lg px-4 py-2 bg-blueBase mt-1 text-blueDark"/>
                        
              

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


export default Editar_Sprint