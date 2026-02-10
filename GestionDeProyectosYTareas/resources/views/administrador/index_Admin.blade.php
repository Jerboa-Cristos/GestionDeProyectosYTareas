<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Index_Admin</title>
</head>
<body>
    <h1>Botón para añadir usuarios</h1>
    <div>
        <form action="{{ route('crear_users')}}" method="post">
            @csrf
            @method('GET')
            <button type="submit">Crear Usuario</button>
        </form>
    </div>


    <h1>Listado de Desarrolladores</h1>
    <ul>
    @forelse ($desarrolladores as $persona)
    <li> 
        <div>
        {{$persona->nombre}} - {{$persona->email}} - {{$persona->id_proyecto}} 

        <div>
        <form action="{{ route('editDesarrollador', $persona->id)}}" method="post">
            @csrf
            @method('PATCH')
            <button type="submit">Editar</button>
        </form>
        </div>
        <div>
        <form action="{{ route('showDesarrollador', $persona->id)}}" method="post">
            @csrf
            @method('GET')
            <button type="submit">Perfil</button>
        </form>
        </div>
        <div>
        <form action="{{ route('eliminarDesarrollador', $persona->id)}}" method="post">
            @csrf
            @method('DELETE')
            <button type="submit">Eliminar</button>
        </form>
        </div>
        </div>
    </li>
@empty
   <li>NO HAY NADA </li>
@endforelse
    </ul>

    <h1>Listado de Product Owners</h1>
    <ul>
    @forelse ($product_owners as $persona)
    <li> 
        {{$persona->nombre}} {{$persona->email}} {{$persona->id_proyecto}} 
    </li>
@empty
   <li>NO HAY NADA </li>
@endforelse
    </ul>

        <h1>Listado de Administrador</h1>
    <ul>
    @forelse ($administradores as $persona)
    <li> 
        {{$persona->nombre}} {{$persona->email}} 
    </li>
@empty
   <li>NO HAY NADA </li>
@endforelse
    </ul>

</body>
</html>