<?php
    require ('../conexion.php');

    $codigoCurso=$_POST["codigoCurso"];
    $codigoAsignatura=$_POST["codigoAsignatura"];

    $conexion=new conexion();
    $bd=$conexion->get_conexion();
    $sql="insert into consta_de values(?,?)";
    $smt=$bd->prepare($sql);
    $smt->bindValue(1, $codigoCurso, PDO::PARAM_STR);
    $smt->bindValue(2, $codigoAsignatura, PDO::PARAM_STR);
    if($smt->execute())
    {
        echo "hecho";
    }else{
        echo "error";
    }
    $conexion=null;
?>