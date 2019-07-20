<?php
    require ('../conexion.php');

function getAsignaturas()
{
    $sql="
    select 
        a.codigo, a.nombre, a.rut_profesor, a.sala_laboratorio, q2.codigo_curso, q.descripcion as bloque
    from
	    (
		    select a.codigo as codigo_asignatura, coalesce(s.codigo_bloque, 0) as codigo_bloque, coalesce(b.descripcion, 'vacio') as descripcion from 
		    asignatura a left outer join se_le_otorga s on a.codigo=s.codigo_asignatura left outer join bloque b on s.codigo_bloque=b.codigo
	    ) 
	    as q,
	    (	
		    select a.codigo, coalesce(c.codigo_curso, 'vacio') as codigo_curso from asignatura a left outer join consta_de c on c.codigo_asignatura=a.codigo
	    )
	    as q2,
        asignatura a
    where
	    q.codigo_asignatura=a.codigo and
        a.codigo=q2.codigo
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