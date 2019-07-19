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
        #parrafoNombreAsignatura
        {
            margin-top: -15px;
            margin-bottom: -15px;
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
        <div id="infoTablaAsociar"></div>
            Alumnos No Asociados
        <br>
        </div>
       
        <div id="divTablaActualAsociados">
        <div id="infoTablaAsociados"></div>
        <br>
        </div>
    </div>
    
</body>
</html>