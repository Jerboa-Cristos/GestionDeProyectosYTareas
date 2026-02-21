import { useNavigate } from 'react-router-dom';
import { mostrarMisTareas } from '../../services/desarolladorService'
import { ClipboardList, Calendar, AlertCircle } from 'lucide-react';
//Para instalar este modulo se debe hacer npm install recharts
import { BarChart, Bar, ResponsiveContainer, Pie, PieChart, Legend } from 'recharts';
import { useEffect, useState, useMemo } from 'react';
import MenuTop from '../../Components/MenuTop';
import MenuLateralDesarrollador from '../../Components/Com_Desarrollador/MenuLateralDesarrollador';

function DashboardDesarrollador() {
    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate();
    const [tareas, setTareas] = useState([]);

    //Pillo todas las tareas para la página
    useEffect(() => {
        const fetchTarea = async () => {
            mostrarMisTareas(1).then(res=> {
                setTareas(res.data);
            }).catch(err=>{
                console.error('Error al cargar las tareas:', err)
            });
        }
        fetchTarea();
    }, [])

    //#region NAVIGACIÓN A OTRAS PÁGINAS
    function gotoTareas() {
        navigate('/MisTareasDesarrollador');
    }
    //#endregion

//#region FUNCIONES DEL DASHBOARD

    //#region TAREAS ASIGNADAS Y DEADLINE
    const tareasDeadline = tareas.filter(tarea=> {
        const fechaLimiteTarea = new Date(tarea.fecha_fin)
        const fechaActual = new Date()
        const diasRestantes = Math.abs((fechaLimiteTarea - fechaActual) / 86400000)
        return diasRestantes > 0 && diasRestantes <= 4
    }).length
    //#endregion

    //#region ULTIMOS CAMBIOS
    const UltCambios = tareas.filter(tarea => {
        const updatesTarea = new Date(tarea.updated_at)
        const fechaActual = new Date()
        const diasDeLosCambios = Math.abs((updatesTarea - fechaActual) / 86400000)
        return diasDeLosCambios <= 2
    })
    //#endregion

    //#region GRÁFICOS RESUMEN ESTADO
    const grfResumenEstado = useMemo(() => {
        const arrEstados = {}

        tareas.forEach(tarea => {
            const estados = tarea.estado
            arrEstados[estados] = (arrEstados[estados] || 0) + 1
        })

        return Object.keys(arrEstados).map(key=> ({
            tipo: key,
            cantidad: arrEstados[key]
        }))
    }, [tareas])

    //#endregion

    //#region GRÁFICOS TIPO TRABAJO
    const grfTipoTrabajo = useMemo(() => {
        const arrtipo = {}

        tareas.forEach(tarea => {
            const tipo = tarea.tipo
            arrtipo[tipo] = (arrtipo[tipo] || 0) + 1
        })

        return Object.keys(arrtipo).map(key=> ({
            tipo: key,
            cantidad: arrtipo[key]
        }))
    }, [tareas])
    //#endregion

//#endregion


    return(
        <div className="min-h-screen bg-blueDark p-4 flex flex-col font-sans">
            <MenuTop rutaLogin='/desarrollador_login' rutaPerfil='/desarrollador_profile'/>
            <div className="flex flex-1 gap-4 overflow-hidden h-full">
                <MenuLateralDesarrollador/>
                <main className="flex-1 bg-white rounded-xl shadow-lg p-8 overflow-auto flex flex-col gap-6">
                    <h1 className="text-3xl font-bold text-blueDark mb-6">Dashboard</h1>

                    {/* Grid Principal */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-6">
                        {/* Tarjetas de Tareas */}
                        <div className="grid grid-cols-1 gap-4">
                            {/* Tareas Asignadas */}
                            <button 
                            onClick={gotoTareas} 
                            className="bg-blueDashboard rounded-xl p-6 flex items-center justify-between text-white hover:shadow-lg hover:bg-blueblue transition-all" 
                            >
                                <div className="flex items-center gap-4">
                                    <ClipboardList size={80} />
                                    <span className="text-xl font-semibold leading-tight">Tareas Asignadas</span>
                                </div>
                                <span className="text-4xl font-bold">{tareas.length}</span>
                            </button>

                            {/* Tareas Deadline */}
                            <button onClick={gotoTareas} 
                            className={"bg-warning rounded-xl p-6 flex items-center justify-between text-white relative hover:shadow-lg hover:bg-warningDark transition-all"}>
                            <div className="flex items-center gap-4">
                                <Calendar size={60} />
                                <span className="text-xl font-semibold leading-tight">Tareas Asignadas Deadline</span>
                            </div>
                            <span className="text-4xl font-bold mr-4">{tareasDeadline}</span>
                            <AlertCircle className="absolute bottom-4 right-4 text-warningDark bg-white rounded-full" size={30} />
                            </button>
                        </div>

                        {/* Tipo de Trabajo MONTARLO TODO */}
                        <div className="bg-blueBase rounded-xl p-6">
                            <h3 className="text-center text-xl font-semibold text-blueDark mb-4">Tipo de trabajo</h3>
                            <div className="space-y-1 size-20">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={grfTipoTrabajo} layout='horizontal'>
                                        <Bar dataKey='cantidad' fill='#184E77'/>
                                        <legend payload={
                                            grfTipoTrabajo.map((tarea, index) => ({
                                                value: tarea.tipo,
                                                type: 'circle',
                                            }))
                                        }/>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Últimos Cambios */}
                        <div className="bg-blueBase rounded-xl p-6 shadow-sm">
                            <h3 className="text-center text-xl font-semibold text-blueDark mb-6">Últimos Cambios</h3>
                            <div className="space-y-3">
                            {UltCambios.slice(0, 3).map((tarea) => (
                                <div key={tarea.id} className="bg-turquesa rounded-lg p-3 flex items-center gap-4 text-white text-sm">
                                {/*Aquí debe estar la imagen del usuario*/}
                                    <div className="grid grid-cols-3 w-full text-center">
                                        <span>Nombre Usuario</span>
                                        <span>{tarea.nombre}</span>
                                        <span>{tarea.estado}</span>
                                        <span>{tarea.fecha_fin}</span>
                                    </div>
                                </div>
                            ))}
                            </div>
                        </div>

                        {/* Resumen del Estado (Gráfico Circular) */}
                        <div className="bg-blueBase rounded-xl p-6 shadow-sm flex flex-col items-center">
                            <h3 className="text-xl font-semibold text-blueDark mb-6">Resumen del Estado</h3>
                            <div className="relative w-48 h-48">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={grfResumenEstado} dataKey='cantidad' fill='#184E77'/>
                                        <legend payload={
                                            grfResumenEstado.map((tarea, index) => ({
                                                value: tarea.estado,
                                                type: 'circle',
                                            }))
                                        }/>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>    
            </main>
            </div>
        </div>    
    )
}

export default DashboardDesarrollador