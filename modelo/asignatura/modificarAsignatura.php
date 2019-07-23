<?php
    require ('../conexion.php');

    $codActual=$_POST["codigoActual"];
    $codNuevo=$_POST["codigoNuevo"];
    $nomAsig=$_POST["nombreAsignatura"]; //Nombre Nuevo
    $salaOLab=$_POST["salaOLab"]; //Sala Nueva

    $nombreActual=$_POST["nombreActual"];
    $salaActual=$_POST["salaActual"];

    $updateCodigo=true;
    $updateNombre=true;
    $updateSala=true;

    $sql;
    if($codNuevo==$codActual | $codNuevo=="")
    {
        $codNuevo=$codActual;
        $updateCodigo=false;     
    }
    if($nombreActual==$nomAsig | $nomAsig=="")
    {
        $nomAsig=$nombreActual;
        $updateNombre=false;
    }
    if($salaActual==$salaOLab | $salaOLab=="")
    {
        $salaOLab=$salaActual;
        $updateSala=false;
    }

    $conexion=new conexion();
    $bd=$conexion->get_conexion();

    $nomAsig=strtolower($nomAsig);
    $salaOLab=strtolower($salaOLab);

    //Modificar todo
    if($updateCodigo and $updateNombre and $updateSala)
    {
        $sql="update asignatura set codigo=?, nombre=?, sala_laboratorio=? where codigo=?";
        $smt=$bd->prepare($sql);
        $smt->bindValue(1, $codNuevo, PDO::PARAM_INT);
        $smt->bindValue(2, $nomAsig, PDO::PARAM_INT);
        $smt->bindValue(3, $salaOLab, PDO::PARAM_STR);
        $smt->bindValue(4, $codActual, PDO::PARAM_STR);

        if($smt->execute())
            echo "hecho";
        else
            echo "error";
        $conexion=null;
        die();           
    }

    //Modificar nombre y sala
    if(!$updateCodigo and $updateNombre and $updateSala)
    {
        $sql="update asignatura set nombre=?, sala_laboratorio=? where codigo=?";
        $smt=$bd->prepare($sql);
        $smt->bindValue(1, $nomAsig, PDO::PARAM_INT);
        $smt->bindValue(2, $salaOLab, PDO::PARAM_STR);
        $smt->bindValue(3, $codActual, PDO::PARAM_STR);

        if($smt->execute())
            echo "hecho";
        else
            echo "error";
        $conexion=null;
        die();  
    }

    //Modificar codigo y sala
    if($updateCodigo and !$updateNombre and $updateSala)
    {
        $sql="update asignatura set codigo=?, sala_laboratorio=? where codigo=?";
        $smt=$bd->prepare($sql);
        $smt->bindValue(1, $codNuevo, PDO::PARAM_INT);
        $smt->bindValue(2, $salaOLab, PDO::PARAM_STR);
        $smt->bindValue(3, $codActual, PDO::PARAM_STR);

        if($smt->execute())
            echo "hecho";
        else
            echo "error";
        $conexion=null;
        die();  
    }

    //Modificar codigo y nombre
    if($updateCodigo and $updateNombre and !$updateSala)
    {
        $sql="update asignatura set codigo=?, nombre=? where codigo=?";
        $smt=$bd->prepare($sql);
        $smt->bindValue(1, $codNuevo, PDO::PARAM_INT);
        $smt->bindValue(2, $nomAsig, PDO::PARAM_INT);
        $smt->bindValue(3, $codActual, PDO::PARAM_STR);

        if($smt->execute())
            echo "hecho";
        else
            echo "error";
        $conexion=null;
        die();  
    }

    //Solo modificar codigo
    if($updateCodigo and !$updateNombre and !$updateSala)
    {
        $sql="update asignatura set codigo=? where codigo=?";
        $smt=$bd->prepare($sql);
        $smt->bindValue(1, $codNuevo, PDO::PARAM_INT);
        $smt->bindValue(2, $codActual, PDO::PARAM_STR);

        if($smt->execute())
            echo "hecho";
        else
            echo "error";
        $conexion=null;
        die();  
    }

    //Solo modificar nombre
    if(!$updateCodigo and $updateNombre and !$updateSala)
    {
        $sql="update asignatura set nombre=? where codigo=?";
        $smt=$bd->prepare($sql);
        $smt->bindValue(1, $nomAsig, PDO::PARAM_INT);
        $smt->bindValue(2, $codActual, PDO::PARAM_STR);

        if($smt->execute())
            echo "hecho";
        else
            echo "error";
        $conexion=null;
        die();  
    }

    //Solo modificar sala
    if(!$updateCodigo and !$updateNombre and $updateSala)
    {
        $sql="update asignatura set sala_laboratorio=? where codigo=?";
        $smt=$bd->prepare($sql);
        $smt->bindValue(1, $salaOLab, PDO::PARAM_STR);
        $smt->bindValue(2, $codActual, PDO::PARAM_STR);

        if($smt->execute())
            echo "hecho";
        else
            echo "error";
        $conexion=null;
        die();  
    }

    //No modificar nada
    if(!$updateCodigo and !$updateNombre and !$updateSala)
    {
        return "sin cambios";
        die();
    }
?>