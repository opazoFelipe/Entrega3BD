<?php
    require ('../conexion.php');
    $conexion=new conexion();
    $bd=$conexion->get_conexion();
    $sql="select inAsignatura(?, ?, ?, ?)";
    $smt=$bd->prepare($sql);
    $smt->bindValue(1, $cod, PDO::PARAM_INT);
    $smt->bindValue(2, $rutProf, PDO::PARAM_SRT);
    $smt->bindValue(3, $nomAsig, PDO::PARAM_SRT);
    $smt->bindValue(4, $salaOLab, PDO::PARAM_SRT);
    if($smt->execute())
    {
        echo "Datos ingresados Correctamente";
    }else{
        echo "Error al ingresar los datos";
    }
    $conexion=null;
?>