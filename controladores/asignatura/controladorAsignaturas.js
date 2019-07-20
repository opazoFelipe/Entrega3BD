
window.onload=mostrarTablaAsignaturas;
function crearTablaAsignaturas(columnasThead, idComponentesTabla, idDivTabla)
{
    // columnasThead: 
    //        es un array con los nombres de las columnas para el thead.
    // idComponentesTabla: 
    //      es un Json con los id para la crearTabla, su thead y su tbody,
    //      su formato es {"idTabla":"", "idThead": "", "idTbody", ""}
    // idDivTabla: 
    //        es el id del div donde se mostrara la tabla de asignaturas.

    var divTabla=document.getElementById("divTablaAsignaturas");

    // Creacion de la tabla
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

var codigoAsignaturaSeleccionada;
var nombreAsignaturaSeleccionada;

function mostrarTablaAsignaturas()
{
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
            var columnasThead=["Codigo", "Nombre", "Rut Profesor", "Curso Asociado", "Sala", "Bloque Asignado", "Opciones", "Asociar"];
            
            crearTablaAsignaturas(columnasThead, idComponentesTabla,"divTablaAsignaturas");
            
            var tbody=document.getElementById("tbodyAsignaturas");

            for(var i=0; i<largoAsignaturas; i++)
            {
                var asignaturas=jsonAsignaturas[i];
                var fila=document.createElement("tr");
                fila.setAttribute("id", asignaturas.codigo);
                for(var j=0; j<6; j++)
                {
                    var item=Object.keys(asignaturas)[j];
                    var valor=asignaturas[item];
                    var columna=document.createElement("td");
                    columna.innerHTML=valor;
                    fila.append(columna);
                }
                
                //botones opciones(modificar y eliminar) y
                //botones asignar(alumnos, profesor y cursos)
                var botones=["Modificar", "Eliminar", "Alumno", "Profesor", "Curso"];
                var funciones=[modificarAsignatura, eliminarAsignatura, asignarAlumno, asignarProfesor, asignarCurso];
                var columnaOpciones=document.createElement("td");
                var columnaAsignar=document.createElement("td");
                for(var k=0; k<5; k++)
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
        document.getElementById("Asignaturas").style.display="hidden";
    }
    function asignarProfesor()
    {
        alert("Esta es la funcion eliminar asignarProfesor");
    }
    function asignarCurso()
    {
        alert("Esta es la funcion eliminar asignarCurso");
    }
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

function crearTablaAsociados()
{
    var idComponentesTablaAsociados=
    {
        "idTabla":"desAsociarAlumno", 
        "idThead": "theadDesAsociarAlumno", 
        "idTbody": "tbodyDesAsociarAlumno"
    };

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

var divTituloAsignatura;//Variable Global
function tablaAlumnos(nombreAsignatura)
{
    document.getElementById("divBuscarAsignatura").style.display = 'none';
    document.getElementById("divTablaAsignaturas").style.display = 'none';
    divInfoTabla=document.getElementById("infoTablaAsociar");
    divTituloAsignatura=document.getElementById("tituloAsignatura");
    var TituloAsignatura=document.createElement("h2");
    TituloAsignatura.innerHTML=nombreAsignaturaSeleccionada;
    divTituloAsignatura.append(TituloAsignatura);
    
    parrafo=document.createElement("p");
    parrafo.innerHTML=" Alumnos no asociados a "+nombreAsignatura;
    parrafo.style.display="inline-block";
    var botonFinalizar=document.createElement("button");
    botonFinalizar.innerHTML="Listo";
    botonFinalizar.style.display="inline-block";
    botonFinalizar.style.marginLeft="5px";
    botonFinalizar.addEventListener("click", finalizarAlumnos);
    divInfoTabla.append(botonFinalizar);

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
        if(l==1)
        {
            div=document.getElementById("divTablaActualAsociados");  
            buscador.addEventListener("keyup", buscarAlumnoAsociado); 
            tituloTabla.innerHTML="ALUMNOS ASOCIADOS";
            div.append(tituloTabla);
            div.append(label);
            div.append(buscador); 
            
            break;
        }
        tituloTabla.innerHTML="ALUMNOS NO ASOCIADOS";
        div.append(tituloTabla);
        div.append(label);
        div.append(buscador);  
    
    }
    // crearTabla(columnasTheadAsociado, idComponentesTablaAsociados,"divTablaActualAsociados");
    //crearTabla(columnasTheadNoAsociado, idComponentesTablaNoAsociados,"divTablaBuscar");
    tablaAsociadosIniciada=0;
    crearTablaAsociados();
    llenarTablaAsociados();
}
//Funcion para buscar coincidencias de alumnos al escribir en el buscador,
//esta hecha para la funcion asociar alumno, para el input buscarAlumnoNoAsociado
function buscarAlumnoNoAsociado()
{
    var buscador=document.getElementById("buscarAlumnoNoAsociado");
    var clave=buscador.value;
    if(clave.length > 0)
    {
        clave="coincidencia="+clave;
        // Llamada Ajax
        var urlServidor="../modelo/alumno/buscarAlumnoNoAsociado.php";
        var parametros=clave+"&codigoAsignatura="+codigoAsignaturaSeleccionada;
        llamadaAjax(urlServidor, parametros, mostrarAlumnosNoAsociados);
    }
    else limpiarTabla("tbodyAsociarAlumno");
}

var gTablaNoAsociados=0;
function mostrarAlumnosNoAsociados()
{
    if(respuestaAjax=="vacio")
    {
        respuestaAjax="";
    }
    else
    {
        var jsonAlumnos=JSON.parse(respuestaAjax);
        var largoAlumnos=jsonAlumnos.length;

        if(gTablaNoAsociados==0)
        {
            crearTablaNoAsociados();
            var columnasTheadNoAsociado=
            [
                "Rut", 
                "Nombres", 
                "Apellidos", 
                "Opcion"
            ]; 

            var tablaNoAsociados=document.getElementById("asociarAlumno");
            var thead=document.getElementById("theadAsociarAlumno");
            var filaThead=document.createElement("tr");
            for(var k=0; k<4; k++)
            {
                var th=document.createElement("th");
                th.innerHTML=columnasTheadNoAsociado[k];
                filaThead.append(th);
            }
            thead.append(filaThead);
            gTablaNoAsociados=1;
        }
        
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
            boton.innerHTML="A";
            boton.className="btnAsociarAlumno";
            boton.addEventListener("click", botonAsociar);
            columnaOpcion.append(boton);
            fila.append(columnaOpcion);
            tbody.append(fila);
        }
        respuestaAjax="";
    }
}

var buscadorAsociadosVacio=0;
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
        llamadaAjax(urlServidor, parametros, mostrarAlumnosAsociadosCoincidencia);
    }
    else 
    {
        alert(buscadorAsociadosVacio);
        if(buscadorAsociadosVacio==0)
        {
            llenarTablaAsociados();
            buscadorAsociadosVacio=1;
        } 
    }
}

function mostrarAlumnosAsociadosCoincidencia()
{
    if(respuestaAjax=="vacio")
    {
        respuestaAjax="";
        document.getElementById("desAsociarAlumno").remove();
        gTablaAsociados=0;
        buscadorAsociadosVacio=0;
    }
    else
    {
        gTablaAsociados=0;
        buscadorAsociadosVacio=0;
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
            boton.innerHTML="desAsociar";
            boton.className="btnAsociarAlumno";
            boton.addEventListener("click", botonDesAsociar);
            columnaOpcion.append(boton);
            fila.append(columnaOpcion);
            tbody.append(fila);
        }
        respuestaAjax="";
    }  
}

var tablaAsociadosIniciada=0;
var tablaNoAsociadosIniciada=0; //Variable global para cuando se usa el buscador de alumnos asociados
function llenarTablaAsociados()
{
    //Llamada Ajax
    var urlServidor="../modelo/alumno/getAlumnosAsociados.php";
    var parametros="codigoAsignatura="+codigoAsignaturaSeleccionada;
    llamadaAjax(urlServidor, parametros, mostrarAlumnosAsociados);
}

var gTablaAsociados=0;
function mostrarAlumnosAsociados()
{
    if(respuestaAjax == "vacio")
    {
        
    }
    else
    {   
        var jsonAlumnos=JSON.parse(respuestaAjax);
        var largoAlumnos=jsonAlumnos.length;
        var buscador=document.getElementById("buscarAlumnoAsociado");

        if(gTablaAsociados==0)
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

            var tablaAsociados=document.getElementById("desAsociarAlumno");
            var thead=document.getElementById("theadDesAsociarAlumno");
            var filaThead=document.createElement("tr");
            for(var k=0; k<4; k++)
            {
                var th=document.createElement("th");
                th.innerHTML=columnasTheadAsociado[k];
                filaThead.append(th);
            }
            thead.append(filaThead);
            tablaAsociados.append(thead);
            gTablaAsociados=1;
        }
        
        var parrafo=document.createElement("p");
        parrafo.innerHTML="Cantidad Alumnos Asociados: "+largoAlumnos;
        parrafo.style.marginTop="0";
        divTituloAsignatura.append(parrafo);

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
            boton.innerHTML="DesAsociar";
            boton.setAttribute("id", alumnos.rut);
            boton.className="btnEliminarAlumno";
            boton.addEventListener("click", botonDesAsociar);
            columnaOpcion.append(boton);
            fila.append(columnaOpcion);
            tbody.append(fila);
        }
        respuestaAjax="";
    } 
}

function limpiarTabla(idTbody)
{
    // var tbody=document.getElementById(idTbody);
    // tbody.innerHTML="";
}

// --------------------------------------------------------------------------------------------------
// |               Funciones de los botones asociar y desasocar Alumnos                             |     |                                                                                                |
// |------------------------------------------------------------------------------------------------|

var objbotonAsociar; //Variable global, solo usada para funciones asociadas a boton asociar
var objbotonDesAsociar //Variable global, solo usada para funciones asociadas a boton desAsociar.
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
        var tbodyAsociados=document.getElementById("tbodyDesAsociarAlumno");
        var fila=objbotonAsociar.parentNode.parentNode;
        fila.remove();
        // var columnas=fila.childNodes;
        // var largoColumnas=columnas.length;
        // var nuevaFila=document.createElement("tr");
        // for(var i=0; i<largoColumnas-1; i++)
        // {
        //     var columna=document.createElement("td");
        //     columna.innerHTML=columnas[i].innerHTML;
        //     nuevaFila.append(columna);
        // }
        // var columnaNotaFinal=document.createElement("td");
        // columnaNotaFinal.innerHTML="Por Asignar";
        // nuevaFila.append(columnaNotaFinal);
        // var columnaOpcion=document.createElement("td");
        // var boton=document.createElement("button");
        // boton.setAttribute("id", objbotonAsociar.id);
        // boton.innerHTML="desAsociar";
        // boton.addEventListener("click", botonDesAsociar);
        // columnaOpcion.append(boton);
        // nuevaFila.append(columnaOpcion);
        // tbodyAsociados.append(nuevaFila);
    }else alert("Error al asociar alumno a asignatura");
    respuestaAjax="";
    objbotonAsociar="";
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
    }else 
    {
       alert("Error al desAsociar Alumno");     
    }    
    respuestaAjax="";
    objbotonAsociar="";
}

function finalizarAlumnos()
{
    document.getElementById("divBuscarAsignatura").style.display="block";
    document.getElementById("divTablaAsignaturas").style.display="block";
    document.getElementById("infoTablaAsociar").innerHTML="";
    document.getElementById("divTablaBuscar").innerHTML="";
    document.getElementById("divTablaActualAsociados").innerHTML="";
    document.getElementById("infoTablaAsociados").innerHTML="";
    document.getElementById("tituloAsignatura").innerHTML="";
    codigoAsignaturaSeleccionada="";
    nombreAsignaturaSeleccionada="";
    gTablaNoAsociados=0;
    mostrarTablaAsignaturas;
}
function iniciarAlumnos()
{
    tablaAlumnos(nombreAsignaturaSeleccionada);
}





