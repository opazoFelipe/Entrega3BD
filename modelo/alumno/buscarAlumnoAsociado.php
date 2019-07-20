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
                a.rut, 
                a.nombres, 
                a.apellidos,
                e.nota_final
            from 
                alumno a, 
                esta_en e
            where
                a.rut like ? and e.codigo_asignatura=? and a.rut=e.rut_alumno";
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
                $notaFinal=$result["nota_final"];
                if($notaFinal==0) $notaFinal="Por asignar";
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