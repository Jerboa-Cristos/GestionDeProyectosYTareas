import { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import MenuTop from "../../Layout/Menu/MenuTop";
import MenuProductOwner from "../../Layout/Com_ProductOwner/MenuProductOwner";
import MenuProyecto from "../../Layout/Com_ProductOwner/MenuProyecto";
import Loading from '../../Layout/Loading';
import { listadoProyecto, elimimarProyecto } from "../../services/proyectoService";
import { toast } from 'react-hot-toast'

function Lista_Proyectos() {
  const token = localStorage.getItem("token")
  const [loading, setLoading] = useState(true);
  const [proyectos, setProyectos] = useState([]);
  
  useEffect(() => {
    if (!token) return;
        
    const fetchTareas = async () => {
    setLoading(true);
    listadoProyecto(token).then((res) => {
      setProyectos(res.data)
      toast.success('Proyectos cargados con exito.')
      }).catch((err) => {
        console.error("Error cargando proyectos", err)
        toast.error('No se pudo cargar la lista de proyectos.')
      }).finally(() => {
          setLoading(false);
      })}
        fetchTareas()
  }, []);
  
  const botonEliminarProyecto = (id_proyecto) => {
    const confirmar = window.confirm('Seguro quieres eliminar el proyecto?')
    if(!confirmar){
      return
    }
    elimimarProyecto(id_proyecto, token)
    .then(() => {
      setProyectos(proyectosActuales => 
        proyectosActuales.filter(proyecto => proyecto.id !== id_proyecto)
      )}).catch(error => console.error('Error al eliminar el proyecto', error))} 

  if (loading) return <Loading />

  return (
    <div className="h-screen bg-blueDark p-4 flex flex-col">
      <MenuTop rutaPerfil='/product_owner_profile'/>
      <div className="flex flex-1 gap-4 overflow-hidden flex-col md:flex-row">
        <MenuProductOwner/>
          <div className="flex-1 bg-white rounded-xl shadow-lg p-4 sm:p-8 overflow-auto pb-24">
            <div className=" flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h1 className="text-3xl font-bold text-blueDark mb-6">Mis Proyectos</h1>
                <Link to="/crear_proyecto"
                  className="bg-blueBase hover:bg-turquesa hover:text-white transition px-4 py-2 rounded-lg font-semibold text-BlueDarkDark shadow text-center">
                  + Nuevo Proyecto
                </Link>
            </div>

            {proyectos.length === 0 ? (
              <p className="text-warning italic">No hay proyectos creados aún</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-3">
                  {proyectos.map((proyecto) => (
                    <MenuProyecto
                    key={proyecto.id}
                    proyecto={proyecto}
                    botonEliminarProyecto={botonEliminarProyecto}
                    />
                  ))}
              </div>
            )}
          </div>
        </div>
    </div>
  )
}

export default Lista_Proyectos;