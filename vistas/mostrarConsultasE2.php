<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/estilosAsignatura.css">
    <link rel="stylesheet" href="css/estilosConsultasE2.css">
    <script src="../controladores/consultasE2/mostrarConsultas.js"></script>
    <script src="../controladores/ajax.js"></script>
    <title>Consultas Entrega 2</title>
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

        <div id="listaConsultas">
            <button id="1" onclick="mostrarConsulta1()" class="listaBotones">VER CONSULTA 1</button>
            <button id="2" onclick="mostrarConsulta2()" class="listaBotones">VER CONSULTA 2</button>
            <button id="3" onclick="mostrarConsulta3()" class="listaBotones">VER CONSULTA 3</button>
            <button id="4" onclick="mostrarConsulta4()" class="listaBotones">VER CONSULTA 4</button>
            <button id="5" onclick="mostrarConsulta5()" class="listaBotones">VER CONSULTA 5</button>
            <button id="6" onclick="mostrarConsulta6()" class="listaBotones">VER CONSULTA 6</button>
        </div>

        <div id="pantallazos">
            <div id="divPantallazo"></div>   
            <div id="divTablaConsulta"></div>
        </div>
    </div>
</body>
</html>