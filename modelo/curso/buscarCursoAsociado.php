<?php
    require ('../conexion.php');

    $coincidencia=$_POST["coincidencia"];
    $coincidencia=strtoupper($coincidencia);
    $codigoAsignatura=$_POST["codigoAsignatura"];
    function buscarCurso($coincidencia, $codigoAsignatura)
    {
        $conexion=new conexion();
        $coincidencia=$coincidencia."%";
        $bd=$conexion->get_conexion();
        $sql="select
                q.codigo,
                q.rut_profesor_jefe,
                q.año 
            from 
                (select * from curso where codigo like ?) as q
            where
                q.codigo in (select cons.codigo_curso from consta_de cons where cons.codigo_asignatura=?)
            order by
                q.codigo";
        $smt=$bd->prepare($sql);
        $smt->bindValue(1, $coincidencia, PDO::PARAM_STR);
        $smt->bindValue(2, $codigoAsignatura, PDO::PARAM_STR);
        if($smt->execute())
        {
            $datos=array();
            $i=0;
            while($result = $smt->fetch(PDO::FETCH_ASSOC))
			{
                $codigo=$result["codigo"];
                $rutProfesorJefe=$result["rut_profesor_jefe"];
                $año=$result["año"];
                $datos[$i]=
                [
                    "codigo"=>$codigo, 
                    "rutProfesorJefe"=>$rutProfesorJefe,
                    "año"=>$año
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
            echo "Error al buscar coincidencias de Cursos no Asociados";
        }
        $conexion=null;
    }
    buscarCurso($coincidencia, $codigoAsignatura);
?>