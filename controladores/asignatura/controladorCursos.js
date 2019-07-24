// --------------------------------------------------------------------------------------------------
// |               Funciones par iniciar y finalizar la asociacion o desasociacion de Cursos        |                                                                                                |
// |------------------------------------------------------------------------------------------------|

var divTituloAsignatura;//Variable Global

function iniciarCursos()
{
    tablaCursos(nombreAsignaturaSeleccionada);
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

function tablaCursos()
{
    mostrarAsignaturaSeleccionada("Cursos");
    //Crear los buscadores 
    var labelNoAsociado=
        "<label for='buscarCursoNoAsociado'>Buscar Curso: </label>";
    var buscadorNoAsociados=
        "<input type='text' id='buscarCursoNoAsociado' name= 'buscarCursoNoAsociado' onkeyup='buscarCursoNoAsociado()'>";
    var botonLimpiar=
        "<button class='botonLimpiar' onclick='limpiarCursosNoAsociados()' style='display: inline-block;'>Limpiar</button>";
    
    var divBuscadorNoAsociado=document.getElementById("buscadorNoAso");
    divBuscadorNoAsociado.innerHTML=labelNoAsociado+buscadorNoAsociados+botonLimpiar;

    var divInfoTablaNoAsociados=document.getElementById("divInfoTablaNoAsociados");
    divInfoTablaNoAsociados.innerHTML="<h4>Cursos No Asociados</h4>"

    var labelAsociado=
        "<label for='buscarCursoAsociado'>Buscar Curso: </label>";
    var buscadorAsociados=
        "<input type='text' id='buscarCursoAsociado' name= 'buscarCursoAsociado' onkeyup='buscarCursoAsociado()'>";
    var botonVerTodos=
        "<button class='botonVerTodos' onclick='llenarTablaCursosAsociados()' style='display: inline-block;'>Ver Todos</button>";

    var divInfoTablaNoAsociados=document.getElementById("divInfoTablaAsociados");
    divInfoTablaNoAsociados.innerHTML="<h4>Cursos Asociados</h4>"

    var divBuscadorAsociado=document.getElementById("buscadorAso");
    divBuscadorAsociado.innerHTML=labelAsociado+buscadorAsociados+botonVerTodos;
}



// --------------------------------------------------------------------------------------------------
// |               Funciones para la tabla de CURSOS NO ASOCIADOS                                  |                                                                                                |
// |------------------------------------------------------------------------------------------------|

function buscarCursoNoAsociado()
{
    var buscador=document.getElementById("buscarCursoNoAsociado");
    var clave=buscador.value;
    if(clave.length > 0)
    {
        clave="coincidencia="+clave;
        // Llamada Ajax
        var urlServidor="../modelo/curso/buscarCursoNoAsociado.php";
        var parametros=clave+"&codigoAsignatura="+codigoAsignaturaSeleccionada;
        llamadaAjax(urlServidor, parametros, mostrarCursosNoAsociados);

        function mostrarCursosNoAsociados()
        {
            if(respuestaAjax=="vacio")
            {
                eliminarTabla("asociarCurso");
                registrosVaciosNoAsociados();
            }
            else
            {
                borrarRegistrosVaciosNoAsociados();
                eliminarTabla("asociarCurso");
                var divTabla=document.getElementById("divTablaNoAsociados");
                divTabla.innerHTML=respuestaAjax;
                cantidadActualNoAsociados=document.getElementById("tbodyAsociarCurso").childNodes.length;
                cantidadActualNoAsociados-=1;
            }
        }      
    }
    else
    {
        eliminarTabla("asociarCurso");
    } 
     
}

function botonAsociarCurso(boton)
{
    var urlServidor="../modelo/curso/asociarCurso.php";
    var parametros="codigoCurso="+boton.id+"&codigoAsignatura="+codigoAsignaturaSeleccionada;
    llamadaAjax(urlServidor, parametros, asociarCurso);

    function asociarCurso()
    {
        if(respuestaAjax=="hecho")
        {
            cantidadActualNoAsociados=cantidadActualNoAsociados-1;
            var fila=boton.parentNode.parentNode;
            fila.remove();
    
            if(document.getElementById("tbodyAsociarCurso"))
            {
                if(document.getElementById("tbodyAsociarCurso").childNodes.length==0)
                {
                    document.getElementById("asociarCurso").remove();
                }
       
            }
        }else alert("Error al asociar curso a asignatura");
        respuestaAjax="";
    }
}

function limpiarCursosNoAsociados()
{
    eliminarTabla("asociarCurso");
    document.getElementById("divTablaNoAsociados").innerHTML="";
    respuestaAjax="";

  
    if(document.getElementById("buscarCursoNoAsociado"))
        document.getElementById("buscarCursoNoAsociado").value="";
    
}

// --------------------------------------------------------------------------------------------------
// |               Funciones para la tabla de CURSOS ASOCIADOS                                     |                                                                                                |
// |------------------------------------------------------------------------------------------------|


function llenarTablaCursosAsociados()
{
    //Llamada Ajax
    eliminarTabla("desAsociarCurso");
    var urlServidor="../modelo/curso/getCursosAsociados.php";
    var parametros="codigoAsignatura="+codigoAsignaturaSeleccionada;
    llamadaAjax(urlServidor, parametros, mostrarCursosAsociados);
        
    function mostrarCursosAsociados()
    {
        if(respuestaAjax == "vacio")
        {
            eliminarTabla("desAsociarCurso");
            registrosVaciosAsociados();
            respuestaAjax="";
        }
        else
        {   
            borrarRegistrosVaciosAsociados();
            document.getElementById("divTablaAsociados").innerHTML=respuestaAjax;
            cantidadActualAsociados=document.getElementById("tbodyDesAsociarCurso").childNodes.length;
            cantidadActualAsociados-=1;
            var hijos= document.getElementById("tbodyDesAsociarCurso").childNodes;
        } 
    }
}

function buscarCursoAsociado()
{
    var buscador=document.getElementById("buscarCursoAsociado");
    var clave=buscador.value;
    if(clave.length > 0)
    {
        clave="coincidencia="+clave;
        //Llamada Ajax
        var urlServidor="../modelo/curso/buscarCursoAsociado.php";
        var parametros=clave+"&codigoAsignatura="+codigoAsignaturaSeleccionada;
        llamadaAjax(urlServidor, parametros, mostrarCursosAsociadosCoincidencia);    
    }else
    {
        eliminarTabla("desAsociarCurso");
    } 

    function mostrarCursosAsociadosCoincidencia()
    {
        if(respuestaAjax=="vacio")
        {
            eliminarTabla("desAsociarCurso");
            registrosVaciosAsociados();
        }
        else
        {
            borrarRegistrosVaciosAsociados()
            eliminarTabla("desAsociarCurso");
            document.getElementById("divTablaAsociados").innerHTML=respuestaAjax;  
            cantidadActualAsociados=document.getElementById("tbodyDesAsociarCurso").childNodes.length;
            cantidadActualAsociados-=1;
        }       
    }
}

function botonDesAsociarCurso(boton)
{
    //Implementar el codigo asignatura a enviar, por ahora es uno de prueba(6)
    var urlServidor="../modelo/curso/desAsociarCurso.php";
    var parametros="codigoCurso="+boton.id+"&codigoAsignatura="+codigoAsignaturaSeleccionada;
    llamadaAjax(urlServidor, parametros, desAsociarCurso);

    function desAsociarCurso()
    {
        if(respuestaAjax=="hecho")
        {
            var fila=boton.parentNode.parentNode;
            fila.remove();
            cantidadActualAsociados=cantidadActualAsociados-1;
            if(document.getElementById("tbodyDesAsociarCurso").childNodes.length==0)
            {
                document.getElementById("desAsociarCurso").remove();
            }
        }else alert("Error al desAsociar Curso");   
        respuestaAjax="";
    }
}






