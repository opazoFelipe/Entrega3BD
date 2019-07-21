var codigoAsignaturaSeleccionada;
var nombreAsignaturaSeleccionada;

var objbotonAsociar; //Variable global, solo usada para funciones asociadas a boton asociar
var objbotonDesAsociar //Variable global, solo usada para funciones asociadas a boton desAsociar.
var cantidadActualAsociados;
var cantidadActualNoAsociados;

function mostrarAsignaturaSeleccionada()
{
    divTituloAsignatura=document.getElementById("tituloAsignatura");
    var tituloAsignatura=
        "<h3 stlye='display: inline-block;'>Asignatura Seleccionada: "+nombreAsignaturaSeleccionada+"</h3>";
    var botonFinalizar=
        "<button style='display: inline-block; margin-left: 5px;' onclick='finalizarAlumnos()'>LISTO</button>";
     divTituloAsignatura.innerHTML=tituloAsignatura+botonFinalizar;
}

function eliminarTabla(id)
{
    var tabla;
    if(tabla=document.getElementById(id)) 
        tabla.remove();
}