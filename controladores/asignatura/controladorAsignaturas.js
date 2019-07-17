// ----------------Metodo Para las llamadas Ajax----------------------
// function llamadaAjax(url, metodo, parametros)
// {
//     var peticionHTTP;
   
//     if(window.XMLHttpRequest)
//         peticionHTTP=new XMLHttpRequest();
//     else
//         peticionHTTP=new ActiveObject("Microsoft.XMLHTTP");
 
//     peticionHTTP.onreadystatechange=funcionActuadora;
//     peticionHTTP.open(metodo, url, true);
//     peticionHTTP.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//     peticionHTTP.send(parametros); //No envian datos al servidor

//     function funcionActuadora()
//     {
//         if(peticionHTTP.readyState==4 && peticionHTTP.status==200)
//         {
//             var respuesta=peticionHTTP.responseText;
//         }
//     }
    
//     //realizarPeticion('../modelo/consultas.php', 'POST', funcionActuadora);	
// // 
// // ---------------------------------------------------------------------------------------


// ------------------------------------------------------------------------------------

// Modulo para mostrar las tablas 

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

function mostrarTablaAsignaturas()
{
    //Llamada Ajax
    var peticionHTTP;
   
    if(window.XMLHttpRequest)
        peticionHTTP=new XMLHttpRequest();
    else
        peticionHTTP=new ActiveObject("Microsoft.XMLHTTP");
 
    peticionHTTP.onreadystatechange=funcionActuadora;
    peticionHTTP.open("POST", "../modelo/consultas.php", true);
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
            
            crearTabla(columnasThead, idComponentesTabla,"divTablaAsignaturas");
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
        alert("Esta es la funcion modificar asignarAlumno");
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

window.onload=mostrarTablaAsignaturas();
