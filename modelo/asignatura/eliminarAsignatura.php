<?php
    require ('../conexion.php');
    $codActual=$_POST["codigoAsignatura"];
    
    $conexion=new conexion();
    $bd=$conexion->get_conexion();
    $sql="select * from consta_de where codigo_asignatura=?";
    $smt=$bd->prepare($sql);
    $smt->bindValue(1, $codActual, PDO::PARAM_INT);
    if($smt->execute())
    {
        if($smt->rowCount()>0)
        {
            echo"no es posible eliminar esta asignatura debido a que existe en la relacion consta_de";
            die();
        } 
    }else echo "Error al buscar en tabla externa";

    $sql="select * from esta_en where codigo_asignatura=?";
    $smt=$bd->prepare($sql);
    $smt->bindValue(1, $codActual, PDO::PARAM_INT);
    if($smt->execute())
    {
        if($smt->rowCount()>0)
        {
            echo"no es posible eliminar esta asignatura debido a que existe en la relacion esta_en";
            die();
        } 
    }else echo "Error al buscar en tabla externa";

    $sql="select * from se_le_otorga where codigo_asignatura=?";
    $smt=$bd->prepare($sql);
    $smt->bindValue(1, $codActual, PDO::PARAM_INT);
    if($smt->execute())
    {
        if($smt->rowCount()>0)
        {
            echo"no es posible eliminar esta asignatura debido a que existe en la relacion se_le_otorga";
            die();
        } 
    }else echo "Error al buscar en tabla externa";

    $sql="delete from asignatura where codigo=?";
    $smt=$bd->prepare($sql);
    $smt->bindValue(1, $codActual, PDO::PARAM_INT);
    if($smt->execute())
    {
        if($smt->rowCount()>0)
        {
            echo"Asignatura eliminada correctamente";
            die();
        } 
    }else echo "Error al eliminar la asignatura seleccionada";
?>