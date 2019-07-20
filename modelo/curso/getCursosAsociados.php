<?php
    require ('../conexion.php');
    
    $codigoAsignatura=$_POST["codigoAsignatura"];
    function buscarCurso($codigoAsignatura)
    {
        $conexion=new conexion();
        $bd=$conexion->get_conexion();
        $sql="select
                c.codigo,
                c.rut_profesor_jefe,
                c.año 
            from 
                (select cons.codigo_curso from consta_de cons where cons.codigo_asignatura=?) as q,
                curso c
            where 
                c.codigo=q.codigo_curso
            order by
                c.codigo";
        $smt=$bd->prepare($sql);
        $smt->bindValue(1, $codigoAsignatura, PDO::PARAM_STR);
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
    buscarCurso($codigoAsignatura);
?>