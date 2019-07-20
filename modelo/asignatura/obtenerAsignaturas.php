<?php
    require ('../conexion.php');

function getAsignaturas()
{
    $sql="select 
	        a.codigo, 
	        a.nombre, 
	        a.rut_profesor, 
	        a.sala_laboratorio as sala
        from 
	        asignatura a
        order by 
	        a.codigo";

    $conexion=new conexion();
    $bd=$conexion->get_conexion();
    $smt=$bd->prepare($sql);
    if($smt->execute())
    {
        $asignaturas=array();
        $i=0;
        while($result = $smt->fetch(PDO::FETCH_ASSOC))
        {
            $codigo=$result["codigo"];
            $nombre=$result["nombre"];
            $rutProfesor=$result["rut_profesor"];
            $sala=$result["sala"];
            $asignaturas[$i]=
            [
                "codigo"=>$codigo, 
                "nombre"=>$nombre,
                "rutProfesor"=>$rutProfesor,
                "sala"=>$sala
            ];	
            $i++;		
        }
        $arregloJSON=json_encode($asignaturas);
        echo $arregloJSON;
    }
}

getAsignaturas();

?>