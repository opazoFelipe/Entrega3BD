<?php
    require ('../conexion.php');

    $conexion=new conexion();
    $bd=$conexion->get_conexion();
    $sql="select p.rut, p.nombres, p.apellidos from profesor p";
    $smt=$bd->prepare($sql);
    if($smt->execute())
    {
        if($smt->rowCount()>0)
        {
            $tablaProfesores=
            "
                <table id='asociarProfesor'>
                    <thead id='theadAsociarProfesor'>
                        <tr>
                            <th>Rut</th>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Opcion</th>
                        </tr>
                    </thead>
                <tbody id='tbodyAsociarProfesor'>
            ";
            while($result = $smt->fetch(PDO::FETCH_ASSOC))
            {
                $rut=$result["rut"];
                $nombres=$result["nombres"];
                $apellidos=$result["apellidos"];

                $tablaProfesores.=
                "<tr>
                    <td id='profesor".$rut."'>".$rut."</td>
                    <td id='nombres".$rut."'>".$nombres."</td>
                    <td id='apellidos".$rut."'>".$apellidos."</td>
                    <td>
                        <button id=".$rut." onclick='asociarProfesorNuevaAsignatura(this)'>ASOCIAR</button>
                    </td>
                </tr>";       
            }
            echo $tablaProfesores;
        }else echo "vacio";
    }else{
        echo "Error al buscar Profesores";
    }
    $conexion=null;
?>