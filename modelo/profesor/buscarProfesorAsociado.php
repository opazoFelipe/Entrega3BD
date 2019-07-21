<?php
    require ('../conexion.php');

    $coincidencia=$_POST["coincidencia"];
    $codigoAsignatura=$_POST["codigoAsignatura"];
    function buscarAlumno($coincidencia, $codigoAsignatura)
    {
        $conexion=new conexion();
        $coincidencia=$coincidencia."%";
        $bd=$conexion->get_conexion();
        $sql="select 
                q.rut, 
                q.nombres, 
                q.apellidos
            from 
                (select p.rut, p.nombres, p.apellidos from profesor p where p.rut like ?) as q
            where
                q.rut in(select rut_profesor from asignatura where codigo=?)
            order by
                q.rut";

        $smt=$bd->prepare($sql);
        $smt->bindValue(1, $coincidencia, PDO::PARAM_STR);
        $smt->bindValue(2, $codigoAsignatura, PDO::PARAM_STR);
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
                $arregloJSON=json_encode($datos);
			    echo $arregloJSON;
            }
        }else{
            echo "Error al buscar coincidencias de Alumnos";
        }
        $conexion=null;
    }
    buscarAlumno($coincidencia, $codigoAsignatura);
?>