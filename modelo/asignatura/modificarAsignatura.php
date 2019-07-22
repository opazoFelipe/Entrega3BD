<?php
    require ('../conexion.php');

    $codActual=$_POST["codigoActual"];
    $codNuevo=$_POST["codigoNuevo"];
    $nomAsig=$_POST["nombreAsignatura"]; //Nombre Nuevo
    $salaOLab=$_POST["salaOLab"]; //Sala Nueva

    $nombreActual=$_POST["nombreActual"];
    $salaActual=$_POST["salaActual"];

    if($codNuevo==$codActual | $codNuevo=="")
    {
        $codNuevo=$codActual;
      
    }
    if($nombreActual==$nomAsig | $nomAsig=="")
    {
        $nomAsig=$nombreActual;
    }
    if($salaActual==$salaOLab | $salaOLab=="")
    {
        $salaOLab=$salaActual;
    }

    function modAsignatura($codActual, $codNuevo, $nomAsig, $salaOLab)
    {
        $se_le_otorga=true;
        $consta_de=true;
        $esta_en=true;

        $conexion=new conexion();
        $bd=$conexion->get_conexion();

        $sql1="select sAsigConsta_de(?)";
        $smt=$bd->prepare($sql1);
        $smt->bindValue(1, $codActual, PDO::PARAM_INT);
        if($smt->execute())
        {
            $resultado = $smt->fetch(PDO::FETCH_ASSOC);
            if($resultado["sasigconsta_de"]>0)
                $consta_de=true;
            else
                $consta_de=false;
        }

        $sql2="select sAsigEsta_en(?)";
        $smt=$bd->prepare($sql2);
        $smt->bindValue(1, $codActual, PDO::PARAM_INT);
        if($smt->execute())
        {
            $resultado = $smt->fetch(PDO::FETCH_ASSOC);
            if($resultado["sasigesta_en"]>0)
                $esta_en=true;
            else
                $esta_en=false;
        }

        $sql3="select sAsigSe_le_otorga(?)";
        $smt=$bd->prepare($sql3);
        $smt->bindValue(1, $codActual, PDO::PARAM_INT);
        if($smt->execute())
        {
            $resultado = $smt->fetch(PDO::FETCH_ASSOC);
            if($resultado["sasigse_le_otorga"]>0)
                $se_le_otorga=true;
            else
                $se_le_otorga=false;
        }

        if($esta_en===true)
        {
            $sql8="alter table esta_en drop constraint esta_en_codigo_asignatura_fkey";
            $smt=$bd->prepare($sql8);
            if($smt->execute())
            {
               
            }else
            {
                echo "Error al eliminar constraint fkey de la relacion esta_en";
                die();
            }


            $sql4="select modEsta_en(?,?)";
            $smt=$bd->prepare($sql4);
            $smt->bindValue(1, $codActual, PDO::PARAM_INT);
            $smt->bindValue(2, $codNuevo, PDO::PARAM_INT);
            if($smt->execute())
            {
               
            }else
            {
                echo "Error al actualizar la relacion esta_en";
                die();
            }
               
        }

        if($consta_de===true)
        {
            $sql9="alter table consta_de drop constraint consta_de_codigo_asignatura_fkey";
            $smt=$bd->prepare($sql9);
            if($smt->execute())
            {
               
            }else
            {
                echo "Error al eliminar constraint fkey de la relacion consta_de";
            }

            $sql5="select modConsta_de(?,?)";
            $smt=$bd->prepare($sql5);
            $smt->bindValue(1, $codActual, PDO::PARAM_INT);
            $smt->bindValue(2, $codNuevo, PDO::PARAM_INT);
            if($smt->execute())
            {
               
            }else
            {
                echo "Error al actualizar la relacion consta_de";
            }

        }

        if($se_le_otorga===true)
        {
            $sql10="alter table se_le_otorga drop constraint se_le_otorga_codigo_asignatura_fkey";
            $smt=$bd->prepare($sql10);
            if($smt->execute())
            {
               
            }else
            {
                echo "Error al eliminar constraint fkey de la relacion se_le_otorga";
            }

            $sql6="select modSe_le_otorga(?,?)";
            $smt=$bd->prepare($sql6);
            $smt->bindValue(1, $codActual, PDO::PARAM_INT);
            $smt->bindValue(2, $codNuevo, PDO::PARAM_INT);
            if($smt->execute())
            {
               
            }else
            {
                echo "Error al actualizar la relacion se_le_otorga";
            }

        }

        $sql7="select modAsignatura(?,?,?,?)";
        $smt=$bd->prepare($sql7);
        $smt->bindValue(1, $codActual, PDO::PARAM_INT);
        $smt->bindValue(2, $codNuevo, PDO::PARAM_INT);
        $smt->bindValue(3, $nomAsig, PDO::PARAM_STR);
        $smt->bindValue(4, $salaOLab, PDO::PARAM_STR);
        if($smt->execute())
        {
            echo "Asignatura modificada correctamente";
            if($consta_de==true)
            {
                $sql11="ALTER TABLE consta_de
                        ADD CONSTRAINT consta_de_codigo_asignatura_fkey
                        FOREIGN KEY (codigo_asignatura) 
                        REFERENCES asignatura(codigo);";
                $smt=$bd->prepare($sql11);
                if($smt->execute())
                {
           
                }else
                {
                    echo "Error al insertar constraint fkey de la relacion consta_de";
                }
            }
           
            if($esta_en==true)
            {
                $sql12="ALTER TABLE esta_en
                        ADD CONSTRAINT esta_en_codigo_asignatura_fkey
                        FOREIGN KEY (codigo_asignatura) 
                        REFERENCES asignatura(codigo);";
                $smt=$bd->prepare($sql12);
                if($smt->execute())
                {
       
                }else
                {
                    echo "Error al insertar constraint fkey de la relacion esta_en";
                }
            }
            
            if($se_le_otorga==true)
            {
                $sql13="ALTER TABLE se_le_otorga
                        ADD CONSTRAINT se_le_otorga_codigo_asignatura_fkey
                        FOREIGN KEY (codigo_asignatura) 
                        REFERENCES asignatura(codigo);";
                $smt=$bd->prepare($sql13);
                if($smt->execute())
                {
   
                }else
                {
                    echo "Error al insertar constraint fkey de la relacion se_le_otorga";
                }
            }
           
        }else
        {
            echo "Error al actualizar la asignatura";
            die();
        }
        $conexion=null;
    } 
    
    modAsignatura($codActual, $codNuevo, $nomAsig, $salaOLab);
?>