var codigoAsignaturaSeleccionada;
var nombreAsignaturaSeleccionada;

var objbotonAsociar; //Variable global, solo usada para funciones asociadas a boton asociar
var objbotonDesAsociar //Variable global, solo usada para funciones asociadas a boton desAsociar.
var cantidadActualAsociados;
var cantidadActualNoAsociados;

function mostrarAsignaturaSeleccionada(tituloAsociar)
{
    divTituloAsignatura=document.getElementById("tituloAsignatura");
    var tituloAsignatura=
        "<h3 stlye='display: inline-block;'>Asociar "+tituloAsociar+" a: "+nombreAsignaturaSeleccionada+"</h3>";
    var botonFinalizar=
        "<button class='botonNuevo' onclick='finalizarAlumnos()'>LISTO</button>";
     divTituloAsignatura.innerHTML=tituloAsignatura+botonFinalizar;
}

function eliminarTabla(id)
{
    var tabla;
    if(tabla=document.getElementById(id)) 
        tabla.remove();
}

function registrosVaciosNoAsociados()
{
    borrarRegistrosVaciosNoAsociados();
    var parrafoVacio=document.createElement("p");
    parrafoVacio.innerHTML="No se han encontrado registros";
    parrafoVacio.setAttribute("name", "parrafoVacio1");
    parrafoVacio.style.display="inline-block";
    document.getElementById("divInfoTablaNoAsociados").append(parrafoVacio);
}

function borrarRegistrosVaciosNoAsociados()
{
    if(document.getElementsByName("parrafoVacio1").length>0)
    {
        var parrafos=document.getElementsByName("parrafoVacio1");
        var cantidad=document.getElementsByName("parrafoVacio1").length;
        for(var i=0; i<cantidad; i++)
        {
            parrafos[i].remove();
        }
    } 
}

function registrosVaciosAsociados()
{ 
    borrarRegistrosVaciosAsociados();
    var parrafoVacio=document.createElement("p");
    parrafoVacio.innerHTML="No se han encontrado registros";
    parrafoVacio.setAttribute("name", "parrafoVacio2");
    parrafoVacio.style.display="inline-block";
    document.getElementById("divInfoTablaAsociados").append(parrafoVacio);
}

function borrarRegistrosVaciosAsociados()
{
    if(document.getElementsByName("parrafoVacio2").length>0)
    {
        var parrafos=document.getElementsByName("parrafoVacio2");
        var cantidad=document.getElementsByName("parrafoVacio2").length;
        for(var i=0; i<cantidad; i++)
        {
            parrafos[i].remove();
        }
    } 
}