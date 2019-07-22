<?php
    require ('../conexion.php');

    $codigoAsignatura=$_POST["codigoAsignatura"];
    function buscarAlumno($codigoAsignatura)
    {
        $conexion=new conexion();
        $bd=$conexion->get_conexion();
        $sql="select 
                b.codigo, 
                b.descripcion 
            from 
               bloque b
            where
                b.codigo in(select s.codigo_bloque from se_le_otorga s where codigo_asignatura=?)
            order by
                b.codigo";

        $smt=$bd->prepare($sql);
        $smt->bindValue(1, $codigoAsignatura, PDO::PARAM_STR);
        if($smt->execute())
        {
            if($smt->rowCount()>0)
            {
                $tablaBloques=
                "
                    <table id='desAsociarBloque'>
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
                    $descripcion=$result["descripcion"];

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
            echo "Error al buscar Bloques asociados a la asignatura";
        }
        $conexion=null;
    }
    buscarAlumno($codigoAsignatura);
?>