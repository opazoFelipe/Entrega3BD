// --------------------------------------------------------------------------------------------------
// |               Funciones par iniciar y finalizar la asociacion o desasociacion de BLOQUES       |                                                                                                |
// |------------------------------------------------------------------------------------------------|

var divTituloAsignatura;//Variable Global

function iniciarBloques()
{
    tablaBloques(nombreAsignaturaSeleccionada);
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

function tablaBloques()
{
    mostrarAsignaturaSeleccionada();
    //Crear los buscadores 
    var labelNoAsociado=
        "<label for='buscarBloqueNoAsociado'>Buscar Bloque: </label>";
    var buscadorNoAsociados=
        "<input type='text' id='buscarBloqueNoAsociado' name= 'buscarBloqueNoAsociado' onkeyup='buscarBloqueNoAsociado()'>";
    var botonLimpiar=
        "<button onclick='limpiarBloquesNoAsociados()' style='display: inline-block;'>Limpiar</button>";
    
    var divBuscadorNoAsociado=document.getElementById("buscadorNoAso");
    divBuscadorNoAsociado.innerHTML=labelNoAsociado+buscadorNoAsociados+botonLimpiar;

    var divInfoTablaNoAsociados=document.getElementById("divInfoTablaNoAsociados");
    divInfoTablaNoAsociados.innerHTML="<h4>Bloques No Asociados</h4>"

    var labelAsociado=
        "<label for='buscarBloqueAsociado'>Buscar Bloque: </label>";
    var buscadorAsociados=
        "<input type='text' id='buscarBloqueAsociado' name= 'buscarBloqueAsociado' onkeyup='buscarBloqueAsociado()'>";
    var botonVerTodos=
        "<button onclick='llenarTablaBloquesAsociados()' style='display: inline-block;'>Ver Todos</button>";

    var divInfoTablaNoAsociados=document.getElementById("divInfoTablaAsociados");
    divInfoTablaNoAsociados.innerHTML="<h4>Bloques Asociados</h4>"

    var divBuscadorAsociado=document.getElementById("buscadorAso");
    divBuscadorAsociado.innerHTML=labelAsociado+buscadorAsociados+botonVerTodos;
}



// --------------------------------------------------------------------------------------------------
// |               Funciones para la tabla de BLOQUES NO ASOCIADOS                                  |                                                                                                |
// |------------------------------------------------------------------------------------------------|

function buscarBloqueNoAsociado()
{
    var buscador=document.getElementById("buscarBloqueNoAsociado");
    var clave=buscador.value;
    if(clave.length > 0)
    {
        clave="coincidencia="+clave;
        // Llamada Ajax
        var urlServidor="../modelo/bloque/buscarBloqueNoAsociado.php";
        var parametros=clave+"&codigoAsignatura="+codigoAsignaturaSeleccionada;
        llamadaAjax(urlServidor, parametros, mostrarBloquesNoAsociados);

        function mostrarBloquesNoAsociados()
        {
            if(respuestaAjax=="vacio")
            {
                eliminarTabla("asociarBloque");
                document.getElementById("divTablaNoAsociados").innerHTML="No se han encontrado registros";
                document.getElementById("infoCantidadNoAso").innerHTML="";
            }
            else
            {
                eliminarTabla("asociarBloque");
                var divTabla=document.getElementById("divTablaNoAsociados");
                divTabla.innerHTML=respuestaAjax;
                cantidadActualNoAsociados=document.getElementById("tbodyAsociarBloque").childNodes.length;
                cantidadActualNoAsociados-=1;
                document.getElementById("infoCantidadNoAso").innerHTML="Encontrados: "+cantidadActualNoAsociados;
            }
        }      
    }
    else
    {
        document.getElementById("infoCantidadNoAso").innerHTML="";
        eliminarTabla("asociarBloque");
    } 
     
}

function botonAsociarBloque(boton)
{
    var urlServidor="../modelo/bloque/asociarBloque.php";
    var parametros="codigoBloque="+boton.id+"&codigoAsignatura="+codigoAsignaturaSeleccionada;
    llamadaAjax(urlServidor, parametros, asociarBloque);

    function asociarBloque()
    {
        if(respuestaAjax=="hecho")
        {
            cantidadActualNoAsociados=cantidadActualNoAsociados-1;
            var fila=boton.parentNode.parentNode;
            document.getElementById("infoCantidadNoAso").innerHTML="";
            fila.remove();
    
            if(document.getElementById("tbodyAsociarBloque"))
            {
                if(document.getElementById("tbodyAsociarBloque").childNodes.length==0)
                {
                    document.getElementById("asociarBloque").remove();
                }
                else
                    document.getElementById("infoCantidadNoAso").innerHTML="Encontrados: "+cantidadActualNoAsociados;  
            }
        }else alert("Error al asociar bloque a asignatura");
        respuestaAjax="";
    }
}

function limpiarBloquesNoAsociados()
{
    eliminarTabla("asociarBloque");
    document.getElementById("divTablaNoAsociados").innerHTML="";
    respuestaAjax="";

    document.getElementById("infoCantidadNoAso").innerHTML="";
    if(document.getElementById("buscarBloqueNoAsociado"))
        document.getElementById("buscarBloqueNoAsociado").value="";
    
}

// --------------------------------------------------------------------------------------------------
// |               Funciones para la tabla de BLOQUES ASOCIADOS                                     |                                                                                                |
// |------------------------------------------------------------------------------------------------|


function llenarTablaBloquesAsociados()
{
    //Llamada Ajax
    eliminarTabla("desAsociarBloque");
    var urlServidor="../modelo/bloque/getBloquesAsociados.php";
    var parametros="codigoAsignatura="+codigoAsignaturaSeleccionada;
    llamadaAjax(urlServidor, parametros, mostrarBloquesAsociados);
        
    function mostrarBloquesAsociados()
    {
        var infoCantidadAso=document.getElementById("infoCantidadAso");
        if(respuestaAjax == "vacio")
        {
            eliminarTabla("desAsociarBloque");
            infoCantidadAso.innerHTML="Econtrados: 0";
            respuestaAjax="";
        }
        else
        {   
            document.getElementById("divTablaAsociados").innerHTML=respuestaAjax;
            cantidadActualAsociados=document.getElementById("tbodyDesAsociarBloque").childNodes.length;
            cantidadActualAsociados-=1;
            var hijos= document.getElementById("tbodyDesAsociarBloque").childNodes;
            infoCantidadAso.innerHTML="Econtrados: "+cantidadActualAsociados;
        } 
    }
}

function buscarBloqueAsociado()
{
    var buscador=document.getElementById("buscarBloqueAsociado");
    var clave=buscador.value;
    if(clave.length > 0)
    {
        clave="coincidencia="+clave;
        //Llamada Ajax
        var urlServidor="../modelo/bloque/buscarBloqueAsociado.php";
        var parametros=clave+"&codigoAsignatura="+codigoAsignaturaSeleccionada;
        llamadaAjax(urlServidor, parametros, mostrarBloquesAsociadosCoincidencia);    
    }else
    {
        document.getElementById("infoCantidadAso").innerHTML="";
        eliminarTabla("desAsociarBloque");
    } 

    function mostrarBloquesAsociadosCoincidencia()
    {
        var infoCantidadAso=document.getElementById("infoCantidadAso");
        if(respuestaAjax=="vacio")
        {
            eliminarTabla("desAsociarBloque");
            infoCantidadAso.innerHTML="Econtrados: 0";
        }
        else
        {
            eliminarTabla("desAsociarBloque");
            document.getElementById("divTablaAsociados").innerHTML=respuestaAjax;  
            cantidadActualAsociados=document.getElementById("tbodyDesAsociarBloque").childNodes.length;
            cantidadActualAsociados-=1;
            infoCantidadAso.innerHTML="Econtrados: "+cantidadActualAsociados;
        }       
    }
}

function botonDesAsociarBloque(boton)
{
    var urlServidor="../modelo/bloque/desAsociarBloque.php";
    var parametros="codigoBloque="+boton.id+"&codigoAsignatura="+codigoAsignaturaSeleccionada;
    llamadaAjax(urlServidor, parametros, desAsociarBloque);

    function desAsociarBloque()
    {
        if(respuestaAjax=="hecho")
        {
            var fila=boton.parentNode.parentNode;
            fila.remove();
            cantidadActualAsociados=cantidadActualAsociados-1;
            if(document.getElementById("tbodyDesAsociarBloque").childNodes.length==0)
            {
                document.getElementById("desAsociarBloque").remove();
            }else 
                document.getElementById("infoCantidadAso").innerHTML="Encontrados: "+cantidadActualAsociados; 
        }else alert("Error al desAsociar Bloque");   
        respuestaAjax="";
    }
}






