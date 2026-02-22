import Tarea from '../../Components/Com_Desarrollador/Tarea';

const ColumnaTareas = ({titulo, tipoEstado}) => (
    <div className='flex flex-col gap-2'>
        <div className='bg-blueDashboard rounded-xl p-6 text-white'>
            <h1 className="text-center text-2xl font-semibold">{titulo}</h1>
        </div>
        <div>
            <div className="flex flex-col gap-4">
                {
                tipoEstado.map((tarea) => (
                    <Tarea key={tarea.id} title={tarea.nombre} description={tarea.descripcion} estado={tarea.estado} fecha={tarea.fecha_fin}/>
                )) 
                }
            </div>
        </div>
    </div>
)

export default ColumnaTareas;