<?php
    require ('conexion.php');

    $conexion=new conexion();
    $codigoAsignatura=$_POST["codigoAsignatura"];
    $bd=$conexion->get_conexion();
    $sql="select 
            a.rut, 
            a.nombres, 
            a.apellidos,
            e.nota_final
        from 
            alumno a,
            esta_en e
        where
            e.rut_alumno=a.rut and
            e.codigo_asignatura=?";
    $smt=$bd->prepare($sql);
    $smt->bindValue(1, $codigoAsignatura, PDO::PARAM_STR);
    if($smt->execute())
    {
        $datos=array();
        $i=0;
        while($result = $smt->fetch(PDO::FETCH_ASSOC))
        {
            $rut=$result["rut"];
            $nombres=$result["nombres"];
            $apellidos=$result["apellidos"];
            $notaFinal=$result["nota_final"];
            $datos[$i]=
            [
                "rut"=>$rut, 
                "nombres"=>$nombres,
                "apellidos"=>$apellidos,
                "notaFinal"=>$notaFinal
            ];	
            $i++;		
        }
        if(sizeof($datos) == 0)
        {
            echo "vacio";
        }
        else
        {
            // var_dump($datos);
            $arregloJSON=json_encode($datos);
            echo $arregloJSON;
        }
    }else{
        echo "Error al buscar alumnos asociados a la asignatura";
    }
    $conexion=null;
?>