import { useState } from "react"
import { funcion_crear_sprint } from "../../services/ruta_api_sprint"
import { useNavigate, useParams } from "react-router-dom"


function Crear_Sprint () {
    const [nombre, setNombre] = useState('')
    const [meta, setMeta] = useState('')
    const [fechaInicio, setFechaInicio] = useState('')
    const [fechaFin, setFechaFin] = useState('')
    const {id_proyecto} = useParams()
    const navigate = useNavigate()

        const botonGuardarSprint = (e) => {
            e.preventDefault()

            const token = localStorage.getItem('token')
            const data = {
                nombre, 
                meta_sprint: meta, 
                fecha_inicio: fechaInicio, 
                fecha_fin: fechaFin
            }
            funcion_crear_sprint(data, id_proyecto, token)
            .then(respuesta => {
                console.log('sprint creado', respuesta.data)
                console.log('datos enviados')
                navigate(`/mostrar_proyecto/${id_proyecto}`)
            })
            .catch(error => {
                console.log('Error al crear sprint', error.respuesta.data)
            })

        }
    

    return (
    <>    
    <h1>Product Backlog</h1>
    <form onSubmit={botonGuardarSprint}>
        <div className="flex flex-col border border-GreenLite m-3 p-3 rounded">
            <h2>Crear Sprint</h2>
            <label>Título</label>
            <input
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)}
            type="text" 
            className="border border-BlueBaseDark"
            required 
            />

            <label>Meta del Sprint</label>
            <textarea
            value={meta}
            onChange={(e) => setMeta(e.target.value)} 
            name="meta_sprint" 
            placeholder="Escribe la meta del sprint">
            </textarea>

            <label>Fecha de inicio</label>
            <input 
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            name="fecha_inicio"  
            type="date" 
            className="border border-BlueBaseDark"
            required
            />

            <label>Fecha de finalización</label>
            <input 
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            type="date" 
            name="fecha_fin"  
            className="border border-BlueBaseDark"/>

            <button
            >Guardar</button>
        </div>

    </form>   
    </>

    )
}

export default Crear_Sprint

























