<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Formulario Proyecto</title>
</head>
<body>

    <h1>Formulario de creación de proyecto</h1>
    <form action='{{ route("guardar") }}' method="POST">
        @csrf
        <label>Nombre del Proyecto:</label>
        <input type="text" name="nombre" id="nombre" required>
        <br>
        <label>Descripción:</label>
        <textarea name="descripcion" id="descripcion" required></textarea>
        <br>
        <label>Fecha de inicio:</label>
        <input type="date" name="fecha_inicio" id="fecha_inicio" >
        <br>
        <label>Fecha de final:</label>
        <input type="date" name="fecha_fin" id="fecha_fin" >
        <br>
        <button type="submit">Crear Proyecto</button>
    </form>
</body>
</html>
