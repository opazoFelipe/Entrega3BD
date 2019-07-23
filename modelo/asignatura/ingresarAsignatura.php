<?php
    require ('../conexion.php');
    $cod=$_POST["codigo"];
    $rutProf=$_POST["rutProfesor"];
    $nomAsig=$_POST["nombreAsignatura"];
    $salaOLab=$_POST["sala"];

    $cod=strtolower($cod);
    $nomAsig=strtolower($nomAsig);
    $salaOLab=strtolower($salaOLab);

    $conexion=new conexion();
    $bd=$conexion->get_conexion();
    $sql="select * from asignatura where codigo=?";
    $smt=$bd->prepare($sql);
    $smt->bindValue(1, $cod, PDO::PARAM_INT);
    if($smt->execute())
    {
        if($smt->rowCount()>0)
        {
            echo "codigo ya existe";
            $conexion=null;
            die();
        }
        else
        {
            $sql="select inAsignatura(?, ?, ?, ?)";
            $smt=$bd->prepare($sql);
            $smt->bindValue(1, $cod, PDO::PARAM_INT);
            $smt->bindValue(2, $rutProf, PDO::PARAM_STR);
            $smt->bindValue(3, $nomAsig, PDO::PARAM_STR);
            $smt->bindValue(4, $salaOLab, PDO::PARAM_STR);
            if($smt->execute())
            {
                echo "hecho";
                $conexion=null;
                die();
            }else
            {
                echo "error";
                $conexion=null;
                die();
            die();
            }
        }
    }else
    {
        echo "error";
        $conexion=null;
        die();
    }  
?>