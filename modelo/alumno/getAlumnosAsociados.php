<?php
    require ('../conexion.php');

    $conexion=new conexion();
    $codigoAsignatura=$_POST["codigoAsignatura"];
    $bd=$conexion->get_conexion();
    $sql="select 
            a.rut, 
            a.nombres, 
            a.apellidos,
            e.nota_final
        from 
            alumno a,
            esta_en e
        where
            e.rut_alumno=a.rut and
            e.codigo_asignatura=?
        order by
            a.rut";
    
    $smt=$bd->prepare($sql);
    $smt->bindValue(1, $codigoAsignatura, PDO::PARAM_STR);
    if($smt->execute())
    {
        if($smt->rowCount()>0)
        {
            $tablaAlumnos=
            "
                <table id='desAsociarAlumno'>
                    <thead id='theadDesAsociarAlumno'>
                        <tr>
                            <th>Rut</th>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Nota Final</th>
                            <th>Opcion</th>
                        </tr>
                    </thead>
                    <tbody id='tbodyDesAsociarAlumno'>
            ";

            while($result = $smt->fetch(PDO::FETCH_ASSOC))
            {
                $rut=$result["rut"];
                $nombres=$result["nombres"];
                $apellidos=$result["apellidos"];
                $notaFinal=$result["nota_final"];
                if($notaFinal==0)
                    $notaFinal="Por Asignar";

                $tablaAlumnos.=
                    "<tr>
                        <td>".$rut."</td>
                        <td>".$nombres."</td>
                        <td>".$apellidos."</td>
                        <td>".$notaFinal."</td>
                        <td>
                            <button id=".$rut." onclick='botonDesAsociar(this)'>REMOVER</button>
                        </td>
                    </tr>";		
            }
            echo $tablaAlumnos;
        }else echo "vacio"; 
    }else{
        echo "Error al buscar alumnos asociados a la asignatura";
    }
    $conexion=null;
?>