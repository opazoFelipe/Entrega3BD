<?php
    require ('../conexion.php');


    $sql=
        "SELECT 
        c1.alumno AS nombre_alumno,
        c1.apoderado AS nombre_apoderado, 
        c1.c_curso AS nombre_curso, 
        c1.jefe AS nombre_profesor_jefe,
        COALESCE(c2.asistente,'No posee') AS nombre_profesor_asistente
        FROM 
        (
            SELECT 
                e.codigo_curso, 
                p.nombres AS asistente 
            FROM 
                es_asistente e, 
                profesor p
            WHERE 
                e.rut_profesor=p.rut
        ) AS c2 RIGHT OUTER JOIN
        (
            SELECT
                alu.nombres AS alumno, 
                apo.nombres AS apoderado, 
                c.codigo AS c_curso, 
                jefe.nombres AS jefe
            FROM 
                alumno alu, 
                apoderado apo, 
                curso c, 
                profesor jefe, 
                cursa cur, 
                ciudad ciu, 
                region r
            WHERE
                apo.rut=alu.rut_apoderado AND  
                cur.rut_alumno=alu.rut AND 
                cur.codigo_curso=c.codigo AND  
                c.rut_profesor_jefe=jefe.rut AND 
                alu.codigo_ciudad=ciu.codigo AND
                ciu.codigo_region=r.codigo AND 
                (r.nombre='Bio-Bio' OR r.nombre='Ñuble') AND 
                c.año=(SELECT MAX(c2.año) FROM curso c2)
                --El año maximo de los cursos deberia ser el año actual
        )AS c1
            ON c2.codigo_curso=c1.c_curso ";

    $conexion=new conexion();
    $bd=$conexion->get_conexion();
    $smt=$bd->prepare($sql);
    if($smt->execute())
    {
        $tablaAsignaturas=
        "
            <table id='tablaConsultaE2'>
                <thead id='theadConsultaE2'>
                    <tr>
                        <th>Nombre Alumno</th>
                        <th>Nombre Apoderado</th>
                        <th>Nombre Curso</th>
                        <th>Nombre Profesor Jefe</th>
                        <th>Nombre Profesor Asistente</th>
                    </tr>
                </thead>
                <tbody id='tbodyConsultaE2'>
        ";
        while($result = $smt->fetch(PDO::FETCH_ASSOC))
        {
            $nombreAlumno=$result["nombre_alumno"];
            $nombreApoderado=$result["nombre_apoderado"];
            $nombreCurso=$result["nombre_curso"];
            $nombreProfesorJefe=$result["nombre_profesor_jefe"];
            $nombreProfesorAsistente=$result["nombre_profesor_asistente"];

            $tablaAsignaturas.=
                "<tr>
                    <td>".$nombreAlumno."</td>
                    <td>".$nombreApoderado."</td>
                    <td>".$nombreCurso."</td>
                    <td>".$nombreProfesorJefe."</td>
                    <td>".$nombreProfesorAsistente."</td>
                </tr>";
                    
        }
        $tablaAsignaturas.="</tbody></table>";
        echo $tablaAsignaturas;                    
    }else echo "error";
?>