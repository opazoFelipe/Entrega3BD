window.onload=mostrarAsignaturas();
function mostrarAsignaturas()
{
    if(!document.getElementById("tablaAsignaturas"))
    {
        function izi()
        {
            function inicializar_XHR()
            {
                if(window.XMLHttpRequest)
                    peticionHTTP=new XMLHttpRequest();
                else
                    peticionHTTP=new ActiveObject("Microsoft.XMLHTTP");
            }
            
        
            function realizarPeticion(url, metodo, funcion)
            {
                peticionHTTP.onreadystatechange=funcion;
                peticionHTTP.open(metodo, url, true);
                peticionHTTP.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                peticionHTTP.send(null); //No envia datos al servidor
                
            }
            
            function funcionActuadora()
            {
                if(peticionHTTP.readyState==4 && peticionHTTP.status==200)
                {
                    var asignaturas=JSON.parse(peticionHTTP.responseText);
                    var largoAsignaturas=asignaturas.length;
                    var div=document.getElementById("divTablaAsignaturas");
                    if(largoAsignaturas>0)
                    {
                        var jsonIDTabla=
                        {
                            "idTabla":"tablaAsignaturas",
                            "idThead":"theadTablaAsignaturas",
                            "idTbody":"tbodyTablaAsignaturas"
                        };
                        var itemsThead=
                        [
                            "Codigo", 
                            "Nombre", 
                            "Rut Profesor", 
                            "Curso Asociado", 
                            "Sala", 
                            "Bloque Asignado", 
                            "Opciones",  
                            "Asociar"
                        ];
                    
                        crearTablaAsignaturas(itemsThead, jsonIDTabla, "divTablaAsignaturas");
                        var tabla=document.getElementById("tablaAsignaturas");
                        var tbodyTabla=document.getElementById("tbodyTablaAsignaturas");
                        tabla.className="tablaDinamica";
    
                        for(var i=0; i<largoAsignaturas; i++)
                        {
                            var tr=document.createElement("tr");
                            tr.setAttribute("id", asignaturas[i].codigo);
                            var tdCodigoAsig=document.createElement("td");
                            var tdNombreAsig=document.createElement("td");
                            var tdRutProfesor=document.createElement("td");
                            var tdCodigoCurso=document.createElement("td");
                            var tdSala=document.createElement("td");
                            var tdBloque=document.createElement("td");
                            var tdOpcionesAsig=document.createElement("td");
                            var tdAsociarAsig=document.createElement("td");

                            //Botones de Opciones de Asignatura (Modificar y Eliminar)
                            var btnModificar=document.createElement("button");
                            var btnEliminar=document.createElement("button");
                            btnModificar.addEventListener("click", asociarAlumno);
                            //Botones de Asociar a Asignatura (Alumnos, Profesor que la dicta y Cursos que la dictan)
                            var btnAsociarAlumno=document.createElement("button");
                            var btnAsociarProfesor=document.createElement("button");
                            var btnAsociarCurso=document.createElement("button");

                            btnModificar.innerHTML="Modificar";
                            btnEliminar.innerHTML="Eliminar";
                            btnAsociarAlumno.innerHTML="Alumnos";
                            btnAsociarProfesor.innerHTML="Profesor";
                            btnAsociarCurso.innerHTML="Cursos";

                            btnModificar.className="btnModificar";
                            btnEliminar.className="btnEliminar";
                            btnAsociarAlumno.className="btnAsociar";
                            btnAsociarProfesor.className="btnAsociar";
                            btnAsociarCurso.className="btnAsociar";

                            tdOpcionesAsig.append(btnModificar);
                            tdOpcionesAsig.append(btnEliminar);
                            tdAsociarAsig.append(btnAsociarAlumno);
                            tdAsociarAsig.append(btnAsociarProfesor);
                            tdAsociarAsig.append(btnAsociarCurso);

                            tdCodigoAsig.innerHTML=asignaturas[i].codigo;
                            tdNombreAsig.innerHTML=asignaturas[i].nombre;
                            tdRutProfesor.innerHTML=asignaturas[i].rutProfesor;
                            tdCodigoCurso.innerHTML=asignaturas[i].codigoCurso;
                            tdSala.innerHTML=asignaturas[i].sala;
                            tdBloque.innerHTML=asignaturas[i].bloque;

                            tr.append(tdCodigoAsig);
                            tr.append(tdNombreAsig);
                            tr.append(tdRutProfesor);
                            tr.append(tdCodigoCurso);
                            tr.append(tdSala);
                            tr.append(tdBloque);
                            tr.append(tdOpcionesAsig);
                            tr.append(tdAsociarAsig);

                            tbodyTabla.append(tr);
                        } 
                        tabla.append(tbodyTabla);
                        div.append(tabla);  
                    }else div.innerHTML="No hay asignaturas actualmente";
                }
            }
            
            function cargarFuncion()
            {
                inicializar_XHR();
                realizarPeticion('../modelo/consultas.php', 'POST', funcionActuadora);
            }	

            function asociarAlumno(idDivTabla)
            {
                var arrayITems=["rut", "nombres", "apellidos"];
                var jsonID=
                {
                    "idTabla":"tablaBuscarAlumnos",
                    "idThead":"theadBuscarAlumnos",
                    "idTbody":"tbodyBuscarAlumnos"
                }
                var idDivTabla="divTablaBuscar";
                crearTablaAsignaturas(arrayITems, jsonID, idDivTabla);
            }
            
            function crearTablaAsignaturas(arrayItems,jsonID, idDivTabla)
            {
                var divTabla=document.getElementById(idDivTabla);
                var tabla=document.createElement("table");
                tabla.setAttribute("id", jsonID.idTabla);
                var thead=document.createElement("thead");
                thead.setAttribute("id", jsonID.idThead);
                var tbody=document.createElement("tbody");
                tbody.setAttribute("id", jsonID.idTbody);
                var largoItems=arrayItems.length;
                for(var i=0; i< largoItems; i++)
                {
                    var th=document.createElement("th");
                    th.innerHTML=arrayItems[i];
                    thead.append(th);
                }
                tabla.append(thead);
                tabla.append(tbody);
                divTabla.append(tabla);
            }
            
            cargarFuncion();
        }
        izi(); 
        
    }    
}
