
window.onload=iniciar;

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

//Esta funcion sirve para crear todas las tablas que se implementaran
function crearTabla(columnasThead, idComponentesTabla, idDivTabla)
{
    // columnasThead: 
    //        es un array con los nombres de las columnas para el thead.
    // idComponentesTabla: 
    //      es un Json con los id para la crearTabla, su thead y su tbody,
    //      su formato es {"idTabla":"", "idThead": "", "idTbody", ""}
    // idDivTabla: 
    //        es el id del div donde se mostrara la tabla de asignaturas.

    var divTabla=document.getElementById(idDivTabla);

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

function tablaAlumnos(nombreAsignatura)
{
    divInfoTabla=document.getElementById("infoTablaAsociar");
    parrafo=document.createElement("p");
    parrafo.innerHTML=nombreAsignatura;
    divInfoTabla.append(parrafo);
    var idComponentesTablaNoAsociados=
    {
        "idTabla":"asociarAlumno", 
        "idThead": "theadAsociarAlumno", 
        "idTbody": "tbodyAsociarAlumno"
    };
    var idComponentesTablaAsociados=
    {
        "idTabla":"desAsociarAlumno", 
        "idThead": "theadDesAsociarAlumno", 
        "idTbody": "tbodyDesAsociarAlumno"
    };
    var columnasTheadAsociado=
    [
        "Rut", 
        "Nombres", 
         "Apellidos",
        "Nota Final", 
        "Opcion"
    ];
    var columnasTheadNoAsociado=
    [
        "Rut", 
        "Nombres", 
        "Apellidos", 
        "Opcion"
    ];          
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
        if(l==1)
        {
            div=document.getElementById("divTablaActualAsociados");       
        }
        div.append(label);
        div.append(buscador);  
    }
    crearTabla(columnasTheadAsociado, idComponentesTablaAsociados,"divTablaActualAsociados");
    crearTabla(columnasTheadNoAsociado, idComponentesTablaNoAsociados,"divTablaBuscar");
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
        var urlServidor="../modelo/buscarAlumnoNoAsociado.php";
        var parametros=clave;
        llamadaAjax(urlServidor, parametros, mostrarAlumnosNoAsociados);
    }
    else limpiarTabla("tbodyAsociarAlumno");
}

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

function desAsociarAlumno()
{
    alert("funcion desAsociarAlumno");
}

function llenarTablaAsociados()
{
    //Llamada Ajax
    var urlServidor="../modelo/getAlumnosAsociados.php";
    var parametros="codigoAsignatura=6";
    llamadaAjax(urlServidor, parametros, mostrarAlumnosAsociados);
}

function mostrarAlumnosAsociados()
{
    if(respuestaAjax == "vacio")
    {
    }
    else
    {    
        var jsonAlumnos=JSON.parse(respuestaAjax);
        var largoAlumnos=jsonAlumnos.length;
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
    var tbody=document.getElementById(idTbody);
    tbody.innerHTML="";
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
    var urlServidor="../modelo/asociarAlumno.php";
    var rut=this.id;
    var codigoAsignatura=6;
    var parametros="rut="+rut+"&codigoAsignatura="+codigoAsignatura;
    llamadaAjax(urlServidor, parametros, asociarAlumno);
}

function asociarAlumno()
{
    if(respuestaAjax=="hecho")
    {
        var tbodyAsociados=document.getElementById("tbodyDesAsociarAlumno");
        var fila=objbotonAsociar.parentNode.parentNode;
        fila.remove();
        var columnas=fila.childNodes;
        var largoColumnas=columnas.length;
        var nuevaFila=document.createElement("tr");
        for(var i=0; i<largoColumnas-1; i++)
        {
            var columna=document.createElement("td");
            columna.innerHTML=columnas[i].innerHTML;
            nuevaFila.append(columna);
        }
        var columnaNotaFinal=document.createElement("td");
        columnaNotaFinal.innerHTML="Por Asignar";
        nuevaFila.append(columnaNotaFinal);
        var columnaOpcion=document.createElement("td");
        var boton=document.createElement("button");
        boton.setAttribute("id", objbotonAsociar.id);
        boton.innerHTML="desAsociar";
        boton.addEventListener("click", desAsociarAlumno);
        columnaOpcion.append(boton);
        nuevaFila.append(columnaOpcion);
        tbodyAsociados.append(nuevaFila);
    }else alert("Error al asociar alumno a asignatura");
    respuestaAjax="";
    objbotonAsociar="";
}

function botonDesAsociar()
{
    //Implementar el codigo asignatura a enviar, por ahora es uno de prueba(6)
    objbotonDesAsociar=this;
    var urlServidor="../modelo/desAsociarAlumno.php";
    var rut=this.id;
    var codigoAsignatura=6;
    var parametros="rut="+rut+"&codigoAsignatura="+codigoAsignatura;
    llamadaAjax(urlServidor, parametros, desAsociarAlumno);
}

function desAsociarAlumno()
{
    if(respuestaAjax=="hecho")
    {
        var fila=objbotonDesAsociar.parentNode.parentNode;
        fila.remove();
    }else alert("Error al desAsociar alumno a asignatura");
    respuestaAjax="";
    objbotonAsociar="";
}

function iniciar()
{
    tablaAlumnos("lenguaje 1");
}




