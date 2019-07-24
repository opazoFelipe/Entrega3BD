<?php
    require ('../conexion.php');

    $conexion=new conexion();
    $coincidencia=$_POST["coincidencia"];
    $coincidencia=$coincidencia."%";
    $bd=$conexion->get_conexion();
    $sql="select 
            q.rut, 
            q.nombres, 
            q.apellidos
        from 
            (select p.rut, p.nombres, p.apellidos from profesor p where p.rut like ?) as q
        order by
            q.rut";
    $smt=$bd->prepare($sql);
    $smt->bindValue(1, $coincidencia, PDO::PARAM_STR);
    if($smt->execute())
    {
        if($smt->rowCount()>0)
        {
            $tablaProfesores=
            "
                <table id='asociarProfesor'>
                    <thead id='theadAsociarProfesor'>
                        <tr>
                            <th class='columnaProfesor'>Rut</th>
                            <th class='columnaProfesor'>Nombres</th>
                            <th class='columnaProfesor'>Apellidos</th>
                            <th class='columnaProfesor'>Opcion</th>
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
                    <td  class='columnaProfesor' id='profesor".$rut."'>".$rut."</td>
                    <td  class='columnaProfesor' id='nombres".$rut."'>".$nombres."</td>
                    <td  class='columnaProfesor' id='apellidos".$rut."'>".$apellidos."</td>
                    <td class='columnaProfesor'>
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