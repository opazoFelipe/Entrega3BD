<?php
    require ('../conexion.php');
    
    $sql=
        "SELECT 
        ex.nombre,
        COUNT(participan.codigo_extraprogramatico) as inscritos
        FROM 
            extraprogramatico ex, 
            (
                SELECT DISTINCT
                    a.rut,
                    a.nombres,
                    p.codigo_extraprogramatico
                FROM 
                    alumno a, 
                    participa_en p
                WHERE 
                    p.rut_alumno=a.rut AND 
                    (a.fecha_nacimiento 
                    BETWEEN 
                    '2006-01-01' AND '2008-12-31')
            )AS participan
        WHERE
            participan.codigo_extraprogramatico=ex.codigo
        GROUP BY 
            participan.codigo_extraprogramatico, 
            ex.nombre
        HAVING 
            COUNT(participan.codigo_extraprogramatico) > 5";

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
                        <th>NOMBRE EXTRAPROGRAMATICO</th>
                        <th>CANTIDAD INSCRITOS</th>
                    </tr>
                </thead>
                <tbody id='tbodyConsultaE2'>
        ";
        while($result = $smt->fetch(PDO::FETCH_ASSOC))
        {
            $nombre=$result["nombre"];
            $nombre=strtoupper($nombre);
            $inscritos=$result["inscritos"];
            $inscritos=strtoupper($inscritos);

            $tablaAsignaturas.=
                "<tr>
                    <td>".$nombre."</td>
                    <td>".$inscritos."</td>
                </tr>";         
        }
        $tablaAsignaturas.="</tbody></table>";
        echo $tablaAsignaturas;                    
    }else echo "error";
?>