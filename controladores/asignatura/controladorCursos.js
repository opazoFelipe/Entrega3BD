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
    document.getElementById("infoCantidadNoAso").innerHTML="";
    document.getElementById("divTablaNoAsociados").innerHTML="";
   
    document.getElementById("divInfoTablaAsociados").innerHTML="";
    document.getElementById("buscadorAso").innerHTML="";
    document.getElementById("infoCantidadAso").innerHTML="";
    document.getElementById("divTablaAsociados").innerHTML="";

    document.getElementById("tituloAsignatura").innerHTML="";

    codigoAsignaturaSeleccionada="";
    nombreAsignaturaSeleccionada="";  
}

function tablaCursos()
{
    mostrarAsignaturaSeleccionada();
    //Crear los buscadores 
    var labelNoAsociado=
        "<label for='buscarCursoNoAsociado'>Buscar Curso: </label>";
    var buscadorNoAsociados=
        "<input type='text' id='buscarCursoNoAsociado' name= 'buscarCursoNoAsociado' onkeyup='buscarCursoNoAsociado()'>";
    var botonLimpiar=
        "<button onclick='limpiarCursosNoAsociados()' style='display: inline-block;'>Limpiar</button>";
    
    var divBuscadorNoAsociado=document.getElementById("buscadorNoAso");
    divBuscadorNoAsociado.innerHTML=labelNoAsociado+buscadorNoAsociados+botonLimpiar;

    var divInfoTablaNoAsociados=document.getElementById("divInfoTablaNoAsociados");
    divInfoTablaNoAsociados.innerHTML="<h4>Cursos No Asociados</h4>"

    var labelAsociado=
        "<label for='buscarCursoAsociado'>Buscar Curso: </label>";
    var buscadorAsociados=
        "<input type='text' id='buscarCursoAsociado' name= 'buscarCursoAsociado' onkeyup='buscarCursoAsociado()'>";
    var botonVerTodos=
        "<button onclick='llenarTablaCursosAsociados()' style='display: inline-block;'>Ver Todos</button>";

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
                document.getElementById("divTablaNoAsociados").innerHTML="No se han encontrado registros";
                document.getElementById("infoCantidadNoAso").innerHTML="";
            }
            else
            {
                eliminarTabla("asociarCurso");
                var divTabla=document.getElementById("divTablaNoAsociados");
                divTabla.innerHTML=respuestaAjax;
                cantidadActualNoAsociados=document.getElementById("tbodyAsociarCurso").childNodes.length;
                cantidadActualNoAsociados-=1;
                document.getElementById("infoCantidadNoAso").innerHTML="Encontrados: "+cantidadActualNoAsociados;
            }
        }      
    }
    else
    {
        document.getElementById("infoCantidadNoAso").innerHTML="";
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
            document.getElementById("infoCantidadNoAso").innerHTML="";
            fila.remove();
    
            if(document.getElementById("tbodyAsociarCurso"))
            {
                if(document.getElementById("tbodyAsociarCurso").childNodes.length==0)
                {
                    document.getElementById("asociarCurso").remove();
                }
                else
                    document.getElementById("infoCantidadNoAso").innerHTML="Encontrados: "+cantidadActualNoAsociados;  
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

    document.getElementById("infoCantidadNoAso").innerHTML="";
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
        var infoCantidadAso=document.getElementById("infoCantidadAso");
        if(respuestaAjax == "vacio")
        {
            eliminarTabla("desAsociarCurso");
            infoCantidadAso.innerHTML="Econtrados: 0";
            respuestaAjax="";
        }
        else
        {   
            document.getElementById("divTablaAsociados").innerHTML=respuestaAjax;
            cantidadActualAsociados=document.getElementById("tbodyDesAsociarCurso").childNodes.length;
            cantidadActualAsociados-=1;
            var hijos= document.getElementById("tbodyDesAsociarCurso").childNodes;
            infoCantidadAso.innerHTML="Econtrados: "+cantidadActualAsociados;
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
        document.getElementById("infoCantidadAso").innerHTML="";
        eliminarTabla("desAsociarCurso");
    } 

    function mostrarCursosAsociadosCoincidencia()
    {
        var infoCantidadAso=document.getElementById("infoCantidadAso");
        if(respuestaAjax=="vacio")
        {
            eliminarTabla("desAsociarCurso");
            infoCantidadAso.innerHTML="Econtrados: 0";
        }
        else
        {
            eliminarTabla("desAsociarCurso");
            document.getElementById("divTablaAsociados").innerHTML=respuestaAjax;  
            cantidadActualAsociados=document.getElementById("tbodyDesAsociarCurso").childNodes.length;
            cantidadActualAsociados-=1;
            infoCantidadAso.innerHTML="Econtrados: "+cantidadActualAsociados;
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
            }else 
                document.getElementById("infoCantidadAso").innerHTML="Encontrados: "+cantidadActualAsociados; 
        }else alert("Error al desAsociar Curso");   
        respuestaAjax="";
    }
}






