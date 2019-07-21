
// --------------------------------------------------------------------------------------------------
// |               Funciones par iniciar y finalizar la asociacion o desasociacion de Cursos        |                                                                                                |
// |------------------------------------------------------------------------------------------------|

function tablaCursos()
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
    botonFinalizar.addEventListener("click", finalizarCursos);
    divTituloAsignatura.append(botonFinalizar);

    //Crear los buscadores 
    var itemsBuscadores=["buscarCursoNoAsociado", "buscarCursoAsociado"];
    for(var l=0; l<2; l++)
    {
        var buscador=document.createElement("input");
        buscador.setAttribute("type", "text");
        buscador.addEventListener("keyup", buscarCursoNoAsociado);
        buscador.setAttribute("id", itemsBuscadores[l]);
        buscador.setAttribute("name", itemsBuscadores[l]);
        var label=document.createElement("label");
        label.setAttribute("for", itemsBuscadores[l]);
        label.innerHTML="Buscar Curso:"
        var div=document.getElementById("divTablaBuscar");
        var tituloTabla=document.createElement("h4");
        tituloTabla.style.marginBottom="10px";
        tituloTabla.style.marginTop="10px";
        if(l==1)
        {
            var boton=document.createElement("button");
            boton.innerHTML="ver todos";
            boton.addEventListener("click", llenarTablaCursosAsociados);
            boton.style.display="inline-block";
            div=document.getElementById("divTablaActualAsociados");  
            buscador.addEventListener("keyup", buscarCursoAsociado); 
            tituloTabla.innerHTML="CURSOS ASOCIADOS";
            div.append(tituloTabla);
            div.append(label);
            div.append(buscador); 
            div.append(boton);
            break;
        }
        tituloTabla.innerHTML="CURSOS NO ASOCIADOS";
        div.append(tituloTabla);
        div.append(label);
        div.append(buscador);  
    
    }

    llenarTablaCursosAsociados();
}

function iniciarCursos()
{
    tablaCursos(nombreAsignaturaSeleccionada);
    document.getElementById("Asignaturas").remove();
}

function finalizarCursos()
{
    document.getElementById("infoTablaAsociar").innerHTML="";
    document.getElementById("divTablaBuscar").innerHTML="";
    document.getElementById("divTablaActualAsociados").innerHTML="";
    document.getElementById("infoTablaAsociados").innerHTML="";
    document.getElementById("tituloAsignatura").innerHTML="";
    codigoAsignaturaSeleccionada="";
    nombreAsignaturaSeleccionada="";
    mostrarTablaAsignaturas();
}

// --------------------------------------------------------------------------------------------------
// |               Funciones para la tabla de Cursos ASOCIADOS                                     |                                                                                                |
// |------------------------------------------------------------------------------------------------|

function crearTablaCursosAsociados()
{
    var divTabla=document.getElementById("divTablaActualAsociados");
    var tabla=document.createElement("table");
    var thead=document.createElement("thead");
    var tbody=document.createElement("tbody");

    tabla.setAttribute("id", "desAsociarCurso");
    thead.setAttribute("id", "theadDesAsociarCurso");
    tbody.setAttribute("id", "tbodyDesAsociarCurso");

    tabla.append(thead);
    tabla.append(tbody);
    divTabla.append(tabla);

}

function llenarTablaCursosAsociados()
{
    //Llamada Ajax  
    if(document.getElementById("desAsociarCurso"))
        document.getElementById("desAsociarCurso").remove();
    var urlServidor="../modelo/curso/getCursosAsociados.php";
    var parametros="codigoAsignatura="+codigoAsignaturaSeleccionada;
    llamadaAjax(urlServidor, parametros, mostrarCursosAsociados);
}

function mostrarCursosAsociados()
{
    if(respuestaAjax == "vacio")
    {
        if(document.getElementById("desAsociarCurso"))
            document.getElementById("desAsociarCurso").remove();
        llenarTablaCursosAsociados();
    }
    else
    {   if(document.getElementById("desAsociarCurso"))
        {
            document.getElementById("desAsociarCurso").remove();
        }
        var jsonCursos=JSON.parse(respuestaAjax);
        var largoCursos=jsonCursos.length;
        cantidadActualAsociados=largoCursos;

        if(!document.getElementById("parrafoCantidadAsociados"))
        {
            var parrafo=document.createElement("p");
            parrafo.setAttribute("id", "parrafoCantidadAsociados");
            parrafo.innerHTML="Cantidad Cursos Asociados: "+largoCursos;
            parrafo.style.marginTop="0";
            divTituloAsignatura.append(parrafo);
        }
        
        //si no existe la tabla de alumnos asociados entonces se crea
        if(!document.getElementById("desAsociarCurso"))
        {
            crearTablaCursosAsociados();
            var columnasTheadAsociado=
            [
                "Codigo", 
                "Rut Profesor Jefe", 
                "Año"
            ];
            var thead=document.getElementById("theadDesAsociarCurso");
            var filaThead=document.createElement("tr");
            for(var k=0; k<3; k++)
            {
                var th=document.createElement("th");
                th.innerHTML=columnasTheadAsociado[k];
                filaThead.append(th);
            }
            thead.append(filaThead);
        }

        var tbody=document.getElementById("tbodyDesAsociarCurso");

        for(var i=0; i<largoCursos; i++)
        {
            var cursos=jsonCursos[i];
            var codigoCurso=cursos.codigo;
            var fila=document.createElement("tr");
            fila.setAttribute("id", codigoCurso);
            for(var j=0; j<3; j++)
            {
                var item=Object.keys(cursos)[j];
                var valor=cursos[item];
                var columna=document.createElement("td");
                columna.innerHTML=valor;
                fila.append(columna);
            }
            //boton desAsociar Curso
            var columnaOpcion=document.createElement("td");
            var boton=document.createElement("button");
            boton.innerHTML="Remover";
            boton.setAttribute("id", codigoCurso);
            boton.className="btnEliminarCurso";
            boton.addEventListener("click", botonDesAsociarCurso);
            columnaOpcion.append(boton);
            fila.append(columnaOpcion);
            tbody.append(fila);
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
        // Llamada Ajax
        var urlServidor="../modelo/curso/buscarCursoAsociado.php";
        var parametros=clave+"&codigoAsignatura="+codigoAsignaturaSeleccionada;
        ultimoLargoBuscador=buscador.value.length;
        llamadaAjax(urlServidor, parametros, mostrarCursosAsociadosCoincidencia);
    }
    else
    {
        if(!document.getElementById("desAsociarCurso"))
        {
            llenarTablaCursosAsociados();
        }
    }
}

function mostrarCursosAsociadosCoincidencia()
{
    if(respuestaAjax=="vacio")
    {
        if(document.getElementById("desAsociarCurso"))
            document.getElementById("desAsociarCurso").remove();
    }
    else
    {
        mostrarCursosAsociados();
    }  
}

function botonDesAsociarCurso()
{
    //Implementar el codigo asignatura a enviar, por ahora es uno de prueba(6)
    objbotonDesAsociar=this;
    var urlServidor="../modelo/curso/desAsociarCurso.php";
    var codigoCurso=this.id;
    var parametros="codigoCurso="+codigoCurso+"&codigoAsignatura="+codigoAsignaturaSeleccionada;
    llamadaAjax(urlServidor, parametros, desAsociarCurso);
}

function desAsociarCurso()
{
    if(respuestaAjax=="hecho")
    {
        var fila=objbotonDesAsociar.parentNode.parentNode;
        fila.remove();
        cantidadActualAsociados=cantidadActualAsociados-1;
        document.getElementById("parrafoCantidadAsociados").innerHTML="Cantidad Cursos Asociados: "+cantidadActualAsociados;
        if(document.getElementById("tbodyDesAsociarCurso"))
        {
            if(document.getElementById("tbodyDesAsociarCurso").childNodes.length==0)
            {
                document.getElementById("desAsociarCurso").remove();
            }
        }
    }else 
    {
       alert("Error al desAsociar Curso");     
    }    
    respuestaAjax="";
    objbotonDesAsociar="";
}


// --------------------------------------------------------------------------------------------------
// |               Funciones para la tabla de Cursos NO ASOCIADOS                                   |                                                                                                |
// |------------------------------------------------------------------------------------------------|

function crearTablaCursosNoAsociados()
{
    var divTabla=document.getElementById("divTablaBuscar");
    var tabla=document.createElement("table");
    var thead=document.createElement("thead");
    var tbody=document.createElement("tbody");

    tabla.setAttribute("id", "asociarCurso");
    thead.setAttribute("id", "theadAsociarCurso");
    tbody.setAttribute("id", "tbodyAsociarCurso");

    tabla.append(thead);
    tabla.append(tbody);
    divTabla.append(tabla);
}

function buscarCursoNoAsociado()
{
    var buscador=document.getElementById("buscarCursoNoAsociado");
    var clave=buscador.value;
    if(clave.length > 0)
    {
        stringAnteriorBuscadorNoAsociados=clave;
        clave="coincidencia="+clave;
        // Llamada Ajax
        var urlServidor="../modelo/curso/buscarCursoNoAsociado.php";
        var parametros=clave+"&codigoAsignatura="+codigoAsignaturaSeleccionada;
        llamadaAjax(urlServidor, parametros, mostrarCursosNoAsociados);
    }
    else
    {
        if(document.getElementById("asociarCurso"))
        {
            document.getElementById("asociarCurso").remove();
        }
    }
}

function mostrarCursosNoAsociados()
{
    if(respuestaAjax=="vacio")
    {
        if(document.getElementById("asociarCurso"))
        {
            document.getElementById("asociarCurso").remove();
        }
    }
    else
    {
        if(document.getElementById("asociarCurso"))
        {
            document.getElementById("asociarCurso").remove();
           
        }
        stringAnteriorBuscadorAsociados=document.getElementById("buscarCursoNoAsociado").value;

        var jsonCursos=JSON.parse(respuestaAjax);
        var largoCursos=jsonCursos.length;

        if(!document.getElementById("asociarAlumno"))
        {
            crearTablaCursosNoAsociados();
            var columnasTheadNoAsociado=
            [
                "Codigo", 
                "Rut Profesor Jefe", 
                "Año"
            ]; 

            thead=document.getElementById("theadAsociarCurso");
            var filaThead=document.createElement("tr");
            for(var k=0; k<3; k++)
            {
                var th=document.createElement("th");
                th.innerHTML=columnasTheadNoAsociado[k];
                filaThead.append(th);
            }
            thead.append(filaThead);
        }
        
        var tbody=document.getElementById("tbodyAsociarCurso");
        
        for(var i=0; i<largoCursos; i++)
        {
            var cursos=jsonCursos[i];
            var codigo=cursos.codigo;
            var fila=document.createElement("tr");
            fila.setAttribute("id", codigo);
            for(var j=0; j<3; j++)
            {
                var item=Object.keys(cursos)[j];
                var valor=cursos[item];
                var columna=document.createElement("td");
                columna.innerHTML=valor;
                fila.append(columna);
            }
            //boton Asociar alumno
            var columnaOpcion=document.createElement("td");
            var boton=document.createElement("button");
            boton.setAttribute("id", codigo);
            boton.innerHTML="Asociar";
            boton.className="btnAsociarCurso";
            boton.addEventListener("click", botonAsociarCurso);
            columnaOpcion.append(boton);
            fila.append(columnaOpcion);
            tbody.append(fila);
        }
    }
}

function botonAsociarCurso()
{
    //Implementar el codigo asignatura a enviar, por ahora es uno de prueba(6)
    objbotonAsociar=this;
    var urlServidor="../modelo/curso/asociarCurso.php";
    var codigoCurso=this.id;
    var parametros="codigoCurso="+codigoCurso+"&codigoAsignatura="+codigoAsignaturaSeleccionada;
    llamadaAjax(urlServidor, parametros, asociarCurso);
}

function asociarCurso()
{
    if(respuestaAjax=="hecho")
    {
        cantidadActualAsociados=cantidadActualAsociados+1;
        document.getElementById("parrafoCantidadAsociados").innerHTML="Cantidad Cursos Asociados: "+cantidadActualAsociados;
        var fila=objbotonAsociar.parentNode.parentNode;
        fila.remove();
        if(document.getElementById("tbodyAsociarCurso"))
        {
            if(document.getElementById("tbodyAsociarCurso").childNodes.length==0)
            {
                document.getElementById("AsociarCurso").remove();
            }
        }
    }else alert("Error al asociar curso a asignatura");
    respuestaAjax="";
    objbotonAsociar="";
}