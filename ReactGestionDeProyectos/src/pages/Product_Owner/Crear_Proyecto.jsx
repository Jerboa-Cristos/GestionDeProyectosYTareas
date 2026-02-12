
function Crear_Proyecto() {
    
    return ( 
    
    <div> 
        
        <h1>Crear Proyecto</h1> 
    
        <form method="post">
            <label>Nombre del Proyecto:</label>
            <input type="text" name="nombre_proyecto" required />
            <label>Descripcion del proyecto</label>
            <textarea name="descripcion_proyecto"></textarea>


        </form>
    
    </div> ); 
    
} 
    
export default Crear_Proyecto;