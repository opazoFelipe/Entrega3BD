window.onload=mostrarConsulta6;

function mostrarConsulta1()
{
    var srcPantallazo="/aplicacionBDFinal/Entrega3BD/vistas/pantallazos/1/pantallazo1.jpg";
    mostrarPantallazo(srcPantallazo);
    var divTabla=document.getElementById("divTablaConsulta");
    if(document.getElementById("tablaConsultaE2"))
        document.getElementById("tablaConsultaE2").remove();
    var url="../modelo/consultasE2/consulta1.php";
    llamadaAjax(url, null, mostrarTabla);
    function mostrarTabla()
    {
        if(respuestaAjax != "error")
        {
            divTabla.innerHTML=respuestaAjax;
        }else alert("Error al realizar consulta 1");

    }
}

function mostrarConsulta2()
{
    var srcPantallazo="/aplicacionBDFinal/Entrega3BD/vistas/pantallazos/2/pantallazo2.jpg";
    mostrarPantallazo(srcPantallazo);
    var divTabla=document.getElementById("divTablaConsulta");
    if(document.getElementById("tablaConsultaE2"))
        document.getElementById("tablaConsultaE2").remove();
    var url="../modelo/consultasE2/consulta2.php";
    llamadaAjax(url, null, mostrarTabla);
    function mostrarTabla()
    {
        if(respuestaAjax != "error")
        {
            divTabla.innerHTML=respuestaAjax;
        }else alert("Error al realizar consulta 2");

    }
}

function mostrarConsulta3()
{
    var srcPantallazo="/aplicacionBDFinal/Entrega3BD/vistas/pantallazos/3/pantallazo3.jpg";
    mostrarPantallazo(srcPantallazo);
    var divTabla=document.getElementById("divTablaConsulta");
    if(document.getElementById("tablaConsultaE2"))
        document.getElementById("tablaConsultaE2").remove();
    var url="../modelo/consultasE2/consulta3.php";
    llamadaAjax(url, null, mostrarTabla);
    function mostrarTabla()
    {
        if(respuestaAjax != "error")
        {
            divTabla.innerHTML=respuestaAjax;
        }else alert("Error al realizar consulta 3");

    }
}

function mostrarConsulta4()
{
    
    var srcPantallazoVista="/aplicacionBDFinal/Entrega3BD/vistas/pantallazos/4/pantallazo4Vista.jpg";
    var srcPantallazoConsulta="/aplicacionBDFinal/Entrega3BD/vistas/pantallazos/4/pantallazo4Consulta.jpg";
    mostrarPantallazoVista(srcPantallazoVista, srcPantallazoConsulta);
    var divTabla=document.getElementById("divTablaConsulta");
    if(document.getElementById("tablaConsultaE2"))
        document.getElementById("tablaConsultaE2").remove();
    var url="../modelo/consultasE2/consulta4.php";
    llamadaAjax(url, null, mostrarTabla);
    function mostrarTabla()
    {
        if(respuestaAjax != "error")
        {
            divTabla.innerHTML=respuestaAjax;
        }else alert("Error al realizar consulta 4");

    }
}

function mostrarConsulta5()
{
    var srcPantallazo="/aplicacionBDFinal/Entrega3BD/vistas/pantallazos/5/pantallazo5.jpg";
    mostrarPantallazo(srcPantallazo);
    var divTabla=document.getElementById("divTablaConsulta");
    if(document.getElementById("tablaConsultaE2"))
        document.getElementById("tablaConsultaE2").remove();
    var url="../modelo/consultasE2/consulta5.php";
    llamadaAjax(url, null, mostrarTabla);
    function mostrarTabla()
    {
        if(respuestaAjax != "error")
        {
            divTabla.innerHTML=respuestaAjax;
        }else alert("Error al realizar consulta 5");

    }
}

function mostrarConsulta6()
{
    var srcPantallazoVista="/aplicacionBDFinal/Entrega3BD/vistas/pantallazos/6/pantallazo6Vista.jpg";
    var srcPantallazoConsulta="/aplicacionBDFinal/Entrega3BD/vistas/pantallazos/6/pantallazo6Consulta.jpg";
    mostrarPantallazoVista(srcPantallazoVista, srcPantallazoConsulta);
    if(document.getElementById("tablaConsultaE2"))
        document.getElementById("tablaConsultaE2").remove();
    var divTabla=document.getElementById("divTablaConsulta");
    var url="../modelo/consultasE2/consulta6.php";
    llamadaAjax(url, null, mostrarTabla);
    function mostrarTabla()
    {
        if(respuestaAjax != "error")
        {
            divTabla.innerHTML=respuestaAjax;
        }else alert("Error al realizar consulta 6");

    }
}

function mostrarPantallazo(src)
{
    var divPantallazo=document.getElementById("divPantallazo");
    if(document.getElementById("pantallazo"))
        document.getElementById("pantallazo").remove();
    var img=document.createElement("img"); 
    img.setAttribute("id", "pantallazo"); 
    img.setAttribute("src", src); 
    img.setAttribute("width","168"); 
    img.setAttribute("height","66");
    divPantallazo.append(img); 
}

function mostrarPantallazoVista(srcVista, srcConsulta)
{
    var divPantallazo=document.getElementById("divPantallazo");

    if(document.getElementById("pantallazoVista"))
        document.getElementById("pantallazoVista").remove();

    if(document.getElementById("pantallazoConsulta"))
        document.getElementById("pantallazoConsulta").remove();

    var img=document.createElement('img');
    img.setAttribute("id", "pantallazoVista");
    img.setAttribute("src", srcVista);
    divPantallazo.append(img);
    var img=document.createElement('img');
    img.setAttribute("id", "pantallazoConsulta");
    img.setAttribute("src", srcConsulta);
    divPantallazo.append(img);
}

