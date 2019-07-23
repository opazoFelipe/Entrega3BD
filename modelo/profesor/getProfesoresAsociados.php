<?php
    require ('../conexion.php');

    $conexion=new conexion();
    $codigoAsignatura=$_POST["codigoAsignatura"];
    $bd=$conexion->get_conexion();
    $sql="select 
            a.rut_profesor, 
            p.nombres, 
            p.apellidos
        from 
            asignatura a,
            profesor p
        where
            a.rut_profesor=p.rut and
            a.codigo=?
        order by
            a.rut_profesor";
    $smt=$bd->prepare($sql);
    $smt->bindValue(1, $codigoAsignatura, PDO::PARAM_STR);
    if($smt->execute())
    {
        if($smt->rowCount()>0)
            {
                $tablaCursos=
                "
                    <table id='desAsociarProfesor'>
                        <thead id='theadDesAsociarProfesor'>
                            <tr>
                                <th>Rut</th>
                                <th>Nombres</th>
                                <th>Apellidos</th>
                            </tr>
                        </thead>
                        <tbody id='tbodyDesAsociarProfesor'>
                ";

                while($result = $smt->fetch(PDO::FETCH_ASSOC))
                {
                    $rut=$result["rut_profesor"];
                    $rut=strtoupper($rut);

                    $nombres=$result["nombres"];
                    $nombres=strtoupper($nombres);

                    $apellidos=$result["apellidos"];
                    $apellidos=strtoupper($apellidos);
            
                    $tablaCursos.=
                        "<tr>
                            <td>".$rut."</td>
                            <td>".$nombres."</td>
                            <td>".$apellidos."</td>
                        </tr>";		
                }
                echo $tablaCursos;
            }else echo "vacio";
    }else{
        echo "Error al buscar profesores asociados a la asignatura";
    }
    $conexion=null;
?>