<?php
    require ('../conexion.php');

    $codigoAsignatura=$_POST["codigoAsignatura"];

    $conexion=new conexion();
    $bd=$conexion->get_conexion();
    $sql="update asignatura set rut_profesor='no asociado' where codigo=?";
    $smt=$bd->prepare($sql);
    $smt->bindValue(1, $codigoAsignatura, PDO::PARAM_STR);
    if($smt->execute())
    {
        echo "hecho";
    }else{
        echo "error";
    }
    $conexion=null;
?>