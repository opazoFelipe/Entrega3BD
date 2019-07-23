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
                q.codigo not in (select cons.codigo_curso from consta_de cons where cons.codigo_asignatura=?)
            order by
                q.codigo";
        $smt=$bd->prepare($sql);
        $smt->bindValue(1, $coincidencia, PDO::PARAM_STR);
        $smt->bindValue(2, $codigoAsignatura, PDO::PARAM_STR);
        if($smt->execute())
        {
            if($smt->rowCount()>0)
            {
                $tablaCursos=
                "
                    <table id='asociarCurso'>
                        <thead id='theadAsociarCurso'>
                            <tr>
                                <th>Codigo</th>
                                <th>Rut Profesor Jefe</th>
                                <th>Año</th>
                                <th>Opcion</th>
                            </tr>
                        </thead>
                    <tbody id='tbodyAsociarCurso'>
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
                            <button id=".$codigo." onclick='botonAsociarCurso(this)'>ASOCIAR</button>
                        </td>
                    </tr>";       
                }
			    echo $tablaCursos;
            }else echo "vacio"; 
        }else{
            echo "Error al buscar coincidencias de Cursos no Asociados";
        }
        $conexion=null;
    }
    buscarCurso($coincidencia, $codigoAsignatura);
?>