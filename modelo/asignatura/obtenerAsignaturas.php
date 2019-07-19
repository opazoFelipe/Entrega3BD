<?php
    require ('../conexion.php');

function getAsignaturas()
{
    $sql="select 
    a.codigo, a.nombre, a.rut_profesor, a.sala_laboratorio, c.codigo_curso, b.descripcion as bloque
    from
    asignatura a,
    consta_de c,
    bloque b,
    se_le_otorga s
    where 
    a.codigo=s.codigo_asignatura and
    a.codigo=c.codigo_asignatura and
    s.codigo_bloque=b.codigo;";

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
            $sala=$result["sala_laboratorio"];
            $codigoCurso=$result["codigo_curso"];
            $bloque=$result["bloque"];
            $asignaturas[$i]=
            [
                "codigo"=>$codigo, 
                "nombre"=>$nombre,
                "rutProfesor"=>$rutProfesor,
                "sala"=>$sala,
                "codigoCurso"=>$codigoCurso,
                "bloque"=>$bloque
            ];	
            $i++;		
        }
        $arregloJSON=json_encode($asignaturas);
        echo $arregloJSON;
    }
}

getAsignaturas();

?>