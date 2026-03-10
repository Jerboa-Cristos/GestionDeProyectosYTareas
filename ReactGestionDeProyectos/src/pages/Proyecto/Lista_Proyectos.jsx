import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MenuTop from "../../Components/MenuTop";
import { funcion_listado_proyecto, funcion_elimimar_proyecto } from "../../services/ruta_api_proyecto";
import Menu_Izquierdo from "../Menus/Menu_Izquierdo";
import { MoreVertical } from "lucide-react";

function Lista_Proyectos() {
  const [proyectos, setProyectos] = useState([]);
  
  useEffect(() => {
    const token = localStorage.getItem("token")
    console.log("token existe", token);
    funcion_listado_proyecto(token)
      .then((res) => {setProyectos(res.data )
        console.log('lista p', res.data)
      })
      .catch((err) => console.error("Error cargando proyectos", err));

  }, []);
  
  const botonEliminarProyecto = (id_proyecto) => {
    const token = localStorage.getItem("token")
    const confirmar = window.confirm('Seguro quieres eliminar el proyecto?')

    if(!confirmar){
      return
    }

    funcion_elimimar_proyecto(id_proyecto, token)
    .then(() => {
      setProyectos(proyectosActuales => 
        proyectosActuales.filter(proyecto => proyecto.id !== id_proyecto)
      )
    })
    .catch(error => console.error('Error al eliminar el proyecto', error))
  } 
  console.log(proyectos);

  return (
    <>
      <div className="h-screen bg-blueDark p-4 flex flex-col">
      <MenuTop rutaPerfil='/product_owner_profile'/>
      
      <div className="flex flex-1 gap-4 overflow-hidden flex-col md:flex-row">

        <div className="md:h-full md:flex">
        <Menu_Izquierdo />
        </div>

          <div className="flex-1 bg-white rounded-xl shadow-lg p-4 sm:p-8 overflow-auto pb-24">
            <div className=" flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

             
                <h1 className="text-2xl sm-text-3xl text-blueDark m-4">
                  Mis Proyectos
                </h1>

                <Link
                  to="/crear_proyecto"
                  className="bg-blueBase hover:bg-blue-300 transition px-4 py-2 rounded-lg font-semibold text-BlueDarkDark shadow text-center"
                >
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
    </>
  )
}

export default Lista_Proyectos;

const MenuProyecto = ({proyecto, botonEliminarProyecto}) => {
    const [abrirMenu, setAbrirMenu] = useState(false)
    return (
      <div className="relative bg-blueblue rounded-xl p-5 shadow hover:shadow-md hover:-translate-y-1 transition w-full flex flex-col justify-center">
        <button className="absolute top-3 right-3 p-1 hover:bg-white rounded"
        onClick={(e) => {
          e.stopPropagation()
          setAbrirMenu(!abrirMenu)
        }}
        >
          <MoreVertical size={20} className="text-white"/>

        </button>

        {abrirMenu && (
          <div className="absolute top-10 right-3 bg-white text-blueDark shadow-lg rounded-md border w-36 z-20">
            <Link
            to={`/editar_proyecto/${proyecto.id}`}
            className="block px-4 py-2 hover:bg-GreenLite"
            onClick={() => {
              setAbrirMenu(false)
            }}
            >
              Editar
            </Link>

            <button className="w-full text-left px-4 py-2 hover:bg-red-400 text-BlueDarkDark"
            onClick={() => {
              setAbrirMenu(false)
              botonEliminarProyecto(proyecto.id)
            }}
            >
              Eliminar
            </button>
          </div>
        )}

        <h2 className="font-bold text-white text-xl mb-2">{proyecto.nombre}</h2>
        <p className="text-white text-sm mb-4 line-clamp-3">{proyecto.descripcion}</p>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Link to={`/mostrar_proyecto/${proyecto.id}`}
          className="w-full bg-white text-blueDark font-semibold px-3 py-2 rounded-md shadow hover:bg-GreenLite transition text-center"
          >
            Ver Proyecto
          </Link>
          
        </div>
      </div>
    )
  }