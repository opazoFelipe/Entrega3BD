<?php
    require ('conexion.php');

    $rut=$_POST["rut"];
    $codigoAsignatura=$_POST["codigoAsignatura"];
    $notaFinal=$_POST["notaFinal"];
    
    $conexion=new conexion();
    $coincidencia="%".$coincidencia."%";
    $bd=$conexion->get_conexion();
    $sql="select 
            a.rut, 
            a.nombres, 
            a.apellidos
        from 
            alumno a
        where
            a.rut like ? and
            a.rut not in
            (select rut_alumno from esta_en)";
    $smt=$bd->prepare($sql);
    $smt->bindValue(1, $coincidencia, PDO::PARAM_STR);
    if($smt->execute())
    {
        $datos=array();
        $i=0;
        while($result = $smt->fetch(PDO::FETCH_ASSOC))
        {
            $rut=$result["rut"];
            $nombres=$result["nombres"];
            $apellidos=$result["apellidos"];
            $datos[$i]=
            [
                "rut"=>$rut, 
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
        echo "Error al buscar coincidencias de Alumnos";
    }
    $conexion=null;
?>