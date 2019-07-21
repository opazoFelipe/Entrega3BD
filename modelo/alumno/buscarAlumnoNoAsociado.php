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
                a.rut, 
                a.nombres, 
                a.apellidos
            from 
                alumno a
            where
                a.rut like ? and
                a.rut not in(select rut_alumno from esta_en where codigo_asignatura=?)
            order by
                a.rut";
        $smt=$bd->prepare($sql);
        $smt->bindValue(1, $coincidencia, PDO::PARAM_STR);
        $smt->bindValue(2, $codigoAsignatura, PDO::PARAM_STR);
        if($smt->execute())
        {
            $tablaAlumnos=
            "
                <table id='asociarAlumno'>
                    <thead id='theadAsociarAlumno'>
                        <tr>
                            <th>Rut</th>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Opcion</th>
                        </tr>
                    </thead>
                <tbody id='tbodyAsociarAlumno'>
            ";
            while($result = $smt->fetch(PDO::FETCH_ASSOC))
			{
                $rut=$result["rut"];
                $nombres=$result["nombres"];
                $apellidos=$result["apellidos"];

                $tablaAlumnos.=
                "<tr>
                    <td>".$rut."</td>
                    <td>".$nombres."</td>
                    <td>".$apellidos."</td>
                    <td>
                        <button id=".$rut." onclick='botonAsociar(this.id)'>ASOCIAR</button>
                    </td>
                </tr>";
               		
            }
			    echo $tablaAlumnos;
        }else{
            echo "Error al buscar coincidencias de Alumnos";
        }
        $conexion=null;
    }
    buscarAlumno($coincidencia, $codigoAsignatura);
?>