<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>

    <h1>Listado de todos los proyectos</h1>
    <div>
        <nav>
            <a href='{{ route("cargarFormulario") }}'>Crear Proyecto</a>
            <table border="1">
                <tr>
                    <th>ID</th>
                    <th>Nombre del Proyecto</th>
                    <th>Descripción</th>
                    <th>Fecha de inicio</th>
                    <th>Fecha de final</th>
                </tr>
                <tr>
                    @foreach ( $listado_proyectos as $proyecto)
                     <td>{{ $proyecto->id}}</td>
                     <td>{{ $proyecto->nombre_proyecto}}</td>
                     <td>{{ $proyecto->descripcion}}</td>
                     <td>{{ $proyecto->fecha_inicio}}</td>
                     <td>{{ $proyecto->fecha_final}}</td>

                    @endforeach
                </tr>
        </nav>
    </div>
</body>
</html>
