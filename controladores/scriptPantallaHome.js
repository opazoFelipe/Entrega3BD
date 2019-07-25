window.onload=aplicarDimensionesPantalla;

var ancho;
var alto;

function aplicarDimensionesPantalla()
{
    ancho=screen.width;
    alto=screen.height;

    ancho=ancho-15;
    alto=alto-155;
    var contenedorPrincipal=document.getElementById("contenedorPrincipal");
    contenedorPrincipal.style.width=ancho+"px";
    contenedorPrincipal.style.height=alto+"px";

    aplicarDimensionFormularioNuevaAsignatura();
}

function aplicarDimensionesMantenedor()
{
    ancho=screen.width;
    alto=screen.height;

    ancho=ancho-15;
    alto=alto-155;
    var contenedorPrincipal=document.getElementById("divMantenedorAsignatura");
    contenedorPrincipal.style.width=ancho+"px";
    contenedorPrincipal.style.height=alto+"px";
}


