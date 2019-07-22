<?php
    require ('../conexion.php');

    $coincidencia=$_POST["coincidencia"];
    $codigoAsignatura=$_POST["codigoAsignatura"];
    function buscarAlumno($coincidencia, $codigoAsignatura)
    {
        $conexion=new conexion();
        $coincidencia=$coincidencia."%";
        $bd=$conexion->get_conexion();
        $sql="select 
                q.rut, 
                q.nombres, 
                q.apellidos
            from 
                (select p.rut, p.nombres, p.apellidos from profesor p where p.rut like ?) as q
            where
                q.rut in(select rut_profesor from asignatura where codigo=?)
            order by
                q.rut";

        $smt=$bd->prepare($sql);
        $smt->bindValue(1, $coincidencia, PDO::PARAM_STR);
        $smt->bindValue(2, $codigoAsignatura, PDO::PARAM_STR);
        if($smt->execute())
        {
            if($smt->rowCount()>0)
            {
                $tablaProfesores=
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
                    $rut=$result["rut"];
                    $nombres=$result["nombres"];
                    $apellidos=$result["apellidos"];

                    $tablaProfesores.=
                    "<tr>
                        <td>".$rut."</td>
                        <td>".$nombres."</td>
                        <td>".$apellidos."</td>
                    </tr>";	
                }
                echo $tablaProfesores;
            }else echo "vacio";
        }else{
            echo "Error al buscar coincidencias de Profesores";
        }
        $conexion=null;
    }
    buscarAlumno($coincidencia, $codigoAsignatura);
?>