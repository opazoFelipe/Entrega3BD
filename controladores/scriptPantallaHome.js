window.onload=aplicarDimensionesPantalla;
function aplicarDimensionesPantalla()
{
    var ancho=screen.width;
    var alto=screen.height;

    ancho=ancho-15;
    alto=alto-155;
    var contenedorPrincipal=document.getElementById("contenedorPrincipal");
    contenedorPrincipal.style.width=ancho+"px";
    contenedorPrincipal.style.height=alto+"px";
}

