window.onload=mostrarTablaAsignaturas;


var codigoAsignaturaSeleccionada;
var nombreAsignaturaSeleccionada;

var objbotonAsociar; //Variable global, solo usada para funciones asociadas a boton asociar
var objbotonDesAsociar //Variable global, solo usada para funciones asociadas a boton desAsociar.
var cantidadActualAsociados;

function clickBoton()
{
    alert("presionaste el boton");
}
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
            document.getElementById("divTablaAsignaturas").innerHTML=respuesta;
            // var jsonAsignaturas=JSON.parse(respuesta);
            // var largoAsignaturas=jsonAsignaturas.length;

            // var idComponentesTabla={"idTabla":"Asignaturas", "idThead": "theadAsignaturas", "idTbody": "tbodyAsignaturas"};
            // var columnasThead=["Codigo", "Nombre", "Rut Profesor", "Sala", "Opciones", "Asociar"];
            
            // crearTablaAsignaturas(columnasThead, idComponentesTabla,"divTablaAsignaturas");
            
            // var tbody=document.getElementById("tbodyAsignaturas");

            // for(var i=0; i<largoAsignaturas; i++)
            // {
            //     var asignaturas=jsonAsignaturas[i];
            //     var fila=document.createElement("tr");
            //     fila.setAttribute("id", asignaturas.codigo);
            //     for(var j=0; j<4; j++)
            //     {
            //         var item=Object.keys(asignaturas)[j];
            //         var valor=asignaturas[item];
            //         var columna=document.createElement("td");
            //         columna.innerHTML=valor;
            //         fila.append(columna);
            //     }
                
                //botones opciones(modificar y eliminar) y
                //botones asignar(alumnos, profesor y cursos)
                // var botones=["MODIFICAR", "ELIMINAR", "ALUMNO", "PROFESOR", "CURSO", "BLOQUE"];
                // var funciones=[modificarAsignatura, eliminarAsignatura, asignarAlumno, asignarProfesor, asignarCurso, asignarBloque];
                // var columnaOpciones=document.createElement("td");
                // var columnaAsignar=document.createElement("td");
                // for(var k=0; k<6; k++)
                // {
                //     var boton=document.createElement("button");
                //     boton.innerHTML=botones[k];
                //     boton.className="btn"+botones[k];
                //     boton.setAttribute("id", asignaturas.codigo);
                //     boton.setAttribute("name", asignaturas.nombre);
                //     boton.addEventListener("click", funciones[k]);
                //     if(k<2)
                //     {
                //         columnaOpciones.append(boton);
                //     }
                //     if(k>1)
                //     {
                //         columnaAsignar.append(boton);
                //     }    
                // }
                // fila.append(columnaOpciones);
                // fila.append(columnaAsignar);
                // tbody.append(fila);
            }
        }
}

function modificarAsignatura(codigoAsignatura)
{
    alert("Esta es la funcion modificar asignatura");
}
function eliminarAsignatura(codigoAsignatura)
{
    alert("Esta es la funcion eliminar asignatura");
}
function asignarAlumno(codigoAsignatura, nombreAsignatura)
{
    codigoAsignaturaSeleccionada=codigoAsignatura;
    nombreAsignaturaSeleccionada=nombreAsignatura;
    alert(codigoAsignaturaSeleccionada+" nombre: "+nombreAsignaturaSeleccionada);
    iniciarAlumnos();
    // 
}
function asignarProfesor(codigoAsignatura, nombreAsignatura)
{
    codigoAsignaturaSeleccionada=codigoAsignatura;
    nombreAsignaturaSeleccionada=nombreAsignatura;
    iniciarProfesores();
}
function asignarCurso(codigoAsignatura, nombreAsignatura)
{
    codigoAsignaturaSeleccionada=codigoAsignatura;
    nombreAsignaturaSeleccionada=nombreAsignatura;
    iniciarCursos();
}
function asignarBloque()
{

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