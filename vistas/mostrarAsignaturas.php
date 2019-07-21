<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="../controladores/asignatura/controladorPrincipal.js"></script>
    <script src="../controladores/asignatura/ajax.js"></script>
    <script src="../controladores/asignatura/controladorAlumnos.js"></script>
    <script src="../controladores/asignatura/controladorCursos.js"></script>
    <script src="../controladores/asignatura/controladorProfesores.js"></script>
    <script src="../controladores/asignatura/variablesGlobales.js"></script>
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

    </div>
    
    <div id="divTablaAsignaturas">
    </div>

    <div id="tituloAsignatura"></div> <!--Aqui va el nombre de la asignatura seleccionada y la cantidad de asociados-->

    <div id="divTablaAsociar" style="border-style: solid;">

        <div id="divNoAsociados"> 
            <div id="divInfoTablaNoAsociados"></div> <!--Aqui va el titulo de la tabla (Alumnos no asociados)-->
            <div id="divBuscadorNoAsociados"></div> <!--Aqui va el buscador y el boton limpiar-->
            <div id="divTablaNoAsociados"></div> <!--Aqui va la tabla de registros encontrados-->
        </div>

        <div id="divAsociados">
            <div id="divInfoTablaAsociados"></div> <!--Aqui va el titulo de la tabla (Alumnos Asociados)-->
            <div id="divBuscadorAsociados"></div> <!--Aqui va el buscador y el boton ver todos-->
            <div id="divTablaAsociados"></div> <!--Aqui va la tabla de registros encontrados-->
        </div>
    </div>
    
</body>
</html>