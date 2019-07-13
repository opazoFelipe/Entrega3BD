<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/bodyStyle.css">
    <link rel="stylesheet" href="css/navStyle.css">
    <script src="../controladores/consultasE2/showQueries.js"></script>
    <script src="../controladores/asignatura/showAsig.js"></script>
    <title>Aplicacion BD</title>
</head>
<body>
    <div id="header">
        <p>Aplicacion Entrega 3 Base de Datos</p>
        <p style="margin:-1.5% 0;">Felipe Opazo Rivas</p>
    </div>
    <div id="nav">
        <ul>
            <li>Asignaturas
                <ul>
                    <li>Agregar Asignatura</a></li>
                    <li>Modificar Asignatura</a></li>
                    <li>Eliminar Asignatura</a></li>
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
    <div id="body">
        
    </div>
    <div id="footer"></div>
</body>
</html>