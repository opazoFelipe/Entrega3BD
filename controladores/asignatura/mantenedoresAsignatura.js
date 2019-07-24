var codigoActual;
var nombreActual;
var salaActual;

function iniciarModificarAsignatura(botonAsignatura)
{
    //Estas variables solo pueden ser usadas para guardar los valores actuales de la asignatura seleccionada de la tabla, ademas se usan tambien solo cuando se iniciar la modificacion y se cancela o se guarda pero sin ningun cambio hecho.
    
    codigoActual=document.getElementById(botonAsignatura.id+"codigo").innerHTML;
    nombreActual=document.getElementById(botonAsignatura.id+"nombre").innerHTML;
    salaActual=document.getElementById(botonAsignatura.id+"sala").innerHTML;

    document.getElementById("Asignaturas").style.zIndex="0";

    var ventanaMantenedor=document.getElementById("divMantenedorAsignatura");
    ventanaMantenedor.innerHTML="";
    ventanaMantenedor.style.zIndex="100000";

    ventanaMantenedor.style.position = "absolute";
    ventanaMantenedor.style.Top = "0";
    ventanaMantenedor.style.marginLeft = "40%";
    ventanaMantenedor.style.display = "block";
    ventanaMantenedor.style.borderStyle="solid";

    var fomularioModificar="<form id='formularioMod'>";
    var labelCodigo="<label for='inputCodigo'>Codigo:</label>";
    var inputCodigo="<input type='number' id='inputCodigo' name='inputCodigo'>";

    var labelNombre="<label for='inputNombre'>Nombre:</label>";
    var inputNombre="<input type='text' id='inputNombre'name='inputNombre'>";

    var labelSala="<label for='inputSala'>Sala:</label>";
    var inputSala="<input type='text' id='inputSala' name='inputSala'>";

    var botonListo="<input type='submit' value='GUARDAR'></button>";
    fomularioModificar+=labelCodigo+inputCodigo+labelNombre+inputNombre+labelSala+inputSala+botonListo+"</form>";
    var botonCancelar="<button onclick='cancelarCambios()'>CANCELAR</button>";

    // ventanaMantenedor.innerHTML=labelCodigo+inputCodigo+labelNombre+inputNombre+labelSala+inputSala+botonListo+botonCancelar;
    ventanaMantenedor.innerHTML=fomularioModificar+botonCancelar;

    document.getElementById("formularioMod").addEventListener("submit", function(event){
        event.preventDefault();
        guardarCambios();
    });
    document.getElementById("inputCodigo").style.display="block";
    document.getElementById("inputNombre").style.display="block";
    document.getElementById("inputSala").style.display="block";

    document.getElementById("inputCodigo").setAttribute("placeholder", codigoActual);
    document.getElementById("inputNombre").setAttribute("placeholder", nombreActual);
    document.getElementById("inputSala").setAttribute("placeholder", salaActual);
    
}

function guardarCambios()
{
    var nuevoCodigo=document.getElementById("inputCodigo").value;
    var nuevoNombre=document.getElementById("inputNombre").value;
    var nuevaSala=document.getElementById("inputSala").value;

    if(nuevoCodigo==codigoActual && nuevoNombre==nombreActual && nuevaSala==salaActual)
    {
    }else
    {
        var url="../modelo/asignatura/modificarAsignatura.php";
        var parametros="codigoActual="+codigoActual+"&codigoNuevo="+nuevoCodigo+"&nombreAsignatura="+nuevoNombre+"&salaOLab="+nuevaSala+"&nombreActual="+nombreActual+"&salaActual="+salaActual;
        llamadaAjax(url, parametros, cambios);

        function cambios()
        {
            if(respuestaAjax=="hecho")
            {
                alert("Asignatura modificada correctamente");
                document.getElementById("divMantenedorAsignatura").innerHTML="";
                mostrarTablaAsignaturas();

            }    
            if(respuestaAjax=="error") alert("Error al modificar esta Asignatura");
        }
    }
}

function cancelarCambios()
{
    document.getElementById("divMantenedorAsignatura").innerHTML="";
}

function iniciarEliminarAsignatura(botonAsignatura)
{
    codigoActual=botonAsignatura.id;
    var desicion=confirm("La asignatura: "+document.getElementById(botonAsignatura.id+"nombre").innerHTML+" sera eliminada");

    if(desicion)
    {
        var url="../modelo/asignatura/eliminarAsignatura.php";
        var parametros="codigoAsignatura="+codigoActual;
        llamadaAjax(url, parametros, eliminar);
    }
    function eliminar()
    {
        if(respuestaAjax="Asignatura eliminada correctamente")
        {
            alert(respuestaAjax);
            document.getElementById("divMantenedorAsignatura").innerHTML="";
            mostrarTablaAsignaturas();
        }else alert(respuestaAjax);     
    }
}

function iniciarIngresarAsignatura()
{
    if(document.getElementById("Asignaturas"))
    {
        document.getElementById("divTablaAsignaturas").innerHTML="";
    }   
    var divFormularioIngresar=document.getElementById("divFormularioIngresar");
    var divBuscadorProfesor=document.getElementById("divBuscadorProfesor");
    divFormularioIngresar.innerHTML="";
    divBuscadorProfesor.innerHTML="";

    var fomularioIngresar="<form id='formularioIn'>";
    var labelCodigo="<label id='l1' for='inputCodigo'>Codigo:</label>";
    var inputCodigo="<input type='number' id='inputCodigo' name='inputCodigo'>";

    var labelNombre="<label id='l2' for='inputNombre'>Nombre Asignatura:</label>";
    var inputNombre="<input type='text' id='inputNombre'name='inputNombre'>";

    var labelSala="<label id='l3' for='inputSala'>Sala:</label>";
    var inputSala="<input type='text' id='inputSala' name='inputSala'>";

    var botonListo="<input id='submitNuevo' type='submit' value='GUARDAR'></button>";
    fomularioIngresar+=labelCodigo+inputCodigo+labelNombre+inputNombre+labelSala+inputSala+botonListo+"</form>";
    // var botonCancelar="<button class='botonCancelarNueva' onclick='finalizarIngresarAsignatura()'>CANCELAR</button>";
    
    var botonNueva=document.getElementById("nuevaAsignatura");
    var botonCancelar=document.createElement("button");

    botonCancelar.innerHTML="CANCELAR";
    botonCancelar.setAttribute("id", "botonCancelarNueva");
    botonCancelar.addEventListener("click", finalizarIngresarAsignatura);

    document.getElementById("tituloPrincipal").replaceChild(botonCancelar, botonNueva);
    divFormularioIngresar.innerHTML=fomularioIngresar;

    document.getElementById("formularioIn").addEventListener("submit", function(event){
        event.preventDefault();
        IngresarAsignatura();
    });

    var tituloIngresarAsignatura=document.createElement("h3");
    tituloIngresarAsignatura.innerHTML="Ingresar Nueva Asignatura";
    document.getElementById("formularioIn").before(tituloIngresarAsignatura);

    tablaProfesoresNuevaAsignatura();
}
function tablaProfesoresNuevaAsignatura()
{
    //Crear los buscadores 
    var labelNoAsociado=
        "<label for='buscarProfesorNuevaAsignatura'>Buscar Profesor: </label>";
    var buscadorNoAsociados=
        "<input type='text' id='buscarProfesorNoAsociado' name= 'buscarProfesorNoAsociado'onkeyup='buscarProfesorNuevaAsignatura()'>";
    var botonLimpiar=
        "<button id='botonLimpiar' onclick='limpiarProfesoresNoAsociados()' style='display: inline-block;'>Limpiar</button>";
    
    var divBuscadorProfesor=document.getElementById("divBuscadorProfesor");
    divBuscadorProfesor.innerHTML="<h4>Use el buscador para encontrar un profesor registrado y asociarlo a esta asignatura</h4>"+labelNoAsociado+buscadorNoAsociados+botonLimpiar;

} 

function buscarProfesorNuevaAsignatura()
{
    var buscador=document.getElementById("buscarProfesorNoAsociado");
    var clave=buscador.value;
    if(clave.length > 0)
    {
        clave="coincidencia="+clave;
        // Llamada Ajax
        var urlServidor="../modelo/profesor/buscarProfesorNuevaAsignatura.php";
        llamadaAjax(urlServidor, clave, mostrarProfesores);

        function mostrarProfesores()
        {
            if(respuestaAjax=="vacio")
            {
                eliminarTabla("asociarProfesor");
                if(!document.getElementById("advertenciaRut"))
                {
                    var botonLimpiar=document.getElementById("botonLimpiar");
                    var advertencia=document.createElement("p");
                    advertencia.setAttribute("id","advertenciaRut");
                    advertencia.innerHTML="El rut ingresado no se encuentra registrado";
                    botonLimpiar.after(advertencia);
                }
            }else{
                eliminarTabla("asociarProfesor");
                var divTabla=document.getElementById("divTablaProfesores");
                divTabla.innerHTML=respuestaAjax;
                if(document.getElementById("advertenciaRut"))
                document.getElementById("advertenciaRut").remove();
            }
            
        }
    }      
    else
    {
        eliminarTabla("asociarProfesor");
    } 
}

function asociarProfesorNuevaAsignatura(botonProfesor)
{
    var rut=document.getElementById("profesor"+botonProfesor.id).innerHTML;
    var nombres=document.getElementById("nombres"+botonProfesor.id).innerHTML;
    var apellidos=document.getElementById("apellidos"+botonProfesor.id).innerHTML;

    // alert(rut+"\nNombres: "+nombres+"\nApellidos: "+apellidos);
    var tablaProfesor="<table id='tablaProfesor'><thead><tr><th>Rut</th><th>Nombres</th><th>Apellidos</th></tr></thead><tbody id='tbodyTablaProfesor'><tr><td id='rutIngresar'>"+rut+"</td><td>"+nombres+"</td><td>"+apellidos+"</td></tr></tbody></table>";

    document.getElementById("divTablaProfesores").innerHTML="<h4>Profesor Asociado</h4>"+tablaProfesor;
}

function IngresarAsignatura()
{
    var codigo=false;
    var nombre=false;
    var sala=false;
   
    var formulario=document.getElementById("formularioIn");
    var codigoAsignatura=document.getElementById("inputCodigo").value;
    var nombreAsignatura=document.getElementById("inputNombre").value;
    var salaNombre=document.getElementById("inputSala").value;

    if(codigoAsignatura=="")
    {
        document.getElementById("l1").before("*");
    }else codigo=true;
    if(nombreAsignatura=="")
    {
        document.getElementById("l2").before("*");
    }else nombre=true;
    if(salaNombre=="")
    {
        document.getElementById("l3").before("*");
    }else sala=true;

    if(!codigo | !nombre | !sala) 
        alert("Porfavor complete todos los campos marcados con *");
    else
    {
        if(!document.getElementById("tablaProfesor"))
        {
            alert("Debe Asociar un profesor a la asignatura antes de ingresarla");
        }else
        {
            var rut=document.getElementById("rutIngresar").innerHTML;
            var urlServidor="../modelo/asignatura/ingresarAsignatura.php";
            var parametros="codigo="+codigoAsignatura+"&rutProfesor="+rut+"&nombreAsignatura="+nombreAsignatura+"&sala="+salaNombre;
            llamadaAjax(urlServidor, parametros, respuesta);
            
            function respuesta()
            {
                if(respuestaAjax=="hecho")
                {
                    alert("Asignatura ingresada correctamente");
                    finalizarIngresarAsignatura();
                    mostrarTablaAsignaturas();
                }
                if(respuestaAjax=="codigo ya existe")
                {
                    alert("El codigo ingresado ya existe, use otro");
                }
                if(respuestaAjax=="error")
                {
                    alert("Error al ingresar asignatura, intente nuevamente");
                }
            }
        }
    }

}

function finalizarIngresarAsignatura()
{
    mostrarTablaAsignaturas();
    document.getElementById("divFormularioIngresar").innerHTML="";
    document.getElementById("divBuscadorProfesor").innerHTML="";
    document.getElementById("divTablaProfesores").innerHTML="";
    document.getElementById("divProfesorAsociado").innerHTML="";  
}
    

     
