<?php
    require ('../conexion.php');

    $coincidencia=$_POST["coincidencia"];
    $codigoAsignatura=$_POST["codigoAsignatura"];
    function buscarAlumno($coincidencia, $codigoAsignatura)
    {
        $conexion=new conexion();
        $coincidencia="%".$coincidencia."%";
        $bd=$conexion->get_conexion();
        $sql="select 
                q.codigo, 
                q.descripcion 
            from 
                (select b.codigo, b.descripcion from bloque b where b.descripcion like ?) as q
            where
                q.codigo in(select s.codigo_bloque from se_le_otorga s where codigo_asignatura=?)
            order by
                q.codigo";

        $smt=$bd->prepare($sql);
        $smt->bindValue(1, $coincidencia, PDO::PARAM_STR);
        $smt->bindValue(2, $codigoAsignatura, PDO::PARAM_STR);
        if($smt->execute())
        {
            if($smt->rowCount()>0)
            {
                $tablaBloques=
                "
                    <table id='desAsociarBloque' class='tablaAsociar'>
                        <thead id='theadDesAsociarBloque'>
                            <tr>
                                <th>Codigo</th>
                                <th>Descripcion</th>
                                <th>Opcion</th>
                            </tr>
                        </thead>
                    <tbody id='tbodyDesAsociarBloque'>
                ";
                while($result = $smt->fetch(PDO::FETCH_ASSOC))
                {
                    $codigo=$result["codigo"];
                    $codigo=strtoupper($codigo);

                    $descripcion=$result["descripcion"];
                    $descripcion=strtoupper($descripcion);

                    $tablaBloques.=
                    "<tr>
                        <td>".$codigo."</td>
                        <td>".$descripcion."</td>
                        <td>
                            <button id=".$codigo." onclick='botonDesAsociarBloque(this)'>REMOVER</button>
                        </td>
                    </tr>";       
                }
                echo $tablaBloques;
            }else echo "vacio";
        }else{
            echo "Error al buscar coincidencias de Bloques";
        }
        $conexion=null;
    }
    buscarAlumno($coincidencia, $codigoAsignatura);
?>