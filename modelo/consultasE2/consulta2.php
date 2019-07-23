<?php
    require ('../conexion.php');


    $sql=
        "SELECT 
        jefe.nombres
        FROM 
        (
            SELECT DISTINCT
                jefe1.nombres, 
                jefe1.rut
            FROM 
                profesor jefe1, 
                curso c1
            WHERE 
                c1.rut_profesor_jefe=jefe1.rut
        ) AS jefe WHERE jefe.rut NOT IN
        (
            SELECT 
                profesor.rut
            FROM 
                se_ofrece_a soa, 
                nivel n, 
                profesor, 
                extraprogramatico ex
            WHERE
                soa.codigo_extraprogramatico=ex.codigo AND
                soa.codigo_nivel=n.codigo AND 
                (n.nombre='Primero' OR n.nombre='Segundo') AND 
                ex.rut_profesor=profesor.rut
        )";

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
                        <th>Nombre Profesor Jefe</th>
                    </tr>
                </thead>
                <tbody id='tbodyConsultaE2'>
        ";
        while($result = $smt->fetch(PDO::FETCH_ASSOC))
        {
            $nombres=$result["nombres"];
            $nombres=strtoupper($nombres);

            $tablaAsignaturas.=
                "<tr>
                    <td>".$nombres."</td>
                </tr>";         
        }
        $tablaAsignaturas.="</tbody></table>";
        echo $tablaAsignaturas;                    
    }else echo "error";
?>