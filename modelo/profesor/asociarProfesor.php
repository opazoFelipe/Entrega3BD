<?php
    require ('../conexion.php');

    $rutProfesor=$_POST["rutProfesor"];
    $codigoAsignatura=$_POST["codigoAsignatura"];

    $conexion=new conexion();
    $bd=$conexion->get_conexion();
    $sql="update asignatura set rut_profesor=? where codigo=?";
    $smt=$bd->prepare($sql);
    $smt->bindValue(1, $rutProfesor, PDO::PARAM_STR);
    $smt->bindValue(2, $codigoAsignatura, PDO::PARAM_STR);
    if($smt->execute())
    {
        echo "hecho";
    }else{
        echo "error";
    }
    $conexion=null;
?>