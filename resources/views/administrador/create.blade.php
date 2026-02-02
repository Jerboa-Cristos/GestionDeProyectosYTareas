<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión Usuarios</title>
</head>
<body>
    @forelse ($desarrolladores as $persona)
    <li>
        {{$persona->nombre} {$persona->email}}
    </li>
    @empty
        <li>No hay nada</li>
    @endforelse
</body>
</html>