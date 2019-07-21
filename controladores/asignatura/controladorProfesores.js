// --------------------------------------------------------------------------------------------------
// |               Funciones par iniciar y finalizar la asociacion o desasociacion de Profesores    |                       
// |------------------------------------------------------------------------------------------------|

function tablaProfesores()
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
    botonFinalizar.addEventListener("click", finalizarProfesores);
    divTituloAsignatura.append(botonFinalizar);

    //Crear los buscadores 
    var itemsBuscadores=["buscarProfesorNoAsociado", "buscarProfesorAsociado"];
    for(var l=0; l<2; l++)
    {
        var buscador=document.createElement("input");
        buscador.setAttribute("type", "text");
        buscador.addEventListener("keyup", buscarProfesorNoAsociado);
        buscador.setAttribute("id", itemsBuscadores[l]);
        buscador.setAttribute("name", itemsBuscadores[l]);
        var label=document.createElement("label");
        label.setAttribute("for", itemsBuscadores[l]);
        label.innerHTML="Buscar Profesor:"
        var div=document.getElementById("divTablaBuscar");
        var tituloTabla=document.createElement("h4");
        tituloTabla.style.marginBottom="10px";
        tituloTabla.style.marginTop="10px";
        if(l==1)
        {
            // var boton=document.createElement("button");
            // boton.innerHTML="ver todos";
            // boton.addEventListener("click", llenarTablaProfesoresAsociados);
            // boton.style.display="inline-block";
            div=document.getElementById("divTablaActualAsociados");  
            // buscador.addEventListener("keyup", buscarProfesorAsociado); 
            tituloTabla.innerHTML="PROFESOR ASOCIADO";
            div.append(tituloTabla);
            // div.append(label);
            // div.append(buscador); 
            // div.append(boton);
            break;
        }
        tituloTabla.innerHTML="PROFESORES NO ASOCIADOS";
        div.append(tituloTabla);
        div.append(label);
        div.append(buscador);  
    
    }

    llenarTablaProfesoresAsociados();
}

function iniciarProfesores()
{
    tablaProfesores(nombreAsignaturaSeleccionada);
    document.getElementById("Asignaturas").remove();
}

function finalizarProfesores()
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
// |               Funciones para la tabla de Profesores ASOCIADOS                                  |
// |------------------------------------------------------------------------------------------------|

function crearTablaProfesoresAsociados()
{
    var divTabla=document.getElementById("divTablaActualAsociados");
    var tabla=document.createElement("table");
    var thead=document.createElement("thead");
    var tbody=document.createElement("tbody");

    tabla.setAttribute("id", "desAsociarProfesor");
    thead.setAttribute("id", "theadDesAsociarProfesor");
    tbody.setAttribute("id", "tbodyDesAsociarProfesor");

    tabla.append(thead);
    tabla.append(tbody);
    divTabla.append(tabla);

}

function llenarTablaProfesoresAsociados()
{
    //Llamada Ajax  
    if(document.getElementById("desAsociarProfesor"))
        document.getElementById("desAsociarProfesor").remove();
    var urlServidor="../modelo/profesor/getProfesoresAsociados.php";
    var parametros="codigoAsignatura="+codigoAsignaturaSeleccionada;
    llamadaAjax(urlServidor, parametros, mostrarProfesoresAsociados);
}

function mostrarProfesoresAsociados()
{
    if(respuestaAjax == "vacio")
    {
        if(document.getElementById("desAsociarProfesor"))
            document.getElementById("desAsociarProfesor").remove();
        llenarTablaProfesoresAsociados();
    }
    else
    {   if(document.getElementById("desAsociarProfesor"))
        {
            document.getElementById("desAsociarProfesor").remove();
        }
        var jsonProfesores=JSON.parse(respuestaAjax);
        var largoProfesores=jsonProfesores.length;
        cantidadActualAsociados=largoProfesores;
        
        //si no existe la tabla de profesores asociados entonces se crea
        if(!document.getElementById("desAsociarProfesor"))
        {
            crearTablaProfesoresAsociados();
            var columnasTheadAsociado=
            [
                "Rut", 
                "Nombres", 
                "Apellidos"
            ];
            var thead=document.getElementById("theadDesAsociarProfesor");
            var filaThead=document.createElement("tr");
            for(var k=0; k<3; k++)
            {
                var th=document.createElement("th");
                th.innerHTML=columnasTheadAsociado[k];
                filaThead.append(th);
            }
            thead.append(filaThead);
        }

        var tbody=document.getElementById("tbodyDesAsociarProfesor");

        for(var i=0; i<largoProfesores; i++)
        {
            var profesores=jsonProfesores[i];
            var rutProfesor=profesores.rutProfesor;
            var fila=document.createElement("tr");
            fila.setAttribute("id", rutProfesor);
            for(var j=0; j<3; j++)
            {
                var item=Object.keys(profesores)[j];
                var valor=profesores[item];
                var columna=document.createElement("td");
                columna.innerHTML=valor;
                fila.append(columna);
            }
            //boton desAsociar Profesor
            // var columnaOpcion=document.createElement("td");
            // var boton=document.createElement("button");
            // boton.innerHTML="Remover";
            // boton.setAttribute("id", rutProfesor);
            // boton.className="btnEliminarCurso";
            // boton.addEventListener("click", botonDesAsociarProfesor);
            // columnaOpcion.append(boton);
            // fila.append(columnaOpcion);
            tbody.append(fila);
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
        // Llamada Ajax
        var urlServidor="../modelo/profesor/buscarProfesorAsociado.php";
        var parametros=clave+"&codigoAsignatura="+codigoAsignaturaSeleccionada;
        ultimoLargoBuscador=buscador.value.length;
        llamadaAjax(urlServidor, parametros, mostrarProfesoresAsociadosCoincidencia);
    }
    else
    {
        if(!document.getElementById("desAsociarProfesor"))
        {
            llenarTablaProfesoresAsociados();
        }else document.getElementById("desAsociarProfesor").remove();
    }
}

function mostrarProfesoresAsociadosCoincidencia()
{
    if(respuestaAjax=="vacio")
    {
        if(document.getElementById("desAsociarProfesor"))
            document.getElementById("desAsociarProfesor").remove();
    }
    else
    {
        mostrarProfesoresAsociados();
    }  
}

function botonDesAsociarProfesor()
{
    //Implementar el codigo asignatura a enviar, por ahora es uno de prueba(6)
    objbotonDesAsociar=this;
    var urlServidor="../modelo/profesor/desAsociarProfesor.php";
    var rutProfesor=this.id;
    var parametros="codigoAsignatura="+codigoAsignaturaSeleccionada;
    llamadaAjax(urlServidor, parametros, desAsociarProfesor);
}

function desAsociarProfesor()
{
    if(respuestaAjax=="hecho")
    {
        var fila=objbotonDesAsociar.parentNode.parentNode;
        fila.remove();
        cantidadActualAsociados=cantidadActualAsociados-1;
        document.getElementById("parrafoCantidadAsociados").innerHTML="Cantidad Profesores Asociados: "+cantidadActualAsociados;
        if(document.getElementById("tbodyDesAsociarProfesor"))
        {
            if(document.getElementById("tbodyDesAsociarProfesor").childNodes.length==0)
            {
                document.getElementById("desAsociarProfesor").remove();
            }
        }
    }else 
    {
       alert("Error al desAsociar Profesor");     
    }    
    respuestaAjax="";
    objbotonDesAsociar="";
}


// --------------------------------------------------------------------------------------------------
// |               Funciones para la tabla de Profesores NO ASOCIADOS                               |                   
// |------------------------------------------------------------------------------------------------|

function crearTablaProfesoresNoAsociados()
{
    var divTabla=document.getElementById("divTablaBuscar");
    var tabla=document.createElement("table");
    var thead=document.createElement("thead");
    var tbody=document.createElement("tbody");

    tabla.setAttribute("id", "asociarProfesor");
    thead.setAttribute("id", "theadAsociarProfesor");
    tbody.setAttribute("id", "tbodyAsociarProfesor");

    tabla.append(thead);
    tabla.append(tbody);
    divTabla.append(tabla);
}

function buscarProfesorNoAsociado()
{
    var buscador=document.getElementById("buscarProfesorNoAsociado");
    var clave=buscador.value;
    if(clave.length > 0)
    {
        stringAnteriorBuscadorNoAsociados=clave;
        clave="coincidencia="+clave;
        // Llamada Ajax
        var urlServidor="../modelo/profesor/buscarProfesorNoAsociado.php";
        var parametros=clave+"&codigoAsignatura="+codigoAsignaturaSeleccionada;
        llamadaAjax(urlServidor, parametros, mostrarProfesoresNoAsociados);
    }
    else
    {
        if(document.getElementById("asociarProfesor"))
        {
            document.getElementById("asociarProfesor").remove();
        }
    }
}

function mostrarProfesoresNoAsociados()
{
    if(respuestaAjax=="vacio")
    {
        if(document.getElementById("asociarProfesor"))
        {
            document.getElementById("asociarProfesor").remove();
        }
    }
    else
    {
        if(document.getElementById("asociarProfesor"))
        {
            document.getElementById("asociarProfesor").remove();
           
        }

        var jsonProfesores=JSON.parse(respuestaAjax);
        var largoProfesores=jsonProfesores.length;

        if(!document.getElementById("asociarProfesor"))
        {
            crearTablaProfesoresNoAsociados();
            var columnasTheadNoAsociado=
            [
                "Codigo", 
                "Rut Profesor Jefe", 
                "Año"
            ]; 

            thead=document.getElementById("theadAsociarProfesor");
            var filaThead=document.createElement("tr");
            for(var k=0; k<3; k++)
            {
                var th=document.createElement("th");
                th.innerHTML=columnasTheadNoAsociado[k];
                filaThead.append(th);
            }
            thead.append(filaThead);
        }
        
        var tbody=document.getElementById("tbodyAsociarProfesor");
        
        for(var i=0; i<largoProfesores; i++)
        {
            var profesores=jsonProfesores[i];
            var rutProfesor=profesores.rut;
            var fila=document.createElement("tr");
            fila.setAttribute("id", rutProfesor);
            for(var j=0; j<3; j++)
            {
                var item=Object.keys(profesores)[j];
                var valor=profesores[item];
                var columna=document.createElement("td");
                columna.innerHTML=valor;
                fila.append(columna);
            }
            //boton Asociar alumno
            var columnaOpcion=document.createElement("td");
            var boton=document.createElement("button");
            boton.setAttribute("id", rutProfesor);
            boton.innerHTML="Asociar";
            boton.className="btnAsociarProfesor";
            boton.addEventListener("click", botonAsociarProfesor);
            columnaOpcion.append(boton);
            fila.append(columnaOpcion);
            tbody.append(fila);
        }
    }
}

function botonAsociarProfesor()
{
    //Implementar el codigo asignatura a enviar, por ahora es uno de prueba(6)
    objbotonAsociar=this;
    var urlServidor="../modelo/profesor/asociarProfesor.php";
    var rutProfesor=this.id;
    var parametros="rutProfesor="+rutProfesor+"&codigoAsignatura="+codigoAsignaturaSeleccionada;
    llamadaAjax(urlServidor, parametros, asociarProfesor);
}

function asociarProfesor()
{
    if(respuestaAjax=="hecho")
    {
        var fila=objbotonAsociar.parentNode.parentNode;
        fila.remove();
        if(document.getElementById("tbodyAsociarProfesor"))
        {
            if(document.getElementById("tbodyAsociarProfesor").childNodes.length==0)
            {
                document.getElementById("AsociarCurso").remove();
            }
        }
        llenarTablaProfesoresAsociados();
    }else alert("Error al asociar profesor a asignatura");
    respuestaAjax="";
    objbotonAsociar="";
}
