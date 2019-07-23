<?php
    require ('../conexion.php');
    
    $conexion=new conexion();
    $bd=$conexion->get_conexion();
    $sql=
        "SELECT 
        alumnos_6A2018.nombre_asignatura,
        AVG(alumnos_6A2018.nota_final) as Promedio
        FROM	
            (
                SELECT
                    asig.nombre AS nombre_asignatura,
                    esta_en.nota_final AS nota_final,
                    a.rut AS rut_alumno
                FROM
                    alumno a,
                    cursa,
                    curso c,
                    esta_en,
                    asignatura asig,
                    consta_de
                WHERE
                    c.codigo='6A-2018' AND
                    cursa.rut_alumno=a.rut AND
                    cursa.codigo_curso=c.codigo AND
                    consta_de.codigo_curso=c.codigo AND
                    consta_de.codigo_asignatura=asig.codigo AND
                    esta_en.codigo_asignatura=asig.codigo AND
                    esta_en.rut_alumno=a.rut
                )AS alumnos_6A2018
        WHERE
            alumnos_6A2018.rut_alumno
        NOT IN
            (
                SELECT
                    a.rut
                FROM
                    alumno a,
                    participa_en p,
                    extraprogramatico ex
                WHERE
                    p.rut_alumno=a.rut AND
                    p.codigo_extraprogramatico=ex.codigo AND
                    ex.nombre='Rugby'		
            )
            GROUP BY alumnos_6A2018.nombre_asignatura;";  
    $smt=$bd->prepare($sql); 
    if($smt->execute())
    {
        $tablaAsignaturas=
        "
            <table id='tablaConsultaE2'>
                <thead id='theadConsultaE2'>
                    <tr>
                        <th>NOMBRE CURSO</th>
                        <th>PROMEDIO</th>
                    </tr>
                </thead>
                <tbody id='tbodyConsultaE2'>
        ";
        while($result = $smt->fetch(PDO::FETCH_ASSOC))
        {
            $nombreAsignatura=$result["nombre_asignatura"];
            $nombreAsignatura=strtoupper($nombreAsignatura);
            $promedio=$result["promedio"];
            $promedio=strtoupper($promedio);

            $tablaAsignaturas.=
                "<tr>
                    <td>".$nombreAsignatura."</td>
                    <td>".$promedio."</td>
                </tr>";         
        }
        $tablaAsignaturas.="</tbody></table>";
        echo $tablaAsignaturas;                    
    }else echo "error";
?>