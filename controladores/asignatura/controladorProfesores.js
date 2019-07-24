// --------------------------------------------------------------------------------------------------
// |               Funciones par iniciar y finalizar la asociacion o desasociacion de Profesores    |                                                                                                |
// |------------------------------------------------------------------------------------------------|

var divTituloAsignatura;//Variable Global

function iniciarProfesores()
{
    tablaProfesores(nombreAsignaturaSeleccionada);
    document.getElementById("Asignaturas").remove();
}

function finalizarCursos()
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

function tablaProfesores()
{
    mostrarAsignaturaSeleccionada("Profesores");
    //Crear los buscadores 
    var labelNoAsociado=
        "<label for='buscarProfesorNoAsociado'>Buscar Profesor: </label>";
    var buscadorNoAsociados=
        "<input type='text' id='buscarProfesorNoAsociado' name= 'buscarProfesorNoAsociado' onkeyup='buscarProfesorNoAsociado()'>";
    var botonLimpiar=
        "<button class='botonLimpiar' onclick='limpiarProfesoresNoAsociados()' style='display: inline-block;'>Limpiar</button>";
    
    var divBuscadorNoAsociado=document.getElementById("buscadorNoAso");
    divBuscadorNoAsociado.innerHTML=labelNoAsociado+buscadorNoAsociados+botonLimpiar;

    var divInfoTablaNoAsociados=document.getElementById("divInfoTablaNoAsociados");
    divInfoTablaNoAsociados.innerHTML="<h4>Profesores No Asociados</h4>"

    var labelAsociado=
        "<label for='buscarProfesorAsociado'>Buscar Profesor: </label>";
    var buscadorAsociados=
        "<input type='text' id='buscarProfesorAsociado' name= 'buscarProfesorAsociado' onkeyup='buscarProfesorAsociado()'>";
    var botonVerTodos=
        "<button class='botonVerTodos' onclick='llenarTablaProfesoresAsociados()' style='display: inline-block;'>Ver Todos</button>";

    var divInfoTablaNoAsociados=document.getElementById("divInfoTablaAsociados");
    divInfoTablaNoAsociados.innerHTML="<h4>Profesores Asociados</h4>"

    var divBuscadorAsociado=document.getElementById("buscadorAso");
    divBuscadorAsociado.innerHTML=labelAsociado+buscadorAsociados+botonVerTodos;
}



// --------------------------------------------------------------------------------------------------
// |               Funciones para la tabla de PROFESORES NO ASOCIADOS                               |                                                                                                |
// |------------------------------------------------------------------------------------------------|

function buscarProfesorNoAsociado()
{
    var buscador=document.getElementById("buscarProfesorNoAsociado");
    var clave=buscador.value;
    if(clave.length > 0)
    {
        clave="coincidencia="+clave;
        // Llamada Ajax
        var urlServidor="../modelo/profesor/buscarProfesorNoAsociado.php";
        var parametros=clave+"&codigoAsignatura="+codigoAsignaturaSeleccionada;
        llamadaAjax(urlServidor, parametros, mostrarProfesoresNoAsociados);

        function mostrarProfesoresNoAsociados()
        {
            if(respuestaAjax=="vacio")
            {
                eliminarTabla("asociarProfesor");
                registrosVaciosNoAsociados();
            }
            else
            {
                borrarRegistrosVaciosNoAsociados();
                eliminarTabla("asociarProfesor");
                var divTabla=document.getElementById("divTablaNoAsociados");
                divTabla.innerHTML=respuestaAjax;
                cantidadActualNoAsociados=document.getElementById("tbodyAsociarProfesor").childNodes.length;
                cantidadActualNoAsociados-=1;

            }
        }      
    }
    else
    {
        eliminarTabla("asociarProfesor");
    } 
     
}

function botonAsociarProfesor(boton)
{
    var urlServidor="../modelo/profesor/asociarProfesor.php";
    var parametros="rutProfesor="+boton.id+"&codigoAsignatura="+codigoAsignaturaSeleccionada;
    llamadaAjax(urlServidor, parametros, asociarProfesor);

    function asociarProfesor()
    {
        if(respuestaAjax=="hecho")
        {
            cantidadActualNoAsociados=cantidadActualNoAsociados-1;
            var fila=boton.parentNode.parentNode;
            fila.remove();
    
            if(document.getElementById("tbodyAsociarProfesor"))
            {
                if(document.getElementById("tbodyAsociarProfesor").childNodes.length==0)
                {
                    document.getElementById("asociarProfesor").remove();
                }
            }
        }else alert("Error al asociar profesor a asignatura");
        respuestaAjax="";
    }
}

function limpiarProfesoresNoAsociados()
{
    eliminarTabla("asociarProfesor");
    document.getElementById("divTablaNoAsociados").innerHTML="";
    respuestaAjax="";
    if(document.getElementById("advertenciaRut"))
        document.getElementById("advertenciaRut").remove();

    if(document.getElementById("buscarProfesorNoAsociado"))
        document.getElementById("buscarProfesorNoAsociado").value="";
    
}

// --------------------------------------------------------------------------------------------------
// |               Funciones para la tabla de PROFESORES ASOCIADOS                                  |                                                                                                |
// |------------------------------------------------------------------------------------------------|


function llenarTablaProfesoresAsociados()
{
    //Llamada Ajax
    eliminarTabla("desAsociarProfesor");
    var urlServidor="../modelo/profesor/getProfesoresAsociados.php";
    var parametros="codigoAsignatura="+codigoAsignaturaSeleccionada;
    llamadaAjax(urlServidor, parametros, mostrarProfesoresAsociados);
        
    function mostrarProfesoresAsociados()
    {
        if(respuestaAjax == "vacio")
        {
            eliminarTabla("desAsociarProfesor");
            registrosVaciosAsociados();
            respuestaAjax="";
        }
        else
        {   
            borrarRegistrosVaciosAsociados();
            document.getElementById("divTablaAsociados").innerHTML=respuestaAjax;
            cantidadActualAsociados=document.getElementById("tbodyDesAsociarProfesor").childNodes.length;
            cantidadActualAsociados-=1;
            var hijos= document.getElementById("tbodyDesAsociarProfesor").childNodes;
        } 
    }
}

function buscarProfesorAsociado()
{
    var buscador=document.getElementById("buscarProfesorAsociado");
    var clave=buscador.value;
    if(clave.length > 0)
    {
        clave="coincidencia="+clave;
        //Llamada Ajax
        var urlServidor="../modelo/profesor/buscarProfesorAsociado.php";
        var parametros=clave+"&codigoAsignatura="+codigoAsignaturaSeleccionada;
        llamadaAjax(urlServidor, parametros, mostrarProfesoresAsociadosCoincidencia);    
    }else
    {
        eliminarTabla("desAsociarProfesor");
    } 

    function mostrarProfesoresAsociadosCoincidencia()
    {
        if(respuestaAjax=="vacio")
        {
            eliminarTabla("desAsociarProfesor");
            registrosVaciosAsociados();
        }
        else
        {
            borrarRegistrosVaciosAsociados();
            eliminarTabla("desAsociarProfesor");
            document.getElementById("divTablaAsociados").innerHTML=respuestaAjax;  
            cantidadActualAsociados=document.getElementById("tbodyDesAsociarProfesor").childNodes.length;
            cantidadActualAsociados-=1;
        }       
    }
}

function botonDesAsociarProfesor(boton)
{
    //Implementar el codigo asignatura a enviar, por ahora es uno de prueba(6)
    var urlServidor="../modelo/profesor/desAsociarProfesor.php";
    var parametros="codigoAsignatura="+codigoAsignaturaSeleccionada;
    llamadaAjax(urlServidor, parametros, desAsociarProfesor);

    function desAsociarProfesor()
    {
        if(respuestaAjax=="hecho")
        {
            var fila=boton.parentNode.parentNode;
            fila.remove();
            cantidadActualAsociados=cantidadActualAsociados-1;
            if(document.getElementById("tbodyDesAsociarProfesor").childNodes.length==0)
            {
                document.getElementById("desAsociarProfesor").remove();
            }
        }else alert("Error al desAsociar Profesor");   
        respuestaAjax="";
    }
}






