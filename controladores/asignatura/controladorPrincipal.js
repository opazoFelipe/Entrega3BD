window.onload=mostrarTablaAsignaturas;

function mostrarTablaAsignaturas()
{
    llamadaAjax("../modelo/asignatura/obtenerAsignaturas.php", null, llenarAsignaturas);

    function llenarAsignaturas()
    {
        document.getElementById("divTablaAsignaturas").innerHTML=respuestaAjax;
    }
}

function modificarAsignatura(botonAsignatura)
{
    iniciarModificarAsignatura(botonAsignatura);
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
