// --------------------------------------------------------------------------------------------------
// |               Funciones par iniciar y finalizar la asociacion o desasociacion de Alumnos       |                                                                                                |
// |------------------------------------------------------------------------------------------------|

var divTituloAsignatura;//Variable Global

function iniciarAlumnos()
{
    tablaAlumnos();
    document.getElementById("Asignaturas").remove();
}

function finalizarAlumnos()
{
    mostrarTablaAsignaturas();
    document.getElementById("divInfoTablaNoAsociados").innerHTML="";
    document.getElementById("buscadorNoAso").innerHTML="";
    document.getElementById("divTablaNoAsociados").innerHTML="";
   
    document.getElementById("divInfoTablaAsociados").innerHTML="";
    document.getElementById("buscadorAso").innerHTML="";
    document.getElementById("divTablaAsociados").innerHTML="";

    document.getElementById("tituloAsignatura").innerHTML="";

    codigoAsignaturaSeleccionada="";
    nombreAsignaturaSeleccionada="";  
}

function tablaAlumnos()
{
    mostrarAsignaturaSeleccionada("Alumnos");
    //Crear los buscadores 
    var labelNoAsociado=
        "<label for='buscarAlumnoNoAsociado'>Buscar Alumno: </label>";
    var buscadorNoAsociados=
        "<input type='text' id='buscarAlumnoNoAsociado' name= 'buscarAlumnoNoAsociado' onkeyup='buscarAlumnoNoAsociado()'>";
    var botonLimpiar=
        "<button class='botonLimpiar' onclick='limpiarNoAsociados()' style='display: inline-block;'>Limpiar</button>";
    
    var divBuscadorNoAsociado=document.getElementById("buscadorNoAso");
    divBuscadorNoAsociado.innerHTML=labelNoAsociado+buscadorNoAsociados+botonLimpiar;

    var divInfoTablaNoAsociados=document.getElementById("divInfoTablaNoAsociados");
    divInfoTablaNoAsociados.innerHTML="<h4>Alumnos No Asociados</h4>"

    var labelAsociado=
        "<label for='buscarAlumnoAsociado'>Buscar Alumno: </label>";
    var buscadorAsociados=
        "<input type='text' id='buscarAlumnoAsociado' name= 'buscarAlumnoAsociado' onkeyup='buscarAlumnoAsociado()'>";
    var botonVerTodos=
        "<button class='botonVerTodos' id='botonVerTodos' onclick='llenarTablaAsociados()' style='display: inline-block;'>Ver Todos</button>";

    var divInfoTablaNoAsociados=document.getElementById("divInfoTablaAsociados");
    divInfoTablaNoAsociados.innerHTML="<h4>Alumnos Asociados</h4>"

    var divBuscadorAsociado=document.getElementById("buscadorAso");
    divBuscadorAsociado.innerHTML=labelAsociado+buscadorAsociados+botonVerTodos;
}



// --------------------------------------------------------------------------------------------------
// |               Funciones para la tabla de alumnos NO ASOCIADOS                                  |                                                                                                |
// |------------------------------------------------------------------------------------------------|

function buscarAlumnoNoAsociado()
{
    var buscador=document.getElementById("buscarAlumnoNoAsociado");
    var clave=buscador.value;
    if(clave.length > 0)
    {
        clave="coincidencia="+clave;
        // Llamada Ajax
        var urlServidor="../modelo/alumno/buscarAlumnoNoAsociado.php";
        var parametros=clave+"&codigoAsignatura="+codigoAsignaturaSeleccionada;
        llamadaAjax(urlServidor, parametros, mostrarAlumnosNoAsociados);

        function mostrarAlumnosNoAsociados()
        {
            if(respuestaAjax=="vacio")
            {
                eliminarTabla("asociarAlumno");
                registrosVaciosNoAsociados();
                // document.getElementById("divTablaNoAsociados").innerHTML="No se han encontrado registros";
            }
            else
            {
                borrarRegistrosVaciosNoAsociados();
                eliminarTabla("asociarAlumno");
                var divTabla=document.getElementById("divTablaNoAsociados");
                divTabla.innerHTML=respuestaAjax;
                cantidadActualNoAsociados=document.getElementById("tbodyAsociarAlumno").childNodes.length;
                cantidadActualNoAsociados-=1;
            }
        }      
    }
    else
    {
        eliminarTabla("asociarAlumno");
    } 
     
}

function botonAsociar(boton)
{
    var urlServidor="../modelo/alumno/asociarAlumno.php";
    var parametros="rut="+boton.id+"&codigoAsignatura="+codigoAsignaturaSeleccionada;
    llamadaAjax(urlServidor, parametros, asociarAlumno);

    function asociarAlumno()
    {
        if(respuestaAjax=="hecho")
        {
            cantidadActualNoAsociados=cantidadActualNoAsociados-1;
            var fila=boton.parentNode.parentNode;
            fila.remove();
    
            if(document.getElementById("tbodyAsociarAlumno"))
            {
                if(document.getElementById("tbodyAsociarAlumno").childNodes.length==0)
                {
                    document.getElementById("asociarAlumno").remove();
                }
            }
        }else alert("Error al asociar alumno a asignatura");
        respuestaAjax="";
    }
}

function limpiarNoAsociados()
{
    eliminarTabla("asociarAlumno");
    document.getElementById("divTablaNoAsociados").innerHTML="";
    respuestaAjax="";

    if(document.getElementById("buscarAlumnoNoAsociado"))
        document.getElementById("buscarAlumnoNoAsociado").value="";
    
}

// --------------------------------------------------------------------------------------------------
// |               Funciones para la tabla de alumnos ASOCIADOS                                     |                                                                                                |
// |------------------------------------------------------------------------------------------------|


function llenarTablaAsociados()
{
    //Llamada Ajax
    eliminarTabla("desAsociarAlumno");
    var urlServidor="../modelo/alumno/getAlumnosAsociados.php";
    var parametros="codigoAsignatura="+codigoAsignaturaSeleccionada;
    llamadaAjax(urlServidor, parametros, mostrarAlumnosAsociados);
        
    function mostrarAlumnosAsociados()
    {
        if(respuestaAjax == "vacio")
        {
            registrosVaciosAsociados();
            eliminarTabla("desAsociarAlumno");
            respuestaAjax="";
        }
        else
        {   borrarRegistrosVaciosAsociados();
            document.getElementById("divTablaAsociados").innerHTML=respuestaAjax;
            cantidadActualAsociados=document.getElementById("tbodyDesAsociarAlumno").childNodes.length;
            cantidadActualAsociados-=1;
            var hijos= document.getElementById("tbodyDesAsociarAlumno").childNodes;
        } 
    }
}

function buscarAlumnoAsociado()
{
    var buscador=document.getElementById("buscarAlumnoAsociado");
    var clave=buscador.value;
    if(clave.length > 0)
    {
        clave="coincidencia="+clave;
        //Llamada Ajax
        var urlServidor="../modelo/alumno/buscarAlumnoAsociado.php";
        var parametros=clave+"&codigoAsignatura="+codigoAsignaturaSeleccionada;
        llamadaAjax(urlServidor, parametros, mostrarAlumnosAsociadosCoincidencia);    
    }else
    {
        eliminarTabla("desAsociarAlumno");
    } 

    function mostrarAlumnosAsociadosCoincidencia()
    {
        var parrafoEncontrados=document.createElement("p");
        parrafoEncontrados.setAttribute("id", "parrafoAsociadosEncontrados");

        if(respuestaAjax=="vacio")
        {
            registrosVaciosAsociados();
            eliminarTabla("desAsociarAlumno");
        }
        else
        {
            borrarRegistrosVaciosAsociados();
            eliminarTabla("desAsociarAlumno");
            document.getElementById("divTablaAsociados").innerHTML=respuestaAjax;  
            cantidadActualAsociados=document.getElementById("tbodyDesAsociarAlumno").childNodes.length;
            cantidadActualAsociados-=1;
            parrafoEncontrados.innerHTML="Econtrados: "+cantidadActualAsociados;
        }       
    }
}

function botonDesAsociar(boton)
{
    //Implementar el codigo asignatura a enviar, por ahora es uno de prueba(6)
    var urlServidor="../modelo/alumno/desAsociarAlumno.php";
    var parametros="rut="+boton.id+"&codigoAsignatura="+codigoAsignaturaSeleccionada;
    llamadaAjax(urlServidor, parametros, desAsociarAlumno);

    function desAsociarAlumno()
    {
        if(respuestaAjax=="hecho")
        {
            var fila=boton.parentNode.parentNode;
            fila.remove();
            cantidadActualAsociados=cantidadActualAsociados-1;
            if(document.getElementById("tbodyDesAsociarAlumno").childNodes.length==0)
            {
                document.getElementById("desAsociarAlumno").remove();
            }
        }else alert("Error al desAsociar Alumno");   
        respuestaAjax="";
    }
}






