// --------------------------------------------------------------------------------------------------
// |               Funciones para la tabla de alumnos NO ASOCIADOS                                  |                                                                                                |
// |------------------------------------------------------------------------------------------------|

function crearTablaNoAsociados()
{
    var divTabla=document.getElementById("divTablaBuscar");
    var tabla=document.createElement("table");
    var thead=document.createElement("thead");
    var tbody=document.createElement("tbody");

    tabla.setAttribute("id", "asociarAlumno");
    thead.setAttribute("id", "theadAsociarAlumno");
    tbody.setAttribute("id", "tbodyAsociarAlumno");

    tabla.append(thead);
    tabla.append(tbody);
    divTabla.append(tabla);
}
var tablaNoAsociadosPrincipal=true;

function buscarAlumnoNoAsociado()
{
    var buscador=document.getElementById("buscarAlumnoNoAsociado");
    var clave=buscador.value;
    if(clave.length > 0)
    {
        stringAnteriorBuscadorNoAsociados=clave;
        clave="coincidencia="+clave;
        // Llamada Ajax
        var urlServidor="../modelo/alumno/buscarAlumnoNoAsociado.php";
        var parametros=clave+"&codigoAsignatura="+codigoAsignaturaSeleccionada;
        llamadaAjax(urlServidor, parametros, mostrarAlumnosNoAsociados);
    }
    else
    {
        if(document.getElementById("asociarAlumno"))
        {
            document.getElementById("asociarAlumno").remove();
            tablaNoAsociadosPrincipal=false;            }  
        }
}

function mostrarAlumnosNoAsociados()
{
    if(respuestaAjax=="vacio")
    {
        if(document.getElementById("asociarAlumno"))
        {
            document.getElementById("asociarAlumno").remove();
        }
    }
    else
    {
        if(document.getElementById("asociarAlumno"))
        {
            document.getElementById("asociarAlumno").remove();
        }
        var divTabla=document.getElementById("divTablaBuscar");
        divTabla.innerHTML=respuestaAjax;
    }
}

function botonAsociar(rut)
{
    //Implementar el codigo asignatura a enviar, por ahora es uno de prueba(6)
    objbotonAsociar=rut;
    var urlServidor="../modelo/alumno/asociarAlumno.php";
    var rut=rut;
    var parametros="rut="+rut+"&codigoAsignatura="+codigoAsignaturaSeleccionada;
    llamadaAjax(urlServidor, parametros, asociarAlumno);
}

function asociarAlumno()
{
    if(respuestaAjax=="hecho")
    {
        cantidadActualAsociados=cantidadActualAsociados+1;
        document.getElementById("parrafoCantidadAsociados").innerHTML="Cantidad Alumnos Asociados: "+cantidadActualAsociados;
        var fila=objbotonAsociar.parentNode.parentNode;
        fila.remove();
        tablaAsociadosPrincipal=true;
        if(document.getElementById("tbodyAsociarAlumno"))
        {
            if(document.getElementById("tbodyAsociarAlumno").childNodes.length==0)
            {
                document.getElementById("asociarAlumno").remove();
            }
        }
    }else alert("Error al asociar alumno a asignatura");
    respuestaAjax="";
    objbotonAsociar="";
}

function limpiarNoAsociados()
{
    if(document.getElementById("asociarAlumno"))
    {
        document.getElementById("asociarAlumno").remove();
    }
    if(document.getElementById("buscarAlumnoNoAsociado"))
    {
        document.getElementById("buscarAlumnoNoAsociado").value="";
    }
}

// --------------------------------------------------------------------------------------------------
// |               Funciones para la tabla de alumnos ASOCIADOS                                     |                                                                                                |
// |------------------------------------------------------------------------------------------------|

function crearTablaAsociados()
{
    var divTabla=document.getElementById("divTablaActualAsociados");
    var tabla=document.createElement("table");
    var thead=document.createElement("thead");
    var tbody=document.createElement("tbody");

    tabla.setAttribute("id", "desAsociarAlumno");
    thead.setAttribute("id", "theadDesAsociarAlumno");
    tbody.setAttribute("id", "tbodyDesAsociarAlumno");

    tabla.append(thead);
    tabla.append(tbody);
    divTabla.append(tabla);
}

var tablaAsociadosPrincipal=true;
function llenarTablaAsociados()
{
    //Llamada Ajax
    if(tablaAsociadosPrincipal==true)
    {
        if(document.getElementById("desAsociarAlumno"))
            document.getElementById("desAsociarAlumno").remove();
        var urlServidor="../modelo/alumno/getAlumnosAsociados.php";
        var parametros="codigoAsignatura="+codigoAsignaturaSeleccionada;
        llamadaAjax(urlServidor, parametros, mostrarAlumnosAsociados);
        tablaAsociadosPrincipal=false;
    }   
}

function mostrarAlumnosAsociados()
{
    if(respuestaAjax == "vacio")
    {
        if(document.getElementById("desAsociarAlumno"))
            document.getElementById("desAsociarAlumno").remove();
        llenarTablaAsociados();
    }
    else
    {   
        var jsonAlumnos=JSON.parse(respuestaAjax);
        var largoAlumnos=jsonAlumnos.length;
        cantidadActualAsociados=largoAlumnos;

        if(!document.getElementById("parrafoCantidadAsociados"))
        {
            var parrafo=document.createElement("p");
            parrafo.setAttribute("id", "parrafoCantidadAsociados");
            parrafo.innerHTML="Cantidad Alumnos Asociados: "+largoAlumnos;
            parrafo.style.marginTop="0";
            divTituloAsignatura.append(parrafo);
        }
        
        if(!document.getElementById("desAsociarAlumno"))
        {
            crearTablaAsociados();
            var columnasTheadAsociado=
            [
                "Rut", 
                "Nombres", 
                "Apellidos",
                "Nota Final", 
                "Opcion"
            ];

            var thead=document.getElementById("theadDesAsociarAlumno");
            var filaThead=document.createElement("tr");
            for(var k=0; k<4; k++)
            {
                var th=document.createElement("th");
                th.innerHTML=columnasTheadAsociado[k];
                filaThead.append(th);
            }
            thead.append(filaThead);
        }
        var tbody=document.getElementById("tbodyDesAsociarAlumno");

        for(var i=0; i<largoAlumnos; i++)
        {
            var alumnos=jsonAlumnos[i];
            var fila=document.createElement("tr");
            fila.setAttribute("id", alumnos.rut);
            for(var j=0; j<4; j++)
            {
                var item=Object.keys(alumnos)[j];
                var valor=alumnos[item];
                var columna=document.createElement("td");
                columna.innerHTML=valor;
                fila.append(columna);
            }
            //boton desAsociar alumno
            var columnaOpcion=document.createElement("td");
                
            var boton=document.createElement("button");
            boton.innerHTML="Remover";
            boton.setAttribute("id", alumnos.rut);
            boton.className="btnEliminarAlumno";
            boton.addEventListener("click", botonDesAsociar);
            columnaOpcion.append(boton);
            fila.append(columnaOpcion);
            tbody.append(fila);
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
            // Llamada Ajax
            var urlServidor="../modelo/alumno/buscarAlumnoAsociado.php";
            var parametros=clave+"&codigoAsignatura="+codigoAsignaturaSeleccionada;
            ultimoLargoBuscador=buscador.value.length;
            llamadaAjax(urlServidor, parametros, mostrarAlumnosAsociadosCoincidencia);
        
    }

}

function mostrarAlumnosAsociadosCoincidencia()
{
    if(respuestaAjax=="vacio")
    {
        if(document.getElementById("desAsociarAlumno"))
            document.getElementById("desAsociarAlumno").remove();
        document.getElementById("buscarAlumnoAsociado").value="";
        tablaAsociadosPrincipal=true
        llenarTablaAsociados();
    }
    else
    {
        tablaAsociadosPrincipal=true;
        llenarTablaAsociadosCoincidencia();
    }  
}

function llenarTablaAsociadosCoincidencia()
{
    if(!document.getElementById("desAsociarAlumno"))
        {
            crearTablaAsociados();
            var columnasTheadAsociado=
            [
                "Rut", 
                "Nombres", 
                "Apellidos",
                "Nota Final", 
                "Opcion"
            ];

            var thead=document.getElementById("theadDesAsociarAlumno");
            var filaThead=document.createElement("tr");
            for(var k=0; k<4; k++)
            {
                var th=document.createElement("th");
                th.innerHTML=columnasTheadAsociado[k];
                filaThead.append(th);
            }
            thead.append(filaThead);
        }
       
        var jsonAlumnos=JSON.parse(respuestaAjax);
        var largoAlumnos=jsonAlumnos.length;
        var tbody=document.getElementById("tbodyDesAsociarAlumno");
        tbody.innerHTML="";
        for(var i=0; i<largoAlumnos; i++)
        {
            var alumnos=jsonAlumnos[i];
            var rut=alumnos.rut;
            var fila=document.createElement("tr");
            fila.setAttribute("id", rut);
            for(var j=0; j<4; j++)
            {
                var item=Object.keys(alumnos)[j];
                var valor=alumnos[item];
                var columna=document.createElement("td");
                columna.innerHTML=valor;
                fila.append(columna);
            }
            //boton Asociar alumno
            var columnaOpcion=document.createElement("td");
            var boton=document.createElement("button");
            boton.setAttribute("id", rut);
            boton.innerHTML="Remover";
            boton.className="btnAsociarAlumno";
            boton.addEventListener("click", botonDesAsociar);
            columnaOpcion.append(boton);
            fila.append(columnaOpcion);
            tbody.append(fila);
        }
        respuestaAjax="";
}

function botonDesAsociar()
{
    //Implementar el codigo asignatura a enviar, por ahora es uno de prueba(6)
    objbotonDesAsociar=this;
    var urlServidor="../modelo/alumno/desAsociarAlumno.php";
    var rut=this.id;
    var parametros="rut="+rut+"&codigoAsignatura="+codigoAsignaturaSeleccionada;
    llamadaAjax(urlServidor, parametros, desAsociarAlumno);
}

function desAsociarAlumno()
{
    if(respuestaAjax=="hecho")
    {
        var fila=objbotonDesAsociar.parentNode.parentNode;
        fila.remove();
        cantidadActualAsociados=cantidadActualAsociados-1;
        document.getElementById("parrafoCantidadAsociados").innerHTML="Cantidad Alumnos Asociados: "+cantidadActualAsociados;
        if(document.getElementById("tbodyDesAsociarAlumno"))
        {
            if(document.getElementById("tbodyDesAsociarAlumno").childNodes.length==0)
            {
                document.getElementById("desAsociarAlumno").remove();
            }
        }
    }else 
    {
       alert("Error al desAsociar Alumno");     
    }    
    respuestaAjax="";
    objbotonAsociar="";
}


// --------------------------------------------------------------------------------------------------
// |               Funciones par iniciar y finalizar la asociacion o desasociacion de Alumnos       |                                                                                                |
// |------------------------------------------------------------------------------------------------|

var divTituloAsignatura;//Variable Global
function tablaAlumnos()
{
    mostrarAsignaturaSeleccionada();
    //Crear los buscadores 
    var labelNoAsociado=
        "<label for='buscarAlumnoNoAsociado'>Buscar Alumno: </label>";
    var buscadorNoAsociados=
        "<input type='text' id='buscarAlumnoNoAsociado' name= 'buscarAlumnoNoAsociado' onkeyup='buscarAlumnoNoAsociado()'>";
    var botonLimpiar=
        "<button onclick='limpiarNoAsociados()' style='display: inline-block;'>Limpiar</button>";
    
    var divBuscadorNoAsociado=document.getElementById("divBuscadorNoAsociados");
    divBuscadorNoAsociado.innerHTML=labelNoAsociado+buscadorNoAsociados+botonLimpiar;

    var divInfoTablaNoAsociados=document.getElementById("divInfoTablaNoAsociados");
    divInfoTablaNoAsociados.innerHTML="<h4>Alumnos No Asociados</h4>"


    var labelAsociado=
        "<label for='buscarAlumnoAsociado'>Buscar Alumno: </label>";
    var buscadorAsociados=
        "<input type='text' id='buscarAlumnoAsociado' name= 'buscarAlumnoAsociado' onkeyup='buscarAlumnoAsociado()'>";
    var botonVerTodos=
        "<button onclick='llenarTablaAsociados()' style='display: inline-block;'>Ver Todos</button>";

    var divInfoTablaNoAsociados=document.getElementById("divInfoTablaAsociados");
    divInfoTablaNoAsociados.innerHTML="<h4>Alumnos Asociados</h4>"

    var divBuscadorAsociado=document.getElementById("divBuscadorAsociados");
    divBuscadorAsociado.innerHTML=labelAsociado+buscadorAsociados+botonVerTodos;

}


function iniciarAlumnos()
{
    tablaAlumnos(nombreAsignaturaSeleccionada);
    document.getElementById("Asignaturas").remove();
}

function finalizarAlumnos()
{
    document.getElementById("infoTablaAsociar").innerHTML="";
    document.getElementById("divTablaBuscar").innerHTML="";
    document.getElementById("divTablaActualAsociados").innerHTML="";
    document.getElementById("infoTablaAsociados").innerHTML="";
    document.getElementById("tituloAsignatura").innerHTML="";
    codigoAsignaturaSeleccionada="";
    nombreAsignaturaSeleccionada="";
    gTablaNoAsociados=0;
    tablaAsociadosPrincipal=true;
    mostrarTablaAsignaturas();
}


