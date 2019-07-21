
window.onload=mostrarTablaAsignaturas;


var codigoAsignaturaSeleccionada;
var nombreAsignaturaSeleccionada;

var objbotonAsociar; //Variable global, solo usada para funciones asociadas a boton asociar
var objbotonDesAsociar //Variable global, solo usada para funciones asociadas a boton desAsociar.
var cantidadActualAsociados;

function mostrarTablaAsignaturas()
{
    tablaNoAsociadosPrincipal=true;
    //Llamada Ajax
    var peticionHTTP;
   
    if(window.XMLHttpRequest)
        peticionHTTP=new XMLHttpRequest();
    else
        peticionHTTP=new ActiveObject("Microsoft.XMLHTTP");
 
    peticionHTTP.onreadystatechange=funcionActuadora;
    peticionHTTP.open("POST", "../modelo/asignatura/obtenerAsignaturas.php", true);
    peticionHTTP.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    peticionHTTP.send(null); //No envian datos al servidor

    function funcionActuadora()
    {
        if(peticionHTTP.readyState==4 && peticionHTTP.status==200)
        {
            //se espera un array con las asignaturas registradas
            var respuesta=peticionHTTP.responseText;
            var jsonAsignaturas=JSON.parse(respuesta);
            var largoAsignaturas=jsonAsignaturas.length;

            var idComponentesTabla={"idTabla":"Asignaturas", "idThead": "theadAsignaturas", "idTbody": "tbodyAsignaturas"};
            var columnasThead=["Codigo", "Nombre", "Rut Profesor", "Sala", "Opciones", "Asociar"];
            
            crearTablaAsignaturas(columnasThead, idComponentesTabla,"divTablaAsignaturas");
            
            var tbody=document.getElementById("tbodyAsignaturas");

            for(var i=0; i<largoAsignaturas; i++)
            {
                var asignaturas=jsonAsignaturas[i];
                var fila=document.createElement("tr");
                fila.setAttribute("id", asignaturas.codigo);
                for(var j=0; j<4; j++)
                {
                    var item=Object.keys(asignaturas)[j];
                    var valor=asignaturas[item];
                    var columna=document.createElement("td");
                    columna.innerHTML=valor;
                    fila.append(columna);
                }
                
                //botones opciones(modificar y eliminar) y
                //botones asignar(alumnos, profesor y cursos)
                var botones=["MODIFICAR", "ELIMINAR", "ALUMNO", "PROFESOR", "CURSO", "BLOQUE"];
                var funciones=[modificarAsignatura, eliminarAsignatura, asignarAlumno, asignarProfesor, asignarCurso, asignarBloque];
                var columnaOpciones=document.createElement("td");
                var columnaAsignar=document.createElement("td");
                for(var k=0; k<6; k++)
                {
                    var boton=document.createElement("button");
                    boton.innerHTML=botones[k];
                    boton.className="btn"+botones[k];
                    boton.setAttribute("id", asignaturas.codigo);
                    boton.setAttribute("name", asignaturas.nombre);
                    boton.addEventListener("click", funciones[k]);
                    if(k<2)
                    {
                        columnaOpciones.append(boton);
                    }
                    if(k>1)
                    {
                        columnaAsignar.append(boton);
                    }    
                }
                fila.append(columnaOpciones);
                fila.append(columnaAsignar);
                tbody.append(fila);
            }
        }
    }
    function modificarAsignatura()
    {
        alert("Esta es la funcion modificar asignatura");
    }
    function eliminarAsignatura()
    {
        alert("Esta es la funcion eliminar asignatura");
    }
    function asignarAlumno()
    {
        codigoAsignaturaSeleccionada=this.id;
        nombreAsignaturaSeleccionada=this.name;
        iniciarAlumnos();
        // 
    }
    function asignarProfesor()
    {
        codigoAsignaturaSeleccionada=this.id;
        nombreAsignaturaSeleccionada=this.name;
        iniciarProfesores();
    }
    function asignarCurso()
    {
        codigoAsignaturaSeleccionada=this.id;
        nombreAsignaturaSeleccionada=this.name;
        iniciarCursos();
    }
    function asignarBloque()
    {

    }
}


function crearTablaAsignaturas(columnasThead, idComponentesTabla, idDivTabla)
{
    // columnasThead: 
    //        es un array con los nombres de las columnas para el thead.
    // idComponentesTabla: 
    //      es un Json con los id para la crearTabla, su thead y su tbody,
    //      su formato es {"idTabla":"", "idThead": "", "idTbody", ""}
    // idDivTabla: 
    //        es el id del div donde se mostrara la tabla de asignaturas.

    // Creacion de la tabla
    var divTabla=document.getElementById("divTablaAsignaturas");
    var tabla=document.createElement("table");
    var thead=document.createElement("thead");
    var tbody=document.createElement("tbody");
    tabla.setAttribute("id", idComponentesTabla.idTabla);
    thead.setAttribute("id", idComponentesTabla.idThead);
    tbody.setAttribute("id", idComponentesTabla.idTbody);
    var tr=document.createElement("tr");
    var cantColThead=columnasThead.length;

    for(var i=0; i<cantColThead; i++)
    {
        var th=document.createElement("th");
        th.innerHTML=columnasThead[i];
        tr.append(th);
    }
    thead.append(tr);
    tabla.append(thead);
    tabla.append(tbody);
    divTabla.append(tabla);
}

var respuestaAjax; //variable global que guarda la respuesta de cualquier llamada ajax,
//esta variable requiere de una funcion unica que la gestione.

// Esta funcion requiere de la url del servidor, parametros que enviar al servidor y una funcion
// que gestione la respuesta de la llamada, la cual se almacena en la variable global respuestaAjax

function llamadaAjax(url, parametros, gestionarRespuesta)
{
    var peticionHTTP;
   
    if(window.XMLHttpRequest)
        peticionHTTP=new XMLHttpRequest();
    else
        peticionHTTP=new ActiveObject("Microsoft.XMLHTTP");

    peticionHTTP.onreadystatechange=funcionActuadora;
    peticionHTTP.open("POST", url, true);
    peticionHTTP.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    peticionHTTP.send(parametros); //No envian datos al servidor

    function funcionActuadora()
    {
        if(peticionHTTP.readyState==4 && peticionHTTP.status==200)
        {
            respuestaAjax=peticionHTTP.responseText;
            gestionarRespuesta();
        }
    }
}

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


