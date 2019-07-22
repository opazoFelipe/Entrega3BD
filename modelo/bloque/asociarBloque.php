<?php
    require ('../conexion.php');

    $codigoBloque=$_POST["codigoBloque"];
    $codigoAsignatura=$_POST["codigoAsignatura"];

    $conexion=new conexion();
    $bd=$conexion->get_conexion();
    $sql="insert into se_le_otorga values(?,?)";
    $smt=$bd->prepare($sql);
    $smt->bindValue(1, $codigoAsignatura, PDO::PARAM_STR);
    $smt->bindValue(2, $codigoBloque, PDO::PARAM_STR);
    if($smt->execute())
    {
        echo "hecho";
    }else{
        echo "error";
    }
    $conexion=null;
?>