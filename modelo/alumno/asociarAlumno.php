<?php
    require ('../conexion.php');

    $rut=$_POST["rut"];
    $codigoAsignatura=$_POST["codigoAsignatura"];
    $notaFinal=0;

    $conexion=new conexion();
    $bd=$conexion->get_conexion();
    $sql="insert into esta_en values(?,?,?)";
    $smt=$bd->prepare($sql);
    $smt->bindValue(1, $codigoAsignatura, PDO::PARAM_STR);
    $smt->bindValue(2, $rut, PDO::PARAM_STR);
    $smt->bindValue(3, $notaFinal, PDO::PARAM_INT);
    if($smt->execute())
    {
        echo "hecho";
    }else{
        echo "error";
    }
    $conexion=null;
?>