//Code
import { useEffect, useState, useMemo } from "react"
import { listadoTareasProductOwner } from "../../services/tareaService"
//Visual components
import MenuTop  from '../../Layout/Menu/MenuTop'
import MenuProductOwner from '../../Layout/Com_ProductOwner/MenuProductOwner'
import Loading from '../../Layout/Loading';
import { ClipboardList ,Calendar, AlertCircle } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Pie, PieChart, Legend } from 'recharts';


function ProductOwnerDashboard () {
    const token = localStorage.getItem('token')
    const [tareas, setTareas] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        listadoTareasProductOwner( token)
        .then(res => {
            setTareas(res.data)
            setLoading(false)
        })
        .catch(error => {
            console.log('Error al cargar tareas', error)
        })
    }, [])

//#region FUNCIONES DEL DASHBOARD
    //#region TAREAS DEADLINE
    const tareasDeadline = tareas.filter(tarea => {
        const fechaFin = new Date(tarea.fecha_fin)
        const fechaActual = new Date()
        const diferenciaFecha = Math.abs((fechaFin - fechaActual) / 86400000);
        return diferenciaFecha > 0 && diferenciaFecha <= 4;
    })
    //#endregion

    //#region GRÁFICOS RESUMEN ESTADO
    const COLORS_BAR = ['#34A0A4', '#184E77', '#1A759F', '#168AAD']
    const grfResumenEstado = useMemo(() => {
        const arrEstados = {}

        tareas.forEach(tarea => {
            const estados = tarea.estado
            arrEstados[estados] = (arrEstados[estados] || 0) + 1
        })

        return Object.keys(arrEstados).map((key, i)=> ({
            estados: key,
            cantidad: arrEstados[key],
            fill: COLORS_BAR[i % COLORS_BAR.length]
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

        return Object.keys(arrtipo).map((key, i)=> ({
            tipo: key,
            cantidad: arrtipo[key],
            fill: COLORS_BAR[i % COLORS_BAR.length]
        }))
    }, [tareas])
    //#endregion

//#endregion

    if (loading) return <Loading />

    return (
        <div className="min-h-screen bg-blueDark p-2 md:p-4 flex flex-col font-sans">
            <MenuTop rutaPerfil='/product_owner_profile'/>
            <div className="flex flex-1 gap-4 overflow-hidden h-full pb-20 lg:pb-0">
                <MenuProductOwner/>
                <main className="flex-1 bg-white rounded-xl shadow-lg p-4 lg:p-8 overflow-y-auto flex flex-col gap-6">
                    <h1 className="text-2xl lg:text-3xl font-bold text-blueDark mb-2 lg:mb-6 text-center lg:text-left">Dashboard</h1>

                    {/* Grid Principal */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-5">
                        {/* Tarjetas de Tareas */}
                        <div className="grid grid-cols-1 gap-4">
                            {/* Tareas Asignadas */}
                            <button 
                            className="bg-blueDashboard rounded-xl p-6 flex items-center justify-between text-white 
                            hover:shadow-lg hover:bg-blueblue transition-all">
                                <div className="flex items-center gap-4">
                                    <ClipboardList className="w-12 h-12 md:w-20 md:h-20" />
                                    <span className="text-xl font-semibold leading-tight">Tareas </span>
                                </div>
                                <span className="text-4xl font-bold">{tareas.length}</span>
                            </button>
                            {/* Tareas Deadline */}
                            <button  
                            className={"bg-warning rounded-xl p-6 flex items-center justify-between text-white relative hover:shadow-lg hover:bg-warningDark transition-all"}>
                            <div className="flex items-center gap-4">
                                <Calendar className="w-10 h-10 md:w-16 md:h-16" />
                                <span className="text-xl font-semibold leading-tight">Tareas Deadline</span>
                            </div>
                            <span className="text-4xl font-bold mr-4">{tareasDeadline.length}</span>
                            <AlertCircle className="absolute bottom-4 right-4 text-warningDark bg-white rounded-full" size={30} />
                            </button>
                        </div>

                        {/* Tipo de Trabajo MONTARLO TODO */}
                        <div className="bg-blueBase rounded-xl p-4 lg:p-7 flex flex-col items-center">
                            <h3 className="text-center text-lg lg:text-xl font-semibold text-blueDark mb-4">Tipo de trabajo</h3>
                            <div className="w-full h-64 max-w-xs lg:max-w-none">
                                <ResponsiveContainer width="100%" height="100%" margin={{ left: 40, right: 20 }}>
                                    <BarChart data={grfTipoTrabajo} layout='vertical'>
                                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                                        <XAxis type="number" hide /> 
                                        <YAxis 
                                            dataKey="tipo" 
                                            type="category" 
                                            tick={{fontSize: 12, fontWeight: 'bold', fill:'#0B4068'}}
                                            width={100}
                                        />
                                        <Bar dataKey='cantidad' radius={[0, 5, 5, 0]} barSize={20}/>
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
                            {tareas.slice(0, 3).map((tarea) => (
                                <div key={tarea.id} className="bg-turquesa rounded-lg p-3 flex items-center gap-4 text-white text-sm">
                                
                                    <div className="grid grid-cols-2 sm:grid-cols-4 w-full text-center text-xs sm:text-sm">
                                        <span>{tarea.nombre}</span>
                                        <span>{tarea.tipo}</span>
                                        <span>{tarea.estado}</span>
                                        <span>{tarea.fecha_fin}</span>
                                    </div>
                                </div>
                            ))}
                            </div>
                        </div>

                        {/* Resumen del Estado (Gráfico Circular) */}
                        <div className="bg-blueBase rounded-xl p-4 lg:p-6 shadow-sm flex flex-col items-center">
                            <h3 className="text-lg lg:text-xl font-semibold text-blueDark mb-6">Resumen del Estado</h3>
                            <div className="w-full h-64 max-w-xs">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie 
                                        data={grfResumenEstado} 
                                        dataKey='cantidad'
                                        nameKey='estados'
                                        cx="50%"
                                        cy="45%"
                                        outerRadius={80}
                                        stroke="none"
                                        />
                                        <Tooltip />
                                        <Legend 
                                            verticalAlign="bottom" 
                                            iconType="circle"
                                            formatter={(value) => <span className="text-sm font-semibold">{value}</span>}
                                        />
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

export default ProductOwnerDashboard