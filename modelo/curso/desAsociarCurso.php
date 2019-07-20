<?php
    require ('../conexion.php');

    $codigoCurso=$_POST["codigoCurso"];
    $codigoAsignatura=$_POST["codigoAsignatura"];

    $conexion=new conexion();
    $bd=$conexion->get_conexion();
    $sql="delete from consta_de where codigo_asignatura=? and codigo_curso=?";
    $smt=$bd->prepare($sql);
    $smt->bindValue(1, $codigoAsignatura, PDO::PARAM_STR);
    $smt->bindValue(2, $codigoCurso, PDO::PARAM_STR);
    if($smt->execute())
    {
        echo "hecho";
    }else{
        echo "error";
    }
    $conexion=null;
?>