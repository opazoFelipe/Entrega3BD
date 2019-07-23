var respuestaAjax; //variable global que guarda la respuesta de cualquier llamada ajax,
//esta variable requiere de una funcion unica que la gestione.

// Esta funcion requiere de la url del servidor, parametros que enviar al servidor y una funcion
// que gestione la respuesta de la llamada, la cual se almacena en la variable global respuestaAjax

function llamadaAjax(url, parametros, gestionarRespuesta)
{
    var peticionHTTP;
   
    if(window.XMLHttpRequest)
        peticionHTTP=new XMLHttpRequest();
    else
        peticionHTTP=new ActiveObject("Microsoft.XMLHTTP");

    peticionHTTP.onreadystatechange=funcionActuadora;
    peticionHTTP.open("POST", url, true);
    peticionHTTP.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    peticionHTTP.send(parametros); //No envian datos al servidor

    function funcionActuadora()
    {
        if(peticionHTTP.readyState==4 && peticionHTTP.status==200)
        {
            respuestaAjax=peticionHTTP.responseText;
            gestionarRespuesta();
        }
    }
}