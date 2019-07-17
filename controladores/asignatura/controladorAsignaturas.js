// ----------------Metodo Para las llamadas Ajax----------------------
    // var peticionHTTP;
   
    // if(window.XMLHttpRequest)
    //     peticionHTTP=new XMLHttpRequest();
    // else
    //     peticionHTTP=new ActiveObject("Microsoft.XMLHTTP");

    // peticionHTTP.onreadystatechange=funcionActuadora;
    // peticionHTTP.open("POST", "../modelo/consultas.php", true);
    // peticionHTTP.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // peticionHTTP.send(null); //No envian datos al servidor

    // function funcionActuadora()
    // {
    //     if(peticionHTTP.readyState==4 && peticionHTTP.status==200)
    //     {
    //         var respuesta=peticionHTTP.responseText;
    //     }
    // }

// ---------------------------------------------------------------------------------------


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

function asociarAlumno()
{
    // asociarAlumno2();
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
            var respuesta=peticionHTTP.responseText;
            var jsonAlumnos=JSON.parse(respuesta);
            var largoAlumnos=jsonAlumnos.length;

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
            var columnasThead=
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

            crearTabla(columnasThead, idComponentesTablaAsociados,"divTablaActualAsociados");
            crearTabla(columnasThead, idComponentesTablaNoAsociados,"divTablaBuscar");
            var tbody=document.getElementById("tbodyDesAsociarAlumno");

            for(var i=0; i<largoAlumnos; i++)
            {
                var alumnos=jsonAlumnos[i];
                var fila=document.createElement("tr");
                fila.setAttribute("id", alumnos.rutAlumno);
                for(var j=0; j<3; j++)
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
                boton.className="btnEliminarAlumno";
                boton.addEventListener("click", desAsociarAlumno);
                columnaOpcion.append(boton);
                fila.append(columnaOpcion);
                tbody.append(fila);
            }

        }
    }    
}


//Funcion para buscar coincidencias de alumnos al escribir en el buscador,
//esta hecha para la funcion asociar alumno, para el input buscarAlumnoNoAsociado
function buscarAlumnoNoAsociado()
{
    var buscador=document.getElementById("buscarAlumnoNoAsociado");
    var clave=buscador.value;
    clave="coincidencia="+clave;
    // Llamada Ajax
    var peticionHTTP;
   
    if(window.XMLHttpRequest)
        peticionHTTP=new XMLHttpRequest();
    else
        peticionHTTP=new ActiveObject("Microsoft.XMLHTTP");

    peticionHTTP.onreadystatechange=funcionActuadora;
    peticionHTTP.open("POST", "../modelo/buscarAlumnoNoAsociado.php", true);
    peticionHTTP.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    peticionHTTP.send(clave); //No envian datos al servidor

    function funcionActuadora()
    {
        if(peticionHTTP.readyState==4 && peticionHTTP.status==200)
        {
            //Si no hay coincidencias, la peticion retorna como string la frase "vacio";
            var respuesta=peticionHTTP.responseText;
            console.log(respuesta);
            if(respuesta=="vacio")
            {
                alert("vacion");
            }
            else
            {
                var jsonAlumnos=JSON.parse(respuesta);
                var largoAlumnos=jsonAlumnos.length;
                var tbody=document.getElementById("tbodyAsociarAlumno");
                tbody.innerHTML="";
                for(var i=0; i<largoAlumnos; i++)
                {
                    var alumnos=jsonAlumnos[i];
                    var fila=document.createElement("tr");
                    fila.setAttribute("id", alumnos.rutAlumno);
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
                    boton.innerHTML="Asociar";
                    boton.className="btnAsociarAlumno";
                    boton.addEventListener("click", AsociarAlumno);
                    columnaOpcion.append(boton);
                    fila.append(columnaOpcion);
                    tbody.append(fila);
                }
            }
        }
    }
}

function desAsociarAlumno()
{
    alert("funcion desAsociarAlumno");
}
function AsociarAlumno()
{
    alert("funcion AsociarAlumno");
}



window.onload=asociarAlumno();


