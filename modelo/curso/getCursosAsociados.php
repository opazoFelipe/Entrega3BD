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
            if($smt->rowCount()>0)
            {
                $tablaCursos=
                "
                    <table id='desAsociarCurso' class='tablaAsociar'>
                        <thead id='theadDesAsociarCurso'>
                            <tr>
                                <th>Codigo</th>
                                <th>Rut Profesor Jefe</th>
                                <th>Año</th>
                                <th>Opcion</th>
                            </tr>
                        </thead>
                        <tbody id='tbodyDesAsociarCurso'>
                ";

                while($result = $smt->fetch(PDO::FETCH_ASSOC))
                {
                    $codigo=$result["codigo"];
                    $codigo=strtoupper($codigo);
                    
                    $rutProfesorJefe=$result["rut_profesor_jefe"];
                    $rutProfesorJefe=strtoupper($rutProfesorJefe);

                    $año=$result["año"];
                    $año=strtoupper($año);
            
                    $tablaCursos.=
                        "<tr>
                            <td>".$codigo."</td>
                            <td>".$rutProfesorJefe."</td>
                            <td>".$año."</td>
                            <td>
                                <button id=".$codigo." onclick='botonDesAsociarCurso(this)'>REMOVER</button>
                            </td>
                        </tr>";		
                }
                echo $tablaCursos;
            }else{
                echo "Error al buscar coincidencias de Cursos no Asociados";
            }
        }
        $conexion=null;
    }
    buscarCurso($codigoAsignatura);
?>