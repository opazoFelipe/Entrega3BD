<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="../controladores/asignatura/controladorAsignaturas.js"></script>
    <style>
        #divTablaBuscar
        {
            float: left;
            border-style: solid;
            width: 500px;
            height: 400px;
        }
        #divTablaActualAsociados
        {
            float: left;
            border-style: solid;
            width: 500px;
            height: 400px;
        }
    </style>
    <title>Aplicacion BD</title>
</head>
<body>
    <div id="divBuscarAsignatura">
        <form id="buscarAsignatura">
            <label for="buscarAsignatura">Asignaturas</label>
            <input type="text" name="buscarAsignatura" placeholder="buscarAsignatura">
        </form>
    </div>
    <div id="divTablaAsignaturas">
    </div>
    <div id="divTablaAsociar">

        <div id="divTablaBuscar">
            Alumnos no Asociados
        <br>
        </div>
       
        <div id="divTablaActualAsociados">
            Alumnos Asociados
        <br>
        </div>
    </div>
    
</body>
</html>