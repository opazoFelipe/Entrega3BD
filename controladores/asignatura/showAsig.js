function mostrarAsignaturas()
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
                var itemsThead=["Codigo", "Nombre", "Rut Profesor", "Curso Asociado", "Sala", "Bloque Asignado", "Opciones", "Asociar"];
                var largoItemsThead=itemsThead.length;
                if(largoAsignaturas>0)
                {
                    var tabla=document.createElement("table");
                    tabla.setAttribute("id","tablaAsignaturas");
                    tabla.className="tablaDinamica";
                    var theadTabla=document.createElement("thead");
                    var tbodyTabla=document.createElement("tbody");
                    var tr=document.createElement("tr");
                    for(var i=0; i<largoItemsThead; i++)
                    {
                        var th=document.createElement("th");
                        th.innerHTML=itemsThead[i];
                        tr.append(th);
                    }
                    theadTabla.append(tr);
                    tabla.append(theadTabla);
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
        
        cargarFuncion();
    }
    izi();      
}
