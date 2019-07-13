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
                if(largoAsignaturas>0)
                {
                    var div=document.getElementById("body");
                    var tabla=document.createElement("table");
                    tabla.setAttribute("id","tablaAsignaturas");
                    var tr=document.createElement("tr");
                    var thCodigoAsig=document.createElement("th");
                    var thNombreAsig=document.createElement("th");
                    var thRutProfesor=document.createElement("th");
                    var thCodigoCurso=document.createElement("th");
                    var thSala=document.createElement("th");
                    var thBloque=document.createElement("th");

                    var textoThCodigo=document.createTextNode("Codigo");
                    var textoThNombreAsig=document.createTextNode("Nombre");
                    var textoThRutProfesor=document.createTextNode("rut Profesor");
                    var textoThCodigoCurso=document.createTextNode("Curso Asociado");
                    var textoThSala=document.createTextNode("Sala");
                    var textoThBloque=document.createTextNode("Bloque Asignado");

                    thCodigoAsig.append(textoThCodigo);
                    thNombreAsig.append(textoThNombreAsig);
                    thRutProfesor.append(textoThRutProfesor);
                    thCodigoCurso.append(textoThCodigoCurso);
                    thSala.append(textoThSala);
                    thBloque.append(textoThBloque);

                    tr.append(thCodigoAsig);
                    tr.append(thNombreAsig);
                    tr.append(thRutProfesor);
                    tr.append(thCodigoCurso);
                    tr.append(thSala);
                    tr.append(thBloque);
                    
                    tabla.append(tr);
                }

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

                    var textoCodigo=document.createTextNode(asignaturas[i].codigo);
                    var textoNombreAsig=document.createTextNode(asignaturas[i].nombre);
                    var textoRutProfesor=document.createTextNode(asignaturas[i].rutProfesor);
                    var textoCodigoCurso=document.createTextNode(asignaturas[i].codigoCurso);
                    var textoSala=document.createTextNode(asignaturas[i].sala);
                    var textoBloque=document.createTextNode(asignaturas[i].bloque);

                    tdCodigoAsig.append(textoCodigo);
                    tdNombreAsig.append(textoNombreAsig);
                    tdRutProfesor.append(textoRutProfesor);
                    tdCodigoCurso.append(textoCodigoCurso);
                    tdSala.append(textoSala);
                    tdBloque.append(textoBloque);

                    tr.append(tdCodigoAsig);
                    tr.append(tdNombreAsig);
                    tr.append(tdRutProfesor);
                    tr.append(tdCodigoCurso);
                    tr.append(tdSala);
                    tr.append(tdBloque);
                    
                    tabla.append(tr);
                }
                div.append(tabla);
				//var info=document.getElementById("info");
				//info.innerHTML=peticionHTTP.responseText;
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