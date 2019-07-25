<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/estilosAsignatura.css">
    <link rel="stylesheet" href="css/estilosAsignar.css">
    <link rel="stylesheet" href="css/estilosMantenedor.css">
    <script src="../controladores/scriptPantallaHome.js"></script>
    <script src="../controladores/asignatura/controladorPrincipal.js"></script>
    <script src="../controladores/asignatura/mantenedoresAsignatura.js"></script>
    <script src="../controladores/ajax.js"></script>
    <script src="../controladores/asignatura/controladorAlumnos.js"></script>
    <script src="../controladores/asignatura/controladorCursos.js"></script>
    <script src="../controladores/asignatura/controladorProfesores.js"></script>
    <script src="../controladores/asignatura/controladorBloques.js"></script>
    <script src="../controladores/asignatura/variablesGlobales.js"></script>
    <title>Aplicacion BD</title>
</head>
<body>
    <div id="contenedorPrincipal">
        <div id="divMenu">
                <nav id="menu">
                    <ul>
                        <li><a href="mostrarAsignaturas.php">VER ASIGNATURAS</a></li>
                        <li><a href="mostrarConsultasE2.php">CONSULTAS ENTREGA 2</a></li>
                    </ul>
                </nav>
            </div>
        <div id="divDatos">
            <div id="tituloPrincipal"></div>
            <div id="divBuscarAsignatura"></div>
            <div id="divTablaAsignaturas" style="z-index: 0;"></div>

            <div id="tituloAsignatura"></div> <!--Aqui va el nombre de la asignatura seleccionada y la cantidad de asociados-->

            <div id="divTablaAsociar">

                <div id="divNoAsociados"> 
                    <div id="divInfoTablaNoAsociados"></div> <!--Aqui va el titulo de la tabla (Alumnos no asociados)-->
                    
                    <div id="divBuscadorNoAsociados">
                        <div id="buscadorNoAso"></div> <!--Aqui va el buscador y el boton limpiar-->
                    </div> 
                    
                    <div id="divTablaNoAsociados"></div> <!--Aqui va la tabla de registros encontrados-->
                </div>

                <div id="divAsociados">
                    <div id="divInfoTablaAsociados"></div> <!--Aqui va el titulo de la tabla (Alumnos Asociados)-->
                    
                    <div id="divBuscadorAsociados">
                        <div id="buscadorAso"></div>   <!--Aqui va el buscador y el boton ver todos--> 
            
                    </div> 

                    <div id="divTablaAsociados"></div> <!--Aqui va la tabla de registros encontrados-->
                </div>
            </div>

            <div id="divIngresarAsignatura">
                <div id="divFormularioIngresar"></div>
                <div id="divBuscarProfesor">
                    <div id="divBuscadorProfesor"></div>
                    <div id="divTablaProfesores"></div>    
                </div>
            </div>

            <div id="divMantenedorAsignatura">
                <div id="divFormularioModificar"></div>
            </div>
        </div>
    </div>
</body>
</html>