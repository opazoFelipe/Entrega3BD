window.onload=mostrarTablaAsignaturas;


function mostrarTablaAsignaturas()
{
    tablaNoAsociadosPrincipal=true;
    //Llamada Ajax
    var peticionHTTP;
   
    if(window.XMLHttpRequest)
        peticionHTTP=new XMLHttpRequest();
    else
        peticionHTTP=new ActiveObject("Microsoft.XMLHTTP");
 
    peticionHTTP.onreadystatechange=funcionActuadora;
    peticionHTTP.open("POST", "../modelo/asignatura/obtenerAsignaturas.php", true);
    peticionHTTP.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    peticionHTTP.send(null); //No envian datos al servidor

    function funcionActuadora()
    {
        if(peticionHTTP.readyState==4 && peticionHTTP.status==200)
        {
            //se espera una tabla asignaturas registradas
            var respuesta=peticionHTTP.responseText;
            document.getElementById("divTablaAsignaturas").innerHTML=respuesta;
            }
        }
}

function modificarAsignatura(codigoAsignatura)
{
    codigoAsignaturaSeleccionada=codigoAsignatura;
    alert("Esta es la funcion modificar asignatura");
}
function eliminarAsignatura(codigoAsignatura)
{
    codigoAsignaturaSeleccionada=codigoAsignatura;
    alert("Esta es la funcion eliminar asignatura");
}
function asignarAlumno(codigoAsignatura, nombreAsignatura)
{
    codigoAsignaturaSeleccionada=codigoAsignatura;
    nombreAsignaturaSeleccionada=nombreAsignatura;
    iniciarAlumnos();
    // 
}
function asignarProfesor(codigoAsignatura, nombreAsignatura)
{
    codigoAsignaturaSeleccionada=codigoAsignatura;
    nombreAsignaturaSeleccionada=nombreAsignatura;
    iniciarProfesores();
}
function asignarCurso(codigoAsignatura, nombreAsignatura)
{
    codigoAsignaturaSeleccionada=codigoAsignatura;
    nombreAsignaturaSeleccionada=nombreAsignatura;
    iniciarCursos();
}
function asignarBloque(codigoAsignatura, nombreAsignatura)
{
    codigoAsignaturaSeleccionada=codigoAsignatura;
    nombreAsignaturaSeleccionada=nombreAsignatura;
    iniciarBloques();
}
