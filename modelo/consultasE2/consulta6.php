<?php
    require ('../conexion.php');
    
    $sql=
        "CREATE OR REPLACE VIEW Aprobados1A_2018 AS
        (
            select 
                curso.codigo as codigo_curso,
                asignatura.codigo as codigo_asignatura,
                asignatura.nombre as nombre_asignatura,
                count(alumno.rut) as Aprobados
            from 
                consta_de,
                esta_en,
                cursa,
                alumno,
                curso,
                asignatura
            where 
                cursa.rut_alumno=alumno.rut AND
                cursa.codigo_curso=curso.codigo AND
                consta_de.codigo_curso=curso.codigo AND
                consta_de.codigo_asignatura=asignatura.codigo AND
                esta_en.codigo_asignatura=asignatura.codigo AND
                esta_en.rut_alumno=alumno.rut AND
                curso.codigo='1A-2018' AND
                esta_en.nota_final>=4.0
            GROUP BY
                curso.codigo,	
                asignatura.codigo,
                asignatura.nombre 
        )	";
    $conexion=new conexion();
    $bd=$conexion->get_conexion();
    $smt=$bd->prepare($sql);
    $smt->execute();

    $sql=
        "SELECT
        v1.nombre_asignatura
        FROM
            (
                select 
                    esta_en.codigo_asignatura, 
                    count(esta_en.rut_alumno) as cant_alumnos
                from 
                    consta_de, 
                    esta_en 
                where 
                    consta_de.codigo_asignatura=esta_en.codigo_asignatura AND 
                    consta_de.codigo_curso='1A-2018'
                GROUP BY 
                    esta_en.codigo_asignatura 
            )AS AlumnosPorRamo,
            Aprobados1A_2018 as v1
        WHERE
            AlumnosPorRamo.codigo_asignatura=v1.codigo_asignatura AND
            v1.Aprobados<=(AlumnosPorRamo.cant_alumnos*0.5)";   

    $smt=$bd->prepare($sql);
    if($smt->execute())
    {
        $tablaAsignaturas=
        "
            <table id='tablaConsultaE2'>
                <thead id='theadConsultaE2'>
                    <tr>
                        <th>NOMBRE ASIGNATURA</th>
                    </tr>
                </thead>
                <tbody id='tbodyConsultaE2'>
        ";
        while($result = $smt->fetch(PDO::FETCH_ASSOC))
        {
            $nombreAsignatura=$result["nombre_asignatura"];
            $nombreAsignatura=strtoupper($nombreAsignatura);

            $tablaAsignaturas.=
                "<tr>
                    <td>".$nombreAsignatura."</td>
                </tr>";         
        }
        $tablaAsignaturas.="</tbody></table>";
        echo $tablaAsignaturas;                    
    }else echo "error";
?>