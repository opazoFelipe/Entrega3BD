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

    var labelCodigo="<label for='inputCodigo' onKeyPress='return soloNumeros(event)'>Codigo:</label>";
    var inputCodigo="<input type='number' id='inputCodigo' name='inputCodigo'>";

    var labelNombre="<label for='inputNombre'>Nombre:</label>";
    var inputNombre="<input type='text' id='inputNombre'name='inputNombre'>";

    var labelSala="<label for='inputSala'>Sala:</label>";
    var inputSala="<input type='text' id='inputSala' name='inputSala'>";

    var botonListo="<button onclick='guardarCambios()'>GUARDAR</button>";
    var botonCancelar="<button onclick='cancelarCambios()'>CANCELAR</button>";

    ventanaMantenedor.innerHTML=labelCodigo+inputCodigo+labelNombre+inputNombre+labelSala+inputSala+botonListo+botonCancelar;

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

    // alert(salaActual);
    var url="../modelo/asignatura/modificarAsignatura.php";
    var parametros="codigoActual="+codigoActual+"&codigoNuevo="+nuevoCodigo+"&nombreAsignatura="+nuevoNombre+"&salaOLab="+nuevaSala+"&nombreActual="+nombreActual+"&salaActual="+salaActual;
    llamadaAjax(url, parametros, cambios);

    function cambios()
    {
        alert(respuestaAjax);
    }
}

function cancelarCambios()
{
    document.getElementById("divMantenedorAsignatura").innerHTML="";
}
