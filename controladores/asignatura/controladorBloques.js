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
    document.getElementById("divTablaNoAsociados").innerHTML="";
   
    document.getElementById("divInfoTablaAsociados").innerHTML="";
    document.getElementById("buscadorAso").innerHTML="";
    document.getElementById("divTablaAsociados").innerHTML="";

    document.getElementById("tituloAsignatura").innerHTML="";

    codigoAsignaturaSeleccionada="";
    nombreAsignaturaSeleccionada="";  
}

function tablaBloques()
{
    mostrarAsignaturaSeleccionada("Bloques");
    //Crear los buscadores 
    var labelNoAsociado=
        "<label for='buscarBloqueNoAsociado'>Buscar Bloque: </label>";
    var buscadorNoAsociados=
        "<input type='text' id='buscarBloqueNoAsociado' name= 'buscarBloqueNoAsociado' onkeyup='buscarBloqueNoAsociado()'>";
    var botonLimpiar=
        "<button class='botonLimpiar' onclick='limpiarBloquesNoAsociados()' style='display: inline-block;'>Limpiar</button>";
    
    var divBuscadorNoAsociado=document.getElementById("buscadorNoAso");
    divBuscadorNoAsociado.innerHTML=labelNoAsociado+buscadorNoAsociados+botonLimpiar;

    var divInfoTablaNoAsociados=document.getElementById("divInfoTablaNoAsociados");
    divInfoTablaNoAsociados.innerHTML="<h4>Bloques No Asociados</h4>"

    var labelAsociado=
        "<label for='buscarBloqueAsociado'>Buscar Bloque: </label>";
    var buscadorAsociados=
        "<input type='text' id='buscarBloqueAsociado' name= 'buscarBloqueAsociado' onkeyup='buscarBloqueAsociado()'>";
    var botonVerTodos=
        "<button class='botonVerTodos' onclick='llenarTablaBloquesAsociados()' style='display: inline-block;'>Ver Todos</button>";

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
                registrosVaciosNoAsociados();
            }
            else
            {
                borrarRegistrosVaciosNoAsociados();
                eliminarTabla("asociarBloque");
                var divTabla=document.getElementById("divTablaNoAsociados");
                divTabla.innerHTML=respuestaAjax;
                cantidadActualNoAsociados=document.getElementById("tbodyAsociarBloque").childNodes.length;
                cantidadActualNoAsociados-=1;
            }
        }      
    }
    else
    {
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
            fila.remove();
    
            if(document.getElementById("tbodyAsociarBloque"))
            {
                if(document.getElementById("tbodyAsociarBloque").childNodes.length==0)
                {
                    document.getElementById("asociarBloque").remove();
                }
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
        if(respuestaAjax == "vacio")
        {
            eliminarTabla("desAsociarBloque");
            registrosVaciosAsociados();
            respuestaAjax="";
        }
        else
        {   
            borrarRegistrosVaciosAsociados();
            document.getElementById("divTablaAsociados").innerHTML=respuestaAjax;
            cantidadActualAsociados=document.getElementById("tbodyDesAsociarBloque").childNodes.length;
            cantidadActualAsociados-=1;
            var hijos= document.getElementById("tbodyDesAsociarBloque").childNodes;
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
        eliminarTabla("desAsociarBloque");
    } 

    function mostrarBloquesAsociadosCoincidencia()
    {
        if(respuestaAjax=="vacio")
        {
            eliminarTabla("desAsociarBloque");
            registrosVaciosAsociados();
           
        }
        else
        {
            borrarRegistrosVaciosAsociados();
            eliminarTabla("desAsociarBloque");
            document.getElementById("divTablaAsociados").innerHTML=respuestaAjax;  
            cantidadActualAsociados=document.getElementById("tbodyDesAsociarBloque").childNodes.length;
            cantidadActualAsociados-=1;
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
            }
        }else alert("Error al desAsociar Bloque");   
        respuestaAjax="";
    }
}






