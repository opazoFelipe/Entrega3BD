<?php
    require ('../conexion.php');

    $conexion=new conexion();
    $codigoAsignatura=$_POST["codigoAsignatura"];
    $bd=$conexion->get_conexion();
    $sql="select 
            a.rut_profesor, 
            p.nombres, 
            p.apellidos
        from 
            asignatura a,
            profesor p
        where
            a.rut_profesor=p.rut and
            a.codigo=?
        order by
            a.rut_profesor";
    $smt=$bd->prepare($sql);
    $smt->bindValue(1, $codigoAsignatura, PDO::PARAM_STR);
    if($smt->execute())
    {
        $datos=array();
        $i=0;
        while($result = $smt->fetch(PDO::FETCH_ASSOC))
        {
            $rutProfesor=$result["rut_profesor"];
            $nombres=$result["nombres"];
            $apellidos=$result["apellidos"];
        
            $datos[$i]=
            [
                "rutProfesor"=>$rutProfesor, 
                "nombres"=>$nombres,
                "apellidos"=>$apellidos
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
        echo "Error al buscar profesores asociados a la asignatura";
    }
    $conexion=null;
?>