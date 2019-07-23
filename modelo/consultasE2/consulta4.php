<?php
    require ('../conexion.php');
    
    $sql=
        "CREATE OR REPLACE VIEW 
        matriculados2019(codigo_curso, inscritos) AS 
        (
            SELECT 
                cursa.codigo_curso,
                COUNT(cursa.rut_alumno) AS ins
            FROM 
                alumno a, 
                cursa, 
                curso c
            WHERE
                cursa.rut_alumno=a.rut AND 
                cursa.codigo_curso=c.codigo AND 
                c.año=2019
            GROUP BY
                cursa.codigo_curso
        )";
    $conexion=new conexion();
    $bd=$conexion->get_conexion();
    $smt=$bd->prepare($sql);
    $smt->execute();

    $sql=
        "SELECT
        mat.codigo_curso AS nombre_curso
        FROM 
            matriculados2019 mat
        WHERE
            mat.inscritos=
            (
                SELECT 
                    MIN(mat2.inscritos) 
                FROM 
                    matriculados mat2
            )";   

    $smt=$bd->prepare($sql);
    if($smt->execute())
    {
        $tablaAsignaturas=
        "
            <table id='tablaConsultaE2'>
                <thead id='theadConsultaE2'>
                    <tr>
                        <th>NOMBRE CURSO</th>
                    </tr>
                </thead>
                <tbody id='tbodyConsultaE2'>
        ";
        while($result = $smt->fetch(PDO::FETCH_ASSOC))
        {
            $nombreCurso=$result["nombre_curso"];
            $nombreCurso=strtoupper($nombreCurso);

            $tablaAsignaturas.=
                "<tr>
                    <td>".$nombreCurso."</td>
                </tr>";         
        }
        $tablaAsignaturas.="</tbody></table>";
        echo $tablaAsignaturas;                    
    }else echo "error";
?>