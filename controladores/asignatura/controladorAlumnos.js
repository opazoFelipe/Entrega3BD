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
        stringAnteriorBuscadorAsociados=document.getElementById("buscarAlumnoNoAsociado").value;
        tablaNoAsociadosPrincipal=true;
        var jsonAlumnos=JSON.parse(respuestaAjax);
        var largoAlumnos=jsonAlumnos.length;

        if(!document.getElementById("asociarAlumno"))
        {
            crearTablaNoAsociados();
            var columnasTheadNoAsociado=
            [
                "Rut", 
                "Nombres", 
                "Apellidos", 
                "Opcion"
            ]; 

            thead=document.getElementById("theadAsociarAlumno");
            var filaThead=document.createElement("tr");
            for(var k=0; k<4; k++)
            {
                var th=document.createElement("th");
                th.innerHTML=columnasTheadNoAsociado[k];
                filaThead.append(th);
            }
            thead.append(filaThead);
        }
        
        document.getElementById("theadAsociarAlumno").display="none";
        var tbody=document.getElementById("tbodyAsociarAlumno");
        tbody.innerHTML="";
        for(var i=0; i<largoAlumnos; i++)
        {
            var alumnos=jsonAlumnos[i];
            var rut=alumnos.rut;
            var fila=document.createElement("tr");
            fila.setAttribute("id", rut);
            for(var j=0; j<3; j++)
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
            boton.innerHTML="Asociar";
            boton.className="btnAsociarAlumno";
            boton.addEventListener("click", botonAsociar);
            columnaOpcion.append(boton);
            fila.append(columnaOpcion);
            document.getElementById("theadAsociarAlumno").display="block";
            tbody.append(fila);
        }
    }
}

function botonAsociar()
{
    //Implementar el codigo asignatura a enviar, por ahora es uno de prueba(6)
    objbotonAsociar=this;
    var urlServidor="../modelo/alumno/asociarAlumno.php";
    var rut=this.id;
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
    divTituloAsignatura=document.getElementById("tituloAsignatura");
    var TituloAsignatura=document.createElement("h3");
    TituloAsignatura.innerHTML="Asignatura Seleccionada: "+nombreAsignaturaSeleccionada;
    divTituloAsignatura.append(TituloAsignatura);
    TituloAsignatura.style.display="inline-block";
    var botonFinalizar=document.createElement("button");
    botonFinalizar.innerHTML="Listo";
    botonFinalizar.style.display="inline-block";
    botonFinalizar.style.marginLeft="5px";
    botonFinalizar.addEventListener("click", finalizarAlumnos);
    divTituloAsignatura.append(botonFinalizar);

    //Crear los buscadores 
    var itemsBuscadores=["buscarAlumnoNoAsociado", "buscarAlumnoAsociado"];
    for(var l=0; l<2; l++)
    {
        var buscador=document.createElement("input");
        buscador.setAttribute("type", "text");
        buscador.addEventListener("keyup", buscarAlumnoNoAsociado);
        buscador.setAttribute("id", itemsBuscadores[l]);
        buscador.setAttribute("name", itemsBuscadores[l]);
        var label=document.createElement("label");
        label.setAttribute("for", itemsBuscadores[l]);
        label.innerHTML="Buscar Alumno:"
        var div=document.getElementById("divTablaBuscar");
        var tituloTabla=document.createElement("h4");
        tituloTabla.style.marginBottom="10px";
        tituloTabla.style.marginTop="10px";
        var botonLimpiar;
        if(l==1)
        {
            var boton=document.createElement("button");
            boton.innerHTML="ver todos";
            boton.addEventListener("click", llenarTablaAsociados);
            boton.style.display="inline-block";
            div=document.getElementById("divTablaActualAsociados");  
            buscador.addEventListener("keyup", buscarAlumnoAsociado); 
            tituloTabla.innerHTML="ALUMNOS ASOCIADOS";
            div.append(tituloTabla);
            div.append(label);
            div.append(buscador); 
            div.append(boton);
            break;
        }
        if(l==0)
        {
            botonLimpiar=document.createElement("button");
            botonLimpiar.innerHTML="Limpiar";
            botonLimpiar.addEventListener("click", limpiarNoAsociados);
            botonLimpiar.style.display="inline-block";
        }
        tituloTabla.innerHTML="ALUMNOS NO ASOCIADOS";
        div.append(tituloTabla);
        div.append(label);
        div.append(buscador);
        div.append(botonLimpiar);  
    
    }
    // crearTabla(columnasTheadAsociado, idComponentesTablaAsociados,"divTablaActualAsociados");
    //crearTabla(columnasTheadNoAsociado, idComponentesTablaNoAsociados,"divTablaBuscar");
    crearTablaAsociados();
    llenarTablaAsociados();
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


