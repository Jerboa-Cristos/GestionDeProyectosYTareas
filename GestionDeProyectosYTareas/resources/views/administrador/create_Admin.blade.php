<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión Usuarios</title>
</head>
<body>
<form method="post" action="{{ route('guardarDesarrollador') }}"> 

        @csrf
        <label for="name">Nombre:</label>
        <input type="text" name="nombre" value="{{old('nombre')}}"/>  
        <!--ponemos old porque en el caso que carguemos el formulario y diera error habría que volver a introducir todos los campos, así recuerda o guarda los campos que están bien-->
     {!! $errors->first('name', '<small>:message</small><br>' )!!}  <!-- así especificamos los errores debajo-->

        <label for="email">Email:</label>
        <input type="text" name="email" value="{{old('email')}}"/>
     {!! $errors->first('descripcion', '<small>:message</small><br>' )!!}  

        <label for="password">Password:</label>
        <input type="text" name="password" value="{{old('password')}}"/>
     {!! $errors->first('descripcion', '<small>:message</small><br>' )!!}  

    <button type="submit">Crear</button>
</form>

</body>
</html>