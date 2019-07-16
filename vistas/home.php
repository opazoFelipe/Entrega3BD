<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/bodyStyle.css">
    <link rel="stylesheet" href="css/navStyle.css">
    <link rel="stylesheet" href="css/tablas.css">
    <script src="../controladores/consultasE2/showQueries.js"></script>
    <script src="../controladores/asignatura/showAsig.js"></script>
    <title>Aplicacion BD</title>
</head>
<body>
    <div id="nav">
        <ul>
            <li>Asignaturas
                <ul>
                    <li>Ver Asignaturas</a></li>
                </ul>
            </li>
        </ul>
        <ul>
            <li>Consultas E2
                <ul>
                    <li onclick="mostrarAsignaturas()">Ver Consulta 1</li>
                    <li onclick="alerta()">Ver Consulta 2</li>
                    <li onclick="alerta()">Ver Consulta 3</li>
                    <li onclick="alerta()">Ver Consulta 4</li>
                    <li onclick="alerta()">Ver Consulta 5</li>
                    <li onclick="alerta()">Ver Consulta 6</li>
                </ul>
            </li>
        </ul>
    </div>
    <div id="divTablaAsignaturas">
    </div>
    <div id="tablaAsociar"></div>
</body>
</html>