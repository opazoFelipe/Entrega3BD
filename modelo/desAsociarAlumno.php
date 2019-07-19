<?php
    require ('conexion.php');

    $rut=$_POST["rut"];
    $codigoAsignatura=$_POST["codigoAsignatura"];

    $conexion=new conexion();
    $bd=$conexion->get_conexion();
    $sql="delete from esta_en where codigo_asignatura=? and rut_alumno=?";
    $smt=$bd->prepare($sql);
    $smt->bindValue(1, $codigoAsignatura, PDO::PARAM_STR);
    $smt->bindValue(2, $rut, PDO::PARAM_STR);
    if($smt->execute())
    {
        echo "hecho";
    }else{
        echo "error";
    }
    $conexion=null;
?>