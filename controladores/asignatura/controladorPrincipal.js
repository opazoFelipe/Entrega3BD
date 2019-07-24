window.onload=mostrarTablaAsignaturas;

function mostrarTablaAsignaturas()
{
    llamadaAjax("../modelo/asignatura/obtenerAsignaturas.php", null, llenarAsignaturas);

    function llenarAsignaturas()
    {
        if(document.getElementById("Asignaturas"))
            document.getElementById("Asignaturas").remove();
        document.getElementById("divTablaAsignaturas").innerHTML=respuestaAjax;
        var botonNuevaAsignatura="<button id='nuevaAsignatura' onclick='iniciarIngresarAsignatura()'>Nueva Asignatura</button>";
        document.getElementById("tituloPrincipal").innerHTML="Asignaturas "+botonNuevaAsignatura;
    }
}

function modificarAsignatura(botonAsignatura)
{
    iniciarModificarAsignatura(botonAsignatura);
    eliminarTitulo(); 
}
function eliminarAsignatura(botonAsignatura)
{
    iniciarEliminarAsignatura(botonAsignatura);
    eliminarTitulo();
}
function asignarAlumno(codigoAsignatura, nombreAsignatura)
{
    eliminarTitulo();
    codigoAsignaturaSeleccionada=codigoAsignatura;
    nombreAsignaturaSeleccionada=nombreAsignatura;
    iniciarAlumnos();
    // 
}
function asignarProfesor(codigoAsignatura, nombreAsignatura)
{
    eliminarTitulo();
    codigoAsignaturaSeleccionada=codigoAsignatura;
    nombreAsignaturaSeleccionada=nombreAsignatura;
    iniciarProfesores();
}
function asignarCurso(codigoAsignatura, nombreAsignatura)
{
    eliminarTitulo();
    codigoAsignaturaSeleccionada=codigoAsignatura;
    nombreAsignaturaSeleccionada=nombreAsignatura;
    iniciarCursos();
}
function asignarBloque(codigoAsignatura, nombreAsignatura)
{
    eliminarTitulo();
    codigoAsignaturaSeleccionada=codigoAsignatura;
    nombreAsignaturaSeleccionada=nombreAsignatura;
    iniciarBloques();
}

function eliminarTitulo()
{
    if(document.getElementById("tituloPrincipal"))
    document.getElementById("tituloPrincipal").innerHTML="";
}